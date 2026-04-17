import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { label: 'Services by Urban...', icon: 'construct-outline' },
  { label: 'Packers and Movers', icon: 'cube-outline' },
  { label: 'Outstation and Rental..', icon: 'car-sport-outline' },
  { label: 'Property Managem...', icon: 'home-outline' },
];

const trending = [
  {
    title: 'Porter Packers and Movers',
    brand: 'Porter',
    rating: '4.0',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Airport Cabs by Quick Ride',
    brand: 'Quick Ride',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bloodtest by OrangeHealth Labs',
    brand: 'Orange Health',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Blood Tests at Home',
    brand: 'Agilus Diagnostics',
    rating: '4.6',
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

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Services</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search-outline" size={28} color="#161616" />
            <Ionicons name="cart-outline" size={28} color="#161616" />
            <Ionicons name="newspaper-outline" size={28} color="#161616" />
          </View>
        </View>

        <View style={styles.gradientBand}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryRow}>
            {categories.map((item) => (
              <View key={item.label} style={styles.categoryItem}>
                <View style={styles.categoryIconBox}>
                  <Ionicons name={item.icon} size={34} color="#163841" />
                </View>
                <Text style={styles.categoryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

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

          <View style={styles.urbanPanel}>
            <Text style={styles.urbanTitle}>Services by Urban Company</Text>
            <View style={styles.urbanGrid}>
              {urbanServices.map((item) => (
                <View key={item.label} style={styles.urbanItem}>
                  <Text style={styles.urbanEmoji}>{item.emoji}</Text>
                  <Text style={styles.urbanLabel}>{item.label}</Text>
                </View>
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
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#151515', paddingHorizontal: 20, marginBottom: 18 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 },
  categoryItem: { width: '23%' },
  categoryIconBox: { width: 84, height: 84, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#D6CEBF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 4 },
  categoryLabel: { fontSize: 12, color: '#20383E', textAlign: 'center' },
  trendingGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  serviceCard: { width: '48%', borderRadius: 26, overflow: 'hidden', backgroundColor: '#FFFFFF', marginBottom: 18 },
  serviceImage: { width: '100%', height: 140 },
  ratingBadge: { position: 'absolute', right: 10, top: 118, backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  ratingText: { fontSize: 15, color: '#4B4B4B', marginRight: 6 },
  serviceTextWrap: { paddingHorizontal: 14, paddingVertical: 14 },
  serviceTitle: { fontSize: 17, fontWeight: '700', color: '#141414' },
  serviceBrand: { fontSize: 15, color: '#2E2E2E', marginTop: 6 },
  urbanPanel: { backgroundColor: '#FFFFFF', borderRadius: 30, marginHorizontal: 20, marginTop: 10, paddingVertical: 22, paddingHorizontal: 16 },
  urbanTitle: { fontSize: 28, fontWeight: '800', color: '#151515', marginBottom: 24 },
  urbanGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  urbanItem: { width: '24%', alignItems: 'center', marginBottom: 24 },
  urbanEmoji: { fontSize: 54, marginBottom: 10 },
  urbanLabel: { fontSize: 13, color: '#242424', textAlign: 'center', lineHeight: 17 },
});
