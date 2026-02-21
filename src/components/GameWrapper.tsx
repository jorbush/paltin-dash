import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { MainMenu } from './ui/MainMenu';
import { GameScene } from './game/GameScene';
import { initAudio } from '../utils/audio';

export const GameWrapper: React.FC = () => {
    const { gameState, setGameState, points, resetPoints, language } = useStore();
    const t = translations[language];

    const handleRetry = () => {
        resetPoints();
        setGameState('playing');
    };

    const handleMenu = () => {
        resetPoints();
        setGameState('menu');
    };

    return (
        <main
            className="w-full h-screen overflow-hidden relative select-none font-sans"
            onClick={initAudio}
        >
            {/* 3D Scene always renders in the background */}
            <div className="absolute inset-0 z-0">
                <GameScene />
            </div>

            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
                {gameState === 'menu' && (
                    <div className="pointer-events-auto w-full h-full">
                        <MainMenu />
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="absolute top-4 left-4 pointer-events-auto">
                        <div className="bg-yellow-400 border-4 border-black rounded-xl px-6 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-2 transform -rotate-2">
                            <span className="text-2xl font-black">{points}</span>
                            <span className="text-xl font-bold uppercase">{t.points}</span>
                        </div>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="pointer-events-auto bg-red-100 border-8 border-black p-6 sm:p-8 w-[90%] max-w-md rounded-3xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-6 animate-bounce" style={{ animationIterationCount: 1 }}>
                        <h2 className="text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-widest drop-shadow-[0_4px_0_rgba(0,0,0,1)] stroke-black text-center" style={{ WebkitTextStroke: '2px black' }}>
                            {t.gameOver}
                        </h2>
                        <div className="bg-yellow-400 border-4 border-black rounded-2xl px-8 py-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-center">
                            <span className="block text-2xl font-bold uppercase">{t.points}</span>
                            <span className="block text-5xl font-black">{points}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                            <button
                                onClick={handleRetry}
                                className="btn-cartoon flex-1 px-4 sm:px-8 py-4 text-xl sm:text-2xl text-white bg-green-500 hover:bg-green-400"
                            >
                                {t.retry}
                            </button>
                            <button
                                onClick={handleMenu}
                                className="btn-cartoon flex-1 px-4 sm:px-8 py-4 text-xl sm:text-2xl text-black bg-blue-400 hover:bg-blue-300"
                            >
                                {t.menu}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};
