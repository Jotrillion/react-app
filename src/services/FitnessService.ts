import { Workout } from '../models/Workout';
import { DietEntry } from '../models/DietEntry';

export class FitnessService {
  private workouts: Map<string, Workout> = new Map();
  private dietEntries: Map<string, DietEntry> = new Map();

  // Workout Management
  addWorkout(workout: Workout): void {
    this.workouts.set(workout.id, workout);
  }

  getWorkout(workoutId: string): Workout | undefined {
    return this.workouts.get(workoutId);
  }

  getUserWorkouts(userId: string): Workout[] {
    return Array.from(this.workouts.values()).filter(w => w.userId === userId);
  }

  deleteWorkout(workoutId: string): void {
    this.workouts.delete(workoutId);
  }

  getWorkoutsByDate(userId: string, date: string): Workout[] {
    return this.getUserWorkouts(userId).filter(w => w.date === date);
  }

  getTotalCaloriesBurned(userId: string, startDate?: string, endDate?: string): number {
    let workouts = this.getUserWorkouts(userId);
    if (startDate && endDate) {
      workouts = workouts.filter(w => w.date >= startDate && w.date <= endDate);
    }
    return workouts.reduce((total, w) => total + w.calories, 0);
  }

  // Diet Management
  addDietEntry(entry: DietEntry): void {
    this.dietEntries.set(entry.id, entry);
  }

  getDietEntry(entryId: string): DietEntry | undefined {
    return this.dietEntries.get(entryId);
  }

  getUserDietEntries(userId: string): DietEntry[] {
    return Array.from(this.dietEntries.values()).filter(e => e.userId === userId);
  }

  deleteDietEntry(entryId: string): void {
    this.dietEntries.delete(entryId);
  }

  getDietEntriesByDate(userId: string, date: string): DietEntry[] {
    return this.getUserDietEntries(userId).filter(e => e.date === date);
  }

  getTotalCaloriesConsumed(userId: string, startDate?: string, endDate?: string): number {
    let entries = this.getUserDietEntries(userId);
    if (startDate && endDate) {
      entries = entries.filter(e => e.date >= startDate && e.date <= endDate);
    }
    return entries.reduce((total, e) => total + e.calories, 0);
  }

  getTotalMacros(userId: string, date: string): { protein: number; carbs: number; fat: number } {
    const entries = this.getDietEntriesByDate(userId, date);
    return {
      protein: entries.reduce((total, e) => total + e.protein, 0),
      carbs: entries.reduce((total, e) => total + e.carbs, 0),
      fat: entries.reduce((total, e) => total + e.fat, 0),
    };
  }

  getCalorieBalance(userId: string, date: string): number {
    const consumed = this.getDietEntriesByDate(userId, date).reduce((total, e) => total + e.calories, 0);
    const burned = this.getWorkoutsByDate(userId, date).reduce((total, w) => total + w.calories, 0);
    return burned - consumed;
  }
}
