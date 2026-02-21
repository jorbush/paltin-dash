import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { PaltinPlayer } from './PaltinPlayer';
import { WorldLoader } from './WorldLoader';
import { Obstacles } from './Obstacles';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const GameScene: React.FC = () => {
    const gameState = useStore((state) => state.gameState);
    const playerGroupRef = useRef<THREE.Group>(null);

    // In order to link Player and Obstacles without massive boilerplate,
    // we hoist the Player's ref creation to their common parent (GameScene).

    return (
        <div className={`w-full h-full ${gameState !== 'playing' ? 'filter blur-sm brightness-75 transition-all duration-500' : ''}`}>
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera
                    makeDefault
                    position={[0, 8, 12]}
                    fov={50}
                    onUpdate={(c) => c.lookAt(0, -1, -5)}
                />
                <color attach="background" args={['#a3e635']} /> {/* Light lime green sky for jungle vibe */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[10, 20, 10]}
                    intensity={1.5}
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <Sky sunPosition={[100, 10, 100]} turbidity={0.3} rayleigh={0.8} />

                {/* Ground Shadows to prevent "floating" illusions */}
                <ContactShadows position={[0, 0.05, 0]} opacity={0.6} scale={40} blur={2} far={10} color="#000000" />

                {/* Game Entities */}
                <PaltinPlayer playerRef={playerGroupRef} />
                <WorldLoader />
                <Obstacles playerGroupRef={playerGroupRef} />
            </Canvas>
        </div>
    );
};
