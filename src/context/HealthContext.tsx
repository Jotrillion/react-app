import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models/User';
import { Workout } from '../models/Workout';
import { DietEntry } from '../models/DietEntry';
import { HealthStats } from '../models/HealthStats';
import { UserService } from '../services/UserService';
import { FitnessService } from '../services/FitnessService';
import { StatsService } from '../services/StatsService';

interface HealthContextType {
  // Users
  currentUser: User | undefined;
  users: User[];
  addUser: (user: User) => void;
  setCurrentUser: (userId: string) => void;
  updateUserGoal: (userId: string, goalWeight: number, fitnessGoal: string) => void;

  // Workouts
  workouts: Workout[];
  addWorkout: (userId: string, name: string, category: string, duration: number, calories: number, intensity: string, notes?: string) => void;
  deleteWorkout: (workoutId: string) => void;
  getWorkoutsByDate: (date: string) => Workout[];
  getTotalCaloriesBurned: (startDate?: string, endDate?: string) => number;

  // Diet
  dietEntries: DietEntry[];
  addDietEntry: (userId: string, meal: string, mealType: string, calories: number, protein: number, carbs: number, fat: number, fiber?: number, notes?: string) => void;
  deleteDietEntry: (entryId: string) => void;
  getDietEntriesByDate: (date: string) => DietEntry[];
  getTotalCaloriesConsumed: (startDate?: string, endDate?: string) => number;
  getTotalMacros: (date: string) => { protein: number; carbs: number; fat: number };
  getCalorieBalance: (date: string) => number;

  // Health Stats
  healthStats: HealthStats[];
  addHealthStats: (userId: string, weight: number, steps: number, water: number, sleep: number, restingHeartRate?: number, energyLevel?: string, notes?: string) => void;
  deleteHealthStats: (statId: string) => void;
  getStatsByDate: (date: string) => HealthStats | undefined;
  getAverageWeight: (days?: number) => number;
  getAverageSleep: (days?: number) => number;
  getAverageSteps: (days?: number) => number;
  getWeightProgress: () => { current: number; change: number; goal: number };
  getGoalsMetPercentage: (days?: number) => number;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

// Initialize services
const userService = new UserService();
const fitnessService = new FitnessService();
const statsService = new StatsService();

// Seed demo data
const initializeDemoData = () => {
  const demoUser = new User('Alex', 'alex@health.com', 28, 175, 75, 'weight-loss');
  userService.addUser(demoUser);
  userService.setCurrentUser(demoUser.id);

  // Add sample workouts
  fitnessService.addWorkout(new Workout(demoUser.id, 'Morning Run', 'cardio', 30, 350, 'high', 'Great pace', '2024-01-10'));
  fitnessService.addWorkout(new Workout(demoUser.id, 'Gym Strength', 'strength', 45, 280, 'medium', 'Focused on legs', '2024-01-09'));

  // Add sample diet entries
  fitnessService.addDietEntry(new DietEntry(demoUser.id, 'Oatmeal with berries', 'breakfast', 350, 12, 55, 8, 7, 'Healthy start', '2024-01-10'));
  fitnessService.addDietEntry(new DietEntry(demoUser.id, 'Grilled chicken salad', 'lunch', 420, 45, 35, 12, 8, 'Protein rich', '2024-01-10'));

  // Add sample health stats
  statsService.addStats(new HealthStats(demoUser.id, 78, 8500, 8, 7.5, 62, 'high', 'Feeling energetic', '2024-01-10'));
  statsService.addStats(new HealthStats(demoUser.id, 79, 7200, 7.5, 6.5, 65, 'medium', 'Decent day', '2024-01-09'));
};

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [dietEntries, setDietEntries] = useState<DietEntry[]>([]);
  const [healthStats, setHealthStats] = useState<HealthStats[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Initialize demo data on mount
    initializeDemoData();
    refreshData();
  }, []);

  const refreshData = () => {
    setUsers(userService.getAllUsers());
    const current = userService.getCurrentUser();
    setCurrentUserState(current);
    
    if (current) {
      setWorkouts(fitnessService.getUserWorkouts(current.id));
      setDietEntries(fitnessService.getUserDietEntries(current.id));
      setHealthStats(statsService.getUserStats(current.id));
    } else {
      setWorkouts([]);
      setDietEntries([]);
      setHealthStats([]);
    }
  };

  const addUser = (user: User) => {
    userService.addUser(user);
    refreshData();
  };

  const setCurrentUser = (userId: string) => {
    userService.setCurrentUser(userId);
    refreshData();
  };

  const updateUserGoal = (userId: string, goalWeight: number, fitnessGoal: string) => {
    const user = userService.getUser(userId);
    if (user) {
      user.updateGoalWeight(goalWeight);
      user.updateFitnessGoal(fitnessGoal as any);
      refreshData();
    }
  };

  const addWorkout = (userId: string, name: string, category: string, duration: number, calories: number, intensity: string, notes?: string) => {
    const workout = new Workout(userId, name, category as any, duration, calories, intensity as any, notes);
    fitnessService.addWorkout(workout);
    refreshData();
  };

  const deleteWorkout = (workoutId: string) => {
    fitnessService.deleteWorkout(workoutId);
    refreshData();
  };

  const getWorkoutsByDate = (date: string) => {
    if (!currentUser) return [];
    return fitnessService.getWorkoutsByDate(currentUser.id, date);
  };

  const getTotalCaloriesBurned = (startDate?: string, endDate?: string) => {
    if (!currentUser) return 0;
    return fitnessService.getTotalCaloriesBurned(currentUser.id, startDate, endDate);
  };

  const addDietEntry = (userId: string, meal: string, mealType: string, calories: number, protein: number, carbs: number, fat: number, fiber?: number, notes?: string) => {
    const entry = new DietEntry(userId, meal, mealType as any, calories, protein, carbs, fat, fiber, notes);
    fitnessService.addDietEntry(entry);
    refreshData();
  };

  const deleteDietEntry = (entryId: string) => {
    fitnessService.deleteDietEntry(entryId);
    refreshData();
  };

  const getDietEntriesByDate = (date: string) => {
    if (!currentUser) return [];
    return fitnessService.getDietEntriesByDate(currentUser.id, date);
  };

  const getTotalCaloriesConsumed = (startDate?: string, endDate?: string) => {
    if (!currentUser) return 0;
    return fitnessService.getTotalCaloriesConsumed(currentUser.id, startDate, endDate);
  };

  const getTotalMacros = (date: string) => {
    if (!currentUser) return { protein: 0, carbs: 0, fat: 0 };
    return fitnessService.getTotalMacros(currentUser.id, date);
  };

  const getCalorieBalance = (date: string) => {
    if (!currentUser) return 0;
    return fitnessService.getCalorieBalance(currentUser.id, date);
  };

  const addHealthStats = (userId: string, weight: number, steps: number, water: number, sleep: number, restingHeartRate?: number, energyLevel?: string, notes?: string) => {
    const stat = new HealthStats(userId, weight, steps, water, sleep, restingHeartRate, energyLevel as any, notes);
    statsService.addStats(stat);
    refreshData();
  };

  const deleteHealthStats = (statId: string) => {
    statsService.deleteStats(statId);
    refreshData();
  };

  const getStatsByDate = (date: string) => {
    if (!currentUser) return undefined;
    return statsService.getStatsByDate(currentUser.id, date);
  };

  const getAverageWeight = (days: number = 30) => {
    if (!currentUser) return 0;
    return statsService.getAverageWeight(currentUser.id, days);
  };

  const getAverageSleep = (days: number = 30) => {
    if (!currentUser) return 0;
    return statsService.getAverageSleep(currentUser.id, days);
  };

  const getAverageSteps = (days: number = 30) => {
    if (!currentUser) return 0;
    return statsService.getAverageSteps(currentUser.id, days);
  };

  const getWeightProgress = () => {
    if (!currentUser) return { current: 0, change: 0, goal: 0 };
    const progress = statsService.getWeightProgress(currentUser.id);
    return { ...progress, goal: currentUser.goalWeight };
  };

  const getGoalsMetPercentage = (days: number = 7) => {
    if (!currentUser) return 0;
    return statsService.getGoalsMetPercentage(currentUser.id, days);
  };

  return (
    <HealthContext.Provider
      value={{
        // Users
        currentUser,
        users,
        addUser,
        setCurrentUser,
        updateUserGoal,
        // Workouts
        workouts,
        addWorkout,
        deleteWorkout,
        getWorkoutsByDate,
        getTotalCaloriesBurned,
        // Diet
        dietEntries,
        addDietEntry,
        deleteDietEntry,
        getDietEntriesByDate,
        getTotalCaloriesConsumed,
        getTotalMacros,
        getCalorieBalance,
        // Health Stats
        healthStats,
        addHealthStats,
        deleteHealthStats,
        getStatsByDate,
        getAverageWeight,
        getAverageSleep,
        getAverageSteps,
        getWeightProgress,
        getGoalsMetPercentage,
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
