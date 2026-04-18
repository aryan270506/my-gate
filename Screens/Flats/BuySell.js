import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import FurnitureScreen from './BuySell/Categories/Furniture';
import FoodScreen from './BuySell/Categories/Food';
import ServicesScreen from './BuySell/Categories/Services';
import HomeDecorScreen from './BuySell/Categories/HomeDecor';
import ElectronicsScreen from './BuySell/Categories/Electronics';
import VehiclesScreen from './BuySell/Categories/Vehicles';
import KidsItemsScreen from './BuySell/Categories/KidsItems';
import OthersScreen from './BuySell/Categories/Others';

const categories = [
  { label: 'Furniture', count: '1.7K+', icon: 'bed-outline' },
  { label: 'Food', count: '250+', icon: 'restaurant-outline' },
  { label: 'Services', count: '150+', icon: 'reader-outline' },
  { label: 'Home Decor', count: '50+', icon: 'image-outline' },
  { label: 'Electronics', count: '750+', icon: 'hardware-chip-outline' },
  { label: 'Vehicles', count: '350+', icon: 'car-sport-outline' },
  { label: 'Kids Items', count: '400+', icon: 'happy-outline' },
  { label: 'Others', count: '450+', icon: 'document-text-outline' },
];

const listings = [
  {
    title: 'Washing Machine...',
    subtitle: 'Gera World of Joy, For...',
    price: '₹ 600',
    image:
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mi',
    subtitle: 'Purva Silversands, M...',
    price: '₹ 11,000',
    image:
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wooden Cabinet',
    subtitle: 'Tower 7, Block C...',
    price: '₹ 2,500',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Study Table',
    subtitle: 'Maple Heights, A...',
    price: '₹ 1,800',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
  },
];

export default function BuySellScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const categoryNavigationMap = {
    'Furniture': FurnitureScreen,
    'Food': FoodScreen,
    'Services': ServicesScreen,
    'Home Decor': HomeDecorScreen,
    'Electronics': ElectronicsScreen,
    'Vehicles': VehiclesScreen,
    'Kids Items': KidsItemsScreen,
    'Others': OthersScreen,
  };

  // If a category is selected, show its screen
  if (selectedCategory) {
    const CategoryScreen = categoryNavigationMap[selectedCategory];
    return (
      <CategoryScreen
        navigation={{
          goBack: () => setSelectedCategory(null),
        }}
      />
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Buy &amp; Sell</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
              <Ionicons name="pricetags-outline" size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
              <Ionicons name="bookmark-outline" size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#111111" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={26} color="#121212" />
          <TextInput
            placeholder="What are you looking for?"
            placeholderTextColor="#818181"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.label}
              style={styles.categoryItem}
              activeOpacity={0.85}
              onPress={() => setSelectedCategory(category.label)}
            >
              <View style={styles.categoryIconCard}>
                <Ionicons name={category.icon} size={34} color="#131313" />
              </View>
              <Text style={styles.categoryLabel}>{category.label}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.listingHeading}>Recent Listings</Text>
            <Text style={styles.listingCount}>4.3k+ listings</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton} activeOpacity={0.85}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={24} color="#123841" />
          </TouchableOpacity>
        </View>

        <View style={styles.listingsGrid}>
          {listings.map((item) => (
            <View key={item.title} style={styles.productCard}>
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
            </View>
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
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 26,
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 22,
  },
  categoryIconCard: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#D7CFC2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191919',
    textAlign: 'center',
  },
  categoryCount: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '500',
    color: '#7E7E7E',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    flex: 1,
  },
  listingHeading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#171717',
    marginRight: 10,
  },
  listingCount: {
    fontSize: 15,
    color: '#242424',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  seeAllText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123841',
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
