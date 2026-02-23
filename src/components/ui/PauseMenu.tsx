import React from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';

export const PauseMenu: React.FC = () => {
    const { language, setGameState, commitRunScore, runScore } = useStore();
    const t = translations[language];

    const handleResume = () => {
        setGameState('playing');
    };

    const handleQuit = () => {
        commitRunScore();
        setGameState('menu');
    };

    return (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-orange-200 border-8 border-black rounded-3xl p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)] max-w-sm w-full text-center flex flex-col gap-6">

                <h2 className="text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_4px_0_rgba(0,0,0,1)] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                    {t.pause}
                </h2>

                <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="block text-xl font-bold uppercase text-gray-500 mb-1">{t.points}</span>
                    <span className="block text-5xl font-black text-orange-500">{runScore}</span>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                    <button
                        onClick={handleResume}
                        className="btn-cartoon w-full py-4 text-2xl text-white bg-green-500 hover:bg-green-400"
                    >
                        {t.resume}
                    </button>

                    <button
                        onClick={handleQuit}
                        className="btn-cartoon w-full py-4 text-xl text-black bg-red-400 hover:bg-red-300"
                    >
                        {t.quit}
                    </button>
                </div>
            </div>
        </div>
    );
};
