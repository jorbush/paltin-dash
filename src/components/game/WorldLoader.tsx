import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';
import { getZoneForSegment, SEGMENTS_PER_ZONE, LATIN_AMERICA_ZONES } from './zones/ZoneManager';
import { ZonePoster } from './zones/ZonePoster';
import { JorbitesPoster } from './zones/JorbitesPoster';

const SEGMENT_LENGTH = 50;
export const WorldLoader: React.FC = () => {
    const { gameState, addRunScore, segmentsPassed, incrementSegments, runId } = useStore();
    const floorGroupRef = useRef<THREE.Group>(null);

    // Pick a random zone index for the Jorbites poster (0 to LATIN_AMERICA_ZONES.length - 1)
    // Use useMemo with runId so it resets gracefully on new runs.
    const jorbitesRandomZoneIndex = React.useMemo(() => {
        return Math.floor(Math.random() * LATIN_AMERICA_ZONES.length);
    }, [runId]);

    // The segment to place the Jorbites poster: end of the randomly chosen zone.
    // SEGMENTS_PER_ZONE - 2 ensures it isn't literally the very edge where themes blend
    const JORBITES_TARGET_SEGMENT = jorbitesRandomZoneIndex * SEGMENTS_PER_ZONE + SEGMENTS_PER_ZONE - 2;

    useFrame((state, delta) => {
        if (gameState !== 'playing' || !floorGroupRef.current) return;

        // Move the floor towards the camera (+Z direction) to simulate moving forward
        const currentSpeed = Math.min(40, 20 + segmentsPassed * 0.5);
        floorGroupRef.current.position.z += currentSpeed * delta;

        // Reset floor position to create infinite loop
        if (floorGroupRef.current.position.z >= SEGMENT_LENGTH) {
            floorGroupRef.current.position.z -= SEGMENT_LENGTH;
            // Also grant some passive points just for surviving
            addRunScore(1);
            incrementSegments();
        }
    });

    useEffect(() => {
        if (floorGroupRef.current) {
            floorGroupRef.current.position.z = 0;
        }
    }, [runId]);

    const theme = getZoneForSegment(segmentsPassed);

    return (
        <group>
            {/* Massive infinite ground plane lying below the track to hide the void */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -50]} receiveShadow>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color={theme.groundBaseColor} roughness={1} />
            </mesh>

            <group ref={floorGroupRef}>
                {/* We need two floor segments to keep it seamless. Render 3 to be safe. */}
                {[-2, -1, 0, 1].map((index) => (
                    <mesh
                        key={index}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[0, 0, index * SEGMENT_LENGTH]}
                        receiveShadow
                    >
                        <planeGeometry args={[40, SEGMENT_LENGTH]} />
                        <meshStandardMaterial color={index % 2 === 0 ? theme.trackLightColor : theme.trackDarkColor} />
                    </mesh>
                ))}

                {/* Scenery Generation */}
                {[-2, -1, 0, 1].map((segmentIndex) => {
                    const zOffset = segmentIndex * SEGMENT_LENGTH;
                    return (
                        <group key={`scenery-group-${segmentIndex}`}>
                            <theme.Scenery
                                segmentIndex={segmentIndex}
                                zOffset={zOffset}
                            />
                            {/* Poster for the zone name appears at the start of every zone during the first loop */}
                            {segmentsPassed % SEGMENTS_PER_ZONE === 0 && segmentIndex === -1 && segmentsPassed < SEGMENTS_PER_ZONE * LATIN_AMERICA_ZONES.length && (
                                <ZonePoster zoneId={theme.id} zOffset={zOffset} />
                            )}
                            {/* Jorbites Poster renders at the end of the randomly selected zone exactly once */}
                            {segmentsPassed === JORBITES_TARGET_SEGMENT && segmentIndex === -1 && (
                                <JorbitesPoster zOffset={zOffset} />
                            )}
                        </group>
                    );
                })}

                {/* Basic Lanes Indicators */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color={theme.pathColor} opacity={0.3} transparent />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color={theme.pathColor} opacity={0.3} transparent />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color={theme.pathColor} opacity={0.3} transparent />
                </mesh>
            </group>
        </group>
    );
};
