import React from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { X, Lock } from 'lucide-react';

interface Props {
    onClose: () => void;
}

export const StoreModal: React.FC<Props> = ({ onClose }) => {
    const { language, points } = useStore();
    const t = translations[language];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-blue-100 border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 border-4 border-black rounded-full flex items-center justify-center text-white hover:bg-red-400 active:translate-y-1 shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none transition-all"
                >
                    <X size={20} strokeWidth={4} />
                </button>

                <h2 className="text-3xl font-black text-center uppercase mb-2 drop-shadow-[0_2px_0_rgba(0,0,0,1)] text-white" style={{ WebkitTextStroke: '1px black' }}>
                    {t.store}
                </h2>

                <div className="flex justify-center mb-6">
                    <div className="bg-yellow-400 border-4 border-black rounded-xl px-4 py-2 font-black text-xl shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                        ⭐ {points} {t.points}
                    </div>
                </div>

                <div className="bg-blue-200 border-4 border-black border-dashed rounded-xl p-6 text-center text-blue-900 font-bold mb-4 relative overflow-hidden group">
                    <div className="p-4 bg-white/50 rounded-lg mb-4">
                        <Lock size={48} className="mx-auto text-blue-500 mb-2 opacity-80 group-hover:animate-bounce" />
                        <p className="text-lg">{t.storeDisabled}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
