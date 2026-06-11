export class Workout {
  id: string;
  userId: string;
  name: string;
  category: 'cardio' | 'strength' | 'flexibility' | 'sports';
  duration: number; // in minutes
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  notes: string;
  date: string;

  constructor(
    userId: string,
    name: string,
    category: 'cardio' | 'strength' | 'flexibility' | 'sports',
    duration: number,
    calories: number,
    intensity: 'low' | 'medium' | 'high',
    notes: string = '',
    date: string = new Date().toISOString().split('T')[0]
  ) {
    this.id = Date.now().toString();
    this.userId = userId;
    this.name = name;
    this.category = category;
    this.duration = duration;
    this.calories = calories;
    this.intensity = intensity;
    this.notes = notes;
    this.date = date;
  }

  getCaloriesPerMinute(): number {
    return Math.round((this.calories / this.duration) * 10) / 10;
  }

  getSummary(): string {
    return `${this.name} - ${this.duration}min, ${this.calories}cal [${this.intensity}]`;
  }
}
