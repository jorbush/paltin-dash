import React from 'react';

export const PattyJoeMesh: React.FC = () => {
    return (
        <group>
            {/* Arms - Light Pinkish Skin Tone */}
            <mesh position={[-0.6, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
                <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
                <meshStandardMaterial color="#fcd5ce" roughness={0.9} />
            </mesh>
            <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
                <meshStandardMaterial color="#fcd5ce" roughness={0.9} />
            </mesh>

            {/* Tomato/Ketchup Left Hand (Spatula/splat shape representation) */}
            <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <capsuleGeometry args={[0.06, 0.3, 8, 16]} />
                <meshStandardMaterial color="#ef4444" roughness={0.8} />
            </mesh>
            <mesh position={[0.75, 0.4, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#ef4444" roughness={0.8} />
            </mesh>

            {/* White blobs on red hand */}
            <mesh position={[0.72, 0.42, 0.1]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.78, 0.45, 0.08]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.76, 0.38, 0.12]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Legs - Light Pinkish Skin Tone */}
            <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#fcd5ce" roughness={0.9} />
            </mesh>
            <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color="#fcd5ce" roughness={0.9} />
            </mesh>

            {/* Bottom Bun */}
            <mesh position={[0, -0.15, 0]} scale={[1.1, 0.4, 1.1]} castShadow receiveShadow>
                <sphereGeometry args={[0.55, 32, 32]} />
                <meshStandardMaterial color="#d97706" roughness={0.8} />
            </mesh>

            {/* Lettuce (Green wavy edges, simulated with multiple scaled spheres or a torus) */}
            <mesh position={[0, -0.05, 0]} scale={[1, 0.1, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.55, 0.1, 16, 32]} />
                <meshStandardMaterial color="#22c55e" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.05, 0]} scale={[1.05, 0.1, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.52, 0.1, 16, 32]} />
                <meshStandardMaterial color="#ef4444" roughness={0.7} />
            </mesh>

            {/* Patty */}
            <mesh position={[0, 0, 0]} scale={[1, 0.25, 1]} castShadow>
                <cylinderGeometry args={[0.56, 0.56, 1, 32]} />
                <meshStandardMaterial color="#451a03" roughness={1} />
            </mesh>

            {/* Cheese Layer */}
            <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 0.05, 1]} castShadow>
                <boxGeometry args={[0.95, 1, 0.95]} />
                <meshStandardMaterial color="#facc15" roughness={0.6} />
            </mesh>

            {/* Top Bun */}
            <mesh position={[0, 0.2, 0]} scale={[1.15, 0.65, 1.15]} castShadow receiveShadow>
                <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.8} />
            </mesh>

            {/* Face on Top Bun */}
            {/* Eyes */}
            <mesh position={[-0.2, 0.4, 0.55]} rotation={[Math.PI / 6, -Math.PI / 12, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>
            <mesh position={[-0.22, 0.4, 0.58]} rotation={[Math.PI / 6, -Math.PI / 12, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            <mesh position={[0.2, 0.4, 0.55]} rotation={[Math.PI / 6, Math.PI / 12, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                <meshBasicMaterial color="#451a03" />
            </mesh>
            <mesh position={[0.18, 0.4, 0.58]} rotation={[Math.PI / 6, Math.PI / 12, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 0.32, 0.62]} rotation={[Math.PI / 4, 0, 0]}>
                <capsuleGeometry args={[0.04, 0.06, 8, 8]} />
                <meshBasicMaterial color="#ec4899" />
            </mesh>

            {/* Cheeks */}
            <mesh position={[-0.35, 0.3, 0.52]} rotation={[Math.PI / 5, -Math.PI / 8, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                <meshBasicMaterial color="#fbcfe8" />
            </mesh>
            <mesh position={[0.35, 0.3, 0.52]} rotation={[Math.PI / 5, Math.PI / 8, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                <meshBasicMaterial color="#fbcfe8" />
            </mesh>

            {/* Smile */}
            <group position={[0, 0.25, 0.6]} rotation={[Math.PI / 6, 0, 0]}>
                <mesh position={[-0.08, 0.02, 0]}><sphereGeometry args={[0.02]} /><meshBasicMaterial color="#451a03" /></mesh>
                <mesh position={[-0.04, 0, 0]}><sphereGeometry args={[0.02]} /><meshBasicMaterial color="#451a03" /></mesh>
                <mesh position={[0, -0.01, 0]}><sphereGeometry args={[0.02]} /><meshBasicMaterial color="#451a03" /></mesh>
                <mesh position={[0.04, 0, 0]}><sphereGeometry args={[0.02]} /><meshBasicMaterial color="#451a03" /></mesh>
                <mesh position={[0.08, 0.02, 0]}><sphereGeometry args={[0.02]} /><meshBasicMaterial color="#451a03" /></mesh>
            </group>

            <mesh position={[0.02, 0.23, 0.61]} rotation={[Math.PI / 6, 0, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ec4899" />
            </mesh>

            {/* Sesame Seeds */}
            <group>
                <mesh position={[-0.3, 0.6, 0.4]} rotation={[0.4, 0.5, 0.2]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <mesh position={[0.3, 0.65, 0.3]} rotation={[-0.2, 0.1, 0.8]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <mesh position={[0, 0.75, 0.1]} rotation={[1.2, -0.5, 0.3]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <mesh position={[-0.4, 0.5, 0.1]} rotation={[0.8, 0.9, 0.1]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <mesh position={[0.4, 0.5, 0.1]} rotation={[-0.6, 0.2, -0.5]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
                <mesh position={[0, 0.6, 0.5]} rotation={[0.1, 0.1, 1.5]}><capsuleGeometry args={[0.015, 0.06, 4, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
            </group>
        </group>
    );
};
