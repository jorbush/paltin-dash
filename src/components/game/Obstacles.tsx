import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import { playCoinSound, playCrashSound } from '../../utils/audio';
import * as THREE from 'three';
import { getZoneForSegment } from './zones/ZoneManager';

const SPEED = 20;
const LANE_WIDTH = 2;
const SPAWN_Z = -50;
const DESPAWN_Z = 5;
const COLLISION_THRESHOLD = 1.0;

type EntityType = 'obstacle' | 'coin';

interface Entity {
    id: number;
    type: EntityType;
    lane: number; // -1, 0, or 1
    z: number;
    y: number;
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

        // 1. Spawning Logic
        if (time > nextSpawnTime.current) {
            const type: EntityType = Math.random() > 0.3 ? 'obstacle' : 'coin';
            const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

            const newEntity: Entity = {
                id: idCounter.current++,
                type,
                lane,
                z: SPAWN_Z,
                y: type === 'coin' ? 1.0 : 0.5, // coins float higher
            };

            setEntities((prev) => [...prev, newEntity]);

            // Schedule next spawn (random time between 0.5s and 1.5s)
            nextSpawnTime.current = time + 0.5 + Math.random() * 1.0;
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
                    const nextZ = ent.z + SPEED * delta;
                    const currentX = ent.lane * LANE_WIDTH;

                    // Check collision
                    const dx = Math.abs(currentX - pX);
                    const dy = Math.abs(ent.y - pY);
                    const dz = Math.abs(nextZ - pZ);

                    if (dx < COLLISION_THRESHOLD && dy < COLLISION_THRESHOLD && dz < COLLISION_THRESHOLD) {
                        if (ent.type === 'obstacle') {
                            commitRunScore();
                            setGameState('gameover');
                            playCrashSound(useStore.getState().volume);
                            nextEntities.push({ ...ent, z: nextZ });
                            continue;
                        } else if (ent.type === 'coin') {
                            addRunScore(10);
                            playCoinSound(useStore.getState().volume);
                            continue;
                        }
                    }

                    // Despawn logic
                    if (nextZ <= DESPAWN_Z) {
                        nextEntities.push({ ...ent, z: nextZ });
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
                const xPos = E.lane * LANE_WIDTH;
                if (E.type === 'obstacle') {
                    return (
                        <mesh key={E.id} position={[xPos, E.y, E.z]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                            <theme.ObstacleMesh />
                        </mesh>
                    );
                } else {
                    return (
                        <group key={E.id} position={[xPos, E.y, E.z]}>
                            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
                                <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.2} /> {/* Gold coin */}
                            </mesh>
                        </group>
                    );
                }
            })}
        </group>
    );
};
