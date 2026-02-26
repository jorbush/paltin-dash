import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';
export type Language = 'en' | 'es' | 'ca';

interface StoreState {
    gameState: GameState;
    points: number; // Global currency
    runScore: number; // Current run score
    highScores: number[]; // Top 5 highest scores
    segmentsPassed: number;
    runId: number;
    language: Language;
    volume: number;
    selectedCharacter: string;
    unlockedCharacters: string[];
    setGameState: (state: GameState) => void;
    addRunScore: (points: number) => void;
    commitRunScore: () => void;
    incrementSegments: () => void;
    resetRun: () => void;
    setLanguage: (lang: Language) => void;
    setVolume: (vol: number) => void;
    unlockCharacter: (id: string, cost: number) => void;
    selectCharacter: (id: string) => void;
}

const encrypt = (data: string): string => {
    return btoa(data);
};

const decrypt = (data: string): string => {
    try {
        return atob(data);
    } catch (e) {
        console.error("Failed to decode local storage data. Check for tampering. ", e);
        return data; // Fallback in case it's plain JSON (retro-compatibility) or corrupted
    }
};

const customStorage: StateStorage = {
    getItem: (name: string): string | null => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return decrypt(str);
    },
    setItem: (name: string, value: string): void => {
        localStorage.setItem(name, encrypt(value));
    },
    removeItem: (name: string): void => {
        localStorage.removeItem(name);
    }
};

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            gameState: 'menu',
            points: 0,
            runScore: 0,
            highScores: [],
            segmentsPassed: 0,
            runId: 0,
            language: 'en',
            volume: 0.5,
            selectedCharacter: 'paltin',
            unlockedCharacters: ['paltin'],
            setGameState: (state) => set({ gameState: state }),
            addRunScore: (score) => set((state) => ({ runScore: state.runScore + score })),
            commitRunScore: () => set((state) => {
                const newTotal = state.points + state.runScore;
                const newHighScores = [...state.highScores, state.runScore]
                    .sort((a, b) => b - a)
                    .slice(0, 5); // Keep top 5
                return { points: newTotal, highScores: newHighScores };
            }),
            incrementSegments: () => set((state) => ({ segmentsPassed: state.segmentsPassed + 1 })),
            resetRun: () => set((state) => ({ segmentsPassed: 0, runScore: 0, runId: state.runId + 1 })),
            setLanguage: (lang) => set({ language: lang }),
            setVolume: (vol) => set({ volume: vol }),
            unlockCharacter: (id, cost) => set((state) => ({
                points: state.points - cost,
                unlockedCharacters: [...state.unlockedCharacters, id]
            })),
            selectCharacter: (id) => set({ selectedCharacter: id }),
        }),
        {
            name: 'paltin-game-storage',
            storage: createJSONStorage(() => customStorage),
            partialize: (state) => ({
                points: state.points,
                highScores: state.highScores,
                language: state.language,
                volume: state.volume,
                selectedCharacter: state.selectedCharacter,
                unlockedCharacters: state.unlockedCharacters
            } as StoreState),
        }
    )
);
