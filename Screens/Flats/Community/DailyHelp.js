import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const helpersData = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Maid',
    exp: '8 years',
    rating: 4.8,
    reviews: 125,
    price: '₹500/day',
    available: true,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: 'Experienced house cleaning specialist with expertise in deep cleaning.',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Plumber',
    exp: '12 years',
    rating: 4.9,
    reviews: 98,
    price: '₹600/hr',
    available: true,
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    description: 'Expert plumber for all kinds of plumbing issues and repairs.',
  },
  {
    id: 3,
    name: 'Anita Singh',
    role: 'Cook',
    exp: '6 years',
    rating: 4.7,
    reviews: 87,
    price: '₹800/day',
    available: true,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    description: 'Professional cook specializing in home-cooked meals and special diets.',
  },
  {
    id: 4,
    name: 'Mohammed Ali',
    role: 'Car Cleaner',
    exp: '10 years',
    rating: 4.6,
    reviews: 156,
    price: '₹300/wash',
    available: false,
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    description: 'Professional car cleaning and detailing services available.',
  },
];

const categories = ['All', 'Maid', 'Plumber', 'Cook', 'Car Cleaner'];

export default function DailyHelpScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = React.useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Help</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, activeCategory === cat && styles.activeCategory]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {helpersData.map((helper) => (
          <View key={helper.id} style={styles.helperCard}>
            <View style={styles.helperTop}>
              <Image source={{ uri: helper.image }} style={styles.helperPhoto} />
              <View style={styles.helperInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.helperName}>{helper.name}</Text>
                  {helper.available && <View style={styles.availableBadge} />}
                </View>
                <Text style={styles.helperRole}>{helper.role}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.ratingText}>
                    {helper.rating} ({helper.reviews} reviews)
                  </Text>
                </View>
                <Text style={styles.priceText}>{helper.price}</Text>
              </View>
            </View>
            <View style={styles.helperDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="briefcase-outline" size={16} color="#387CFF" />
                <Text style={styles.detailText}>{helper.exp} experience</Text>
              </View>
              <Text style={styles.description}>{helper.description}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call-outline" size={18} color="#FFF" />
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !helper.available && styles.bookButtonDisabled,
                ]}
                disabled={!helper.available}
              >
                <Text style={styles.bookButtonText}>
                  {helper.available ? 'Book Now' : 'Not Available'}
                </Text>
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
  categoryScroll: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeCategory: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeCategoryText: { color: '#000', fontWeight: '700' },
  helperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  helperTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  helperPhoto: { width: 80, height: 80, borderRadius: 40 },
  helperInfo: { flex: 1, justifyContent: 'center' },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helperName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  availableBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#48B24E',
  },
  helperRole: { fontSize: 14, color: '#666', marginTop: 2 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: { fontSize: 12, color: '#666' },
  priceText: { fontSize: 15, fontWeight: '700', color: '#000', marginTop: 6 },
  helperDetails: { marginBottom: 12 },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  detailText: { fontSize: 13, color: '#555' },
  description: { fontSize: 13, color: '#666', lineHeight: 18 },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#387CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
  },
  bookButtonDisabled: { backgroundColor: '#E8E8E8' },
  buttonText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  bookButtonText: { fontSize: 14, fontWeight: '700', color: '#000' },
});
