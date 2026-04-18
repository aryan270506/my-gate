import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function OrderConfirmation({ navigation, route }) {
  const { total = 0, itemCount = 1, paymentMethod = 'upi' } = route?.params ?? {};

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 60,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  const methodLabel = {
    upi: 'UPI / QR Code',
    card: 'Credit / Debit Card',
    cod: 'Cash on Delivery',
  }[paymentMethod] ?? paymentMethod;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Animated checkmark */}
        <Animated.View style={[styles.iconCircle, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="checkmark" size={64} color="#FFFFFF" />
        </Animated.View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your order has been confirmed. Our team will contact you shortly for installation.
        </Text>

        {/* Summary card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Items Ordered</Text>
            <Text style={styles.rowValue}>{itemCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Amount Paid</Text>
            <Text style={styles.rowValue}>₹ {total.toFixed(0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Payment Method</Text>
            <Text style={styles.rowValue}>{methodLabel}</Text>
          </View>
          <View style={[styles.row, { marginBottom: 0 }]}>
            <Text style={styles.rowLabel}>Delivery</Text>
            <Text style={[styles.rowValue, { color: '#4CAF50' }]}>FREE</Text>
          </View>
        </View>

        {/* Promise strip */}
        <View style={styles.promiseRow}>
          {[
            { icon: 'construct-outline', text: 'Free Install' },
            { icon: 'shield-checkmark-outline', text: '3-Year Warranty' },
            { icon: 'headset-outline', text: '24/7 Support' },
          ].map((p) => (
            <View key={p.text} style={styles.promiseItem}>
              <Ionicons name={p.icon} size={22} color="#163841" />
              <Text style={styles.promiseText}>{p.text}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CartList')}
        >
          <Text style={styles.homeButtonText}>Back to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shopButton}
          activeOpacity={0.85}
          onPress={() =>
            navigation.getParent()?.navigate('Devices')
          }
        >
          <Text style={styles.shopButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  title: { fontSize: 32, fontWeight: '800', color: '#171717', marginBottom: 12 },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowLabel: { fontSize: 15, color: '#6B6B6B' },
  rowValue: { fontSize: 15, fontWeight: '700', color: '#171717' },
  promiseRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  promiseItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 4,
    gap: 6,
  },
  promiseText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#163841',
    textAlign: 'center',
  },
  homeButton: {
    width: '100%',
    backgroundColor: '#163841',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  homeButtonText: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  shopButton: {
    width: '100%',
    backgroundColor: '#FFEA30',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  shopButtonText: { fontSize: 17, fontWeight: '800', color: '#161616' },
});