import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const vehiclesData = [
  {
    id: 1,
    ownerName: 'Rajesh Patel',
    registrationNo: 'KA-01-AB-1234',
    vehicleModel: 'Hyundai Creta 2022',
    color: 'Silver',
    type: 'SUV',
    phone: '+91 98765 43210',
  },
  {
    id: 2,
    ownerName: 'Priya Sharma',
    registrationNo: 'KA-01-CD-5678',
    vehicleModel: 'Toyota Fortuner',
    color: 'Black',
    type: 'SUV',
    phone: '+91 98765 43211',
  },
  {
    id: 3,
    ownerName: 'Amit Kumar',
    registrationNo: 'KA-01-EF-9012',
    vehicleModel: 'Maruti Swift 2023',
    color: 'Grey',
    type: 'Hatchback',
    phone: '+91 98765 43212',
  },
];

const vehicleTypeColors = {
  SUV: '#FF6B6B',
  Hatchback: '#4CAF50',
  Sedan: '#2196F3',
};

export function SearchVehicleModal({ visible, onClose }) {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const vehicleTypes = ['All', 'SUV', 'Sedan', 'Hatchback'];

  const filteredData = vehiclesData.filter((item) => {
    const matchesSearch =
      item.registrationNo
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.ownerName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      item.vehicleModel
        .toLowerCase()
        .includes(searchText.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity style={styles.vehicleCard} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.vehicleIconContainer}>
          <Ionicons name="car-outline" size={32} color="#1E1E1E" />
        </View>
        <View style={styles.vehicleInfo}>
          <View style={styles.ownerRow}>
            <Text style={styles.ownerName}>{item.ownerName}</Text>
            <View
              style={[
                styles.typeTag,
                {
                  backgroundColor:
                    vehicleTypeColors[item.type] + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.typeTagText,
                  {
                    color: vehicleTypeColors[item.type],
                  },
                ]}
              >
                {item.type}
              </Text>
            </View>
          </View>
          <Text style={styles.registrationNo}>{item.registrationNo}</Text>
          <Text style={styles.vehicleModel}>{item.vehicleModel}</Text>
          <Text style={styles.color}>Color: {item.color}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.contactButton}
        activeOpacity={0.7}
      >
        <Ionicons name="call" size={16} color="#FFFFFF" />
        <Text style={styles.contactButtonText}>Contact Owner</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Search Vehicle</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by registration no. or owner..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.filterSection}>
        {vehicleTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedType === type && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedType === type && styles.filterButtonTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={48} color="#DDD" />
            <Text style={styles.emptyText}>No vehicles found</Text>
          </View>
        }
      />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: '#1E1E1E',
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  filterButtonActive: {
    backgroundColor: '#FFD62E',
    borderColor: '#FFD62E',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#1E1E1E',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  vehicleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  ownerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  registrationNo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D97E8',
    marginBottom: 2,
  },
  vehicleModel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  color: {
    fontSize: 11,
    color: '#999',
  },
  contactButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  contactButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
});
