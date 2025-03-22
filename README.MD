Court Connect. More Courts, More Players, More Fun.

Developer: Nathan Jordan
Project Managers: Adam Coles and Howard Chuang

Originally designed for the Sandbox hackathon, we created this app to solve the key issues that  sports players run to: they have no one to play with, or nowhere to play.

The app is currently being designed for pickleball, but we plan to expand into other sports, such as tennis. We plan to integrate with DUPR, a popular pickleball app, in order to share the player's stats with others.

This version is mainly using mock data for the posts, courts, and users, but we plan to work on some of the backend logic, then launch the app with real user's data.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/natejordan245/Court-Connect.git
cd Court-Connect
```

2. Install dependencies
```bash
npm install
# or if using yarn
yarn install
```

3. Install iOS dependencies (Mac users only)
```bash
cd ios
pod install
cd ..
```

### Running the App

For iOS:
```bash
npm run ios
# or
yarn ios
```

For Android:
```bash
npm run android
# or
yarn android
```

For development:
```bash
npm start
# or
yarn start
```

Below is the documentation, which will be written in a way such that any user, whether they are a human or an AI agent, can read this readme and know how to interact with the codebase.

# Project Structure

The application follows a modular architecture, with each directory in the `src` folder serving a specific purpose:

### `/src/components`
Contains reusable React Native components used throughout the application:
- `AuthForm.tsx` - Handles both login and signup form functionality
- `CourtsMap.tsx` - Displays interactive map of pickleball courts
- `MatchCard.tsx` - Card component for displaying player profiles in the matching system
- `Menu.tsx` - Slide-out menu component with navigation options
- `PostCard.tsx` - Displays social posts in the feed
- `SearchBar.tsx` - Reusable search input component
- `SharePrompt.tsx` - Social sharing prompt component

### `/src/config`
Configuration files for external services:
- Firebase initialization and setup
- Authentication configuration
- Database connection settings

### `/src/constants`
Application-wide constant values:
- `colors.ts` - Color scheme definitions
- Other UI/UX constants and theme variables

### `/src/data`
Mock data files for development and testing:
- `mockUsers.ts` - Sample user profiles
- `mockCourts.ts` - Sample court locations
- `mockPosts.ts` - Sample social posts
These will be replaced with real data from Firebase in production.

### `/src/navigation`
Navigation configuration using React Navigation:
- `MainNavigator.tsx` - Root navigation stack
- `TabNavigator.tsx` - Bottom tab navigation setup
- Navigation types and route definitions

### `/src/screens`
Main application screens:
- `HomeScreen.tsx` - Social feed and main dashboard
- `MatchScreen.tsx` - Player matching and friend discovery
- `CourtsScreen.tsx` - Court finder and management
- `ProfileScreen.tsx` - User profile and settings
- `LoginScreen.tsx` & `SignUpScreen.tsx` - Authentication screens
- `AddCourtScreen.tsx` - Court submission form

### `/src/services`
Business logic and API services:
- `courtService.ts` - Court data management
- `userService.ts` - User profile operations
- Integration with Firebase and external APIs
- Future DUPR integration services

### `/src/types`
TypeScript type definitions:
- Interface definitions for data models
- Type declarations for components
- Navigation parameter types
- Ensures type safety across the application

### `/src/utils`
Utility functions and helper methods:
- Data formatting
- Validation functions
- Common calculations
- Storage utilities

## Key Features
- User Authentication
- Court Discovery
- Player Matching
- Social Feed
- Profile Management
- Court Submission
- Friend System
- Match Challenges

## Future Implementations
1. DUPR Integration for player statistics
2. Real-time court availability
3. Match scheduling system
4. Tournament organization
5. Multi-sport expansion (tennis, etc.)
6. Advanced matchmaking algorithms
7. Verified player badges
8. Achievement system

#
