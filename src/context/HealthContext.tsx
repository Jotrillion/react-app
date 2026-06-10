import React, { createContext, useContext, useState } from 'react';

export interface Workout {
  id: string;
  name: string;
  duration: number; // in minutes
  calories: number;
  date: string;
}

export interface DietEntry {
  id: string;
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface HealthStats {
  weight: number; // in kg
  steps: number;
  water: number; // in liters
  sleep: number; // in hours
  date: string;
}

interface HealthContextType {
  workouts: Workout[];
  dietEntries: DietEntry[];
  healthStats: HealthStats[];
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  addDietEntry: (entry: Omit<DietEntry, 'id'>) => void;
  addHealthStats: (stats: Omit<HealthStats, 'date'>) => void;
  deleteWorkout: (id: string) => void;
  deleteDietEntry: (id: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [dietEntries, setDietEntries] = useState<DietEntry[]>([]);
  const [healthStats, setHealthStats] = useState<HealthStats[]>([]);

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    setWorkouts([...workouts, { ...workout, id: Date.now().toString() }]);
  };

  const addDietEntry = (entry: Omit<DietEntry, 'id'>) => {
    setDietEntries([...dietEntries, { ...entry, id: Date.now().toString() }]);
  };

  const addHealthStats = (stats: Omit<HealthStats, 'date'>) => {
    setHealthStats([...healthStats, { ...stats, date: new Date().toISOString() }]);
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const deleteDietEntry = (id: string) => {
    setDietEntries(dietEntries.filter(e => e.id !== id));
  };

  return (
    <HealthContext.Provider
      value={{
        workouts,
        dietEntries,
        healthStats,
        addWorkout,
        addDietEntry,
        addHealthStats,
        deleteWorkout,
        deleteDietEntry,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
