export class HealthStats {
  id: string;
  userId: string;
  weight: number; // in kg
  steps: number;
  water: number; // in liters
  sleep: number; // in hours
  restingHeartRate: number; // in bpm
  energyLevel: 'low' | 'medium' | 'high';
  notes: string;
  date: string;

  constructor(
    userId: string,
    weight: number,
    steps: number,
    water: number,
    sleep: number,
    restingHeartRate: number = 0,
    energyLevel: 'low' | 'medium' | 'high' = 'medium',
    notes: string = '',
    date: string = new Date().toISOString().split('T')[0]
  ) {
    this.id = Date.now().toString();
    this.userId = userId;
    this.weight = weight;
    this.steps = steps;
    this.water = water;
    this.sleep = sleep;
    this.restingHeartRate = restingHeartRate;
    this.energyLevel = energyLevel;
    this.notes = notes;
    this.date = date;
  }

  isGoalMet(): { water: boolean; sleep: boolean; steps: boolean } {
    return {
      water: this.water >= 8,
      sleep: this.sleep >= 7,
      steps: this.steps >= 10000,
    };
  }

  getSummary(): string {
    return `${this.weight}kg | ${this.steps} steps | ${this.water}L water | ${this.sleep}h sleep`;
  }
}
