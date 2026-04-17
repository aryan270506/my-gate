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

const vehiclesInCommunity = [
  {
    id: 1,
    ownerName: 'Rajesh Patel',
    flat: 'G9 801',
    vehicleType: 'Car',
    vehicleName: 'Honda City',
    plateNumber: 'MH02AB1524',
    color: 'Silver',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    ownerName: 'Priya Sharma',
    flat: 'G9 802',
    vehicleType: 'Bike',
    vehicleName: 'Honda Activa',
    plateNumber: 'MH02CD4789',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    ownerName: 'Anil Kumar',
    flat: 'G9 803',
    vehicleType: 'Bike',
    vehicleName: 'Hero Splendor',
    plateNumber: 'MH02EF6234',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    ownerName: 'Meera Singh',
    flat: 'G9 804',
    vehicleType: 'Car',
    vehicleName: 'Maruti Swift',
    plateNumber: 'MH02GH7856',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
  },
];

export default function SearchVehicleScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState('');
  const [filterType, setFilterType] = React.useState('All');

  const filteredVehicles = vehiclesInCommunity.filter((vehicle) => {
    const matchesSearch =
      vehicle.ownerName.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.flat.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.plateNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType === 'All' || vehicle.vehicleType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Search Vehicle</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Owner name, flat, plate number..."
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
              style={[styles.filterTab, filterType === type && styles.activeFilterTab]}
              onPress={() => setFilterType(type)}
            >
              <Text style={[styles.filterText, filterType === type && styles.activeFilterText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.resultText}>{filteredVehicles.length} vehicles found</Text>

        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <View key={vehicle.id} style={styles.vehicleCard}>
              <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
              <View style={styles.vehicleContent}>
                <View style={styles.header}>
                  <View>
                    <Text style={styles.vehicleName}>{vehicle.vehicleName}</Text>
                    <Text style={styles.ownerName}>{vehicle.ownerName}</Text>
                  </View>
                  <View
                    style={[
                      styles.typeBadge,
                      vehicle.vehicleType === 'Car' ? styles.carBadge : styles.bikeBadge,
                    ]}
                  >
                    <Text style={styles.typeBadgeText}>{vehicle.vehicleType}</Text>
                  </View>
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <Ionicons name="home-outline" size={16} color="#387CFF" />
                    <Text style={styles.detailText}>{vehicle.flat}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="car-outline" size={16} color="#387CFF" />
                    <Text style={styles.detailText}>{vehicle.plateNumber}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="color-palette-outline" size={16} color="#387CFF" />
                    <Text style={styles.detailText}>{vehicle.color}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.contactButton}>
                  <Ionicons name="call-outline" size={16} color="#FFF" />
                  <Text style={styles.contactButtonText}>Contact Owner</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#CCC" />
            <Text style={styles.emptyStateText}>No vehicles found</Text>
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeFilterTab: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  filterText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeFilterText: { color: '#000', fontWeight: '700' },
  resultText: { fontSize: 14, color: '#666', marginBottom: 12 },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  vehicleImage: { width: '100%', height: 200 },
  vehicleContent: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vehicleName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  ownerName: { fontSize: 13, color: '#666', marginTop: 2 },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  carBadge: { backgroundColor: '#387CFF' },
  bikeBadge: { backgroundColor: '#FF9500' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  detailsGrid: { gap: 8, marginBottom: 12 },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: { fontSize: 13, color: '#555' },
  contactButton: {
    backgroundColor: '#387CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  contactButtonText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyStateText: { fontSize: 16, color: '#999', marginTop: 12 },
});
