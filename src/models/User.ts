export class User {
  id: string;
  username: string;
  email: string;
  age: number;
  height: number; // in cm
  goalWeight: number; // in kg
  fitnessGoal: 'weight-loss' | 'muscle-gain' | 'maintenance';
  createdAt: string;

  constructor(
    username: string,
    email: string,
    age: number,
    height: number,
    goalWeight: number,
    fitnessGoal: 'weight-loss' | 'muscle-gain' | 'maintenance'
  ) {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.age = age;
    this.height = height;
    this.goalWeight = goalWeight;
    this.fitnessGoal = fitnessGoal;
    this.createdAt = new Date().toISOString();
  }

  updateGoalWeight(newWeight: number): void {
    this.goalWeight = newWeight;
  }

  updateFitnessGoal(goal: 'weight-loss' | 'muscle-gain' | 'maintenance'): void {
    this.fitnessGoal = goal;
  }

  getProfile(): string {
    return `${this.username} (${this.age}y, ${this.height}cm) - Goal: ${this.goalWeight}kg (${this.fitnessGoal})`;
  }
}
