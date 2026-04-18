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

const electronicsData = [
  {
    title: 'iPhone 13',
    subtitle: 'Apple, Barely Used, A...',
    price: '₹ 45,000',
    oldPrice: '₹ 75,000',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wireless Headphones',
    subtitle: 'Sony WH-CH720, B...',
    price: '₹ 8,500',
    oldPrice: '₹ 15,000',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Smart Watch',
    subtitle: 'Apple Watch Series 6, C...',
    price: '₹ 18,000',
    oldPrice: '₹ 35,000',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'USB-C Cable',
    subtitle: 'High Speed Charging, D...',
    price: '₹ 800',
    oldPrice: '₹ 1,500',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Laptop Stand',
    subtitle: 'Aluminum Adjustable, E...',
    price: '₹ 2,500',
    oldPrice: '₹ 4,500',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Portable Speaker',
    subtitle: 'JBL Flip 6, F...',
    price: '₹ 12,000',
    oldPrice: '₹ 20,000',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133da26d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Power Bank',
    subtitle: '20000mAh Fast Charge, G...',
    price: '₹ 3,500',
    oldPrice: '₹ 6,500',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Webcam',
    subtitle: 'HD 1080p, H...',
    price: '₹ 4,200',
    oldPrice: '₹ 7,500',
    image: 'https://images.unsplash.com/photo-1617638924702-92d37fbf963d?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ElectronicsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Electronics</Text>
          <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
            <Ionicons name="bookmark-outline" size={24} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={26} color="#121212" />
          <TextInput
            placeholder="Search electronics..."
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
          {electronicsData.map((item) => (
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
