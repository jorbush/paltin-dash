import React, { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { X, Lock, Check } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import { PaltinMesh } from '../game/characters/PaltinMesh';
import { CalabacinMesh } from '../game/characters/CalabacinMesh';
import { PattyJoeMesh } from '../game/characters/PattyJoeMesh';

interface Props {
    onClose: () => void;
}

const characters = [
    { id: 'paltin', nameKey: 'char_paltin', price: 0 },
    { id: 'calabacin', nameKey: 'char_calabacin', price: 50 },
    { id: 'patty', nameKey: 'char_patty', price: 100 },
];

const CharacterPreview = ({ charId }: { charId: string }) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0.2, 0]}>
            {charId === 'patty' && <PattyJoeMesh />}
            {charId === 'calabacin' && <CalabacinMesh />}
            {charId === 'paltin' && <PaltinMesh />}
        </group>
    );
};

export const StoreModal: React.FC<Props> = ({ onClose }) => {
    const {
        language,
        points,
        unlockedCharacters,
        selectedCharacter,
        unlockCharacter,
        selectCharacter
    } = useStore();

    // @ts-ignore - dynamic key access
    const t = translations[language];

    const [viewedCharacter, setViewedCharacter] = useState<string>(selectedCharacter);

    const currentChar = characters.find(c => c.id === viewedCharacter) || characters[0];
    const isUnlocked = unlockedCharacters.includes(viewedCharacter);
    const isSelected = selectedCharacter === viewedCharacter;
    const canAfford = points >= currentChar.price;

    const handleAction = () => {
        if (isSelected) return;

        if (isUnlocked) {
            selectCharacter(viewedCharacter);
        } else if (canAfford) {
            unlockCharacter(viewedCharacter, currentChar.price);
            selectCharacter(viewedCharacter);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-blue-100 border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 border-4 border-black rounded-full flex items-center justify-center text-white hover:bg-red-400 active:translate-y-1 shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none transition-all z-20"
                >
                    <X size={20} strokeWidth={4} />
                </button>

                <h2 className="text-3xl font-black text-center uppercase mb-2 drop-shadow-[0_2px_0_rgba(0,0,0,1)] text-white" style={{ WebkitTextStroke: '1px black' }}>
                    {t.store}
                </h2>

                <div className="flex justify-center mb-4">
                    <div className="bg-yellow-400 border-4 border-black rounded-xl px-4 py-2 font-black text-xl shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center gap-2">
                        ⭐ <span>{points} {t.totalPoints}</span>
                    </div>
                </div>

                {/* Character preview */}
                <div className="bg-blue-200 border-4 border-black border-dashed rounded-xl h-48 mb-4 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-2 left-2 z-10 bg-white/80 px-2 py-1 rounded-md border-2 border-black font-bold text-sm">
                        {/* @ts-ignore */}
                        {t[currentChar.nameKey]}
                    </div>
                    {!isUnlocked && (
                        <div className="absolute top-2 right-2 z-10 bg-red-100 p-1.5 rounded-full border-2 border-black text-red-500">
                            <Lock size={16} strokeWidth={3} />
                        </div>
                    )}
                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={50} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 10, 5]} intensity={1.5} />
                        <ContactShadows position={[0, -0.2, 0]} opacity={0.4} scale={5} blur={2} far={4} />
                        <CharacterPreview charId={viewedCharacter} />
                    </Canvas>
                </div>

                {/* Character Selector */}
                <div className="flex gap-2 justify-center mb-6">
                    {characters.map(char => (
                        <button
                            key={char.id}
                            onClick={() => setViewedCharacter(char.id)}
                            className={`w-12 h-12 rounded-xl border-4 flex items-center justify-center transition-all ${viewedCharacter === char.id
                                ? 'border-black bg-yellow-400 scale-110 shadow-[2px_2px_0_rgba(0,0,0,1)]'
                                : 'border-blue-900/50 bg-blue-300 opacity-70 hover:opacity-100'
                                }`}
                        >
                            {!unlockedCharacters.includes(char.id) && (
                                <Lock size={16} strokeWidth={3} className="text-black/50 absolute" />
                            )}
                            {selectedCharacter === char.id && (
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-0.5 border-2 border-black text-white">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleAction}
                    disabled={!isUnlocked && !canAfford}
                    className={`btn-cartoon w-full py-4 text-xl flex items-center justify-center gap-2 ${isSelected
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : isUnlocked
                            ? 'bg-green-500 text-white hover:bg-green-400'
                            : canAfford
                                ? 'bg-blue-500 text-white hover:bg-blue-400'
                                : 'bg-red-400 text-white cursor-not-allowed opacity-80'
                        }`}
                >
                    {isSelected && (
                        <>
                            <Check size={24} strokeWidth={3} /> {t.equipped}
                        </>
                    )}
                    {!isSelected && isUnlocked && t.equip}
                    {!isUnlocked && (
                        <>
                            {t.buy} ⭐ {currentChar.price}
                        </>
                    )}
                </button>

                {!isUnlocked && !canAfford && (
                    <div className="text-center text-red-600 font-bold mt-2 text-sm">
                        {t.notEnoughPoints}
                    </div>
                )}
            </div>
        </div>
    );
};
