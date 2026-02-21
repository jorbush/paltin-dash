import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MainMenu } from './MainMenu';
import { useStore } from '../../store/useStore';

describe('MainMenu Component', () => {
    beforeEach(() => {
        useStore.setState({
            gameState: 'menu',
            language: 'en',
        });
    });

    it('renders correctly', () => {
        render(<MainMenu />);
        expect(screen.getByText('Paltín Dash')).toBeInTheDocument();
        expect(screen.getByText('Play')).toBeInTheDocument();
        expect(screen.getByText('Store')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('changes game state to playing on click', () => {
        render(<MainMenu />);
        const playBtn = screen.getByText('Play');
        fireEvent.click(playBtn);
        expect(useStore.getState().gameState).toBe('playing');
    });

    it('translates title properly', () => {
        useStore.setState({ language: 'es' });
        render(<MainMenu />);
        expect(screen.getByText('Paltín Dash')).toBeInTheDocument();
        expect(screen.getByText('Jugar')).toBeInTheDocument();
    });
});
