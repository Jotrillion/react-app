// Date utilities
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const getDateRange = (startDays: number, endDays: number = 0): { start: string; end: string } => {
  const start = getDaysAgo(startDays);
  const end = endDays > 0 ? getDaysAgo(endDays) : getCurrentDate();
  return { start, end };
};

// Calorie utilities
export const calculateCalorieGoal = (weight: number, height: number, age: number, goal: string): number => {
  // Simplified BMR calculation (Mifflin-St Jeor for average adult)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const activityMultiplier = 1.55; // moderate activity
  const tdee = bmr * activityMultiplier;

  if (goal === 'weight-loss') return Math.round(tdee - 500); // 500 cal deficit
  if (goal === 'muscle-gain') return Math.round(tdee + 500); // 500 cal surplus
  return Math.round(tdee); // maintenance
};

export const calculateMacroRatios = (goal: string): { protein: number; carbs: number; fat: number } => {
  if (goal === 'muscle-gain') return { protein: 0.3, carbs: 0.45, fat: 0.25 };
  if (goal === 'weight-loss') return { protein: 0.35, carbs: 0.4, fat: 0.25 };
  return { protein: 0.25, carbs: 0.5, fat: 0.25 }; // maintenance
};

// Workout utilities
export const getIntensityLabel = (caloriesPerMinute: number): 'low' | 'medium' | 'high' => {
  if (caloriesPerMinute >= 10) return 'high';
  if (caloriesPerMinute >= 5) return 'medium';
  return 'low';
};

export const estimateCalories = (activity: string, duration: number, weight: number): number => {
  const activityFactors: { [key: string]: number } = {
    walking: 3.5,
    running: 9.8,
    cycling: 7.5,
    swimming: 8,
    strength: 6,
    yoga: 3,
    hiit: 12,
  };

  const factor = activityFactors[activity.toLowerCase()] || 5;
  return Math.round((factor * weight * duration) / 60);
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidWeight = (weight: number): boolean => {
  return weight > 0 && weight < 500;
};

export const isValidAge = (age: number): boolean => {
  return age >= 13 && age <= 120;
};

export const isValidHeight = (height: number): boolean => {
  return height > 0 && height < 300;
};

// Analytics utilities
export const calculateBMI = (weight: number, height: number): number => {
  return Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
