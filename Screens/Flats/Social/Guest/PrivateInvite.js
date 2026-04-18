import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PrivateInvite = ({ visible, onClose }) => {
  const [silentMode, setSilentMode] = useState(true);
  const [notes, setNotes] = useState('');

  if (!visible) return null;

  return (
    <View style={styles.content}>
      <View style={styles.section}>
        <View style={styles.infoHeader}>
          <MaterialCommunityIcons name="lock-outline" size={16} color="#9C27B0" />
          <Text style={styles.infoTitle}>Private & Silent Entry</Text>
        </View>
        <Text style={styles.infoDesc}>Guest will enter silently without any announcements or disturbances to other residents.</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Silent Mode</Text>
          <TouchableOpacity
            style={[styles.toggle, silentMode && styles.toggleActive]}
            onPress={() => setSilentMode(!silentMode)}
          >
            <View style={[styles.toggleThumb, silentMode && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputText}>Today</Text>
          <MaterialCommunityIcons name="calendar" size={18} color="#9C27B0" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.twoCol}>
          <View style={styles.colItem}>
            <Text style={styles.subLabel}>Starting from</Text>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputText}>02:49 PM</Text>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#9C27B0" />
            </TouchableOpacity>
          </View>
          <View style={styles.colItem}>
            <Text style={styles.subLabel}>Valid for</Text>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputText}>8 Hours</Text>
              <MaterialCommunityIcons name="clock-outline" size={16} color="#9C27B0" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any special instructions..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <TouchableOpacity style={styles.ctaBtn} onPress={() => Alert.alert('Success', 'Ready to select guests!')}>
        <Text style={styles.ctaBtnText}>Select Guest(s)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { padding: 16 },
  section: { marginBottom: 13 },
  infoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  infoTitle: { fontSize: 13, fontWeight: '600', color: '#9C27B0', marginLeft: 7 },
  infoDesc: { fontSize: 12, color: '#666', marginLeft: 23, lineHeight: 17 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 8 },
  subLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 6 },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 11, paddingHorizontal: 14, backgroundColor: '#F8F8F8', borderRadius: 12,
  },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  toggle: {
    width: 46, height: 26, borderRadius: 13,
    backgroundColor: '#E0E0E0', justifyContent: 'center', paddingHorizontal: 2,
  },
  toggleActive: { backgroundColor: '#9C27B0' },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFF', alignSelf: 'flex-start' },
  toggleThumbActive: { alignSelf: 'flex-end' },
  inputButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#F8F8F8',
  },
  inputText: { fontSize: 14, color: '#333', fontWeight: '500' },
  twoCol: { flexDirection: 'row', gap: 10 },
  colItem: { flex: 1 },
  notesInput: {
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#F8F8F8',
    fontSize: 13, color: '#333', textAlignVertical: 'top',
  },
  ctaBtn: {
    backgroundColor: '#FFC107', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginTop: 6,
  },
  ctaBtnText: { fontSize: 16, fontWeight: '700', color: '#000' },
});

export default PrivateInvite;