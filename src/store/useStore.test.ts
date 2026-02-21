import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('useStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useStore.setState({
            gameState: 'menu',
            points: 0,
            language: 'en',
            volume: 0.5,
        });
    });

    it('should initialize with correct default state', () => {
        const state = useStore.getState();
        expect(state.gameState).toBe('menu');
        expect(state.points).toBe(0);
        expect(state.language).toBe('en');
        expect(state.volume).toBe(0.5);
    });

    it('should update game state', () => {
        useStore.getState().setGameState('playing');
        expect(useStore.getState().gameState).toBe('playing');
    });

    it('should add points', () => {
        useStore.getState().addPoints(10);
        expect(useStore.getState().points).toBe(10);
        useStore.getState().addPoints(5);
        expect(useStore.getState().points).toBe(15);
    });

    it('should reset points', () => {
        useStore.getState().addPoints(10);
        useStore.getState().resetPoints();
        expect(useStore.getState().points).toBe(0);
    });

    it('should update language', () => {
        useStore.getState().setLanguage('es');
        expect(useStore.getState().language).toBe('es');
    });

    it('should update volume', () => {
        useStore.getState().setVolume(0.8);
        expect(useStore.getState().volume).toBe(0.8);
    });
});
