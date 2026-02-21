import React from 'react';
import { useStore, type Language } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { X } from 'lucide-react';

interface Props {
    onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ onClose }) => {
    const { language, setLanguage, volume, setVolume } = useStore();
    const t = translations[language];

    const langs: { code: Language; label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'ca', label: 'Català' },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-purple-100 border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 border-4 border-black rounded-full flex items-center justify-center text-white hover:bg-red-400 active:translate-y-1 shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none transition-all"
                >
                    <X size={20} strokeWidth={4} />
                </button>

                <h2 className="text-3xl font-black text-center uppercase mb-6 drop-shadow-[0_2px_0_rgba(0,0,0,1)] text-white" style={{ WebkitTextStroke: '1px black' }}>
                    {t.settings}
                </h2>

                <div className="space-y-6">
                    {/* Language Selector */}
                    <div>
                        <label className="block text-xl font-bold mb-2 uppercase text-purple-900">{t.language}</label>
                        <div className="flex flex-col gap-2">
                            {langs.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLanguage(l.code)}
                                    className={`py-2 px-4 border-4 border-black rounded-xl font-bold uppercase transition-all ${language === l.code
                                            ? 'bg-yellow-400 translate-y-1 shadow-none'
                                            : 'bg-white hover:bg-yellow-100 shadow-[0_4px_0_0_rgba(0,0,0,1)]'
                                        }`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Volume Slider */}
                    <div>
                        <label className="block text-xl font-bold mb-2 uppercase text-purple-900">{t.volume} ({Math.round(volume * 100)}%)</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-4 bg-white border-4 border-black rounded-full appearance-none outline-none accent-purple-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
