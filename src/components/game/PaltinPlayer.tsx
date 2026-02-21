import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import { playJumpSound } from '../../utils/audio';
import * as THREE from 'three';

const LANE_WIDTH = 2;
// const SPEED = 15;
const JUMP_POWER = 12;
const GRAVITY = -30;

interface PaltinPlayerProps {
    playerRef: React.RefObject<THREE.Group | null>;
}

export const PaltinPlayer: React.FC<PaltinPlayerProps> = ({ playerRef }) => {
    const { gameState } = useStore();
    const groupRef = playerRef;

    // 0 = middle, -1 = left, 1 = right
    const [targetLane, setTargetLane] = useState(0);

    // Physics state
    const velocity = useRef(new THREE.Vector3());
    const isGrounded = useRef(true);

    // Handle Input
    useEffect(() => {
        // Keyboard controls
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== 'playing') return;

            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                setTargetLane((prev) => Math.max(-1, prev - 1));
            } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                setTargetLane((prev) => Math.min(1, prev + 1));
            } else if ((e.code === 'ArrowUp' || e.code === 'Space' || e.code === 'KeyW') && isGrounded.current) {
                velocity.current.y = JUMP_POWER;
                isGrounded.current = false;
                playJumpSound(useStore.getState().volume);
            }
        };

        // Touch controls
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (gameState !== 'playing') return;

            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            // Requires at least 30px swipe to register
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal
                if (Math.abs(dx) > 30) {
                    if (dx > 0) { // Right
                        setTargetLane((prev) => Math.min(1, prev + 1));
                    } else { // Left
                        setTargetLane((prev) => Math.max(-1, prev - 1));
                    }
                }
            } else {
                // Vertical
                if (dy < -30 && isGrounded.current) { // Up (negative Y)
                    velocity.current.y = JUMP_POWER;
                    isGrounded.current = false;
                    playJumpSound(useStore.getState().volume);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [gameState]);

    useFrame((state, delta) => {
        if (gameState !== 'playing' || !groupRef.current) return;

        // Lane movement (X axis) using Lerp for smooth switching
        const targetX = targetLane * LANE_WIDTH;
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 10 * delta);

        // Jump / Gravity Physics (Y axis)
        if (!isGrounded.current) {
            velocity.current.y += GRAVITY * delta;
            groupRef.current.position.y += velocity.current.y * delta;

            // Floor collision
            if (groupRef.current.position.y <= 0.5) { // 0.5 is the base resting Y
                groupRef.current.position.y = 0.5;
                velocity.current.y = 0;
                isGrounded.current = true;
            }
        } else {
            // Gentle bounce when running
            groupRef.current.position.y = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.15;
        }

        // Gentle tilt based on movement direction
        const tiltX = (groupRef.current.position.x - targetX) * 0.2;
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltX, 10 * delta);
    });

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {/* Platform Shadow */}
            {/* Paltin Body (Avocado placeholder) */}
            <mesh castShadow receiveShadow>
                <capsuleGeometry args={[0.5, 0.5, 4, 16]} />
                <meshStandardMaterial color="#4ade80" roughness={0.6} />
            </mesh>

            {/* Core / Seed */}
            <mesh position={[0, 0, 0.5]} castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#9a3412" roughness={0.8} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.2, 0.3, 0.45]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>
            <mesh position={[0.2, 0.3, 0.45]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Leaf */}
            <mesh position={[0, 0.9, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <coneGeometry args={[0.15, 0.4, 8]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
        </group>
    );
};
