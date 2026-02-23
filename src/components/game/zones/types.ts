import React from 'react';

export interface ZoneTheme {
    id: string; // e.g., 'jungle', 'atacama'

    // Environment Colors
    skyColor: string;
    groundBaseColor: string;
    trackLightColor: string;
    trackDarkColor: string;
    pathColor: string;

    // Scenery Components
    Scenery: React.FC<{ segmentIndex: number; zOffset: number }>;
    ObstacleMesh: React.FC;
}
