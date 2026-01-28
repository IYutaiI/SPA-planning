import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Player, Event, Availability, Strategy, Scrim } from '../types';
import * as initialData from './data';

interface AppState {
  players: Player[];
  events: Event[];
  availabilities: Availability[];
  strategies: Strategy[];
  scrims: Scrim[];
  currentWeekStart: Date;
}

interface AppContextType extends AppState {
  setPlayers: (players: Player[]) => void;
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  updateAvailability: (availability: Availability) => void;
  addStrategy: (strategy: Strategy) => void;
  removeStrategy: (id: string) => void;
  setCurrentWeekStart: (date: Date) => void;
  navigateWeek: (direction: 'prev' | 'next') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(initialData.players);
  const [events, setEvents] = useState<Event[]>(initialData.events);
  const [availabilities, setAvailabilities] = useState<Availability[]>(initialData.availabilities);
  const [strategies, setStrategies] = useState<Strategy[]>(initialData.strategies);
  const [scrims] = useState<Scrim[]>(initialData.scrims);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getWeekStart(new Date(2025, 0, 19)));

  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateAvailability = (availability: Availability) => {
    setAvailabilities(prev => {
      const index = prev.findIndex(
        a => a.playerId === availability.playerId && a.day === availability.day && a.hour === availability.hour
      );
      if (index >= 0) {
        const newAvailabilities = [...prev];
        newAvailabilities[index] = availability;
        return newAvailabilities;
      }
      return [...prev, availability];
    });
  };

  const addStrategy = (strategy: Strategy) => {
    setStrategies(prev => [...prev, strategy]);
  };

  const removeStrategy = (id: string) => {
    setStrategies(prev => prev.filter(s => s.id !== id));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  return (
    <AppContext.Provider
      value={{
        players,
        events,
        availabilities,
        strategies,
        scrims,
        currentWeekStart,
        setPlayers,
        addEvent,
        removeEvent,
        updateAvailability,
        addStrategy,
        removeStrategy,
        setCurrentWeekStart,
        navigateWeek,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
