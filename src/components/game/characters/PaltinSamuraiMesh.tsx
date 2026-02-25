import React from 'react';

export const PaltinSamuraiMesh: React.FC = () => {
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

            {/* Sword (Attached to Left side/belt) */}
            <group position={[0.4, -0.2, 0.4]} rotation={[Math.PI / 4, 0, -Math.PI / 4]}>
                {/* Scabbard / Blade area */}
                <mesh position={[0, -0.3, 0]}>
                    <cylinderGeometry args={[0.04, 0.03, 0.6, 8]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
                {/* Guard (Tsuba) - Gold */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Handle (Tsuka) - Black */}
                <mesh position={[0, 0.15, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
                {/* Pommel (Kashira) - Gold */}
                <mesh position={[0, 0.31, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, 0.02, 16]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

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

            {/* Samurai Kimono (Wrap around the body) */}
            <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.52, 0.55, 0.7, 16]} />
                <meshStandardMaterial color="#4b5320" roughness={0.9} />
            </mesh>

            {/* Blue Belt (Obi) */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.54, 0.54, 0.15, 16]} />
                <meshStandardMaterial color="#0000cd" roughness={0.7} />
            </mesh>

            {/* Paltin Inner Body (Light Yellowish Green) */}
            <mesh position={[0, 0.15, 0.15]} castShadow receiveShadow>
                <capsuleGeometry args={[0.3, 0.35, 16, 16]} />
                <meshStandardMaterial color="#fef08a" roughness={0.6} />
            </mesh>

            {/* Core / Seed */}
            <mesh position={[0, 0.05, 0.45]} castShadow>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#9a3412" roughness={0.8} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.15, 0.35, 0.5]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>
            <mesh position={[0.15, 0.35, 0.5]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>

            {/* Cheeks */}
            <mesh position={[-0.3, 0.25, 0.48]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial color="#f472b6" />
            </mesh>
            <mesh position={[0.3, 0.25, 0.48]}>
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
