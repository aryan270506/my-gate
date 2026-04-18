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

const directoryData = [
  {
    id: 1,
    name: 'Green Garden Florist',
    category: 'Flowers',
    phone: '9876543210',
    address: 'Near Community Center',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Fresh Bake Bakery',
    category: 'Bakery',
    phone: '9765432109',
    address: 'Main Street, Building A',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Quick Repairs',
    category: 'Electronics Repair',
    phone: '9654321098',
    address: 'Near Main Gate',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Health Plus Pharmacy',
    category: 'Pharmacy',
    phone: '9543210987',
    address: 'Opposite Main Building',
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Fit Life Gym',
    category: 'Fitness',
    phone: '9432109876',
    address: 'Indoor Sports Complex',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Brain Kids Coaching',
    category: 'Tuition',
    phone: '9321098765',
    address: 'Community Center',
    rating: 4.8,
  },
];

const categories = ['All', 'Flowers', 'Bakery', 'Pharmacy', 'Fitness', 'Tuition'];

export default function LocalDirectoryScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchText, setSearchText] = React.useState('');

  const filteredDirectory = directoryData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Local Directory</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search businesses..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, selectedCategory === cat && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredDirectory.map((item) => (
          <View key={item.id} style={styles.directoryCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.businessName}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            <View style={styles.addressContainer}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.addressText}>{item.address}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call-outline" size={18} color="#FFF" />
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.visitButton}>
                <Ionicons name="location-outline" size={18} color="#387CFF" />
                <Text style={styles.visitButtonText}>Visit</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  categoryScroll: { marginBottom: 16 },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 8,
  },
  activeCategoryTab: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeCategoryText: { color: '#000', fontWeight: '700' },
  directoryCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  businessName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  category: { fontSize: 12, color: '#999', marginTop: 2 },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#FFB800' },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  addressText: { fontSize: 13, color: '#666', flex: 1 },
  actions: { flexDirection: 'row', gap: 10 },
  callButton: {
    flex: 1,
    backgroundColor: '#387CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  buttonText: { fontSize: 13, fontWeight: '700', color: '#FFF' },
  visitButton: {
    flex: 1,
    backgroundColor: '#E8F0FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  visitButtonText: { fontSize: 13, fontWeight: '700', color: '#387CFF' },
});
