import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const timeOptions = ['30 Minutes', '1 Hour', '2 Hours', '4 Hours', '8 Hours'];

export function AllowKidExitModal({ visible, onClose }) {
  const [selectedTime, setSelectedTime] = useState('2 Hours');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConfirm = () => {
    console.log('Kid exit allowed for:', selectedTime);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Yellow Icon Circle */}
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Ionicons name="happy-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Allow my kid to{'\n'}exit in next</Text>

          {/* Time Selector Dropdown */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.selectedTime}>{selectedTime}</Text>
            <Ionicons
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#1E1E1E"
            />
          </TouchableOpacity>

          {/* Dropdown Menu */}
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.dropdownItem,
                    selectedTime === time && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedTime(time);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedTime === time && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={40} color="#1E1E1E" />
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default AllowKidExitModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '80%',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD62E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#FFD62E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 36,
  },
  dropdownButton: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#1E1E1E',
    paddingBottom: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  dropdownMenu: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 24,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemSelected: {
    backgroundColor: '#FFE8A3',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dropdownItemTextSelected: {
    color: '#1E1E1E',
    fontWeight: '700',
  },
  confirmButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD62E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#FFD62E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
});
