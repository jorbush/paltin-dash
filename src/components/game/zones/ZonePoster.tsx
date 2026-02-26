import React from 'react';
import { Text } from '@react-three/drei';
import { useStore } from '../../../store/useStore';
import { translations } from '../../../i18n/translations';

interface ZonePosterProps {
    zoneId: string;
    zOffset: number;
}

export const ZonePoster: React.FC<ZonePosterProps> = ({ zoneId, zOffset }) => {
    const { language } = useStore();
    const t = translations[language];

    // Determine the translation key based on the zoneId
    const zoneNameKey = `zone_${zoneId}` as keyof typeof t;
    const zoneName = t[zoneNameKey] || zoneId;

    return (
        <group position={[-6.5, 1.0, zOffset]} rotation={[0, Math.PI / 8, 0]}>
            {/* Main Plank */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 1.2, 0.15]} />
                <meshStandardMaterial color="#a16207" roughness={0.8} /> {/* Match path/dirt tone for coziness */}
            </mesh>

            {/* Top Log Trim */}
            <mesh position={[0, 0.6, 0.05]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.08, 4.1, 8]} />
                <meshStandardMaterial color="#78350f" roughness={1} />
            </mesh>

            {/* Bottom Log Trim */}
            <mesh position={[0, -0.6, 0.05]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.08, 0.08, 4.1, 8]} />
                <meshStandardMaterial color="#78350f" roughness={1} />
            </mesh>

            {/* Left Post */}
            <mesh position={[-1.5, -0.8, -0.05]} castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 2.5, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>

            {/* Right Post */}
            <mesh position={[1.5, -0.8, -0.05]} castShadow receiveShadow>
                <cylinderGeometry args={[0.12, 0.12, 2.5, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>

            {/* Zone Name Text */}
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.5}
                color="#fef3c7" /* Warm text color */
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#451a03"
            >
                {zoneName}
            </Text>
        </group>
    );
};
