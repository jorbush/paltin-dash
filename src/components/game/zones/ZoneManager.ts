import type { ZoneTheme } from './types';
import { jungleTheme } from './JungleZone';
import { atacamaTheme } from './AtacamaZone';
import { patagoniaTheme } from './PatagoniaZone';
import { japanTheme } from './JapanZone';

export const ALL_ZONES: ZoneTheme[] = [
    jungleTheme,
    atacamaTheme,
    patagoniaTheme,
    japanTheme
];

export const SEGMENTS_PER_ZONE = 20;

export function getZoneForSegment(segmentPassedCount: number): ZoneTheme {
    const zoneIndex = Math.floor(segmentPassedCount / SEGMENTS_PER_ZONE) % ALL_ZONES.length;
    return ALL_ZONES[zoneIndex];
}
