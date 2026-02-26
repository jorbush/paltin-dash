import React from 'react';
import type { ZoneTheme } from './types';

// -------- Scenery Components --------
const Cactus: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            {/* Main Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.25, 3, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.8} /> {/* Bright green */}
            </mesh>
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.8} />
            </mesh>

            {/* Left Arm */}
            <group position={[-0.2, 1.2, 0]}>
                <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
                <mesh position={[-0.6, 0.4, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
                <mesh position={[-0.6, 0.8, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
            </group>

            {/* Right Arm */}
            <group position={[0.2, 1.8, 0]}>
                <mesh position={[0.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.12, 0.12, 0.5, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
                <mesh position={[0.5, 0.3, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
                <mesh position={[0.5, 0.6, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[0.12, 8, 8]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
};

const DesertRock: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.4, 0]} rotation={[Math.random(), Math.random(), Math.random()]} castShadow receiveShadow>
                <dodecahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#a8a29e" roughness={0.9} /> {/* Warm stone gray */}
            </mesh>
            <mesh position={[0.5, 0.2, 0.3]} rotation={[Math.random(), Math.random(), Math.random()]} castShadow receiveShadow>
                <dodecahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
            </mesh>
        </group>
    );
};

const AtacamaScenery: React.FC<{ zOffset: number }> = ({ zOffset }) => {
    return (
        <group>
            {/* Left Side Scenery */}
            <Cactus position={[-6, 0, zOffset - 10]} scale={1.2} />
            <DesertRock position={[-8, 0, zOffset - 25]} scale={1.5} />
            <DesertRock position={[-4, 0, zOffset - 5]} scale={0.8} />
            <DesertRock position={[-5, 0, zOffset - 35]} scale={1.1} />
            <Cactus position={[-5, 0, zOffset - 40]} scale={0.9} />

            {/* Right Side Scenery */}
            <Cactus position={[6, 0, zOffset - 5]} scale={1.3} />
            <Cactus position={[9, 0, zOffset - 30]} scale={1.4} />
            <DesertRock position={[4, 0, zOffset - 15]} scale={1.0} />
            <DesertRock position={[7, 0, zOffset - 45]} scale={0.9} />
            <Cactus position={[5, 0, zOffset - 20]} scale={1.1} />
        </group>
    );
};

const AtacamaObstacle: React.FC = () => {
    return (
        <>
            <dodecahedronGeometry args={[0.7, 1]} />
            <meshStandardMaterial color="#78716c" roughness={0.9} /> {/* Dark stone boulder */}
        </>
    );
};

// -------- Enemy & Projectile Components --------
const AtacamaGuanaco: React.FC = () => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.5, 0.6, 1.2]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} /> {/* Tan/Brown body */}
            </mesh>
            {/* Neck */}
            <mesh position={[0, 1.4, 0.4]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.8, 0.5]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.3, 0.4]} />
                <meshStandardMaterial color="#a68452" roughness={0.9} />
            </mesh>
            {/* Legs (Simplified) */}
            <mesh position={[-0.15, 0.4, 0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} />
            </mesh>
            <mesh position={[0.15, 0.4, 0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} />
            </mesh>
            <mesh position={[-0.15, 0.4, -0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} />
            </mesh>
            <mesh position={[0.15, 0.4, -0.4]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#c2a476" roughness={0.9} />
            </mesh>
        </group>
    );
};

// -------- Theme Definition --------
export const atacamaTheme: ZoneTheme = {
    id: 'atacama_desert',
    skyColor: '#fdba74', // Hot orange/peach sunset sky
    groundBaseColor: '#d6d3d1', // Dry, pale dirt
    trackLightColor: '#fde047', // Yellow sand
    trackDarkColor: '#fef08a', // Lighter sand
    pathColor: '#b45309', // Dark orange/brown path
    Scenery: AtacamaScenery,
    ObstacleMesh: AtacamaObstacle,
    EnemyMesh: AtacamaGuanaco,
};
