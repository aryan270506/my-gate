import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const inviteOptions = [
  {
    id: 1,
    title: 'Quick Invite',
    description: 'Ensure smooth entry by manually pre-approving guests. Best for small, personal gatherings.',
    icon: 'person-outline',
    color: '#F0F0F0',
  },
  {
    id: 2,
    title: 'Party/Group Invite',
    description: 'Create a common guest invite link with a limit for large gatherings and easy tracking.',
    icon: 'people-outline',
    color: '#F0F0F0',
  },
  {
    id: 3,
    title: 'Frequent Invite',
    description: 'Invite long-term guests with a single passcode, without repeated approvals.',
    icon: 'person-circle-outline',
    color: '#F0F0F0',
  },
  {
    id: 4,
    title: 'Private Invite',
    description: 'This allows silent entries of your guests without disturbing others',
    icon: 'lock-closed-outline',
    color: '#E8DFF5',
    isHighlighted: true,
  },
];

export function InviteGuestModal({ visible, onClose, onSelectOption }) {
  const handleOptionPress = (option) => {
    if (onSelectOption) {
      onSelectOption(option);
    }
    // You can keep the modal open or close it based on requirements
    // onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          <ScrollView 
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={28} color="#1E1E1E" />
            </TouchableOpacity>

            {/* Header Title */}
            <Text style={styles.headerTitle}>Guest Invite</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Create pre-approval of expected visitors{'\n'}to ensure hassle-free entry for them
            </Text>

            {/* Options Grid */}
            <View style={styles.optionsContainer}>
              {inviteOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: option.isHighlighted ? option.color : option.color,
                    },
                    option.isHighlighted && styles.highlightedCard,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleOptionPress(option)}
                >
                  <View style={styles.optionHeader}>
                    <Text
                      style={[
                        styles.optionTitle,
                        option.isHighlighted && styles.highlightedTitle,
                      ]}
                    >
                      {option.title}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color={option.isHighlighted ? '#5B3B9A' : '#1E1E1E'}
                    />
                  </View>

                  <Text
                    style={[
                      styles.optionDescription,
                      option.isHighlighted && styles.highlightedDescription,
                    ]}
                  >
                    {option.description}
                  </Text>

                  {/* Icon */}
                  <View style={styles.optionIconContainer}>
                    <Ionicons
                      name={option.icon}
                      size={32}
                      color={option.isHighlighted ? '#5B3B9A' : '#1E1E1E'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    padding: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    lineHeight: 20,
    marginBottom: 28,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  highlightedCard: {
    backgroundColor: '#E8DFF5',
    borderWidth: 1,
    borderColor: '#5B3B9A',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    flex: 1,
  },
  highlightedTitle: {
    color: '#5B3B9A',
  },
  optionDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
  },
  highlightedDescription: {
    color: '#5B3B9A',
  },
  optionIconContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
});
