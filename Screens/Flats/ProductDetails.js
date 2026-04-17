import React, { useContext, useState } from 'react';
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
import { CartContext } from '../../context/CartContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const price = parseFloat(product.price.replace('₹ ', ''));
      const total = price * quantity;
      
      navigation.navigate('Cart', {
        screen: 'Checkout',
        params: {
          total: total * 1.18,
          itemCount: quantity,
          isDirectBuy: true,
        },
      });
    }, 1500);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const price = parseFloat(product.price.replace('₹ ', ''));
  const oldPrice = product.oldPrice ? parseFloat(product.oldPrice.replace('₹ ', '')) : null;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="#171717" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart', { screen: 'CartList' })}>
            <Ionicons name="cart-outline" size={28} color="#171717" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          
          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {[1, 2, 3, 4].map((i) => (
                <Ionicons key={i} name="star" size={18} color="#FFB800" />
              ))}
              <Ionicons name="star-half" size={18} color="#FFB800" />
            </View>
            <Text style={styles.ratingText}>(2,543 reviews)</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>{product.price}</Text>
            {product.oldPrice && (
              <>
                <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{discount}% OFF</Text>
                </View>
              </>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this product</Text>
            <Text style={styles.description}>
              Experience ultimate security and convenience with our premium smart lock. Features advanced biometric access, mobile app integration, and robust encryption technology. Perfect for modern homes and offices.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>Biometric Fingerprint Access</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>Mobile App Control</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>10+ Years Battery Life</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.featureText}>Emergency Bypass Option</Text>
            </View>
          </View>

          {/* Warranty & Support */}
          <View style={styles.warrantySection}>
            <Text style={styles.sectionTitle}>Service & Support</Text>
            <View style={styles.warrantyItem}>
              <Ionicons name="shield-checkmark" size={22} color="#171717" />
              <Text style={styles.warrantyText}>3 Year Warranty</Text>
            </View>
            <View style={styles.warrantyItem}>
              <Ionicons name="construct" size={22} color="#171717" />
              <Text style={styles.warrantyText}>Free Professional Installation</Text>
            </View>
            <View style={styles.warrantyItem}>
              <Ionicons name="headset" size={22} color="#171717" />
              <Text style={styles.warrantyText}>24/7 Customer Support</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={decrementQuantity}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.bottomContainer}>
        {isAdded && (
          <View style={styles.addedNotification}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.addedText}>Added to cart!</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.addButton} 
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buyButton} 
          activeOpacity={0.85}
          onPress={handleBuyNow}
          disabled={isProcessing}
        >
          <Text style={styles.buyButtonText}>{isProcessing ? 'Processing...' : 'Buy Now'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  content: { paddingHorizontal: 20, paddingBottom: 140 },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#171717',
  },
  productImage: { width: '100%', height: 400, borderRadius: 20, marginBottom: 24 },
  productInfo: { paddingBottom: 20 },
  productTitle: { fontSize: 28, fontWeight: '800', color: '#171717', marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  stars: { flexDirection: 'row', marginRight: 12 },
  ratingText: { fontSize: 16, color: '#6B6B6B' },
  priceSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  currentPrice: { fontSize: 32, fontWeight: '800', color: '#171717', marginRight: 12 },
  oldPrice: { fontSize: 20, color: '#8A8A8A', textDecorationLine: 'line-through', marginRight: 12 },
  discountBadge: { backgroundColor: '#FF6B6B', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  discountText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  descriptionSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 24, color: '#5A5A5A' },
  featuresSection: { marginBottom: 24 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureText: { fontSize: 16, color: '#4A4A4A', marginLeft: 12, flex: 1 },
  warrantySection: { marginBottom: 24 },
  warrantyItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  warrantyText: { fontSize: 16, color: '#4A4A4A', marginLeft: 14 },
  quantitySection: { marginBottom: 20 },
  quantitySelector: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: { fontSize: 22, fontWeight: '700', color: '#171717' },
  quantityText: { fontSize: 18, fontWeight: '700', color: '#171717', minWidth: 40, textAlign: 'center' },
  bottomContainer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    backgroundColor: '#F5F1E8',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addedNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
  },
  addedText: { fontSize: 14, fontWeight: '600', color: '#4CAF50', marginLeft: 8 },
  addButton: {
    backgroundColor: '#163841',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', marginLeft: 8 },
  buyButton: {
    backgroundColor: '#FFEA30',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyButtonText: { fontSize: 18, fontWeight: '800', color: '#161616' },
});
