import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FrequentInvite = ({ visible, onClose }) => {
  const [frequencyType, setFrequencyType] = useState('daily');
  const [daysOfWeek, setDaysOfWeek] = useState(['Mon', 'Wed', 'Fri']);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    setDaysOfWeek(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequency Type</Text>
        <View style={styles.segGroup}>
          {['daily', 'weekly', 'monthly'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.segBtn, frequencyType === type && styles.segBtnActive]}
              onPress={() => setFrequencyType(type)}
            >
              <Text style={[styles.segBtnText, frequencyType === type && styles.segBtnActiveText]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {frequencyType === 'weekly' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Days</Text>
          <View style={styles.daysGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayBtn, daysOfWeek.includes(day) && styles.dayBtnActive]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayBtnText, daysOfWeek.includes(day) && styles.dayBtnActiveText]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validity Period</Text>
        <View style={styles.twoCol}>
          <View style={styles.colItem}>
            <Text style={styles.subLabel}>Start date</Text>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputText}>18 Apr</Text>
              <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
            </TouchableOpacity>
          </View>
          <View style={styles.colItem}>
            <Text style={styles.subLabel}>End date</Text>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputText}>18 May</Text>
              <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.ctaBtn} onPress={() => Alert.alert('Success', 'Ready to select frequent guests!')}>
        <Text style={styles.ctaBtnText}>Select Guest(s)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { padding: 16 },
  section: { marginBottom: 13 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 8 },
  subLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 6 },
  segGroup: { flexDirection: 'row', gap: 8 },
  segBtn: {
    flex: 1, paddingVertical: 9, borderWidth: 1.5, borderColor: '#E0E0E0',
    borderRadius: 12, alignItems: 'center', backgroundColor: '#FFF',
  },
  segBtnActive: { backgroundColor: '#0d3d2f', borderColor: '#0d3d2f' },
  segBtnText: { fontSize: 12, color: '#666', fontWeight: '500' },
  segBtnActiveText: { color: '#FFF', fontWeight: '600' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  dayBtn: {
    width: '22%', paddingVertical: 9, borderWidth: 1.5, borderColor: '#E0E0E0',
    borderRadius: 8, alignItems: 'center', backgroundColor: '#FFF',
  },
  dayBtnActive: { backgroundColor: '#0d3d2f', borderColor: '#0d3d2f' },
  dayBtnText: { fontSize: 12, color: '#666', fontWeight: '600' },
  dayBtnActiveText: { color: '#FFF' },
  twoCol: { flexDirection: 'row', gap: 10 },
  colItem: { flex: 1 },
  inputButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#F8F8F8',
  },
  inputText: { fontSize: 14, color: '#333', fontWeight: '500' },
  ctaBtn: {
    backgroundColor: '#FFC107', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginTop: 6,
  },
  ctaBtnText: { fontSize: 16, fontWeight: '700', color: '#000' },
});

export default FrequentInvite;