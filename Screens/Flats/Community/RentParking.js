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

const parkingSpotsData = [
  {
    id: 'P001',
    spotName: 'Ground Floor - Spot A1',
    floor: 'Ground',
    type: 'Car',
    size: 'Standard',
    price: '₹ 3,000/month',
    owner: 'Available for Rent',
    available: true,
    description: 'Near main entrance, well-lit with security camera',
  },
  {
    id: 'P002',
    spotName: 'First Floor - Spot B3',
    floor: 'First',
    type: 'Bike',
    size: 'Compact',
    price: '₹ 500/month',
    owner: 'Rajesh Patel',
    available: true,
    description: 'Covered bike parking with weatherproof shelter',
  },
  {
    id: 'P003',
    spotName: 'Ground Floor - Spot A2',
    floor: 'Ground',
    type: 'Car',
    size: 'Standard',
    price: '₹ 2,500/month',
    owner: 'Available for Rent',
    available: true,
    description: 'Adjacent to visitor parking, easy access',
  },
  {
    id: 'P004',
    spotName: 'Basement - Spot B5',
    floor: 'Basement',
    type: 'Car',
    size: 'Large',
    price: 'Occupied',
    owner: 'Occupied',
    available: false,
    description: 'Premium spot with dedicated charging point',
  },
  {
    id: 'P005',
    spotName: 'First Floor - Spot B4',
    floor: 'First',
    type: 'Bike',
    size: 'Compact',
    price: '₹ 400/month',
    owner: 'Available for Rent',
    available: true,
    description: 'Open air bike parking with good ventilation',
  },
];

export default function RentParkingScreen({ navigation }) {
  const [selectedType, setSelectedType] = React.useState('All');
  const [searchText, setSearchText] = React.useState('');

  const filteredSpots = parkingSpotsData.filter((spot) => {
    const matchesType = selectedType === 'All' || spot.type === selectedType;
    const matchesSearch = spot.spotName.toLowerCase().includes(searchText.toLowerCase());
    return matchesType && matchesSearch;
  });

  const availableCount = parkingSpotsData.filter((s) => s.available).length;
  const carSpots = parkingSpotsData.filter((s) => s.type === 'Car').length;
  const bikeSpots = parkingSpotsData.filter((s) => s.type === 'Bike').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Parking</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{availableCount}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{carSpots}</Text>
            <Text style={styles.statLabel}>Car Spots</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{bikeSpots}</Text>
            <Text style={styles.statLabel}>Bike Spots</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search parking spots..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterRow}>
          {['All', 'Car', 'Bike'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterTab, selectedType === type && styles.activeFilter]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[styles.filterText, selectedType === type && styles.activeFilterText]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <View key={spot.id} style={styles.spotCard}>
              <View style={styles.spotHeader}>
                <View>
                  <Text style={styles.spotName}>{spot.spotName}</Text>
                  <View style={styles.spotMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="locate-outline" size={14} color="#666" />
                      <Text style={styles.metaText}>{spot.floor}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="expand-outline" size={14} color="#666" />
                      <Text style={styles.metaText}>{spot.size}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.availableBadge,
                    !spot.available && styles.occupiedBadge,
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {spot.available ? 'Available' : 'Occupied'}
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>{spot.description}</Text>

              <View style={styles.spotFooter}>
                <View>
                  <Text style={styles.ownerText}>{spot.owner}</Text>
                  <Text style={styles.priceText}>{spot.price}</Text>
                </View>
                {spot.available && (
                  <TouchableOpacity style={styles.rentButton}>
                    <Text style={styles.rentButtonText}>Inquire</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="car-outline" size={48} color="#CCC" />
            <Text style={styles.emptyStateText}>No parking spots found</Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  statNumber: { fontSize: 18, fontWeight: '800', color: '#387CFF' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 14, color: '#333' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeFilter: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  filterText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeFilterText: { color: '#000', fontWeight: '700' },
  spotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  spotName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  spotMeta: { flexDirection: 'row', gap: 12, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#666' },
  availableBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  occupiedBadge: { backgroundColor: '#F3E5E5' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#48B24E', lineHeight: 14 },
  description: { fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 18 },
  spotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  ownerText: { fontSize: 12, color: '#999' },
  priceText: { fontSize: 16, fontWeight: '800', color: '#1A1A1A', marginTop: 4 },
  rentButton: {
    backgroundColor: '#FFD900',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  rentButtonText: { fontSize: 13, fontWeight: '700', color: '#000' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyStateText: { fontSize: 16, color: '#999', marginTop: 12 },
});
