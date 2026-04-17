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

export function CallSecurityModal({ visible, onClose }) {
  const [urgency, setUrgency] = useState('Normal');
  const [message, setMessage] = useState('');

  const handleConfirm = () => {
    console.log('Security called:', { urgency, message });
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
              <Ionicons name="call-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Call{'\n'}Security</Text>

          {/* Urgency Level */}
          <View style={styles.urgencySection}>
            <Text style={styles.sectionLabel}>Urgency Level</Text>
            <View style={styles.urgencyButtons}>
              {['Normal', 'Urgent', 'Emergency'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.urgencyButton,
                    urgency === level && styles.urgencyButtonActive,
                    level === 'Emergency' && urgency === level && styles.emergencyActive,
                  ]}
                  onPress={() => setUrgency(level)}
                >
                  <Text
                    style={[
                      styles.urgencyButtonText,
                      urgency === level && styles.urgencyButtonTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message Input */}
          <View style={styles.messageSection}>
            <Text style={styles.sectionLabel}>Brief Description (Optional)</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Describe the issue..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={40} color="#FFFFFF" />
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
    backgroundColor: '#FFE8E8',
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
  urgencySection: {
    width: '100%',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: '#FFD62E',
    borderColor: '#FFD62E',
  },
  emergencyActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  urgencyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  urgencyButtonTextActive: {
    color: '#1E1E1E',
  },
  messageSection: {
    width: '100%',
    marginBottom: 20,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1E1E1E',
    maxHeight: 80,
  },
  confirmButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#FF6B6B',
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
