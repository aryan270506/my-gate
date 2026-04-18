import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const helpProvidersData = [
  {
    id: 1,
    name: 'Priya Sharma',
    category: 'Maid / House Cleaning',
    experience: '5 years',
    rating: 4.8,
    reviews: 125,
    availability: 'Available Today',
    price: '₹500/day',
    phone: '+91 98765 43210',
    verified: true,
  },
  {
    id: 2,   
    name: 'Rajesh Kumar',
    category: 'Plumber',
    experience: '8 years',
    rating: 4.9,
    reviews: 98,
    availability: 'Available Tomorrow',
    price: '₹1000/visit',
    phone: '+91 98765 43211',
    verified: true,
  },
  {
    id: 3,
    name: 'Amita Dey',
    category: 'Electrician',
    experience: '6 years',
    rating: 4.7,
    reviews: 87,
    availability: 'Available in 2 hours',
    price: '₹800/hour',
    phone: '+91 98765 43212',
    verified: true,
  },
];

export function FindDailyHelpModal({ visible, onClose }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Maid',
    'Plumber',
    'Electrician',
    'Carpenter',
  ];

  const filteredData = helpProvidersData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const renderProviderCard = ({ item }) => (
    <TouchableOpacity style={styles.providerCard} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.providerInfo}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.nameSection}>
            <View style={styles.nameRow}>
              <Text style={styles.providerName}>{item.name}</Text>
              {item.verified && (
                <Ionicons name="checkmark-circle" size={14} color="#0d3d2f" />
              )}
            </View>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.experience}>
              <Ionicons name="briefcase-outline" size={11} color="#999" />{' '}
              {item.experience} experience
            </Text>
          </View>
        </View>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={12} color="#FFB800" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#0d3d2f" />
          <Text style={styles.detailText}>{item.availability}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={16} color="#FFB800" />
          <Text style={styles.detailText}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.7}
        >
          <Ionicons name="call-outline" size={16} color="#FFFFFF" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={16} color="#0d3d2f" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.headerTitle}>Find Daily Help</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or service..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        renderItem={renderProviderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={48} color="#DDD" />
            <Text style={styles.emptyText}>No providers found</Text>
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
    backgroundColor: '#FFF8EE',
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
    fontSize: 14,
    color: '#1E1E1E',
  },
  categoryScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  categoryButtonActive: {
    backgroundColor: '#0d3d2f',
    borderColor: '#0d3d2f',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  providerInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d3d2f',
  },
  nameSection: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  experience: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  ratingBox: {
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  reviews: {
    fontSize: 10,
    color: '#999',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E7',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0d3d2f',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  messageButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d3d2f',
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
