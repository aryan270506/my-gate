import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Investment Opportunities Data
const investmentOpportunities = [
  {
    id: 1,
    title: '3 BHK Luxury Apartment',
    location: 'Sector 108, Noida',
    price: '₹2.5 Cr',
    area: '1800 sq ft',
    type: 'buy',
    bedrooms: 3,
    bathrooms: 2,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Premium apartment with modern amenities',
    amenities: ['Swimming Pool', 'Gym', 'Park', 'Security'],
  },
  {
    id: 2,
    title: '2 BHK Modern Flat',
    location: 'Sector 109, Noida',
    price: '₹1.8 Cr',
    area: '1200 sq ft',
    type: 'buy',
    bedrooms: 2,
    bathrooms: 2,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Spacious apartment in prime location',
    amenities: ['Elevator', 'Parking', 'Security', 'Waste Management'],
  },
  {
    id: 3,
    title: '1 BHK Compact Apartment',
    location: 'Sector 106, Noida',
    price: '₹95 Lakhs',
    area: '850 sq ft',
    type: 'buy',
    bedrooms: 1,
    bathrooms: 1,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Affordable compact apartment for professionals',
    amenities: ['Parking', 'Security', 'Backup Power'],
  },
  {
    id: 4,
    title: '4 BHK Penthouse',
    location: 'Sector 110, Noida',
    price: '₹4.2 Cr',
    area: '2500 sq ft',
    type: 'buy',
    bedrooms: 4,
    bathrooms: 3,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Luxury penthouse with exclusive amenities',
    amenities: ['Private Terrace', 'Gym', 'Pool', 'Concierge'],
  },
];

const rentalOpportunities = [
  {
    id: 101,
    title: '3 BHK Apartment for Rent',
    location: 'Sector 108, Noida',
    price: '₹1.2 L/month',
    area: '1800 sq ft',
    type: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Fully furnished apartment available now',
    amenities: ['Furnished', 'Gym', 'Park', 'Security'],
  },
  {
    id: 102,
    title: '2 BHK Flat for Rent',
    location: 'Sector 109, Noida',
    price: '₹85K/month',
    area: '1200 sq ft',
    type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    image: require('../../../../assets/society-img.jpg'),
    description: 'Semi-furnished, immediate possession',
    amenities: ['Parking', 'Security', 'Power Backup'],
  },
];

const ApartmentCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* Building Image */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="#0d3d2f" />
          <Text style={styles.location}>{item.location}</Text>
        </View>

        {/* Quick Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <MaterialCommunityIcons name="door" size={14} color="#FFC107" />
            <Text style={styles.infoPillText}>{item.bedrooms} BHK</Text>
          </View>
          <View style={styles.infoPill}>
            <MaterialCommunityIcons name="ruler-square" size={14} color="#FFC107" />
            <Text style={styles.infoPillText}>{item.area}</Text>
          </View>
        </View>

        {/* Amenities Preview */}
        <View style={styles.amenitiesPreview}>
          {item.amenities.slice(0, 2).map((amenity, index) => (
            <Text key={index} style={styles.amenityTag}>
              {amenity}
            </Text>
          ))}
          {item.amenities.length > 2 && (
            <Text style={styles.amenityTag}>+{item.amenities.length - 2}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PropertyDetailsModal = ({ visible, property, onClose }) => {
  if (!property) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#0d3d2f" />
          </TouchableOpacity>
          <Text style={styles.detailHeaderTitle}>Property Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Large Image */}
          <Image source={property.image} style={styles.detailImage} />

          <View style={styles.detailContent}>
            {/* Title & Price */}
            <Text style={styles.detailTitle}>{property.title}</Text>
            <Text style={styles.detailPrice}>{property.price}</Text>

            {/* Location */}
            <View style={styles.detailLocationRow}>
              <Ionicons name="location" size={16} color="#0d3d2f" />
              <Text style={styles.detailLocation}>{property.location}</Text>
            </View>

            <Text style={styles.detailDesc}>{property.description}</Text>

            {/* Property Info Grid */}
            <View style={styles.infogrid}>
              <View style={styles.infoGridItem}>
                <MaterialCommunityIcons name="door" size={24} color="#0d3d2f" />
                <Text style={styles.infoGridLabel}>Bedrooms</Text>
                <Text style={styles.infoGridValue}>{property.bedrooms}</Text>
              </View>
              <View style={styles.infoGridItem}>
                <MaterialCommunityIcons name="water" size={24} color="#0d3d2f" />
                <Text style={styles.infoGridLabel}>Bathrooms</Text>
                <Text style={styles.infoGridValue}>{property.bathrooms}</Text>
              </View>
              <View style={styles.infoGridItem}>
                <MaterialCommunityIcons name="ruler-square" size={24} color="#0d3d2f" />
                <Text style={styles.infoGridLabel}>Area</Text>
                <Text style={styles.infoGridValue}>{property.area}</Text>
              </View>
              <View style={styles.infoGridItem}>
                <MaterialCommunityIcons name="home-variant" size={24} color="#0d3d2f" />
                <Text style={styles.infoGridLabel}>Type</Text>
                <Text style={styles.infoGridValue}>
                  {property.type === 'buy' ? 'Sale' : 'Rent'}
                </Text>
              </View>
            </View>

            {/* Amenities */}
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesList}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <MaterialCommunityIcons name="check-circle" size={16} color="#0d3d2f" />
                  <Text style={styles.amenityName}>{amenity}</Text>
                </View>
              ))}
            </View>

            {/* CTA Buttons */}
            <TouchableOpacity style={styles.contactBtn}>
              <MaterialCommunityIcons name="phone" size={18} color="#fff" />
              <Text style={styles.contactBtnText}>Contact Agent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scheduleBtn}>
              <MaterialCommunityIcons name="calendar" size={18} color="#0d3d2f" />
              <Text style={styles.scheduleBtnText}>Schedule Visit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const InvestSmart = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const properties = activeTab === 'buy' ? investmentOpportunities : rentalOpportunities;

  const handlePropertyPress = (property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Modal Card */}
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Invest Smartly</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'buy' && styles.tabActive]}
              onPress={() => setActiveTab('buy')}
            >
              <Text style={[styles.tabText, activeTab === 'buy' && styles.tabTextActive]}>
                Available for Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'rent' && styles.tabActive]}
              onPress={() => setActiveTab('rent')}
            >
              <Text style={[styles.tabText, activeTab === 'rent' && styles.tabTextActive]}>
                Available for Rent
              </Text>
            </TouchableOpacity>
          </View>

          {/* Properties List */}
          <FlatList
            data={properties}
            renderItem={({ item }) => (
              <ApartmentCard
                item={item}
                onPress={() => handlePropertyPress(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>

      {/* Property Details Modal */}
      <PropertyDetailsModal
        visible={showDetails}
        property={selectedProperty}
        onClose={() => setShowDetails(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d3d2f',
  },
  closeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    marginBottom: -2,
  },
  tabActive: {
    borderBottomColor: '#0d3d2f',
  },
  tabText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#0d3d2f',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#F0F0F0',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d3d2f',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  infoPillText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  amenitiesPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  amenityTag: {
    fontSize: 10,
    color: '#0d3d2f',
    backgroundColor: '#EAF7F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: '500',
  },

  // Detail Modal Styles
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  detailHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d3d2f',
    flex: 1,
    textAlign: 'center',
  },
  detailImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  detailContent: {
    padding: 16,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d3d2f',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFC107',
    marginBottom: 12,
  },
  detailLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLocation: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  detailDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 16,
  },
  infogrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoGridItem: {
    width: '48%',
    backgroundColor: '#FFF8E7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  infoGridLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 6,
  },
  infoGridValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d3d2f',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d3d2f',
    marginBottom: 12,
  },
  amenitiesList: {
    marginBottom: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  amenityName: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  contactBtn: {
    flexDirection: 'row',
    backgroundColor: '#0d3d2f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 8,
  },
  contactBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  scheduleBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  scheduleBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});

export default InvestSmart;
