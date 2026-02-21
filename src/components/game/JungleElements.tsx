import React from 'react';

export const JungleTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} /> {/* Dark brown */}
            </mesh>

            {/* Leaves Layer 1 */}
            <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#15803d" roughness={0.8} /> {/* Dark green foliage */}
            </mesh>

            {/* Leaves Layer 2 */}
            <mesh position={[0.5, 3.2, -0.5]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.2, 0]} />
                <meshStandardMaterial color="#16a34a" roughness={0.7} /> {/* Lighter green */}
            </mesh>
        </group>
    );
};

export const Bush: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.8, 8, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.9} /> {/* Green bush */}
            </mesh>
            <mesh position={[0.4, 0.4, 0.4]} castShadow receiveShadow>
                <sphereGeometry args={[0.6, 8, 8]} />
                <meshStandardMaterial color="#15803d" roughness={0.9} />
            </mesh>
            <mesh position={[-0.4, 0.3, -0.2]} castShadow receiveShadow>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#4ade80" roughness={0.9} />
            </mesh>
        </group>
    );
};
