import React from 'react';

export const PaltinMexicanMesh: React.FC = () => {
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

            {/* Maracas – left hand */}
            <group position={[-0.78, 0.25, 0.1]} rotation={[0, 0, Math.PI / 5]}>
                {/* Handle */}
                <mesh position={[0, -0.18, 0]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
                    <meshStandardMaterial color="#92400e" />
                </mesh>
                {/* Ball */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshStandardMaterial color="#dc2626" roughness={0.6} />
                </mesh>
                {/* Stripe */}
                <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.081, 0.012, 6, 16]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
            </group>

            {/* Maracas – right hand */}
            <group position={[0.78, 0.20, 0.1]} rotation={[0, 0, -Math.PI / 5]}>
                {/* Handle */}
                <mesh position={[0, -0.08, 0]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.22, 8]} />
                    <meshStandardMaterial color="#92400e" />
                </mesh>
                {/* Ball */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshStandardMaterial color="#16a34a" roughness={0.6} />
                </mesh>
                {/* Stripe */}
                <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.081, 0.012, 6, 16]} />
                    <meshStandardMaterial color="#fbbf24" />
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

            {/* Paltin Body (Green Outer) */}
            <mesh castShadow receiveShadow>
                <capsuleGeometry args={[0.5, 0.5, 16, 16]} />
                <meshStandardMaterial color="#4ade80" roughness={0.6} />
            </mesh>

            {/* Mariachi Open Jacket – green (back+sides, front open ~90°) */}
            {/* thetaStart = π*0.75 (front-right edge), thetaLength = π*1.5 (270°) wraps around back */}
            <mesh position={[0, -0.05, 0.01]} castShadow receiveShadow>
                <cylinderGeometry args={[0.52, 0.56, 0.72, 32, 1, false, Math.PI * 0.25, Math.PI * 1.5]} />
                <meshStandardMaterial color="#15803d" roughness={0.85} side={2} />
            </mesh>

            {/* Jacket white middle stripe */}
            <mesh position={[0, -0.05, 0.01]}>
                <cylinderGeometry args={[0.525, 0.565, 0.24, 32, 1, false, Math.PI * 0.25, Math.PI * 1.5]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.85} side={2} />
            </mesh>

            {/* Jacket red upper stripe */}
            <mesh position={[0, 0.18, 0.01]}>
                <cylinderGeometry args={[0.527, 0.567, 0.22, 32, 1, false, Math.PI * 0.25, Math.PI * 1.5]} />
                <meshStandardMaterial color="#dc2626" roughness={0.85} side={2} />
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

            {/* Mustache (two halves) */}
            <mesh position={[-0.1, 0.1, 0.51]} rotation={[0, 0, Math.PI / 8]}>
                <capsuleGeometry args={[0.022, 0.12, 6, 8]} />
                <meshBasicMaterial color="#1c1917" />
            </mesh>
            <mesh position={[0.1, 0.1, 0.51]} rotation={[0, 0, -Math.PI / 8]}>
                <capsuleGeometry args={[0.022, 0.12, 6, 8]} />
                <meshBasicMaterial color="#1c1917" />
            </mesh>

            {/* ===== SOMBRERO ===== */}
            {/* Brim */}
            <mesh position={[0, 0.68, 0]}>
                <cylinderGeometry args={[0.75, 0.7, 0.04, 24]} />
                <meshStandardMaterial color="#d97706" roughness={0.7} />
            </mesh>

            {/* Crown base */}
            <mesh position={[0, 0.78, 0]}>
                <cylinderGeometry args={[0.38, 0.42, 0.14, 24]} />
                <meshStandardMaterial color="#b45309" roughness={0.6} />
            </mesh>

            {/* Crown top dome */}
            <mesh position={[0, 0.92, 0]}>
                <sphereGeometry args={[0.32, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#b45309" roughness={0.6} />
            </mesh>

            {/* Sombrero band – red (lies flat around crown) */}
            <mesh position={[0, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.4, 0.04, 8, 24]} />
                <meshStandardMaterial color="#dc2626" roughness={0.5} />
            </mesh>

            {/* Brim decorative trim – green (lies flat on brim) */}
            <mesh position={[0, 0.69, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.72, 0.018, 6, 28]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>

            {/* Leaves (keep the signature Paltín leaves, peeking under sombrero) */}
            <mesh position={[-0.05, 0.62, 0]} rotation={[0, 0, Math.PI / 6]}>
                <coneGeometry args={[0.1, 0.28, 8]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
            <mesh position={[0.1, 0.62, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <coneGeometry args={[0.07, 0.24, 8]} />
                <meshStandardMaterial color="#f97316" />
            </mesh>
        </group>
    );
};
