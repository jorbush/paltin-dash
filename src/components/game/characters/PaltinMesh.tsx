import React from 'react';

export const PaltinMesh: React.FC = () => {
    return (
        <group>
            {/* Arms */}
            <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
                <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>
            <mesh position={[0.55, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
                <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>
            <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#f97316" roughness={0.8} />
            </mesh>

            {/* Paltin Body (Dark Green Outer) */}
            <mesh castShadow receiveShadow>
                <capsuleGeometry args={[0.5, 0.5, 16, 16]} />
                <meshStandardMaterial color="#4ade80" roughness={0.6} />
            </mesh>

            {/* Paltin Inner Body (Light Yellowish Green) */}
            <mesh position={[0, 0, 0.12]} castShadow receiveShadow>
                <capsuleGeometry args={[0.4, 0.45, 16, 16]} />
                <meshStandardMaterial color="#fef08a" roughness={0.6} />
            </mesh>

            {/* Core / Seed */}
            <mesh position={[0, -0.1, 0.5]} castShadow>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#9a3412" roughness={0.8} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.15, 0.3, 0.5]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>
            <mesh position={[0.15, 0.3, 0.5]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>

            {/* Cheeks */}
            <mesh position={[-0.3, 0.2, 0.48]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#f472b6" />
            </mesh>
            <mesh position={[0.3, 0.2, 0.48]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#f472b6" />
            </mesh>

            {/* Leaves */}
            <mesh position={[-0.05, 0.85, 0]} rotation={[0, 0, Math.PI / 6]}>
                <coneGeometry args={[0.12, 0.35, 8]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
            <mesh position={[0.1, 0.85, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <coneGeometry args={[0.08, 0.3, 8]} />
                <meshStandardMaterial color="#f97316" />
            </mesh>
        </group>
    );
};
