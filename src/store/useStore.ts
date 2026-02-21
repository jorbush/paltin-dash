import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameState = 'menu' | 'playing' | 'gameover';
export type Language = 'en' | 'es' | 'ca';

interface StoreState {
    gameState: GameState;
    points: number;
    language: Language;
    volume: number;
    setGameState: (state: GameState) => void;
    addPoints: (points: number) => void;
    resetPoints: () => void;
    setLanguage: (lang: Language) => void;
    setVolume: (vol: number) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            gameState: 'menu',
            points: 0,
            language: 'en',
            volume: 0.5,
            setGameState: (state) => set({ gameState: state }),
            addPoints: (points) => set((state) => ({ points: state.points + points })),
            resetPoints: () => set({ points: 0 }),
            setLanguage: (lang) => set({ language: lang }),
            setVolume: (vol) => set({ volume: vol }),
        }),
        {
            name: 'paltin-game-storage',
            partialize: (state) => ({ points: state.points, language: state.language, volume: state.volume }),
        }
    )
);
