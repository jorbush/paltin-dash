import { describe, it, expect } from 'vitest';
import { translations } from './translations';

describe('translations', () => {
    it('should have the necessary languages', () => {
        expect(translations).toHaveProperty('en');
        expect(translations).toHaveProperty('es');
        expect(translations).toHaveProperty('ca');
    });

    it('should have the correct keys in English', () => {
        expect(translations.en.title).toBe('Paltín Dash');
        expect(translations.en.play).toBe('Play');
    });

    it('should have the correct keys in Spanish', () => {
        expect(translations.es.title).toBe('Paltín Dash');
        expect(translations.es.play).toBe('Jugar');
    });

    it('should have the correct keys in Catalan', () => {
        expect(translations.ca.title).toBe('Paltín Dash');
        expect(translations.ca.play).toBe('Jugar');
    });
});
