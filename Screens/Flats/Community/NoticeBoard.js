import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const noticesData = [
  {
    id: 1,
    title: 'Water Supply Maintenance',
    description: 'Water supply will be interrupted on 15th April from 9 AM to 2 PM for maintenance work.',
    date: '10 Apr 2026',
    priority: 'High',
    postedBy: 'Management Committee',
  },
  {
    id: 2,
    title: 'Annual General Meeting (AGM)',
    description: 'Annual General Meeting scheduled on 20th April at 6 PM. All residents requested to attend.',
    date: '8 Apr 2026',
    priority: 'High',
    postedBy: 'Management Committee',
  },
  {
    id: 3,
    title: 'Garbage Collection Timing Changed',
    description: 'Garbage collection time has been changed to 6 AM to avoid inconvenience. Please keep dustbins ready.',
    date: '5 Apr 2026',
    priority: 'Medium',
    postedBy: 'Housekeeping Team',
  },
  {
    id: 4,
    title: 'Lift Maintenance Schedule',
    description: 'Lift maintenance will be done on weekends. Residents are requested to use stairs when lifts are under maintenance.',
    date: '2 Apr 2026',
    priority: 'Medium',
    postedBy: 'Admin Department',
  },
  {
    id: 5,
    title: 'New Parking Policy',
    description: 'New parking policy has been implemented. Please visit notice board for complete details and guidelines.',
    date: '1 Apr 2026',
    priority: 'Low',
    postedBy: 'Management Committee',
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#FF4A60';
    case 'Medium':
      return '#FFB800';
    case 'Low':
      return '#48B24E';
    default:
      return '#999';
  }
};

export default function NoticeBoardScreen({ navigation }) {
  const [selectedNotice, setSelectedNotice] = React.useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Notice Board</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{noticesData.length}</Text>
            <Text style={styles.statLabel}>Total Notices</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{noticesData.filter(n => n.priority === 'High').length}</Text>
            <Text style={styles.statLabel}>Important</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>New</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Notices</Text>
        {noticesData.map((notice) => (
          <TouchableOpacity
            key={notice.id}
            style={styles.noticeCard}
            onPress={() => setSelectedNotice(selectedNotice === notice.id ? null : notice.id)}
          >
            <View style={styles.noticeHeader}>
              <View style={styles.noticeLeft}>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(notice.priority) }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <Text style={styles.noticeDate}>{notice.date}</Text>
                </View>
              </View>
              <Ionicons
                name={selectedNotice === notice.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#666"
              />
            </View>
            {selectedNotice === notice.id && (
              <View style={styles.noticeExpandedContent}>
                <Text style={styles.noticeDescription}>{notice.description}</Text>
                <View style={styles.noticeFooter}>
                  <View style={styles.postedByBadge}>
                    <Ionicons name="person-circle-outline" size={16} color="#387CFF" />
                    <Text style={styles.postedByText}>{notice.postedBy}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(notice.priority) }]}>
                    <Text style={styles.priorityBadgeText}>{notice.priority}</Text>
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: '800', color: '#171717', flex: 1, textAlign: 'center' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#387CFF', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#666', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 14 },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  noticeLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  priorityIndicator: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  noticeTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  noticeDate: { fontSize: 12, color: '#999', marginTop: 4 },
  noticeExpandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  noticeDescription: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },
  noticeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedByBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#E8F0FF',
    borderRadius: 12,
  },
  postedByText: { fontSize: 12, fontWeight: '600', color: '#387CFF' },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
});
