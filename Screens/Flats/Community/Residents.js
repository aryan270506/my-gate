import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const residentsData = [
  {
    id: 1,
    name: 'Rajesh Patel',
    flat: 'G9 801',
    phone: '9876543210',
    email: 'rajesh.p@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    profession: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    flat: 'G9 802',
    phone: '9765432109',
    email: 'priya.sharma@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    profession: 'Doctor',
  },
  {
    id: 3,
    name: 'Anil Kumar',
    flat: 'G9 803',
    phone: '9654321098',
    email: 'anil.kumar@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    profession: 'Business Owner',
  },
  {
    id: 4,
    name: 'Meera Singh',
    flat: 'G9 804',
    phone: '9543210987',
    email: 'meera.singh@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    profession: 'Architect',
  },
  {
    id: 5,
    name: 'Vikram Desai',
    flat: 'G9 805',
    phone: '9432109876',
    email: 'vikram.d@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    profession: 'Manager',
  },
];

export default function ResidentsScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState('');
  const [expandedResident, setExpandedResident] = React.useState(null);

  const filteredResidents = residentsData.filter((resident) =>
    resident.name.toLowerCase().includes(searchText.toLowerCase()) ||
    resident.flat.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Residents</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={24} color="#387CFF" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.statLabel}>Total Residents</Text>
              <Text style={styles.statValue}>{residentsData.length}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Ionicons name="home-outline" size={24} color="#48B24E" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.statLabel}>Active Flats</Text>
              <Text style={styles.statValue}>{residentsData.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search residents..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {filteredResidents.length > 0 ? (
          filteredResidents.map((resident) => (
            <TouchableOpacity
              key={resident.id}
              style={styles.residentCard}
              onPress={() => setExpandedResident(expandedResident === resident.id ? null : resident.id)}
            >
              <View style={styles.residentTop}>
                <Image source={{ uri: resident.avatar }} style={styles.avatar} />
                <View style={styles.residentInfo}>
                  <Text style={styles.residentName}>{resident.name}</Text>
                  <Text style={styles.residentFlat}>{resident.flat}</Text>
                  <Text style={styles.profession}>{resident.profession}</Text>
                </View>
                <Ionicons
                  name={expandedResident === resident.id ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#666"
                />
              </View>

              {expandedResident === resident.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.contactItem}>
                    <Ionicons name="call-outline" size={18} color="#387CFF" />
                    <Text style={styles.contactText}>{resident.phone}</Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Ionicons name="mail-outline" size={18} color="#387CFF" />
                    <Text style={styles.contactText}>{resident.email}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Ionicons name="call" size={18} color="#FFF" />
                      <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <Ionicons name="chatbubble-outline" size={18} color="#FFF" />
                      <Text style={styles.actionButtonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color="#CCC" />
            <Text style={styles.emptyStateText}>No residents found</Text>
          </View>
        )}
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
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  statLabel: { fontSize: 12, color: '#999' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginTop: 2 },
  divider: { width: 1, height: 40, backgroundColor: '#E8E8E8', marginHorizontal: 16 },
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
  residentCard: {
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
  residentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  residentInfo: { flex: 1 },
  residentName: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  residentFlat: { fontSize: 12, color: '#666', marginTop: 2 },
  profession: { fontSize: 11, color: '#999', marginTop: 2 },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  contactText: { fontSize: 13, color: '#555', flex: 1 },
  actionButtons: { flexDirection: 'row', gap: 10, marginTop: 12 },
  actionButton: {
    flex: 1,
    backgroundColor: '#387CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  actionButtonText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyStateText: { fontSize: 16, color: '#999', marginTop: 12 },
});
