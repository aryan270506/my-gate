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

const furnitureData = [
  {
    title: 'Wooden Sofa Set',
    subtitle: 'Gera World of Joy, For...',
    price: '₹ 15,000',
    oldPrice: '₹ 28,000',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Study Table',
    subtitle: 'Maple Heights, A...',
    price: '₹ 1,800',
    oldPrice: '₹ 3,500',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wooden Cabinet',
    subtitle: 'Tower 7, Block C...',
    price: '₹ 2,500',
    oldPrice: '₹ 4,800',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bed Frame - King Size',
    subtitle: 'Purva Silversands, M...',
    price: '₹ 8,500',
    oldPrice: '₹ 16,000',
    image: 'https://images.unsplash.com/photo-1540932239986-310128078ceb?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Dining Table Set',
    subtitle: 'Central Park, A...',
    price: '₹ 5,200',
    oldPrice: '₹ 10,000',
    image: 'https://images.unsplash.com/photo-1551180426-bacf12dd8745?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Office Chair',
    subtitle: 'Prestige Towers, B...',
    price: '₹ 3,800',
    oldPrice: '₹ 7,500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bookshelf',
    subtitle: 'Akshardham Complex...',
    price: '₹ 2,200',
    oldPrice: '₹ 4,200',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Coffee Table',
    subtitle: 'Lodha Paradise, M...',
    price: '₹ 1,500',
    oldPrice: '₹ 3,000',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=900&q=80',
  },
];

export default function FurnitureScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Furniture</Text>
          <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
            <Ionicons name="bookmark-outline" size={24} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={26} color="#121212" />
          <TextInput
            placeholder="Search furniture..."
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
          {furnitureData.map((item) => (
            <TouchableOpacity 
              key={item.title} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('ProductDetails', { product: item })}
            >
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
