import React from 'react';

export const CalabacinMesh: React.FC = () => {
    return (
        <group>
            {/* Arms - Dark Orange */}
            <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
                <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                <meshStandardMaterial color="#c2410c" roughness={0.9} />
            </mesh>
            <mesh position={[0.55, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
                <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
                <meshStandardMaterial color="#c2410c" roughness={0.9} />
            </mesh>

            {/* Legs - Dark Orange */}
            <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#c2410c" roughness={0.9} />
            </mesh>
            <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#c2410c" roughness={0.9} />
            </mesh>

            {/* Pumpkin Body */}
            <mesh castShadow receiveShadow scale={[1.2, 0.9, 1.1]}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color="#ea580c" roughness={0.7} />
            </mesh>

            {/* Stem */}
            <mesh position={[0, 0.65, 0]} rotation={[0, 0, -0.2]}>
                <cylinderGeometry args={[0.08, 0.12, 0.4]} />
                <meshStandardMaterial color="#14532d" roughness={0.8} />
            </mesh>

            {/* Eyes (Triangular, scary) using cones */}
            <mesh position={[-0.25, 0.2, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.15, 0.1, 3]} />
                <meshBasicMaterial color="#fef08a" />
            </mesh>
            <mesh position={[0.25, 0.2, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.15, 0.1, 3]} />
                <meshBasicMaterial color="#fef08a" />
            </mesh>

            {/* Nose (Triangular) */}
            <mesh position={[0, 0, 0.65]} rotation={[-Math.PI / 2, 0, Math.PI]}>
                <coneGeometry args={[0.1, 0.1, 3]} />
                <meshBasicMaterial color="#111827" />
            </mesh>

            {/* Mouth */}
            <group position={[0, -0.2, 0.62]}>
                {/* Scary smile via a series of meshes */}
                <mesh position={[-0.25, 0.1, -0.05]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#fef08a" /></mesh>
                <mesh position={[-0.15, 0.05, -0.02]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#111827" /></mesh>
                <mesh position={[-0.05, 0, 0]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#fef08a" /></mesh>
                <mesh position={[0.05, 0.02, 0]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#111827" /></mesh>
                <mesh position={[0.15, 0.05, -0.02]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#fef08a" /></mesh>
                <mesh position={[0.25, 0.1, -0.05]}><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#111827" /></mesh>
            </group>
        </group>
    );
};
