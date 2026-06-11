import { HealthStats } from '../models/HealthStats';

export class StatsService {
  private stats: Map<string, HealthStats> = new Map();

  addStats(stat: HealthStats): void {
    this.stats.set(stat.id, stat);
  }

  getStats(statId: string): HealthStats | undefined {
    return this.stats.get(statId);
  }

  getUserStats(userId: string): HealthStats[] {
    return Array.from(this.stats.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  deleteStats(statId: string): void {
    this.stats.delete(statId);
  }

  getStatsByDate(userId: string, date: string): HealthStats | undefined {
    return Array.from(this.stats.values()).find(s => s.userId === userId && s.date === date);
  }

  getAverageWeight(userId: string, days: number = 30): number {
    const userStats = this.getUserStats(userId).slice(0, days);
    if (userStats.length === 0) return 0;
    const totalWeight = userStats.reduce((total, s) => total + s.weight, 0);
    return Math.round((totalWeight / userStats.length) * 10) / 10;
  }

  getAverageSleep(userId: string, days: number = 30): number {
    const userStats = this.getUserStats(userId).slice(0, days);
    if (userStats.length === 0) return 0;
    const totalSleep = userStats.reduce((total, s) => total + s.sleep, 0);
    return Math.round((totalSleep / userStats.length) * 10) / 10;
  }

  getAverageSteps(userId: string, days: number = 30): number {
    const userStats = this.getUserStats(userId).slice(0, days);
    if (userStats.length === 0) return 0;
    const totalSteps = userStats.reduce((total, s) => total + s.steps, 0);
    return Math.round(totalSteps / userStats.length);
  }

  getWeightProgress(userId: string): { current: number; change: number; goal: number } {
    const userStats = this.getUserStats(userId);
    if (userStats.length === 0) return { current: 0, change: 0, goal: 0 };

    const current = userStats[0].weight;
    const initial = userStats[userStats.length - 1].weight;
    const change = Math.round((initial - current) * 10) / 10;

    return { current, change, goal: 0 };
  }

  getGoalsMetPercentage(userId: string, days: number = 7): number {
    const userStats = this.getUserStats(userId).slice(0, days);
    if (userStats.length === 0) return 0;

    let totalGoalsMet = 0;
    userStats.forEach(stat => {
      const goals = stat.isGoalMet();
      totalGoalsMet += Object.values(goals).filter(Boolean).length;
    });

    return Math.round((totalGoalsMet / (userStats.length * 3)) * 100);
  }
}
