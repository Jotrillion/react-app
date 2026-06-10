import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useHealth, HealthStats } from '../context/HealthContext';

export const StatsScreen: React.FC = () => {
  const { healthStats, addHealthStats } = useHealth();
  const [weight, setWeight] = useState('');
  const [steps, setSteps] = useState('');
  const [water, setWater] = useState('');
  const [sleep, setSleep] = useState('');

  const handleAddStats = () => {
    if (!weight || !steps || !water || !sleep) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addHealthStats({
      weight: parseFloat(weight),
      steps: parseInt(steps, 10),
      water: parseFloat(water),
      sleep: parseFloat(sleep),
    });

    setWeight('');
    setSteps('');
    setWater('');
    setSleep('');
  };

  const latestStats = healthStats.length > 0 ? healthStats[healthStats.length - 1] : null;
  const avgSleep = healthStats.length > 0
    ? (healthStats.reduce((sum, s) => sum + s.sleep, 0) / healthStats.length).toFixed(1)
    : '0';

  const renderStat = ({ item }: { item: HealthStats }) => (
    <View style={styles.statCard}>
      <View style={styles.statGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statItemLabel}>Weight</Text>
          <Text style={styles.statItemValue}>{item.weight} kg</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItemLabel}>Steps</Text>
          <Text style={styles.statItemValue}>{item.steps}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItemLabel}>Water</Text>
          <Text style={styles.statItemValue}>{item.water}L</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItemLabel}>Sleep</Text>
          <Text style={styles.statItemValue}>{item.sleep}h</Text>
        </View>
      </View>
      <Text style={styles.statDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Statistics</Text>

      {latestStats && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Weight</Text>
              <Text style={styles.summaryValue}>{latestStats.weight} kg</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Steps</Text>
              <Text style={styles.summaryValue}>{latestStats.steps}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Water</Text>
              <Text style={styles.summaryValue}>{latestStats.water}L</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Avg Sleep</Text>
              <Text style={styles.summaryValue}>{avgSleep}h</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Steps"
          value={steps}
          onChangeText={setSteps}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Water (liters)"
          value={water}
          onChangeText={setWater}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Sleep (hours)"
          value={sleep}
          onChangeText={setSleep}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddStats}>
          <Text style={styles.addBtnText}>Log Stats</Text>
        </TouchableOpacity>
      </View>

      {healthStats.length === 0 ? (
        <Text style={styles.emptyText}>No stats logged yet. Start tracking!</Text>
      ) : (
        [...healthStats].reverse().map((stat, index) => renderStat({ item: stat }))
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
  summaryCard: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
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
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  statItemLabel: {
    fontSize: 12,
    color: '#999',
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 32,
    fontSize: 16,
  },
});
