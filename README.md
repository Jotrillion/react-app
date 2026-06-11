# Health & Fitness Tracker

## Overview

This project is a mobile health and fitness tracking application built with React Native and Expo. It allows users to create profiles with fitness goals, log their daily workouts, track their diet and meals, and monitor key health metrics such as weight, steps, water intake, and sleep. The application provides an intuitive tab-based interface to switch between different tracking categories and displays comprehensive statistics and analytics about the user's health and fitness progress.

The application uses React Context combined with object-oriented service architecture for state management. Multiple service classes (`UserService`, `FitnessService`, `StatsService`) manage users, workouts, diet entries, and health statistics during execution. Data is stored in-memory with structured data models, making the app responsive and lightweight while running on mobile devices (iOS, Android) or the web. Demo accounts and sample data are seeded at startup for immediate exploration.

## Assignment Requirements Covered

The program demonstrates all core JavaScript and React fundamentals:

**JavaScript & React Basics:**
- Variables and state management with `useState`
- Expressions and operators
- Conditionals (ternary operators, switch statements)
- Loops (array methods like `map`, `filter`, `reduce`)
- Functions (functional components, custom hooks, service methods)
- Arrow functions for event handlers and callbacks

**Object-Oriented Design:**
- Classes (`User`, `Workout`, `DietEntry`, `HealthStats`)
- Service classes with business logic (`UserService`, `FitnessService`, `StatsService`)
- Encapsulation with private properties and public methods
- Method composition for complex operations
- In-memory collections using `Map` and `Array`

**Advanced Concepts:**
- React Components (functional components with hooks)
- React Context API for global state management
- TypeScript interfaces and type safety
- Props passing and component composition
- Event handling with `TouchableOpacity` and `TextInput`
- React Native UI components (`View`, `Text`, `FlatList`, `TextInput`, `ScrollView`)
- Date handling and formatting utilities
- Analytics and statistics calculations
- Demo data seeding at app startup

## Build and Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (install globally with `npm install -g expo-cli`)

### Installation and Running

From the project folder:

```powershell
cd "c:\Users\TechCharities\Documents\react app"
npm install
npm start
```

Then choose your platform from the Expo CLI menu:
- Press `w` for Web
- Press `a` for Android (requires Android SDK)
- Press `i` for iOS (macOS only)
- Scan QR code with Expo Go app for mobile testing

### Building for Production
```powershell
expo build:ios   # For iOS
expo build:android  # For Android
expo export:web  # For Web
```

## Example Usage

1. **App starts with a demo user ("Alex")** — The app seeds demo data including a user profile with fitness goals, sample workouts, meal entries, and health statistics for immediate exploration without manual setup.

2. **View and manage user profile** — Switch users using the user selection feature, update fitness goals (weight-loss, muscle-gain, maintenance), and see personalized daily calorie recommendations.

3. **Log a workout** in the Workouts tab:
   - Enter exercise name (Running, Weightlifting, etc.)
   - Select category (Cardio, Strength, Flexibility, Sports)
   - Set duration in minutes and calories burned
   - Choose intensity level (Low, Medium, High)
   - View all workouts with automatic sorting by date

4. **Track diet and nutrition** in the Diet tab:
   - Log meals with calorie and macronutrient information (protein, carbs, fat, fiber)
   - Categorize meals (breakfast, lunch, dinner, snack)
   - View daily macro totals and calorie balance (burned vs. consumed)

5. **Monitor health metrics** in the Stats tab:
   - Log daily weight, steps, water intake, sleep hours, resting heart rate
   - View trend summaries (average weight over 30 days, average sleep, average steps)
   - Track progress toward fitness goals (weight change, goal percentage)
   - See daily health goals completion percentage

6. **Analyze performance** — View calorie balance, macronutrient distribution, weight progress, and health goal achievement across different time ranges.

## Project Structure

```
react app/
├── App.tsx                         # Main app component with tab navigation
├── index.ts                        # Entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── app.json                        # Expo configuration
├── src/
│   ├── models/                     # Data model classes
│   │   ├── User.ts                 # User profile with fitness goals
│   │   ├── Workout.ts              # Workout data model
│   │   ├── DietEntry.ts            # Meal and nutrition tracking
│   │   └── HealthStats.ts          # Daily health metrics
│   ├── services/                   # Business logic service classes
│   │   ├── UserService.ts          # User management (CRUD, current user)
│   │   ├── FitnessService.ts       # Workouts and diet tracking
│   │   └── StatsService.ts         # Analytics and statistics
│   ├── context/
│   │   └── HealthContext.tsx       # React Context integrating all services
│   ├── screens/
│   │   ├── WorkoutsScreen.tsx      # Workouts tracking interface
│   │   ├── DietScreen.tsx          # Diet/meal tracking interface
│   │   └── StatsScreen.tsx         # Health statistics display
│   └── utils/
│       └── HealthUtils.ts          # Date, calorie, validation utilities
└── assets/                         # Static assets and images
```

## Data Models and Services

**Models (src/models/):**
- `User` — User profiles with fitness goals, height, target weight, and profile methods
- `Workout` — Individual workout entries with intensity, duration, calories, and exercise categories
- `DietEntry` — Meal tracking with macronutrient breakdown (protein, carbs, fat, fiber)
- `HealthStats` — Daily health metrics (weight, steps, water, sleep, heart rate, energy level)

**Services (src/services/):**
- `UserService` — Manages user CRUD operations, current user selection, and user profiles
- `FitnessService` — Tracks workouts and diet entries, calculates calorie balances, retrieves macro totals
- `StatsService` — Generates analytics (weight progress, average metrics, goal tracking, BMI calculation)

## Software Demo Video

- Software Demo Video: (https://youtu.be/MnWJz7TSOB8)

## Development Environment

- **Language:** JavaScript/TypeScript
- **Framework:** React Native with Expo
- **Runtime/Compiler:** Node.js, Expo CLI
- **Package Manager:** npm
- **Platforms:** iOS, Android, Web
- **State Management:** React Context API
- **IDE:** Visual Studio Code
- **OS:** Windows, macOS, Linux

## Useful Websites

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Hooks Reference](https://react.dev/reference/react)
- [React Context API](https://react.dev/reference/react/createContext)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Object-Oriented Programming in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)

##**Persistent Storage** — Implement AsyncStorage or SQLite to save user profiles, workouts, diet entries, and health stats across app sessions.
- **Multi-User Support** — Add login/signup with secure authentication and user-specific data isolation.
- **Advanced Analytics** — Create detailed charts and graphs for weight trends, calorie trends, macro distribution, and progress toward goals.
- **Goal Tracking** — Set, update, and track fitness goals with automatic achievement calculations and milestone notifications.
- **Meal Planning** — Create meal templates, search food database, and auto-populate nutrition information using APIs like USDA FoodData Central.
- **Social Features** — Share achievements, compete with friends, create fitness challenges, and build communities.
- **Wearable Integration** — Connect with Apple Health, Google Fit, and smartwatch APIs to automatically sync steps, heart rate, and sleep data.
- **Push Notifications** — Send reminders to log workouts, meals, and health metrics; alert users when goals are at risk.
- **Web Dashboard** — Build a complementary web application for detailed analytics, report generation, and account management.
- **Cloud Sync** — Sync health data across multiple devices using Firebase or cloud backend for seamless experiencepecific features.
- Integrate with wearable devices and fitness APIs (Apple Health, Google Fit).
- Create meal and workout templates for quick logging.
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
