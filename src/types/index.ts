export type Role = 'TOP' | 'JNG' | 'MID' | 'ADC' | 'SUP';

export interface Player {
  id: string;
  name: string;
  tag: string;
  role: Role;
  avatar?: string;
}

export interface Availability {
  playerId: string;
  day: string;
  hour: number;
  status: 'available' | 'maybe' | 'unavailable';
}

export interface Event {
  id: string;
  title: string;
  type: 'vod_review' | 'scrim' | 'training' | 'meeting';
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
}

export interface Champion {
  id: string;
  name: string;
  image: string;
}

export interface Strategy {
  id: string;
  name: string;
  updatedAt: string;
  champions: {
    top: Champion[];
    jungle: Champion[];
    mid: Champion[];
    adc: Champion[];
    support: Champion[];
  };
  priorityBans: Champion[];
}

export interface Scrim {
  id: string;
  opponent: string;
  date: string;
  time: string;
  result?: 'win' | 'loss' | 'pending';
  score?: string;
}
