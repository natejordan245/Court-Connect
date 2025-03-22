/**
 * Base user interface for the application
 */
export interface User {
  id: string;
  name: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  location?: string;
  bio?: string;
  skillLevel?: string;
  playStyle?: string;
  availability?: string;
  matchesPlayed?: number;
  wins?: number;
} 