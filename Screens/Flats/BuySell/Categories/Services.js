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

const servicesData = [
  {
    title: 'Home Cleaning Service',
    subtitle: 'Professional Cleaners, A...',
    price: '₹ 500/hr',
    oldPrice: '₹ 750/hr',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695c952952?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Plumbing Repair',
    subtitle: 'Expert Plumbers, B...',
    price: '₹ 800/hr',
    oldPrice: '₹ 1,200/hr',
    image: 'https://images.unsplash.com/photo-1581562721267-21b2320220e3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Electrical Work',
    subtitle: 'Licensed Electricians, C...',
    price: '₹ 600/hr',
    oldPrice: '₹ 900/hr',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Painting Service',
    subtitle: 'Interior/Exterior Paint, D...',
    price: '₹ 400/hr',
    oldPrice: '₹ 600/hr',
    image: 'https://images.unsplash.com/photo-1578995242342-c7a9a8b85d68?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'AC Maintenance',
    subtitle: 'AC Repair & Service, E...',
    price: '₹ 900/hr',
    oldPrice: '₹ 1,350/hr',
    image: 'https://images.unsplash.com/photo-1581578751121-c8bdf287d718?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Pest Control',
    subtitle: 'Certified Pest Control, F...',
    price: '₹ 700/hr',
    oldPrice: '₹ 1,050/hr',
    image: 'https://images.unsplash.com/photo-1581578749556-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Carpentry Work',
    subtitle: 'Custom Furniture Repair, G...',
    price: '₹ 750/hr',
    oldPrice: '₹ 1,125/hr',
    image: 'https://images.unsplash.com/photo-1581578751548-c64695c952952?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Laundry Service',
    subtitle: 'Premium Laundry Care, H...',
    price: '₹ 50/piece',
    oldPrice: '₹ 75/piece',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ServicesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Services</Text>
          <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
            <Ionicons name="bookmark-outline" size={24} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={26} color="#121212" />
          <TextInput
            placeholder="Search services..."
            placeholderTextColor="#818181"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterBar}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="funnel-outline" size={20} color="#123841" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Price: Low to High</Text>
            <Ionicons name="swap-vertical" size={20} color="#123841" />
          </TouchableOpacity>
        </View>

        <View style={styles.listingsGrid}>
          {servicesData.map((item) => (
            <TouchableOpacity key={item.title} style={styles.productCard} activeOpacity={0.8} onPress={() => navigation?.navigate('ProductDetails', { product: item })}>
              <View style={styles.productImageWrap}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
              </View>
              <View style={styles.productTextBlock}>
                <Text numberOfLines={1} style={styles.productTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.productSubtitle}>
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Ionicons name="add" size={30} color="#151515" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#171717',
    flex: 1,
    textAlign: 'center',
  },
  topIconButton: {
    marginLeft: 18,
  },
  searchBar: {
    height: 68,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 20,
    shadowColor: '#D9D1C3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    color: '#222222',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#D9D1C3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#123841',
    marginHorizontal: 6,
  },
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 22,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  productImageWrap: {
    height: 220,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(40,40,40,0.88)',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  productTextBlock: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#787878',
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 92,
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4B900',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 8,
  },
});
