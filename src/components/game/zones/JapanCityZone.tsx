import React from 'react';
import type { ZoneTheme } from './types';

// -------- Scenery Components --------
const Skyscraper: React.FC<{ position: [number, number, number]; scale?: number; color?: string }> = ({ position, scale = 1, color = "#1e293b" }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 5, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 10, 4]} />
                <meshStandardMaterial color={color} roughness={0.3} />
            </mesh>
            {/* Windows */}
            {[1, 3, 5, 7, 9].map(y => (
                <group key={y} position={[0, y, 0]}>
                    <mesh position={[2.01, 0, 0]}>
                        <boxGeometry args={[0.1, 0.5, 3]} />
                        <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh position={[-2.01, 0, 0]}>
                        <boxGeometry args={[0.1, 0.5, 3]} />
                        <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

const NeonSign: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
    return (
        <group position={position}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.2, 2, 1]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
            </mesh>
        </group>
    );
};

const JapanCityScenery: React.FC<{ zOffset: number }> = ({ zOffset }) => {
    return (
        <group>
            {/* Left Side Scenery */}
            <Skyscraper position={[-8, 0, zOffset - 10]} scale={1.2} color="#0f172a" />
            <NeonSign position={[-5.8, 4, zOffset - 5]} color="#f472b6" />
            <Skyscraper position={[-10, 0, zOffset - 30]} scale={1.5} color="#1e1b4b" />
            <NeonSign position={[-5.8, 6, zOffset - 25]} color="#38bdf8" />

            {/* Right Side Scenery */}
            <Skyscraper position={[8, 0, zOffset - 5]} scale={1.3} color="#1e1b4b" />
            <NeonSign position={[5.8, 5, zOffset - 15]} color="#4ade80" />
            <Skyscraper position={[12, 0, zOffset - 40]} scale={1.1} color="#0f172a" />
            <NeonSign position={[5.8, 3, zOffset - 35]} color="#fb923c" />
        </group>
    );
};

const TrashCan: React.FC = () => {
    return (
        <group>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
                <meshStandardMaterial color="#64748b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.05, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.1, 8]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
        </group>
    );
};

const SumoEnemy: React.FC = () => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.7, 16, 16]} />
                <meshStandardMaterial color="#fcd34d" roughness={0.9} />
            </mesh>
            {/* Mawashi (Belt) */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.75, 0.75, 0.3, 16]} />
                <meshStandardMaterial color="#171717" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#fcd34d" />
            </mesh>
            {/* Hair (Topknot) */}
            <mesh position={[0, 1.6, 0]}>
                <boxGeometry args={[0.1, 0.2, 0.1]} />
                <meshStandardMaterial color="#171717" />
            </mesh>
        </group>
    );
};

// -------- Theme Definition --------
export const japanCityTheme: ZoneTheme = {
    id: 'japan_city',
    skyColor: '#020617', // Midnight blue/black
    groundBaseColor: '#1e293b', // Dark slate
    trackLightColor: '#334155', // Slate track
    trackDarkColor: '#1e293b', // Darker slate track
    pathColor: '#6366f1', // Indigo neon path
    Scenery: JapanCityScenery,
    ObstacleMesh: TrashCan,
    EnemyMesh: SumoEnemy,
};
