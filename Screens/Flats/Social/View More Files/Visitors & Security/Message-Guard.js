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

const messageTemplates = [
  'Open the gate',
  'I am arriving soon',
  'Allow guest entry',
  'Need assistance',
];

export function MessageGuardModal({ visible, onClose }) {
  const [message, setMessage] = useState('');
  const [useTemplate, setUseTemplate] = useState(false);

  const handleSendMessage = () => {
    console.log('Message sent:', message);
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
              <Ionicons name="mail-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Message{'\n'}Guard</Text>

          {/* Quick Templates */}
          {useTemplate ? (
            <View style={styles.templatesSection}>
              <Text style={styles.subsectionLabel}>Quick Messages</Text>
              {messageTemplates.map((template) => (
                <TouchableOpacity
                  key={template}
                  style={styles.templateButton}
                  onPress={() => {
                    setMessage(template);
                    setUseTemplate(false);
                  }}
                >
                  <Text style={styles.templateButtonText}>{template}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          {/* Message Input */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionLabel}>Your Message</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message here..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={200}
            />
            <Text style={styles.charCount}>{message.length}/200</Text>
          </View>

          {/* Template Toggle */}
          {!useTemplate && (
            <TouchableOpacity
              style={styles.templateToggle}
              onPress={() => setUseTemplate(!useTemplate)}
            >
              <Ionicons name="list-outline" size={16} color="#1D97E8" />
              <Text style={styles.templateToggleText}>Use Template</Text>
            </TouchableOpacity>
          )}

          {/* Send Button */}
          <TouchableOpacity
            style={[styles.confirmButton, !message && styles.confirmButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!message}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={40} color="#FFFFFF" />
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
    maxHeight: '85%',
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F4FF',
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
  templatesSection: {
    width: '100%',
    marginBottom: 20,
    maxHeight: 150,
  },
  subsectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 10,
  },
  templateButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  templateButtonText: {
    fontSize: 13,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  inputSection: {
    width: '100%',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1E1E1E',
    minHeight: 80,
    maxHeight: 100,
  },
  charCount: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  templateToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  templateToggleText: {
    fontSize: 13,
    color: '#1D97E8',
    fontWeight: '600',
  },
  confirmButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1D97E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#1D97E8',
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
