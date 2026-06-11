export class DietEntry {
  id: string;
  userId: string;
  meal: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  notes: string;
  date: string;

  constructor(
    userId: string,
    meal: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    fiber: number = 0,
    notes: string = '',
    date: string = new Date().toISOString().split('T')[0]
  ) {
    this.id = Date.now().toString();
    this.userId = userId;
    this.meal = meal;
    this.mealType = mealType;
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.fiber = fiber;
    this.notes = notes;
    this.date = date;
  }

  getTotalMacros(): { protein: number; carbs: number; fat: number } {
    return { protein: this.protein, carbs: this.carbs, fat: this.fat };
  }

  getCalorieBreakdown(): { proteinCals: number; carbsCals: number; fatCals: number } {
    return {
      proteinCals: this.protein * 4,
      carbsCals: this.carbs * 4,
      fatCals: this.fat * 9,
    };
  }

  getSummary(): string {
    return `${this.meal} - ${this.calories}cal (P:${this.protein}g, C:${this.carbs}g, F:${this.fat}g)`;
  }
}
