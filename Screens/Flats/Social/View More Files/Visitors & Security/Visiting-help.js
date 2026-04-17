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

const helpTypes = ['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'Other'];

export function VisitingHelpModal({ visible, onClose }) {
  const [selectedHelp, setSelectedHelp] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Normal');

  const handleConfirm = () => {
    console.log('Help requested:', { selectedHelp, description, urgency });
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
              <Ionicons name="construct-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Visiting{'\n'}Help</Text>

          {/* Help Type Selection */}
          <View style={styles.helpSection}>
            <Text style={styles.sectionLabel}>What help do you need?</Text>
            <View style={styles.helpButtonsGrid}>
              {helpTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.helpButton,
                    selectedHelp === type && styles.helpButtonActive,
                  ]}
                  onPress={() => setSelectedHelp(type)}
                >
                  <Text
                    style={[
                      styles.helpButtonText,
                      selectedHelp === type && styles.helpButtonTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionLabel}>Description</Text>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Describe the issue in detail..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Urgency Level */}
          <View style={styles.urgencySection}>
            <Text style={styles.sectionLabel}>When do you need it?</Text>
            <View style={styles.urgencyButtons}>
              {['Today', 'Tomorrow', 'This Week'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.urgencyButton,
                    urgency === time && styles.urgencyButtonActive,
                  ]}
                  onPress={() => setUrgency(time)}
                >
                  <Text
                    style={[
                      styles.urgencyButtonText,
                      urgency === time && styles.urgencyButtonTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmButton, !selectedHelp && styles.confirmButtonDisabled]}
            onPress={handleConfirm}
            disabled={!selectedHelp}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={40} color="#FFFFFF" />
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
    width: '85%',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    maxHeight: '90%',
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF4E0',
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
  helpSection: {
    width: '100%',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
  },
  helpButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  helpButton: {
    width: '47%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  helpButtonActive: {
    backgroundColor: '#FFD62E',
    borderColor: '#FFD62E',
  },
  helpButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  helpButtonTextActive: {
    color: '#1E1E1E',
  },
  descriptionSection: {
    width: '100%',
    marginBottom: 16,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1E1E1E',
    maxHeight: 80,
  },
  urgencySection: {
    width: '100%',
    marginBottom: 20,
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: '#E8F4FF',
    borderColor: '#1D97E8',
  },
  urgencyButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  urgencyButtonTextActive: {
    color: '#1D97E8',
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
  confirmButtonDisabled: {
    backgroundColor: '#CCC',
    elevation: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
});
