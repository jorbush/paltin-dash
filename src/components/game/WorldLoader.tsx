import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';
import { JungleTree, Bush } from './JungleElements';

const SEGMENT_LENGTH = 50;
const SPEED = 20;

export const WorldLoader: React.FC = () => {
    const { gameState, addPoints } = useStore();
    const floorGroupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (gameState !== 'playing' || !floorGroupRef.current) return;

        // Move the floor towards the camera (+Z direction) to simulate moving forward
        floorGroupRef.current.position.z += SPEED * delta;

        // Reset floor position to create infinite loop
        if (floorGroupRef.current.position.z >= SEGMENT_LENGTH) {
            floorGroupRef.current.position.z -= SEGMENT_LENGTH;
            // Also grant some passive points just for surviving
            addPoints(1);
        }
    });

    return (
        <group>
            {/* Massive infinite ground plane lying below the track to hide the void */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -50]} receiveShadow>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#14532d" roughness={1} /> {/* Match dark jungle sides */}
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
                        <meshStandardMaterial color={index % 2 === 0 ? "#166534" : "#14532d"} /> {/* Dark jungle ground */}
                    </mesh>
                ))}

                {/* Scenery Generation (Trees and Bushes on the sides) */}
                {[-2, -1, 0, 1].map((segmentIndex) => {
                    const zOffset = segmentIndex * SEGMENT_LENGTH;
                    return (
                        <group key={`scenery-${segmentIndex}`}>
                            {/* Left Side Scenery */}
                            <JungleTree position={[-6, 0, zOffset - 10]} scale={1.2} />
                            <JungleTree position={[-8, 0, zOffset - 25]} scale={1.5} />
                            <Bush position={[-4, 0, zOffset - 5]} scale={0.8} />
                            <Bush position={[-5, 0, zOffset - 35]} scale={1.1} />
                            <JungleTree position={[-5, 0, zOffset - 40]} scale={0.9} />

                            {/* Right Side Scenery */}
                            <JungleTree position={[6, 0, zOffset - 5]} scale={1.3} />
                            <JungleTree position={[9, 0, zOffset - 30]} scale={1.4} />
                            <Bush position={[4, 0, zOffset - 15]} scale={1.0} />
                            <Bush position={[7, 0, zOffset - 45]} scale={0.9} />
                            <JungleTree position={[5, 0, zOffset - 20]} scale={1.1} />
                        </group>
                    );
                })}

                {/* Basic Lanes Indicators - modified to look like dirt paths */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color="#a16207" opacity={0.3} transparent /> {/* Dirt path color */}
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color="#a16207" opacity={0.3} transparent />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.01, -50]} receiveShadow>
                    <planeGeometry args={[1.5, 200]} />
                    <meshBasicMaterial color="#a16207" opacity={0.3} transparent />
                </mesh>
            </group>
        </group>
    );
};
