import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const classesData = [
  {
    id: 1,
    title: 'Tuition Classes For Nursery - 1...',
    instructor: 'Jhalak',
    initials: 'J#',
    badge: 'NEW',
    badgeColor: '#6C5CE7',
    type: 'Tuition',
    subjects: ['Accounting', 'Finance', 'Mathematics'],
    pricing: 'Price on inquiry',
  },
  {
    id: 2,
    title: 'Grades 1-12 | SAT Prep | AI',
    instructor: 'Anushka Shrivastava',
    initials: 'AS',
    badge: 'NEW',
    badgeColor: '#27AE60',
    type: 'Tuition',
    subjects: ['Math', 'Science', 'SAT'],
    pricing: 'Online / Offline Classes',
  },
];

export function ClassesModal({ visible, onClose }) {
  const handleClassPress = (classItem) => {
    console.log('Clicked class:', classItem.title);
  };

  const handleHostClass = () => {
    console.log('Host a class pressed');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Classes</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.headerText}>
            Showing {classesData.length} classes from your society
          </Text>

          <View style={styles.gridContainer}>
            {classesData.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                onPress={() => handleClassPress(classItem)}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.badgeContainer}>
                    <Text style={[styles.badge, { backgroundColor: classItem.badgeColor }]}>
                      {classItem.badge}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.initialsCircle,
                      { backgroundColor: classItem.badgeColor },
                    ]}
                  >
                    <Text style={styles.initialsText}>{classItem.initials}</Text>
                  </View>
                </View>

                <View style={styles.courseInfo}>
                  <Text style={styles.courseSubjects}>
                    {classItem.subjects.join(', ')}
                  </Text>
                  <Text style={styles.coursePricing}>{classItem.pricing}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.classTitle}>{classItem.title}</Text>
                <Text style={styles.instructorName}>{classItem.instructor}</Text>
                <Text style={styles.typeLabel}>{classItem.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.hostButton}
          onPress={handleHostClass}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#1E1E1E" />
          <Text style={styles.hostButtonText}>Host a class</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  classCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  badgeContainer: {
    flex: 1,
  },
  badge: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  initialsCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  courseInfo: {
    marginBottom: 10,
  },
  courseSubjects: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  coursePricing: {
    fontSize: 10,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 10,
  },
  classTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  instructorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  hostButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#FFD62E',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 8,
    shadowColor: '#FFD62E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  hostButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
  },
});
