import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function CabAutoModal({ visible, onClose }) {
  const [cabType, setCabType] = useState('Cab');
  const [vehicleNo, setVehicleNo] = useState('');
  const [driverName, setDriverName] = useState('');

  const handleConfirm = () => {
    console.log('Cab/Auto info:', { cabType, vehicleNo, driverName });
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon Circle */}
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Ionicons name="car-sport-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Cab / Auto{'\n'}Arrival</Text>

          {/* Cab Type Selector */}
          <View style={styles.typeSelector}>
            {['Cab', 'Auto'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  cabType === type && styles.typeButtonActive,
                ]}
                onPress={() => setCabType(type)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    cabType === type && styles.typeButtonTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Vehicle Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Vehicle Number"
            placeholderTextColor="#999"
            value={vehicleNo}
            onChangeText={setVehicleNo}
          />

          {/* Driver Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Driver Name"
            placeholderTextColor="#999"
            value={driverName}
            onChangeText={setDriverName}
          />

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
    backgroundColor: '#FFF0E0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 36,
  },
  typeSelector: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#FFD62E',
    borderColor: '#FFD62E',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#1E1E1E',
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#1E1E1E',
    paddingBottom: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#1E1E1E',
  },
  confirmButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD62E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
