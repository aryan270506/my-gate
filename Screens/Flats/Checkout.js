import React, { useContext, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';

export default function Checkout({ navigation, route }) {
  const { total = 0, itemCount = 1, isDirectBuy = false } = route?.params ?? {};
  const { clearCart } = useContext(CartContext);

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isPlacing, setIsPlacing] = useState(false);

  const paymentOptions = [
    { id: 'upi', label: 'UPI / QR Code', icon: 'qr-code-outline' },
    { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
    { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
  ];

  const handlePlaceOrder = () => {
    if (!address.trim() || !phone.trim()) return;
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      if (!isDirectBuy) clearCart();
      navigation.navigate('OrderConfirmation', {
        total,
        itemCount,
        paymentMethod: selectedPayment,
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="#171717" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Items</Text>
            <Text style={styles.rowValue}>{itemCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal (incl. GST)</Text>
            <Text style={styles.rowValue}>₹ {total.toFixed(0)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery</Text>
            <Text style={[styles.rowValue, { color: '#4CAF50' }]}>FREE</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹ {total.toFixed(0)}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Full delivery address..."
            placeholderTextColor="#A0A0A0"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
          />
          <TextInput
            style={[styles.input, { marginTop: 12, marginBottom: 0 }]}
            placeholder="Phone number"
            placeholderTextColor="#A0A0A0"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          {paymentOptions.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.paymentRow, selectedPayment === opt.id && styles.paymentRowSelected]}
              activeOpacity={0.8}
              onPress={() => setSelectedPayment(opt.id)}
            >
              <Ionicons
                name={opt.icon}
                size={24}
                color={selectedPayment === opt.id ? '#163841' : '#6B6B6B'}
              />
              <Text
                style={[
                  styles.paymentLabel,
                  selectedPayment === opt.id && styles.paymentLabelSelected,
                ]}
              >
                {opt.label}
              </Text>
              <Ionicons
                name={selectedPayment === opt.id ? 'radio-button-on' : 'radio-button-off'}
                size={22}
                color={selectedPayment === opt.id ? '#163841' : '#C0C0C0'}
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Promise badges */}
        <View style={styles.badgeRow}>
          {[
            { icon: 'shield-checkmark-outline', text: '3-Year Warranty' },
            { icon: 'construct-outline', text: 'Free Install' },
            { icon: 'lock-closed-outline', text: 'Secure Payment' },
          ].map((b) => (
            <View key={b.text} style={styles.badge}>
              <Ionicons name={b.icon} size={20} color="#163841" />
              <Text style={styles.badgeText}>{b.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Place Order */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.placeOrderBtn,
            (!address.trim() || !phone.trim()) && styles.placeOrderBtnDisabled,
          ]}
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
          disabled={isPlacing || !address.trim() || !phone.trim()}
        >
          <Text style={styles.placeOrderText}>
            {isPlacing ? 'Placing Order...' : `Pay ₹ ${total.toFixed(0)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#171717' },
  content: { paddingHorizontal: 20, paddingBottom: 24 },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { fontSize: 15, color: '#6B6B6B' },
  rowValue: { fontSize: 15, fontWeight: '600', color: '#171717' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: { fontSize: 17, fontWeight: '800', color: '#171717' },
  totalValue: { fontSize: 17, fontWeight: '800', color: '#171717' },

  input: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#171717',
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    marginBottom: 0,
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    gap: 12,
  },
  paymentRowSelected: { borderColor: '#163841', backgroundColor: '#EEF5F6' },
  paymentLabel: { fontSize: 15, color: '#6B6B6B', fontWeight: '500' },
  paymentLabelSelected: { color: '#163841', fontWeight: '700' },

  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  badge: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 4,
    gap: 6,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#163841', textAlign: 'center' },

  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F5F1E8',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  placeOrderBtn: {
    backgroundColor: '#FFEA30',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  placeOrderBtnDisabled: { backgroundColor: '#F0E890', opacity: 0.6 },
  placeOrderText: { fontSize: 18, fontWeight: '800', color: '#161616' },
});