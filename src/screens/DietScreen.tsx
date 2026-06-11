import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useHealth } from '../context/HealthContext';
import { DietEntry } from '../models/DietEntry';

export const DietScreen: React.FC = () => {
  const { currentUser, dietEntries, addDietEntry, deleteDietEntry } = useHealth();
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [mealType, setMealType] = useState('breakfast');

  const handleAddEntry = () => {
    if (!meal || !calories || !protein || !carbs || !fat) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'No user selected');
      return;
    }

    addDietEntry(
      currentUser.id,
      meal,
      mealType,
      parseInt(calories, 10),
      parseFloat(protein),
      parseFloat(carbs),
      parseFloat(fat)
    );

    setMeal('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Entry', 'Are you sure?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      { text: 'Delete', onPress: () => deleteDietEntry(id), style: 'destructive' },
    ]);
  };

  const totalCalories = dietEntries.reduce((sum, entry) => sum + entry.calories, 0);

  const renderEntry = ({ item }: { item: DietEntry }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryInfo}>
        <Text style={styles.mealName}>{item.meal}</Text>
        <Text style={styles.macros}>
          {item.calories} cal | P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
        </Text>
        <Text style={styles.entryDate}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Diet Tracking</Text>

      <View style={styles.statsCard}>
        <Text style={styles.statLabel}>Total Calories Today</Text>
        <Text style={styles.statValue}>{totalCalories}</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Meal name"
          value={meal}
          onChangeText={setMeal}
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <View style={styles.macroRow}>
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Protein (g)"
            value={protein}
            onChangeText={setProtein}
            keyboardType="decimal-pad"
          />
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Carbs (g)"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="decimal-pad"
          />
          <TextInput
            style={[styles.input, styles.macroInput]}
            placeholder="Fat (g)"
            value={fat}
            onChangeText={setFat}
            keyboardType="decimal-pad"
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddEntry}>
          <Text style={styles.addBtnText}>Add Entry</Text>
        </TouchableOpacity>
      </View>

      {dietEntries.length === 0 ? (
        <Text style={styles.emptyText}>No meals logged yet. Start tracking!</Text>
      ) : (
        dietEntries.map((entry) => renderEntry({ item: entry }))
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
  statsCard: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  statValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
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
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  macroInput: {
    flex: 1,
  },
  addBtn: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryCard: {
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
  entryInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  macros: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  entryDate: {
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
