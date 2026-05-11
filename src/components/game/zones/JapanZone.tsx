import React from 'react';
import type { ZoneTheme } from './types';

// -------- Scenery Components --------
const SakuraTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.25, 2, 8]} />
                <meshStandardMaterial color="#57534e" roughness={0.9} />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.2, 0]} />
                <meshStandardMaterial color="#fbcfe8" roughness={0.8} /> {/* Light pink */}
            </mesh>
            <mesh position={[0.4, 2.8, -0.3]} castShadow receiveShadow>
                <dodecahedronGeometry args={[0.9, 0]} />
                <meshStandardMaterial color="#f9a8d4" roughness={0.7} /> {/* Deeper pink */}
            </mesh>
        </group>
    );
};

const ToriiGate: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            {/* Pillars */}
            <mesh position={[-1.2, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
                <meshStandardMaterial color="#b91c1c" roughness={0.5} />
            </mesh>
            <mesh position={[1.2, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.15, 3, 8]} />
                <meshStandardMaterial color="#b91c1c" roughness={0.5} />
            </mesh>
            {/* Top Beam */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.5, 0.2, 0.3]} />
                <meshStandardMaterial color="#b91c1c" roughness={0.5} />
            </mesh>
            <mesh position={[0, 3.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 0.25, 0.4]} />
                <meshStandardMaterial color="#171717" roughness={0.5} />
            </mesh>
        </group>
    );
};

const JapanScenery: React.FC<{ zOffset: number }> = ({ zOffset }) => {
    return (
        <group>
            {/* Left Side Scenery */}
            <SakuraTree position={[-6, 0, zOffset - 10]} scale={1.2} />
            <ToriiGate position={[-10, 0, zOffset - 25]} scale={1.5} />
            <SakuraTree position={[-4, 0, zOffset - 5]} scale={0.8} />
            <SakuraTree position={[-5, 0, zOffset - 35]} scale={1.1} />
            <ToriiGate position={[-8, 0, zOffset - 45]} scale={1.2} />

            {/* Right Side Scenery */}
            <SakuraTree position={[6, 0, zOffset - 5]} scale={1.3} />
            <ToriiGate position={[10, 0, zOffset - 30]} scale={1.4} />
            <SakuraTree position={[4, 0, zOffset - 15]} scale={1.0} />
            <SakuraTree position={[7, 0, zOffset - 40]} scale={0.9} />
            <ToriiGate position={[9, 0, zOffset - 20]} scale={1.1} />
        </group>
    );
};

const StoneLantern: React.FC = () => {
    return (
        <group>
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.6, 0.4, 0.6]} />
                <meshStandardMaterial color="#a8a29e" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
                <meshStandardMaterial color="#a8a29e" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color="#a8a29e" roughness={0.9} />
            </mesh>
            {/* Light part */}
            <mesh position={[0, 1.4, 0]}>
                <boxGeometry args={[0.5, 0.4, 0.5]} />
                <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.7, 0.4, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial color="#78716c" roughness={0.9} />
            </mesh>
        </group>
    );
};

const NinjaEnemy: React.FC = () => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.8, 0.3]} />
                <meshStandardMaterial color="#171717" roughness={0.9} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#171717" roughness={0.9} />
            </mesh>
            {/* Headband/Eyes area */}
            <mesh position={[0, 1.15, 0.15]}>
                <boxGeometry args={[0.4, 0.1, 0.15]} />
                <meshStandardMaterial color="#fefce8" />
            </mesh>
            {/* Sword on back */}
            <mesh position={[0, 0.6, -0.2]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.1, 1.2, 0.05]} />
                <meshStandardMaterial color="#404040" />
            </mesh>
        </group>
    );
};

// -------- Theme Definition --------
export const japanTheme: ZoneTheme = {
    id: 'japan_shrine',
    skyColor: '#fce7f3', // Very light pink sky
    groundBaseColor: '#44403c', // Dark stone ground
    trackLightColor: '#a8a29e', // Light stone track
    trackDarkColor: '#78716c', // Medium stone track
    pathColor: '#292524', // Almost black stone path
    Scenery: JapanScenery,
    ObstacleMesh: StoneLantern,
    EnemyMesh: NinjaEnemy,
};
