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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function HostEventModal({ visible, onClose }) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');
  const [venue, setVenue] = useState('');
  const [eventType, setEventType] = useState('Social');
  const [maxAttendees, setMaxAttendees] = useState('');

  const timeOptions = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const eventTypes = ['Social', 'Sports', 'Festival', 'Meeting', 'Celebration', 'Educational', 'Other'];
  const venues = ['Community Hall', 'Garden', 'Park', 'Courtyard', 'Terrace', 'Swimming Pool', 'Gymnasium', 'Other'];

  const handleCreateEvent = () => {
    if (!eventName.trim() || !selectedDate || !selectedDay || !selectedTime || !venue) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Event Created:', {
      eventName,
      eventDescription,
      eventType,
      date: selectedDate,
      day: selectedDay,
      time: selectedTime,
      timeSlot: selectedTimeSlot,
      venue,
      maxAttendees: maxAttendees || 'Unlimited',
      timestamp: new Date(),
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setSelectedDate('');
    setSelectedDay('');
    setSelectedTime('');
    setSelectedTimeSlot('morning');
    setVenue('');
    setEventType('Social');
    setMaxAttendees('');
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
            <Text style={styles.headerTitle}>Host an Event</Text>
            <TouchableOpacity 
              onPress={handleCreateEvent}
              style={[styles.createButton, !eventName.trim() && styles.createButtonDisabled]}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* Event Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Type</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.typeScroll}
              >
                {eventTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      eventType === type && styles.typeButtonActive,
                    ]}
                    onPress={() => setEventType(type)}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        eventType === type && styles.typeButtonTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Event Name */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Community Picnic, Sports Tournament"
                placeholderTextColor="#999"
                value={eventName}
                onChangeText={setEventName}
                maxLength={100}
              />
              <View style={styles.charCounter}>
                <Text style={styles.charCountText}>{eventName.length}/100</Text>
              </View>
            </View>

            {/* Event Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <TextInput
                style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
                placeholder="Tell people about your event..."
                placeholderTextColor="#999"
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
                maxLength={300}
              />
              <View style={styles.charCounter}>
                <Text style={styles.charCountText}>{eventDescription.length}/300</Text>
              </View>
            </View>

            {/* Date */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Date *</Text>
              <TouchableOpacity style={styles.dateInput}>
                <Ionicons name="calendar-outline" size={20} color="#1D97E8" />
                <TextInput
                  style={styles.dateInputText}
                  placeholder="Select Date (DD/MM/YYYY)"
                  placeholderTextColor="#999"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                  editable={false}
                />
              </TouchableOpacity>
              <Text style={styles.helperText}>Tap to select a date from calendar</Text>
            </View>

            {/* Day of Week */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Day of Week *</Text>
              <View style={styles.dayGrid}>
                {daysOfWeek.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDay === day && styles.dayButtonActive,
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text
                      style={[
                        styles.dayButtonText,
                        selectedDay === day && styles.dayButtonTextActive,
                      ]}
                    >
                      {day.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Time *</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.timeScroll}
              >
                {timeOptions.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      selectedTime === time && styles.timeButtonActive,
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      style={[
                        styles.timeButtonText,
                        selectedTime === time && styles.timeButtonTextActive,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Time Slot */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Time Period</Text>
              <View style={styles.timeSlotRow}>
                <TouchableOpacity
                  style={[
                    styles.timeSlotButton,
                    selectedTimeSlot === 'morning' && styles.timeSlotButtonActive,
                  ]}
                  onPress={() => setSelectedTimeSlot('morning')}
                >
                  <Ionicons 
                    name="sunny-outline" 
                    size={20} 
                    color={selectedTimeSlot === 'morning' ? '#FFF' : '#1D97E8'}
                  />
                  <Text
                    style={[
                      styles.timeSlotText,
                      selectedTimeSlot === 'morning' && styles.timeSlotTextActive,
                    ]}
                  >
                    Morning (6AM-12PM)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.timeSlotButton,
                    selectedTimeSlot === 'evening' && styles.timeSlotButtonActive,
                  ]}
                  onPress={() => setSelectedTimeSlot('evening')}
                >
                  <Ionicons 
                    name="moon-outline" 
                    size={20} 
                    color={selectedTimeSlot === 'evening' ? '#FFF' : '#1D97E8'}
                  />
                  <Text
                    style={[
                      styles.timeSlotText,
                      selectedTimeSlot === 'evening' && styles.timeSlotTextActive,
                    ]}
                  >
                    Evening (6PM-11PM)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Venue */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Venue *</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.venueScroll}
              >
                {venues.map((place) => (
                  <TouchableOpacity
                    key={place}
                    style={[
                      styles.venueButton,
                      venue === place && styles.venueButtonActive,
                    ]}
                    onPress={() => setVenue(place)}
                  >
                    <Ionicons 
                      name="location-outline" 
                      size={18} 
                      color={venue === place ? '#FFF' : '#1D97E8'}
                    />
                    <Text
                      style={[
                        styles.venueButtonText,
                        venue === place && styles.venueButtonTextActive,
                      ]}
                    >
                      {place}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Max Attendees */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Max Attendees</Text>
              <TextInput
                style={styles.input}
                placeholder="Leave blank for unlimited"
                placeholderTextColor="#999"
                value={maxAttendees}
                onChangeText={setMaxAttendees}
                keyboardType="number-pad"
              />
            </View>

            {/* Event Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Ionicons name="calendar-outline" size={18} color="#1D97E8" />
                  <Text style={styles.summaryText}>
                    {selectedDay && selectedDate ? `${selectedDay}, ${selectedDate}` : 'Date not selected'}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Ionicons name="time-outline" size={18} color="#1D97E8" />
                  <Text style={styles.summaryText}>
                    {selectedTime ? `${selectedTime} (${selectedTimeSlot})` : 'Time not selected'}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Ionicons name="location-outline" size={18} color="#1D97E8" />
                  <Text style={styles.summaryText}>
                    {venue || 'Venue not selected'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Community Note */}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle-outline" size={20} color="#1D97E8" />
              <Text style={styles.noteText}>
                Your event will be visible to all residents. They can register to attend.
              </Text>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  typeScroll: {
    flexGrow: 0,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  typeButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  typeButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#FFF',
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  charCountText: {
    fontSize: 12,
    color: '#999',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateInputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  helperText: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: '14%',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  dayButtonText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  dayButtonTextActive: {
    color: '#FFF',
  },
  timeScroll: {
    flexGrow: 0,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  timeButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  timeButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: '#FFF',
  },
  timeSlotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlotButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginHorizontal: 6,
  },
  timeSlotButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  timeSlotText: {
    fontSize: 13,
    color: '#1D97E8',
    fontWeight: '500',
    marginLeft: 8,
  },
  timeSlotTextActive: {
    color: '#FFF',
  },
  venueScroll: {
    flexGrow: 0,
  },
  venueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  venueButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  venueButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  venueButtonTextActive: {
    color: '#FFF',
  },
  summaryCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    color: '#1D97E8',
    marginLeft: 10,
    flex: 1,
  },
});
