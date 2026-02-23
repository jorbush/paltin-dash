import React from 'react';
import type { ZoneTheme } from './types';

// -------- Scenery Components --------
const JungleTree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial color="#15803d" roughness={0.8} />
            </mesh>
            <mesh position={[0.5, 3.2, -0.5]} castShadow receiveShadow>
                <dodecahedronGeometry args={[1.2, 0]} />
                <meshStandardMaterial color="#16a34a" roughness={0.7} />
            </mesh>
        </group>
    );
};

const Bush: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <sphereGeometry args={[0.8, 8, 8]} />
                <meshStandardMaterial color="#22c55e" roughness={0.9} />
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

const JungleScenery: React.FC<{ segmentIndex: number; zOffset: number }> = ({ segmentIndex, zOffset }) => {
    return (
        <group>
            {/* Left Side Scenery */}
            <JungleTree position={[-6, 0, zOffset - 10]} scale={1.2} />
            <JungleTree position={[-8, 0, zOffset - 25]} scale={1.5} />
            <Bush position={[-4, 0, zOffset - 5]} scale={0.8} />
            <Bush position={[-5, 0, zOffset - 35]} scale={1.1} />
            <JungleTree position={[-5, 0, zOffset - 40]} scale={0.9} />

            {/* Right Side Scenery */}
            <JungleTree position={[6, 0, zOffset - 5]} scale={1.3} />
            <JungleTree position={[9, 0, zOffset - 30]} scale={1.4} />
            <Bush position={[4, 0, zOffset - 15]} scale={1.0} />
            <Bush position={[7, 0, zOffset - 45]} scale={0.9} />
            <JungleTree position={[5, 0, zOffset - 20]} scale={1.1} />
        </group>
    );
};

const JungleObstacle: React.FC = () => {
    return (
        <>
            <cylinderGeometry args={[0.5, 0.5, 1.8, 8]} />
            <meshStandardMaterial color="#451a03" roughness={0.9} />
        </>
    );
};

// -------- Theme Definition --------
export const jungleTheme: ZoneTheme = {
    id: 'amazon_jungle',
    skyColor: '#a3e635', // Light lime green
    groundBaseColor: '#14532d', // Deep green sides
    trackLightColor: '#166534',
    trackDarkColor: '#14532d',
    pathColor: '#a16207', // Dirt path
    Scenery: JungleScenery,
    ObstacleMesh: JungleObstacle,
};
