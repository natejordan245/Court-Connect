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