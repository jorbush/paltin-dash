import type { ZoneTheme } from './types';
import { jungleTheme } from './JungleZone';
import { atacamaTheme } from './AtacamaZone';

// Central registry of all available Latin American zones
export const LATIN_AMERICA_ZONES: ZoneTheme[] = [
    jungleTheme,
    atacamaTheme
];

export const SEGMENTS_PER_ZONE = 20;

export function getZoneForSegment(segmentPassedCount: number): ZoneTheme {
    const zoneIndex = Math.floor(segmentPassedCount / SEGMENTS_PER_ZONE) % LATIN_AMERICA_ZONES.length;
    return LATIN_AMERICA_ZONES[zoneIndex];
}
