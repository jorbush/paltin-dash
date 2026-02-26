import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import { playCoinSound, playCrashSound } from '../../utils/audio';
import * as THREE from 'three';
import { getZoneForSegment, LATIN_AMERICA_ZONES, SEGMENTS_PER_ZONE } from './zones/ZoneManager';

const LANE_WIDTH = 2;
const SPAWN_Z = -50;
const DESPAWN_Z = 5;
const COLLISION_THRESHOLD = 1.0;

type EntityType = 'obstacle' | 'coin' | 'enemy' | 'projectile';

interface Entity {
    id: number;
    type: EntityType;
    lane: number; // -1, 0, or 1
    x: number; // Current X position (overrides lane if used for continuous movement)
    y: number;
    z: number;
    vx: number; // Horizontal velocity
    vz: number; // Additional Z velocity (for projectiles)
}

interface ObstaclesProps {
    playerGroupRef: React.RefObject<THREE.Group | null>;
}

export const Obstacles: React.FC<ObstaclesProps> = ({ playerGroupRef }) => {
    const { gameState, setGameState, addRunScore, commitRunScore, segmentsPassed, runId } = useStore();
    const [entities, setEntities] = useState<Entity[]>([]);
    const idCounter = useRef(0);
    const nextSpawnTime = useRef(0);

    // Reset obstacles on game start
    useEffect(() => {
        setEntities([]);
        nextSpawnTime.current = 0; // trigger spawn on next frame
    }, [runId]);

    useFrame((state, delta) => {
        if (gameState !== 'playing') return;

        const time = state.clock.elapsedTime;
        const theme = getZoneForSegment(segmentsPassed);
        const loopNumber = Math.floor(segmentsPassed / (SEGMENTS_PER_ZONE * LATIN_AMERICA_ZONES.length));

        // 1. Spawning Logic
        if (time > nextSpawnTime.current) {
            const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

            const entitiesToAdd: Entity[] = [];

            // Normal spawn ('obstacle' or 'coin')
            const type: EntityType = Math.random() > 0.3 ? 'obstacle' : 'coin';

            const newEntity: Entity = {
                id: idCounter.current++,
                type,
                lane,
                x: lane * LANE_WIDTH,
                y: type === 'coin' ? 1.0 : 0.5, // coins float higher
                z: SPAWN_Z,
                vx: 0,
                vz: 0,
            };

            entitiesToAdd.push(newEntity);

            // Additional Enemy spawn logic
            const canSpawnEnemy = theme.EnemyMesh;

            if (canSpawnEnemy) {
                // Low base chance for the first loop (5%), multiplied on subsequent loops
                const baseEnemyChance = 0.05;
                const multiplier = loopNumber === 0 ? 1 : loopNumber * 2;
                const spawnEnemy = Math.random() < (baseEnemyChance * multiplier);

                if (spawnEnemy) {
                    // Determine behavior based on zone
                    if (theme.id === 'amazon_jungle' && theme.ProjectileMesh) {
                        // Spawn Monkey (thrower) and Banana (projectile)
                        const side = Math.random() > 0.5 ? 1 : -1;
                        const monkeyId = idCounter.current++;
                        const bananaId = idCounter.current++;

                        const monkey: Entity = {
                            id: monkeyId,
                            type: 'enemy',
                            lane: side * 2, // Far side
                            x: side * 6,
                            y: 0,
                            z: SPAWN_Z,
                            vx: 0,
                            vz: 0,
                        };

                        const banana: Entity = {
                            id: bananaId,
                            type: 'projectile',
                            lane: 0, // Doesn't matter, uses x
                            x: side * 6,
                            y: 1.5,
                            z: SPAWN_Z,
                            vx: -side * 3, // Move towards center
                            vz: 10, // Faster towards player
                        };

                        entitiesToAdd.push(monkey, banana);
                    } else {
                        // Spawn Crosser (Guanaco/Penguin)
                        const startSide = Math.random() > 0.5 ? 1 : -1;
                        const crossingSpeed = 3 + Math.random() * 2; // Random speed

                        const crosser: Entity = {
                            id: idCounter.current++,
                            type: 'enemy',
                            lane: 0, // Uses x mainly
                            x: startSide * 8, // Start far edge
                            y: 0,
                            z: SPAWN_Z - 10, // Start slightly further back
                            vx: -startSide * crossingSpeed, // Move across
                            vz: 0,
                        };
                        entitiesToAdd.push(crosser);
                    }
                }
            }

            setEntities((prev) => [...prev, ...entitiesToAdd]);

            // Schedule next spawn (random time between 0.5s and 1.5s)
            // Decrease spawn interval slightly on later loops
            const speedFactor = Math.max(0.3, 1.0 - loopNumber * 0.1);
            nextSpawnTime.current = time + (0.5 + Math.random() * 1.0) * speedFactor;
        }

        // 2. Movement & Collision Logic
        if (playerGroupRef.current) {
            const pX = playerGroupRef.current.position.x;
            const pY = playerGroupRef.current.position.y;
            const pZ = playerGroupRef.current.position.z; // usually 0

            setEntities((prevEntities) => {
                const nextEntities: Entity[] = [];

                for (const ent of prevEntities) {
                    // move entity
                    const currentSpeed = Math.min(40, 20 + segmentsPassed * 0.5);
                    const nextZ = ent.z + (currentSpeed + ent.vz) * delta;
                    const nextX = ent.x + ent.vx * delta;

                    // Check collision
                    const dx = Math.abs(nextX - pX);
                    const dy = Math.abs(ent.y - pY);
                    const dz = Math.abs(nextZ - pZ);

                    // Adjust collision threshold slightly for different entity types
                    const threshold = ent.type === 'coin' ? COLLISION_THRESHOLD * 1.5 : COLLISION_THRESHOLD;

                    if (dx < threshold && dy < threshold && dz < threshold) {
                        if (ent.type === 'obstacle' || ent.type === 'enemy' || ent.type === 'projectile') {
                            commitRunScore();
                            setGameState('gameover');
                            playCrashSound(useStore.getState().volume);
                            nextEntities.push({ ...ent, x: nextX, z: nextZ });
                            continue;
                        } else if (ent.type === 'coin') {
                            addRunScore(10);
                            playCoinSound(useStore.getState().volume);
                            continue;
                        }
                    }

                    // For monkeys, if they are off screen (they don't move z much), clean them up when far enough
                    if (nextZ <= DESPAWN_Z) {
                        nextEntities.push({ ...ent, x: nextX, z: nextZ });
                    }
                }
                return nextEntities;
            });
        }
    });

    const theme = getZoneForSegment(segmentsPassed);

    return (
        <group>
            {entities.map((E) => {
                if (E.type === 'obstacle') {
                    return (
                        <mesh key={E.id} position={[E.x, E.y, E.z]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                            <theme.ObstacleMesh />
                        </mesh>
                    );
                } else if (E.type === 'coin') {
                    return (
                        <group key={E.id} position={[E.x, E.y, E.z]}>
                            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
                                <meshStandardMaterial color="#FDC800" metalness={0.8} roughness={0.2} /> {/* Cyan coin */}
                            </mesh>
                        </group>
                    );
                } else if (E.type === 'enemy' && theme.EnemyMesh) {
                    // Reversing rotation on x traversal
                    const rotY = E.vx > 0 ? Math.PI / 2 : E.vx < 0 ? -Math.PI / 2 : 0;
                    return (
                        <group key={E.id} position={[E.x, E.y, E.z]} rotation={[0, rotY, 0]}>
                            <theme.EnemyMesh />
                        </group>
                    );
                } else if (E.type === 'projectile' && theme.ProjectileMesh) {
                    // Add some spin to projectile
                    const rotX = -E.z; // Spin based on position
                    return (
                        <group key={E.id} position={[E.x, E.y, E.z]} rotation={[rotX, 0, 0]}>
                            <theme.ProjectileMesh />
                        </group>
                    );
                }
                return null;
            })}
        </group>
    );
};
