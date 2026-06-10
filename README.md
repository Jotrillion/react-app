# Health & Fitness App

A React Native mobile application built with Expo for tracking workouts, diet, and health statistics.

## Features

### 🏋️ Workout Routines
- Log your daily workouts with name, duration, and calories burned
- Track workout history
- View all past workout sessions
- Delete entries as needed

### 🍎 Diet Tracking
- Log meals with detailed nutritional information (calories, protein, carbs, fat)
- View total daily calorie intake at a glance
- Track macronutrient breakdown per meal
- Maintain meal history with dates

### 📊 Health Statistics
- Log daily health metrics: weight, steps, water intake, sleep hours
- View today's summary with key health indicators
- Track average sleep across all logged entries
- Monitor weight and activity trends over time

## Project Structure

```
health-fitness-app/
├── src/
│   ├── screens/
│   │   ├── WorkoutsScreen.tsx    # Workout management UI
│   │   ├── DietScreen.tsx         # Diet tracking UI
│   │   └── StatsScreen.tsx        # Health statistics UI
│   ├── context/
│   │   └── HealthContext.tsx      # Global state management
│   └── utils/
│       └── (utility functions)
├── App.tsx                         # Main app with navigation
├── index.ts                        # Entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (bottom-tab navigation)
- **State Management**: React Context API
- **Styling**: React Native StyleSheet

## Dependencies

- `expo` - React Native development platform
- `react-native` - Cross-platform mobile development
- `@react-navigation/native` - Navigation infrastructure
- `@react-navigation/bottom-tabs` - Bottom tab navigation
- `expo-status-bar` - Status bar management
- `expo-splash-screen` - Splash screen handling

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (optional, can use `npx expo`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal
   - **Android**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal
   - **Expo Go**: Scan the QR code with the Expo Go app

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Build and run on Android
- `npm run ios` - Build and run on iOS
- `npm run web` - Build and run on web

## Features in Detail

### Workout Logging
- Input fields for workout name, duration (minutes), and calories burned
- Real-time list of all logged workouts
- Quick delete functionality with confirmation
- Date tracking for each workout entry

### Diet Tracker
- Comprehensive meal logging with macronutrient tracking
- Real-time calorie total display
- Support for detailed macro tracking (protein, carbs, fat)
- Historical meal entries organized by date

### Health Dashboard
- Summary card showing today's key metrics
- Weight tracking in kilograms
- Step counting integration ready
- Water intake logging in liters
- Sleep duration tracking in hours
- Average sleep calculation across all entries

## Data Persistence Note

Currently, the app stores data in memory. For production use, consider implementing:
- AsyncStorage for local persistence
- Firebase Realtime Database for cloud sync
- SQLite for more complex queries
- Redux for advanced state management

## Future Enhancements

- [ ] Add goal setting and progress tracking
- [ ] Implement data persistence with AsyncStorage
- [ ] Add charts and visualizations for health trends
- [ ] Integrate with device fitness APIs (step counter, heart rate)
- [ ] Add user authentication
- [ ] Export data as PDF/CSV
- [ ] Add notification reminders for water intake and workouts
- [ ] Implement workout templates
- [ ] Add food database for quick meal logging

## License

This project is open source and available under the MIT License.

## Support

For issues or feature requests, please use the GitHub issue tracker.

---

**Happy tracking!** 💪 Stay fit, stay healthy!
