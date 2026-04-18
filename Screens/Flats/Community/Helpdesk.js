import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ticketsData = [
  {
    id: '#TK001',
    title: 'Plumbing Issue in Toilet',
    status: 'In Progress',
    priority: 'High',
    date: '2 hours ago',
    description: 'Water leakage from ceiling',
  },
  {
    id: '#TK002',
    title: 'Electricity Problem',
    status: 'Resolved',
    priority: 'High',
    date: '1 day ago',
    description: 'Power tripping in main line',
  },
  {
    id: '#TK003',
    title: 'Lift Maintenance',
    status: 'Pending',
    priority: 'Medium',
    date: '3 days ago',
    description: 'Regular lift servicing needed',
  },
  {
    id: '#TK004',
    title: 'Pest Control Required',
    status: 'In Progress',
    priority: 'Medium',
    date: '5 days ago',
    description: 'Cockroach infestation in common area',
  },
];

const categories = ['Plumbing', 'Electrical', 'Cleaning', 'Maintenance', 'Others'];

const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress':
      return '#387CFF';
    case 'Resolved':
      return '#48B24E';
    case 'Pending':
      return '#FF9500';
    default:
      return '#999';
  }
};

const getPriorityColor = (priority) => {
  return priority === 'High' ? '#FF4A60' : '#FFB800';
};

export default function HelpdeskScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Helpdesk</Text>
          <TouchableOpacity>
            <Ionicons name="add" size={28} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput placeholder="Search tickets..." placeholderTextColor="#999" style={styles.searchInput} />
        </View>

        <View style={styles.categoryScroll}>
          {['All', ...categories].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, activeCategory === cat && styles.activeCategory]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Your Tickets</Text>
        {ticketsData.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View>
                <Text style={styles.ticketId}>{ticket.id}</Text>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) }]}>
                <Text style={styles.priorityText}>{ticket.priority}</Text>
              </View>
            </View>
            <Text style={styles.ticketDescription}>{ticket.description}</Text>
            <View style={styles.ticketFooter}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(ticket.status) + 20 },
                ]}
              >
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(ticket.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>{ticket.status}</Text>
              </View>
              <Text style={styles.ticketDate}>{ticket.date}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.raiseTicketButton}>
          <Ionicons name="add" size={24} color="#FFF" />
          <Text style={styles.raiseTicketButtonText}>Raise New Ticket</Text>
        </TouchableOpacity>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 14, color: '#333' },
  categoryScroll: { flexDirection: 'row', marginBottom: 18, gap: 8 },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeCategory: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeCategoryText: { color: '#000', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 12 },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketId: { fontSize: 12, fontWeight: '700', color: '#387CFF' },
  ticketTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginTop: 2 },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  ticketDescription: { fontSize: 13, color: '#555', marginBottom: 10 },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 12, fontWeight: '600' },
  ticketDate: { fontSize: 12, color: '#999' },
  raiseTicketButton: {
    backgroundColor: '#173A42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 20,
    gap: 8,
  },
  raiseTicketButtonText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
});
