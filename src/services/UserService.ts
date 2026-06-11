import { User } from '../models/User';

export class UserService {
  private users: Map<string, User> = new Map();
  private currentUserId: string | null = null;

  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  updateUser(userId: string, updatedUser: Partial<User>): void {
    const user = this.users.get(userId);
    if (user) {
      this.users.set(userId, { ...user, ...updatedUser });
    }
  }

  deleteUser(userId: string): void {
    this.users.delete(userId);
  }

  setCurrentUser(userId: string): void {
    if (this.users.has(userId)) {
      this.currentUserId = userId;
    }
  }

  getCurrentUser(): User | undefined {
    if (!this.currentUserId) return undefined;
    return this.users.get(this.currentUserId);
  }

  getUserCount(): number {
    return this.users.size;
  }
}
