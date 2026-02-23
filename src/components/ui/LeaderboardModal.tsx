import React from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { X } from 'lucide-react';

interface Props {
    onClose: () => void;
}

export const LeaderboardModal: React.FC<Props> = ({ onClose }) => {
    const { language, highScores } = useStore();
    const t = translations[language];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-orange-100 border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 border-4 border-black rounded-full flex items-center justify-center text-white hover:bg-red-400 hover:scale-110 active:scale-95 transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] z-10"
                >
                    <X size={24} strokeWidth={4} />
                </button>

                <h2 className="text-3xl font-black text-center mb-6 text-orange-600 uppercase tracking-wider drop-shadow-[0_2px_0_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '1px black' }}>
                    {t.leaderboard}
                </h2>

                <div className="bg-orange-200 border-4 border-black rounded-xl p-4 flex flex-col gap-3">
                    {highScores.length === 0 ? (
                        <p className="text-center font-bold text-black/60 py-4">{t.noScores}</p>
                    ) : (
                        highScores.map((score, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-white border-2 border-black rounded-lg p-3 shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                            >
                                <span className="text-2xl font-black text-orange-500">#{index + 1}</span>
                                <span className="text-3xl font-black">{score}</span>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};
