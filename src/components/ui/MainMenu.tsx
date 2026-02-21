import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { SettingsModal } from './SettingsModal';
import { StoreModal } from './StoreModal';

export const MainMenu: React.FC = () => {
    const { language, setGameState } = useStore();
    const t = translations[language];

    const [showSettings, setShowSettings] = useState(false);
    const [showStore, setShowStore] = useState(false);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-200 z-50 p-6 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white text-center mb-12 drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>
                {t.title}
            </h1>

            {/* Avocado Character (Paltín placeholder visual) */}
            <div className="relative w-48 h-48 mb-16 animate-bounce cursor-pointer group">
                {/* Arms */}
                <div className="absolute top-20 -left-10 w-16 h-8 bg-orange-500 border-4 border-black rounded-full -rotate-[30deg] -z-10 origin-right transition-transform group-hover:-rotate-[50deg]"></div>
                <div className="absolute top-20 -right-10 w-16 h-8 bg-orange-500 border-4 border-black rounded-full rotate-[30deg] -z-10 origin-left transition-transform group-hover:rotate-[50deg]"></div>

                {/* Legs */}
                <div className="absolute -bottom-8 left-12 w-8 h-16 bg-orange-500 border-4 border-black rounded-full -z-10 origin-top"></div>
                <div className="absolute -bottom-8 right-12 w-8 h-16 bg-orange-500 border-4 border-black rounded-full -z-10 origin-top"></div>

                {/* Body (Dark Green Outer) */}
                <div className="w-full h-full bg-green-400 border-8 border-black rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[inset_-10px_-10px_0px_rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden transition-transform group-active:scale-95 z-20">

                    {/* Inner Body (Light Yellow) */}
                    <div className="absolute top-3 bottom-3 left-3 right-3 bg-[#fef08a] border-4 border-black rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.1)] flex items-center justify-center">
                        {/* Core */}
                        <div className="absolute bottom-[0.35rem] w-20 h-20 bg-orange-700 border-4 border-black rounded-full shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.3)]"></div>

                        {/* Eyes */}
                        <div className="absolute top-8 left-8 w-4 h-4 bg-[#451a03] rounded-full"></div>
                        <div className="absolute top-8 right-8 w-4 h-4 bg-[#451a03] rounded-full"></div>

                        {/* Blush */}
                        <div className="absolute top-11 left-4 w-4 h-4 bg-pink-400 rounded-full opacity-80"></div>
                        <div className="absolute top-11 right-4 w-4 h-4 bg-pink-400 rounded-full opacity-80"></div>

                        {/* Smile */}
                        <div className="absolute top-9 w-6 h-4 border-b-4 border-[#451a03] rounded-full"></div>
                    </div>
                </div>

                {/* Leaves */}
                <div className="absolute -top-6 left-[45%] -translate-x-1/2 w-8 h-12 bg-green-600 border-4 border-black rounded-[0%_100%_0%_100%] rotate-12 transform origin-bottom z-10"></div>
                <div className="absolute -top-6 left-[48%] -translate-x-1/2 w-6 h-10 bg-orange-500 border-4 border-black rounded-[0%_100%_0%_100%] rotate-[45deg] transform origin-bottom z-10"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
                <button
                    onClick={() => setGameState('playing')}
                    className="btn-cartoon py-4 text-2xl text-white bg-green-500 hover:bg-green-400"
                >
                    {t.play}
                </button>

                <div className="flex gap-4">
                    <button
                        onClick={() => setShowStore(true)}
                        className="btn-cartoon flex-1 py-3 text-lg text-black bg-blue-400 hover:bg-blue-300"
                    >
                        {t.store}
                    </button>

                    <button
                        onClick={() => setShowSettings(true)}
                        className="btn-cartoon flex-1 py-3 text-lg text-black bg-pink-400 hover:bg-pink-300"
                    >
                        {t.settings}
                    </button>
                </div>
            </div>

            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
            {showStore && <StoreModal onClose={() => setShowStore(false)} />}
        </div>
    );
};
