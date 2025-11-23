export interface SensorReading {
    timestamp: string;
    temperature: number;
    humidity: number;
    light: number;
    plantHeight?: number; // Optional for correlation
}

export interface Hypothesis {
    id: number;
    studentName: string;
    statement: string;
    status: 'pending' | 'verified' | 'refuted';
    notes: string;
}

export interface ProjectPhase {
    date: string;
    title: string;
    description: string;
    completed: boolean;
}