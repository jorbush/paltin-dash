import React from 'react';
import { useTexture } from '@react-three/drei';

interface JorbitesPosterProps {
    zOffset: number;
}

export const JorbitesPoster: React.FC<JorbitesPosterProps> = ({ zOffset }) => {
    // Load the texture
    const texture = useTexture('/jorbites-social.jpg');

    return (
        <group position={[6.5, 3, zOffset]} rotation={[0, -Math.PI / 8, 0]}>
            {/* The Poster Board */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                {/* 1200x630 -> ~1.90 ratio. Let's make it 4.0 wide and 2.1 high */}
                <boxGeometry args={[4.2, 2.3, 0.2]} />
                <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>

            {/* The Image */}
            <mesh position={[0, 0, 0.11]} castShadow receiveShadow>
                {/* Width 4.0, Height 2.1 */}
                <planeGeometry args={[4.0, 2.1]} />
                <meshStandardMaterial map={texture} roughness={0.8} />
            </mesh>

            {/* Left Post */}
            <mesh position={[-1.5, -2.5, -0.05]} castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 5, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>

            {/* Right Post */}
            <mesh position={[1.5, -2.5, -0.05]} castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 5, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
        </group>
    );
};

// Preload the texture
useTexture.preload('/jorbites-social.jpg');
