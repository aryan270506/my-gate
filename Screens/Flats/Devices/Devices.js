import React, { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../../context/CartContext';

const lineup = [
  {
    title: 'Mygate Lock SE',
    price: '₹ 9950',
    oldPrice: '₹ 18490',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mygate Lock Edge',
    price: '₹ 9990',
    oldPrice: '',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=900&q=80',
  },
];

const accessories = [
  {
    title: 'Mygate Lock RFID Card',
    price: '₹ 249',
    oldPrice: '₹ 499',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mygate Lock Remote',
    price: '₹ 999',
    oldPrice: '₹ 2499',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=900&q=80',
  },
];

const promise = [
  { title: '3 year Warranty', icon: 'shield-checkmark-outline' },
  { title: '10 year Service guarantee', icon: 'ribbon-outline' },
  { title: 'Free installation', icon: 'construct-outline' },
  { title: 'Data stored in India', icon: 'lock-closed-outline', subtitle: 'following GDPR guidelines' },
];

const videos = [
  {
    title: 'Creating Fingerprint Access',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Creating PIN Access',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
  },
];

export default function DevicesScreen() {
  const navigation = useNavigation();
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="home-outline" size={34} color="#171717" />
            <Text style={styles.title}>Smart Devices</Text>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="newspaper-outline" size={28} color="#171717" />
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <View style={styles.cartIconContainer}>
                <Ionicons name="cart-outline" size={28} color="#171717" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Go beyond keys!</Text>
            <Text style={styles.heroSubtitle}>Unlock a smart home today with Mygate Smart Locks.</Text>
            <TouchableOpacity style={styles.learnButton} activeOpacity={0.85}>
              <Text style={styles.learnButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80' }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.demoCard}>
          <View>
            <Text style={styles.demoTitle}>Book a Free Demo!</Text>
            <Text style={styles.demoSubtitle}>Experience our smart locks with a free demo.</Text>
          </View>
          <TouchableOpacity style={styles.demoButton} activeOpacity={0.85}>
            <Ionicons name="chevron-forward" size={30} color="#161616" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Explore the lineup (5)</Text>
        <View style={styles.productGrid}>
          {lineup.map((item) => (
            <TouchableOpacity 
              key={item.title} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => handleProductPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                {!!item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
              </View>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>View{'\n'}Details</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Other Products</Text>
        <View style={styles.doorbellCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80' }}
            style={styles.doorbellImage}
          />
          <View style={styles.doorbellInfo}>
            <View>
              <Text style={styles.doorbellTitle}>Video Doorbell</Text>
              <Text style={styles.doorbellSubtitle}>Coming soon...</Text>
            </View>
            <TouchableOpacity style={styles.notifyButton} activeOpacity={0.85}>
              <Ionicons name="notifications-outline" size={24} color="#163841" />
              <Text style={styles.notifyText}>Notify Me</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Shop Smart Devices Accessories</Text>
        <View style={styles.productGrid}>
          {accessories.map((item) => (
            <TouchableOpacity 
              key={item.title} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => handleProductPress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                {!!item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
              </View>
              <View style={styles.buyButton}>
                <Text style={styles.buyButtonText}>View{'\n'}Details</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Help Videos</Text>
        <Text style={styles.sectionSubtitle}>Find out how to get the most from mygate devices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.videoRow}>
          {videos.map((item) => (
            <View key={item.title} style={styles.videoCard}>
              <Image source={{ uri: item.image }} style={styles.videoImage} />
              <View style={styles.videoTextWrap}>
                <Text style={styles.videoTitle}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={28} color="#505050" />
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.promiseHeader}>
          <Text style={styles.promiseBrand}>mygate</Text>
          <Text style={styles.promiseTitle}>Promise</Text>
        </View>
        <View style={styles.promiseGrid}>
          {promise.map((item) => (
            <View key={item.title} style={styles.promiseCard}>
              <Ionicons name={item.icon} size={32} color="#171717" />
              <Text style={styles.promiseText}>{item.title}</Text>
              {item.subtitle ? <Text style={styles.promiseSubtext}>{item.subtitle}</Text> : null}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.supportBubble}>
        <Text style={styles.supportEmoji}>👩‍💼</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  header: { paddingTop: 16, paddingBottom: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '800', color: '#181818', marginLeft: 12 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  cartIconContainer: { position: 'relative' },
  cartBadge: { position: 'absolute', top: -8, right: -8, backgroundColor: '#FF6B6B', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF' },
  hero: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 20 },
  heroText: { flex: 1, paddingRight: 10 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#202020', marginBottom: 8 },
  heroSubtitle: { fontSize: 17, lineHeight: 25, color: '#4A4A4A', marginBottom: 18 },
  learnButton: { borderWidth: 2, borderColor: '#A2B0B6', borderRadius: 18, paddingHorizontal: 24, paddingVertical: 14, alignSelf: 'flex-start' },
  learnButtonText: { fontSize: 16, fontWeight: '700', color: '#26363B' },
  heroImage: { width: 190, height: 220, borderRadius: 16 },
  demoCard: { backgroundColor: '#FFFFFF', borderRadius: 30, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
  demoTitle: { fontSize: 26, fontWeight: '800', color: '#181818' },
  demoSubtitle: { fontSize: 16, color: '#5A5A5A', marginTop: 6 },
  demoButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFEA30', alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#181818', marginBottom: 18 },
  sectionSubtitle: { fontSize: 16, color: '#5A5A5A', marginTop: -8, marginBottom: 16 },
  productGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  productCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden' },
  productImage: { width: '100%', height: 260 },
  productTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', paddingHorizontal: 14, paddingTop: 14 },
  priceRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginTop: 8, marginBottom: 14 },
  price: { fontSize: 20, fontWeight: '800', color: '#181818', marginRight: 10 },
  oldPrice: { fontSize: 15, color: '#8A8A8A', textDecorationLine: 'line-through' },
  buyButton: { backgroundColor: '#FFE430', margin: 14, marginTop: 0, borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  buyButtonText: { fontSize: 18, fontWeight: '800', color: '#161616', textAlign: 'center' },
  doorbellCard: { backgroundColor: '#FFFFFF', borderRadius: 30, overflow: 'hidden', marginBottom: 24 },
  doorbellImage: { width: '100%', height: 220 },
  doorbellInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 22 },
  doorbellTitle: { fontSize: 24, fontWeight: '800', color: '#181818' },
  doorbellSubtitle: { fontSize: 18, color: '#6E6E6E', marginTop: 4 },
  notifyButton: { borderWidth: 2, borderColor: '#B6B9BB', borderRadius: 18, paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center' },
  notifyText: { marginLeft: 8, fontSize: 16, fontWeight: '700', color: '#163841' },
  videoRow: { paddingRight: 8, marginBottom: 22 },
  videoCard: { width: 430, backgroundColor: '#FFFFFF', borderRadius: 28, overflow: 'hidden', marginRight: 18 },
  videoImage: { width: '100%', height: 280 },
  videoTextWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 },
  videoTitle: { flex: 1, fontSize: 22, fontWeight: '800', color: '#181818' },
  promiseHeader: { marginTop: 10, marginBottom: 18 },
  promiseBrand: { fontSize: 36, fontWeight: '800', color: '#171717' },
  promiseTitle: { fontSize: 34, color: '#171717', marginTop: -6 },
  promiseGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  promiseCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, minHeight: 150 },
  promiseText: { fontSize: 22, fontWeight: '700', color: '#171717', marginTop: 14 },
  promiseSubtext: { fontSize: 14, color: '#4E4E4E', marginTop: 6 },
  supportBubble: { position: 'absolute', right: 14, bottom: 120, width: 94, height: 94, borderRadius: 47, backgroundColor: '#C9E8E6', alignItems: 'center', justifyContent: 'center' },
  supportEmoji: { fontSize: 48 },
});
