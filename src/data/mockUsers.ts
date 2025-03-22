import { User } from '../types/User';

/**
 * Mock user data for the matching feature
 * 
 * @deprecated This mock data is temporary and will be replaced in the next version with:
 * - Real user data from Firebase Authentication
 * - User profiles with verified skill levels
 * - Real-time availability status
 * - Match history and preferences
 * 
 * Future Implementation Plan:
 * 1. Integrate with Firebase Authentication for real user data
 * 2. Add skill level verification system
 * 3. Implement real-time user status updates
 * 4. Add match history tracking
 * 5. Include user preferences (preferred play times, doubles/singles, etc.)
 * 6. Add profile verification badges
 */

export interface MatchUser extends User {
  skillLevel: string;
  location: string;
  bio: string;
  image: string;
  age: number;
  isBusy?: boolean;
}

export const mockUsers: MatchUser[] = [
  {
    id: '1',
    name: 'James Anderson',
    age: 28,
    skillLevel: '4.0',
    location: '2 miles away',
    bio: 'Looking for competitive doubles matches! Available weekday evenings.',
    image: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Thompson',
    age: 32,
    skillLevel: '3.5',
    location: '5 miles away',
    bio: 'Casual player, but always up for a challenge. Prefer morning games.',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'David Martinez',
    age: 25,
    skillLevel: '4.5',
    location: '1 mile away',
    bio: 'Tournament player looking for practice partners. Singles or doubles.',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Christopher Lee',
    age: 30,
    skillLevel: '3.0',
    location: '3 miles away',
    bio: 'New to pickleball, improving quickly. Looking for friendly matches.',
    image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Daniel Wilson',
    age: 35,
    skillLevel: '4.0',
    location: '4 miles away',
    bio: 'Weekend warrior, love competitive doubles games.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Matthew Brown',
    age: 29,
    skillLevel: '3.5',
    location: '2.5 miles away',
    bio: 'Evening player, focusing on improving my dinking game.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '7',
    name: 'Andrew Taylor',
    age: 31,
    skillLevel: '4.0',
    location: '1.5 miles away',
    bio: 'Former tennis player, love the pickleball community.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '8',
    name: 'Ryan Garcia',
    age: 27,
    skillLevel: '3.0',
    location: '3.2 miles away',
    bio: 'Looking for morning matches before work. Improving rapidly!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '9',
    name: 'Kevin Wright',
    age: 33,
    skillLevel: '4.5',
    location: '4.8 miles away',
    bio: 'Tournament player, can help with technique and strategy.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2400&auto=format&fit=crop',
  },
  {
    id: '10',
    name: 'Thomas Rodriguez',
    age: 26,
    skillLevel: '3.5',
    location: '2.8 miles away',
    bio: 'Flexible schedule, always ready for a good match!',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2400&auto=format&fit=crop',
  }
]; 