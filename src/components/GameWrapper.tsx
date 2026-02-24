import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { MainMenu } from './ui/MainMenu';
import { PauseMenu } from './ui/PauseMenu';
import { GameScene } from './game/GameScene';
import { initAudio } from '../utils/audio';
import { Pause } from 'lucide-react';

export const GameWrapper: React.FC = () => {
    const { gameState, setGameState, points, runScore, language, resetRun, volume } = useStore();
    const t = translations[language];
    const bgMusicRef = React.useRef<HTMLAudioElement>(null);

    const handleRetry = () => {
        resetRun();
        setGameState('playing');
    };

    const handleMenu = () => {
        setGameState('menu');
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                const state = useStore.getState().gameState;
                if (state === 'playing') {
                    setGameState('paused');
                } else if (state === 'paused') {
                    setGameState('playing');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setGameState]);

    React.useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = volume;
            if (gameState === 'playing') {
                bgMusicRef.current.play().catch(e => console.warn('Audio play failed', e));
            } else {
                bgMusicRef.current.pause();
            }
        }
    }, [gameState, volume]);

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

                {gameState === 'paused' && (
                    <div className="pointer-events-auto w-full h-full z-50">
                        <PauseMenu />
                    </div>
                )}

                {gameState === 'playing' && (
                    <>
                        <div className="absolute top-4 left-4 pointer-events-auto">
                            <div className="bg-yellow-400 border-4 border-black rounded-xl px-6 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center gap-2 transform -rotate-2">
                                <span className="text-2xl font-black">{runScore}</span>
                                <span className="text-xl font-bold uppercase">{t.points}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setGameState('paused')}
                            className="absolute top-4 right-4 pointer-events-auto bg-black border-4 border-black rounded-full p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all z-20 group"
                        >
                            <Pause size={24} className="text-white fill-current group-hover:text-yellow-400" />
                        </button>
                    </>
                )}

                {gameState === 'gameover' && (
                    <div className="pointer-events-auto bg-red-100 border-8 border-black p-6 sm:p-8 w-[90%] max-w-md rounded-3xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_0_rgba(0,0,0,1)] flex flex-col items-center gap-6 animate-bounce" style={{ animationIterationCount: 1 }}>
                        <h2 className="text-4xl sm:text-5xl font-black text-red-600 uppercase tracking-widest drop-shadow-[0_4px_0_rgba(0,0,0,1)] stroke-black text-center" style={{ WebkitTextStroke: '2px black' }}>
                            {t.gameOver}
                        </h2>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="bg-white border-4 border-black rounded-2xl px-6 py-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col items-center">
                                <span className="block text-xl font-bold uppercase text-gray-500">{t.points}</span>
                                <span className="block text-6xl font-black text-orange-500">{runScore}</span>
                            </div>

                            <div className="bg-yellow-400 border-4 border-black rounded-2xl px-6 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex justify-between items-center">
                                <span className="text-lg font-bold uppercase">{t.totalPoints}</span>
                                <span className="text-2xl font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '1px black' }}>{points}</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full items-stretch">
                            <button
                                onClick={handleRetry}
                                className="btn-cartoon flex-1 px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-white bg-green-500 hover:bg-green-400 h-full flex flex-col justify-center items-center text-center leading-tight min-h-[4rem]"
                            >
                                <span>{t.retry}</span>
                            </button>
                            <button
                                onClick={handleMenu}
                                className="btn-cartoon flex-1 px-2 sm:px-4 py-3 sm:py-4 text-lg sm:text-xl text-black bg-blue-400 hover:bg-blue-300 h-full flex flex-col justify-center items-center text-center leading-tight min-h-[4rem]"
                            >
                                <span>{t.menu}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <audio ref={bgMusicRef} src="/soundtrack.mp3" loop preload="auto" />
        </main>
    );
};
