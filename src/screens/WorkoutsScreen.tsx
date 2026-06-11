import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useHealth } from '../context/HealthContext';
import { Workout } from '../models/Workout';

export const WorkoutsScreen: React.FC = () => {
  const { currentUser, workouts, addWorkout, deleteWorkout } = useHealth();
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [category, setCategory] = useState('cardio');
  const [intensity, setIntensity] = useState('medium');

  const handleAddWorkout = () => {
    if (!workoutName || !duration || !calories) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'No user selected');
      return;
    }

    addWorkout(
      currentUser.id,
      workoutName,
      category,
      parseInt(duration, 10),
      parseInt(calories, 10),
      intensity
    );

    setWorkoutName('');
    setDuration('');
    setCalories('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Workout', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      { text: 'Delete', onPress: () => deleteWorkout(id), style: 'destructive' },
    ]);
  };

  const renderWorkout = ({ item }: { item: Workout }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutDetails}>{item.duration} min | {item.calories} cal</Text>
        <Text style={styles.workoutDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Routines</Text>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Workout name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Calories burned"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddWorkout}>
          <Text style={styles.addBtnText}>Add Workout</Text>
        </TouchableOpacity>
      </View>

      {workouts.length === 0 ? (
        <Text style={styles.emptyText}>No workouts yet. Start by adding one!</Text>
      ) : (
        workouts.map((workout) => renderWorkout({ item: workout }))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  workoutDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 32,
    fontSize: 16,
  },
});
