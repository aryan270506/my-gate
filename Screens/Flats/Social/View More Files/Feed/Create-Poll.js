import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function CreatePollModal({ visible, onClose }) {
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollDuration, setPollDuration] = useState('24 hours');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [pollCategory, setPollCategory] = useState('Meeting');

  const durations = ['24 hours', '3 days', '7 days', '14 days', 'No limit'];
  const categories = ['Meeting', 'Feedback', 'Decision', 'Fun', 'Rules', 'Event Planning', 'Other'];

  const handleAddOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...pollOptions];
    newOptions[index] = text;
    setPollOptions(newOptions);
  };

  const handleCreatePoll = () => {
    if (pollQuestion.trim() === '') {
      alert('Please enter a poll question');
      return;
    }
    const filledOptions = pollOptions.filter(opt => opt.trim() !== '');
    if (filledOptions.length < 2) {
      alert('Please provide at least 2 poll options');
      return;
    }
    console.log('Poll Created:', {
      question: pollQuestion,
      options: filledOptions,
      duration: pollDuration,
      allowMultiple: allowMultiple,
      category: pollCategory,
      timestamp: new Date(),
    });
    setPollQuestion('');
    setPollOptions(['', '']);
    setPollDuration('24 hours');
    setAllowMultiple(false);
    setPollCategory('Meeting');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Poll</Text>
            <TouchableOpacity 
              onPress={handleCreatePoll}
              style={[styles.createButton, pollQuestion.trim() === '' && styles.createButtonDisabled]}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* Poll Category */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Poll Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryTag,
                      pollCategory === category && styles.categoryTagActive,
                    ]}
                    onPress={() => setPollCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryTagText,
                        pollCategory === category && styles.categoryTagTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Poll Question */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Poll Question</Text>
              <TextInput
                style={[styles.questionInput, { borderColor: '#E0E0E0' }]}
                placeholder="What's your question? (e.g., Should we have a community meeting?)"
                placeholderTextColor="#999"
                value={pollQuestion}
                onChangeText={setPollQuestion}
                maxLength={150}
              />
              <View style={styles.charCounter}>
                <Text style={styles.charCountText}>{pollQuestion.length}/150</Text>
              </View>
            </View>

            {/* Poll Options */}
            <View style={styles.section}>
              <View style={styles.optionHeaderRow}>
                <Text style={styles.sectionTitle}>Poll Options</Text>
                <Text style={styles.optionCount}>{pollOptions.length} options</Text>
              </View>
              
              {pollOptions.map((option, index) => (
                <View key={index} style={styles.optionInputContainer}>
                  <Text style={styles.optionNumber}>{index + 1}.</Text>
                  <TextInput
                    style={styles.optionInput}
                    placeholder={`Option ${index + 1}`}
                    placeholderTextColor="#999"
                    value={option}
                    onChangeText={(text) => handleOptionChange(text, index)}
                    maxLength={80}
                  />
                  {pollOptions.length > 2 && (
                    <TouchableOpacity
                      onPress={() => handleRemoveOption(index)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              {pollOptions.length < 6 && (
                <TouchableOpacity
                  style={styles.addOptionButton}
                  onPress={handleAddOption}
                >
                  <Ionicons name="add-circle-outline" size={20} color="#1D97E8" />
                  <Text style={styles.addOptionText}>Add Option</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Poll Duration */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Poll Duration</Text>
              <View style={styles.durationGrid}>
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationButton,
                      pollDuration === duration && styles.durationButtonActive,
                    ]}
                    onPress={() => setPollDuration(duration)}
                  >
                    <Text
                      style={[
                        styles.durationButtonText,
                        pollDuration === duration && styles.durationButtonTextActive,
                      ]}
                    >
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Vote Settings */}
            <View style={styles.section}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Allow Multiple Votes</Text>
                  <Text style={styles.settingDesc}>Users can select multiple options</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggle, allowMultiple && styles.toggleActive]}
                  onPress={() => setAllowMultiple(!allowMultiple)}
                >
                  <View style={[styles.toggleCircle, allowMultiple && styles.toggleCircleActive]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Preview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preview</Text>
              <View style={styles.previewCard}>
                <View style={styles.previewHeader}>
                  <View style={styles.previewAvatar}>
                    <Ionicons name="person-circle-outline" size={40} color="#DDD" />
                  </View>
                  <View>
                    <Text style={styles.previewUserName}>Your Name</Text>
                    <Text style={styles.previewTime}>Just now</Text>
                  </View>
                </View>
                <View style={styles.previewQuestionBox}>
                  <View style={styles.pollBadge}>
                    <Ionicons name="bar-chart-outline" size={14} color="#FFF" />
                    <Text style={styles.pollBadgeText}>POLL</Text>
                  </View>
                  <Text style={styles.previewQuestion}>
                    {pollQuestion || 'Your poll question will appear here'}
                  </Text>
                  <Text style={styles.previewCategory}>{pollCategory}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#1D97E8',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonDisabled: {
    backgroundColor: '#CCC',
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  categoryTagActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  categoryTagText: {
    fontSize: 13,
    color: '#666',
  },
  categoryTagTextActive: {
    color: '#FFF',
    fontWeight: '500',
  },
  questionInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  charCountText: {
    fontSize: 12,
    color: '#999',
  },
  optionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  optionInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 8,
    width: 20,
  },
  optionInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  removeButton: {
    marginLeft: 8,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1D97E8',
    marginTop: 8,
  },
  addOptionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#1D97E8',
    fontWeight: '500',
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  durationButton: {
    width: '48%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginBottom: 8,
    alignItems: 'center',
  },
  durationButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  durationButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  durationButtonTextActive: {
    color: '#FFF',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  settingDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  previewCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewAvatar: {
    marginRight: 10,
  },
  previewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  previewTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  previewQuestionBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
  },
  pollBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D97E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  pollBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 4,
  },
  previewQuestion: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  previewCategory: {
    fontSize: 11,
    color: '#999',
  },
});
