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

const kidsItemsData = [
  {
    title: 'Building Blocks Set',
    subtitle: 'LEGO Compatible, A...',
    price: '₹ 1,500',
    oldPrice: '₹ 2,250',
    image: 'https://images.unsplash.com/photo-1585399346257-1f5c50844ccd?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Kids Bicycle',
    subtitle: 'With Training Wheels, B...',
    price: '₹ 4,500',
    oldPrice: '₹ 6,750',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Toy Car Set',
    subtitle: '6 Vehicles, C...',
    price: '₹ 800',
    oldPrice: '₹ 1,200',
    image: 'https://images.unsplash.com/photo-1453956519588-fde5ad90a131?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'School Backpack',
    subtitle: 'Waterproof, Ergonomic, D...',
    price: '₹ 1,200',
    oldPrice: '₹ 1,800',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Educational Game',
    subtitle: 'Math & Logic Puzzle, E...',
    price: '₹ 600',
    oldPrice: '₹ 900',
    image: 'https://images.unsplash.com/photo-1609644740907-ad4f0d0c9504?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Kids Drawing Set',
    subtitle: '100 Piece Art Supplies, F...',
    price: '₹ 1,100',
    oldPrice: '₹ 1,650',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Baby Stroller',
    subtitle: 'Foldable Design, G...',
    price: '₹ 3,800',
    oldPrice: '₹ 5,700',
    image: 'https://images.unsplash.com/photo-1585409677985-39b217192030?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Kids Watch',
    subtitle: 'Digital & Waterproof, H...',
    price: '₹ 1,800',
    oldPrice: '₹ 2,700',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
];

export default function KidsItemsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Kids Items</Text>
          <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
            <Ionicons name="bookmark-outline" size={24} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={26} color="#121212" />
          <TextInput
            placeholder="Search kids items..."
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
          {kidsItemsData.map((item) => (
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
