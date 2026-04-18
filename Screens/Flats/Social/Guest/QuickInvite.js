import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuickInvite = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('once');
  const [selectedDate] = useState('Today');
  const [startTime] = useState('02:49 PM');
  const [validFor] = useState('8 Hours');
  const [startDate] = useState('18 Apr');
  const [endDate] = useState('18 May');
  const [allowEntryFor, setAllowEntryFor] = useState('1 week');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!visible) return null;

  return (
    <View>
      {/* Sub tabs */}
      <View style={styles.subTabContainer}>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 'once' && styles.activeSubTab]}
          onPress={() => setActiveTab('once')}
        >
          <Text style={[styles.subTabText, activeTab === 'once' && styles.activeSubTabText]}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, activeTab === 'frequently' && styles.activeSubTab]}
          onPress={() => setActiveTab('frequently')}
        >
          <Text style={[styles.subTabText, activeTab === 'frequently' && styles.activeSubTabText]}>Frequently</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'once' ? (
          <>
            <View style={styles.section}>
              <View style={styles.checkboxRow}>
                <TouchableOpacity
                  style={[styles.checkbox, isPrivate && styles.checkboxChecked]}
                  onPress={() => setIsPrivate(!isPrivate)}
                >
                  {isPrivate && <MaterialCommunityIcons name="check" size={14} color="#1D97E8" />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Make it private</Text>
              </View>
              {isPrivate && (
                <View style={styles.infoBox}>
                  <MaterialCommunityIcons name="lock" size={14} color="#9C27B0" />
                  <Text style={styles.infoText}>This allows silent entries of your guests without disturbing others</Text>
                  <TouchableOpacity><Text style={styles.knowMoreLink}>Know more</Text></TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <TouchableOpacity style={styles.inputButton}>
                <Text style={styles.inputText}>{selectedDate}</Text>
                <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <View style={styles.twoCol}>
                <View style={styles.colItem}>
                  <Text style={styles.subLabel}>Starting from</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>{startTime}</Text>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#0d3d2f" />
                  </TouchableOpacity>
                </View>
                <View style={styles.colItem}>
                  <Text style={styles.subLabel}>Valid for</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>{validFor}</Text>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#0d3d2f" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Allow entry for next</Text>
              <View style={styles.segGroup}>
                {['1 week', '1 month', '>1 month'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.segBtn, allowEntryFor === option && styles.segBtnActive]}
                    onPress={() => setAllowEntryFor(option)}
                  >
                    <Text style={[styles.segBtnText, allowEntryFor === option && styles.segBtnActiveText]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.twoCol}>
                <View style={styles.colItem}>
                  <Text style={styles.subLabel}>Start date</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>{startDate}</Text>
                    <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
                  </TouchableOpacity>
                </View>
                <View style={styles.colItem}>
                  <Text style={styles.subLabel}>End date</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputText}>{endDate}</Text>
                    <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.ctaBtn} onPress={() => Alert.alert('Success', 'Ready to select guests!')}>
          <Text style={styles.ctaBtnText}>Select Guest(s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subTabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
  },
  subTab: {
    flex: 1, paddingVertical: 13, alignItems: 'center',
    borderBottomWidth: 3, borderBottomColor: 'transparent', marginBottom: -2,
  },
  activeSubTab: { borderBottomColor: '#0d3d2f' },
  subTabText: { fontSize: 14, color: '#999', fontWeight: '500' },
  activeSubTabText: { color: '#0d3d2f', fontWeight: '700' },
  content: { padding: 16 },
  section: { marginBottom: 13 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 8 },
  subLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 6 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkbox: {
    width: 20, height: 20, borderWidth: 2, borderColor: '#E0E0E0',
    borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  checkboxChecked: { backgroundColor: '#E3F2FD', borderColor: '#1D97E8' },
  checkboxLabel: { fontSize: 14, color: '#333', fontWeight: '500' },
  infoBox: {
    backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10,
    flexDirection: 'row', alignItems: 'flex-start',
  },
  infoText: { fontSize: 12, color: '#666', marginLeft: 8, flex: 1, lineHeight: 17 },
  knowMoreLink: { fontSize: 12, color: '#1D97E8', fontWeight: '600' },
  inputButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#F8F8F8',
  },
  inputText: { fontSize: 14, color: '#333', fontWeight: '500' },
  twoCol: { flexDirection: 'row', gap: 10 },
  colItem: { flex: 1 },
  segGroup: { flexDirection: 'row', gap: 8 },
  segBtn: {
    flex: 1, paddingVertical: 10, borderWidth: 1.5, borderColor: '#E0E0E0',
    borderRadius: 12, alignItems: 'center', backgroundColor: '#FFF',
  },
  segBtnActive: { backgroundColor: '#0d3d2f', borderColor: '#0d3d2f' },
  segBtnText: { fontSize: 12, color: '#666', fontWeight: '500', textAlign: 'center' },
  segBtnActiveText: { color: '#FFF', fontWeight: '600' },
  ctaBtn: {
    backgroundColor: '#FFC107', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center', marginTop: 6,
  },
  ctaBtnText: { fontSize: 16, fontWeight: '700', color: '#000' },
});

export default QuickInvite;