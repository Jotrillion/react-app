import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HealthProvider } from './src/context/HealthContext';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { DietScreen } from './src/screens/DietScreen';
import { StatsScreen } from './src/screens/StatsScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'workouts' | 'diet' | 'stats'>('workouts');

  const renderScreen = () => {
    switch (currentTab) {
      case 'workouts':
        return <WorkoutsScreen />;
      case 'diet':
        return <DietScreen />;
      case 'stats':
        return <StatsScreen />;
      default:
        return <WorkoutsScreen />;
    }
  };

  return (
    <HealthProvider>
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'workouts' && styles.tabButtonActive]}
            onPress={() => setCurrentTab('workouts')}
          >
            <Text style={[styles.tabButtonText, currentTab === 'workouts' && styles.tabButtonTextActive]}>
              💪 Workouts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'diet' && styles.tabButtonActive]}
            onPress={() => setCurrentTab('diet')}
          >
            <Text style={[styles.tabButtonText, currentTab === 'diet' && styles.tabButtonTextActive]}>
              🍎 Diet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentTab === 'stats' && styles.tabButtonActive]}
            onPress={() => setCurrentTab('stats')}
          >
            <Text style={[styles.tabButtonText, currentTab === 'stats' && styles.tabButtonTextActive]}>
              📊 Stats
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </HealthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#E3F2FD',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  tabButtonTextActive: {
    color: '#2196F3',
  },
});
