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

const amenitiesData = [
  {
    id: 1,
    name: 'Swimming Pool',
    description: 'Olympic-size outdoor pool with changing rooms and lockers',
    timing: '6 AM - 8 PM (Daily)',
    available: true,
    icon: 'water-outline',
    color: '#387CFF',
    features: ['Lifeguard on duty', 'Temperature controlled', 'Swimming classes available'],
  },
  {
    id: 2,
    name: 'Gym & Fitness Center',
    description: 'Fully equipped gym with modern fitness equipment',
    timing: '5 AM - 9 PM (Daily)',
    available: true,
    icon: 'barbell-outline',
    color: '#FF6B35',
    features: ['Cardio equipment', 'Weight training', 'Personal trainers'],
  },
  {
    id: 3,
    name: 'Community Hall',
    description: 'Multi-purpose hall for events and gatherings',
    timing: 'Available for booking',
    available: true,
    icon: 'home-outline',
    color: '#FFB800',
    features: ['Capacity: 500', 'Sound system', 'Catering available'],
  },
  {
    id: 4,
    name: 'Kids Play Area',
    description: 'Safe and secure playground for children',
    timing: '8 AM - 6 PM (Except Mondays)',
    available: true,
    icon: 'happy-outline',
    color: '#48B24E',
    features: ['Playground equipment', 'Supervised', 'Open for all residents'],
  },
  {
    id: 5,
    name: 'Basketball Court',
    description: 'Outdoor basketball court with LED lighting',
    timing: '6 AM - 10 PM (Daily)',
    available: true,
    icon: 'basketball-outline',
    color: '#FF9500',
    features: ['LED lighting', 'Professional court', 'Equipment available'],
  },
  {
    id: 6,
    name: 'Yoga & Meditation Center',
    description: 'Dedicated space for yoga, meditation and wellness',
    timing: '6 AM - 8 PM (Daily)',
    available: true,
    icon: 'fitness-outline',
    color: '#9C27B0',
    features: ['Expert instructors', 'Morning & evening classes', 'Peaceful ambiance'],
  },
  {
    id: 7,
    name: 'Library',
    description: 'Community library with books and reading area',
    timing: '10 AM - 7 PM (Daily)',
    available: true,
    icon: 'book-outline',
    color: '#2196F3',
    features: ['5000+ books', 'Reading lounge', 'WiFi available'],
  },
  {
    id: 8,
    name: 'Senior Citizens Lounge',
    description: 'Comfortable lounge area for senior residents',
    timing: '8 AM - 6 PM (Daily)',
    available: true,
    icon: 'people-outline',
    color: '#E91E63',
    features: ['TV & entertainment', 'Card games', 'Refreshments served'],
  },
];

export default function AmenitiesScreen({ navigation }) {
  const [selectedAmenity, setSelectedAmenity] = React.useState(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Amenities</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{amenitiesData.length}</Text>
            <Text style={styles.summaryLabel}>Total Amenities</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>
              {amenitiesData.filter((a) => a.available).length}
            </Text>
            <Text style={styles.summaryLabel}>Available</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Community Facilities</Text>

        {amenitiesData.map((amenity) => (
          <TouchableOpacity
            key={amenity.id}
            style={styles.amenityCard}
            onPress={() => setSelectedAmenity(selectedAmenity === amenity.id ? null : amenity.id)}
          >
            <View style={styles.amenityTop}>
              <View style={[styles.amenityIcon, { backgroundColor: amenity.color }]}>
                <Ionicons name={amenity.icon} size={28} color="#FFF" />
              </View>
              <View style={styles.amenityInfo}>
                <Text style={styles.amenityName}>{amenity.name}</Text>
                <Text style={styles.amenityDescription}>{amenity.description}</Text>
              </View>
              <Ionicons
                name={selectedAmenity === amenity.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#666"
              />
            </View>

            {selectedAmenity === amenity.id && (
              <View style={styles.expandedContent}>
                <View style={styles.timingBox}>
                  <Ionicons name="time-outline" size={18} color="#387CFF" />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.timingLabel}>Timing</Text>
                    <Text style={styles.timingText}>{amenity.timing}</Text>
                  </View>
                </View>

                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Features & Highlights</Text>
                  {amenity.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={styles.featureDot} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.bookButton}>
                  <Ionicons name="calendar-outline" size={18} color="#FFF" />
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNumber: { fontSize: 24, fontWeight: '800', color: '#387CFF' },
  summaryLabel: { fontSize: 12, color: '#999', marginTop: 4 },
  divider: { width: 1, height: 50, backgroundColor: '#E8E8E8', marginHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 14 },
  amenityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  amenityTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  amenityIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityInfo: { flex: 1 },
  amenityName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  amenityDescription: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 16 },
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  timingBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F0FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  timingLabel: { fontSize: 11, color: '#387CFF', fontWeight: '600' },
  timingText: { fontSize: 13, color: '#1A1A1A', fontWeight: '600', marginTop: 2 },
  featuresContainer: { marginBottom: 14 },
  featuresTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A1A', marginBottom: 10 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#387CFF',
  },
  featureText: { fontSize: 12, color: '#555' },
  bookButton: {
    backgroundColor: '#387CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  bookButtonText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
});
