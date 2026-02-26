import React from 'react';
import type { ZoneTheme } from './types';

// -------- Scenery Components --------
const Glacier: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            {/* Main Ice Peak */}
            <mesh position={[0, 4, 0]} castShadow receiveShadow>
                <coneGeometry args={[2, 8, 5]} />
                <meshStandardMaterial color="#bae6fd" roughness={0.3} metalness={0.1} /> {/* Light blue ice */}
            </mesh>
            {/* Secondary Ice Peak */}
            <mesh position={[1.5, 2.5, 1]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <coneGeometry args={[1.5, 5, 4]} />
                <meshStandardMaterial color="#7dd3fc" roughness={0.3} metalness={0.1} />
            </mesh>
            {/* Base Snow/Ice chunk */}
            <mesh position={[-1, 1, 1]} rotation={[0, -Math.PI / 4, 0]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#e0f2fe" roughness={0.7} />
            </mesh>
        </group>
    );
};

const SnowRock: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.4, 0]} rotation={[Math.random(), Math.random(), Math.random()]} castShadow receiveShadow>
                <dodecahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.9} /> {/* Snow white */}
            </mesh>
            <mesh position={[0.5, 0.2, 0.3]} rotation={[Math.random(), Math.random(), Math.random()]} castShadow receiveShadow>
                <dodecahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
            </mesh>
        </group>
    );
};

const PatagoniaScenery: React.FC<{ zOffset: number }> = ({ zOffset }) => {
    return (
        <group>
            {/* Left Side Scenery */}
            <Glacier position={[-8, 0, zOffset - 10]} scale={1.2} />
            <SnowRock position={[-5, 0, zOffset - 25]} scale={1.5} />
            <SnowRock position={[-4, 0, zOffset - 5]} scale={0.8} />
            <Glacier position={[-12, 0, zOffset - 35]} scale={1.5} />
            <SnowRock position={[-6, 0, zOffset - 40]} scale={0.9} />

            {/* Right Side Scenery */}
            <Glacier position={[8, 0, zOffset - 5]} scale={1.3} />
            <SnowRock position={[5, 0, zOffset - 30]} scale={1.4} />
            <SnowRock position={[4, 0, zOffset - 15]} scale={1.0} />
            <Glacier position={[10, 0, zOffset - 45]} scale={1.8} />
            <SnowRock position={[6, 0, zOffset - 20]} scale={1.1} />
        </group>
    );
};

const PatagoniaObstacle: React.FC = () => {
    return (
        <>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.1} opacity={0.8} transparent /> {/* Ice block */}
        </>
    );
};

// -------- Enemy Components --------
const PatagoniaPenguin: React.FC = () => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} /> {/* Black back */}
            </mesh>
            {/* Belly */}
            <mesh position={[0, 0.5, 0.1]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.25, 0.75, 16]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.8} /> {/* White belly */}
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} /> {/* Black head */}
            </mesh>
            {/* Beak */}
            <mesh position={[0, 1.0, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.08, 0.2, 8]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.7} /> {/* Orange beak */}
            </mesh>
            {/* Flippers */}
            <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, 0.3]} castShadow receiveShadow>
                <boxGeometry args={[0.05, 0.4, 0.2]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
                <boxGeometry args={[0.05, 0.4, 0.2]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            {/* Feet */}
            <mesh position={[-0.15, 0.05, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.1, 0.2]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.7} />
            </mesh>
            <mesh position={[0.15, 0.05, 0.1]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.1, 0.2]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.7} />
            </mesh>
        </group>
    );
};

// -------- Theme Definition --------
export const patagoniaTheme: ZoneTheme = {
    id: 'patagonia_glacier',
    skyColor: '#0ea5e9', // Crisp blue sky
    groundBaseColor: '#f8fafc', // Snowy ground
    trackLightColor: '#e0f2fe', // Very light blue snow
    trackDarkColor: '#bae6fd', // Slightly darker blue snow
    pathColor: '#38bdf8', // Ice path
    Scenery: PatagoniaScenery,
    ObstacleMesh: PatagoniaObstacle,
    EnemyMesh: PatagoniaPenguin,
};
