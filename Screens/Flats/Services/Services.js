import React, { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { label: 'Services by Urban...', icon: 'construct-outline', scrollTo: 'urban' },
  { label: 'Packers and Movers', icon: 'cube-outline', scrollTo: 'packers' },
  { label: 'Outstation and Rental..', icon: 'car-sport-outline', scrollTo: 'outstation' },
  { label: 'Property Managem...', icon: 'home-outline', scrollTo: 'property' },
];

const trending = [
  {
    title: 'Porter Packers and Movers',
    brand: 'Porter',
    rating: '4.0',
    section: 'packers',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Airport Cabs by Quick Ride',
    brand: 'Quick Ride',
    rating: '4.7',
    section: 'outstation',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bloodtest by OrangeHealth Labs',
    brand: 'Orange Health',
    rating: '4.8',
    section: 'outstation',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Blood Tests at Home',
    brand: 'Agilus Diagnostics',
    rating: '4.6',
    section: 'outstation',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
  },
];

const urbanServices = [
  { label: 'Appliance Repair and Service', emoji: '🧺' },
  { label: 'AC Service and Repair', emoji: '🪛' },
  { label: 'Bathroom Cleaning', emoji: '🚽' },
  { label: 'Kitchen Cleaning', emoji: '🧹' },
  { label: 'Insta Help', emoji: '💁' },
  { label: 'Sofa and Carpet Cleaning', emoji: '🛋️' },
  { label: 'Full Home Cleaning', emoji: '🧽' },
  { label: 'Pest Control', emoji: '🧴' },
  { label: 'Carpenters', emoji: '🪚' },
  { label: 'Electricians', emoji: '🔌' },
  { label: 'Salon for Women', emoji: '💆' },
  { label: 'Salon for Men', emoji: '💈' },
  { label: 'Painting', emoji: '🖌️' },
];

const packersServices = [
  { label: 'Home Shifting', emoji: '📦' },
  { label: 'Office Shifting', emoji: '🏢' },
  { label: 'Vehicle Transport', emoji: '🚗' },
  { label: 'Bike Transport', emoji: '🏍️' },
  { label: 'Storage Solutions', emoji: '🗄️' },
  { label: 'International Move', emoji: '✈️' },
];

const outstationServices = [
  { label: 'Outstation Cab', emoji: '🚕' },
  { label: 'Rental Car', emoji: '🚙' },
  { label: 'Airport Transfer', emoji: '🛫' },
  { label: 'Hourly Rental', emoji: '⏱️' },
  { label: 'Corporate Travel', emoji: '💼' },
  { label: 'Multi-City Trip', emoji: '🗺️' },
];

const propertyServices = [
  { label: 'Rent Management', emoji: '📋' },
  { label: 'Property Listing', emoji: '🏠' },
  { label: 'Legal Assistance', emoji: '⚖️' },
  { label: 'Home Loans', emoji: '🏦' },
  { label: 'Interior Design', emoji: '🛋️' },
  { label: 'Vastu Consultant', emoji: '🧭' },
];

export default function ServicesScreen() {
  const scrollViewRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Y-offset refs for each section (absolute positions in scroll view)
  const sectionYRefs = useRef({
    urban: 0,
    packers: 0,
    outstation: 0,
    property: 0,
  });

  // The Y position where the categories bar originally sits in the scroll view
  // We'll capture it via onLayout of the categories container
  const categoriesOriginalY = useRef(0);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Make sticky once scroll passes the original categories position
    setIsSticky(scrollY >= categoriesOriginalY.current);
  };

  const handleCategoryPress = (scrollTo) => {
    const y = sectionYRefs.current[scrollTo];
    scrollViewRef.current?.scrollTo({ y: y - 16, animated: true });
  };

  // The categories bar content — reused in both inline and sticky positions
  const CategoriesBar = () => (
    <View style={styles.categoryRow}>
      {categories.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(item.scrollTo)}
          activeOpacity={0.75}
        >
          <View style={styles.categoryIconBox}>
            <Ionicons name={item.icon} size={34} color="#163841" />
          </View>
          <Text style={styles.categoryLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── STICKY CATEGORIES BAR (renders on top when scrolled past) ── */}
      {isSticky && (
        <View style={styles.stickyBar}>
          <CategoriesBar />
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Services</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search-outline" size={28} color="#161616" />
            <Ionicons name="cart-outline" size={28} color="#161616" />
            <Ionicons name="newspaper-outline" size={28} color="#161616" />
          </View>
        </View>

        <View style={styles.gradientBand}>
          {/* Categories — inline (original position) */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View
            onLayout={(e) => {
              // Capture absolute Y of the categories row in the scroll view
              categoriesOriginalY.current = e.nativeEvent.layout.y;
            }}
            // When sticky is active, keep a ghost placeholder so layout doesn't jump
            style={isSticky ? styles.categoriesPlaceholder : null}
          >
            {!isSticky && <CategoriesBar />}
          </View>

          {/* Trending Services */}
          <Text style={styles.sectionTitle}>Trending Services</Text>
          <View style={styles.trendingGrid}>
            {trending.map((item) => (
              <View key={item.title} style={styles.serviceCard}>
                <Image source={{ uri: item.image }} style={styles.serviceImage} />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Ionicons name="star" size={16} color="#F9A61A" />
                </View>
                <View style={styles.serviceTextWrap}>
                  <Text style={styles.serviceTitle}>{item.title}</Text>
                  <Text style={styles.serviceBrand}>{item.brand}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Urban Company Panel */}
          <View
            style={styles.urbanPanel}
            onLayout={(e) => {
              sectionYRefs.current.urban = e.nativeEvent.layout.y;
            }}
          >
            <Text style={styles.urbanTitle}>Services by Urban Company</Text>
            <View style={styles.urbanGrid}>
              {urbanServices.map((item) => (
                <TouchableOpacity key={item.label} style={styles.urbanItem} activeOpacity={0.75}>
                  <Text style={styles.urbanEmoji}>{item.emoji}</Text>
                  <Text style={styles.urbanLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Packers and Movers Panel */}
          <View
            style={styles.sectionPanel}
            onLayout={(e) => {
              sectionYRefs.current.packers = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.panelHeader}>
              <Ionicons name="cube-outline" size={26} color="#163841" style={{ marginRight: 10 }} />
              <Text style={styles.panelTitle}>Packers and Movers</Text>
            </View>
            <View style={styles.urbanGrid}>
              {packersServices.map((item) => (
                <TouchableOpacity key={item.label} style={styles.urbanItem} activeOpacity={0.75}>
                  <Text style={styles.urbanEmoji}>{item.emoji}</Text>
                  <Text style={styles.urbanLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Outstation & Rental Panel */}
          <View
            style={styles.sectionPanel}
            onLayout={(e) => {
              sectionYRefs.current.outstation = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.panelHeader}>
              <Ionicons name="car-sport-outline" size={26} color="#163841" style={{ marginRight: 10 }} />
              <Text style={styles.panelTitle}>Outstation and Rental</Text>
            </View>
            <View style={styles.urbanGrid}>
              {outstationServices.map((item) => (
                <TouchableOpacity key={item.label} style={styles.urbanItem} activeOpacity={0.75}>
                  <Text style={styles.urbanEmoji}>{item.emoji}</Text>
                  <Text style={styles.urbanLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Management Panel */}
          <View
            style={styles.sectionPanel}
            onLayout={(e) => {
              sectionYRefs.current.property = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.panelHeader}>
              <Ionicons name="home-outline" size={26} color="#163841" style={{ marginRight: 10 }} />
              <Text style={styles.panelTitle}>Property Management</Text>
            </View>
            <View style={styles.urbanGrid}>
              {propertyServices.map((item) => (
                <TouchableOpacity key={item.label} style={styles.urbanItem} activeOpacity={0.75}>
                  <Text style={styles.urbanEmoji}>{item.emoji}</Text>
                  <Text style={styles.urbanLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  content: { paddingBottom: 28 },

  // ── Sticky bar ──
  stickyBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 0, // below SafeAreaView top inset
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#F5F1E8',
    paddingVertical: 10,
    paddingHorizontal: 0,
    // Shadow to visually separate from content
    shadowColor: '#CFC7BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E3D8',
  },

  // Ghost placeholder to prevent layout jump when bar goes sticky
  categoriesPlaceholder: {
    height: 120, // approx height of the categories row
    marginBottom: 30,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F1E8',
    shadowColor: '#CFC7BA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#151515' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  gradientBand: { paddingTop: 18 },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#151515',
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoryItem: { width: '23%' },
  categoryIconBox: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#D6CEBF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  categoryLabel: { fontSize: 12, color: '#20383E', textAlign: 'center' },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  serviceCard: {
    width: '48%',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },
  serviceImage: { width: '100%', height: 140 },
  ratingBadge: {
    position: 'absolute',
    right: 10,
    top: 118,
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratingText: { fontSize: 15, color: '#4B4B4B', marginRight: 6 },
  serviceTextWrap: { paddingHorizontal: 14, paddingVertical: 14 },
  serviceTitle: { fontSize: 17, fontWeight: '700', color: '#141414' },
  serviceBrand: { fontSize: 15, color: '#2E2E2E', marginTop: 6 },

  // Urban Company panel
  urbanPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  urbanTitle: { fontSize: 28, fontWeight: '800', color: '#151515', marginBottom: 24 },
  urbanGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  urbanItem: { width: '24%', alignItems: 'center', marginBottom: 24 },
  urbanEmoji: { fontSize: 54, marginBottom: 10 },
  urbanLabel: { fontSize: 13, color: '#242424', textAlign: 'center', lineHeight: 17 },

  // Shared style for new panels
  sectionPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  panelTitle: { fontSize: 22, fontWeight: '800', color: '#151515' },
});
