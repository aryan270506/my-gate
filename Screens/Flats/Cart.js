import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';

// ─── Cart Screen (plain screen — navigation is handled by CartStackNavigator in BottomTab.js) ──
export default function Cart({ navigation }) {
  const context = useContext(CartContext);
  const cartItems = context?.cartItems ?? [];
  const removeFromCart = context?.removeFromCart ?? (() => {});
  const addToCart = context?.addToCart ?? (() => {});
  const getCartCount = context?.getCartCount ?? (() => 0);

  const increaseQty = (item) => addToCart(item);
  const decreaseQty = (item) => removeFromCart(item.title);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace('₹ ', '').replace('₹', '').trim());
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleBuyNow = (item) => {
    const itemPrice = parseFloat(String(item.price).replace('₹ ', '').replace('₹', '').trim());
    const itemTotal = itemPrice * item.quantity;
    const itemTax = itemTotal * 0.18;
    navigation.navigate('Checkout', {
      total: itemTotal + itemTax,
      itemCount: item.quantity,
      isDirectBuy: true,
      singleItem: item,
    });
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={{ width: 32 }} />
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#C0C0C0" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Devices')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>My Cart ({getCartCount()})</Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const itemPrice = parseFloat(
            String(item.price).replace('₹ ', '').replace('₹', '').trim()
          );
          const itemTotal = itemPrice * item.quantity;
          return (
            <View style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.cartImage} />
              <View style={styles.cartInfo}>
                <Text style={styles.cartTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cartPrice}>{item.price}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQty(item)}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQty(item)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                  {item.quantity > 1 && (
                    <Text style={styles.itemTotal}>= ₹ {itemTotal.toFixed(0)}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buyNowBtn}
                  activeOpacity={0.85}
                  onPress={() => handleBuyNow(item)}
                >
                  <Text style={styles.buyNowBtnText}>Buy Now</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.title)}
              >
                <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View style={styles.summaryBox}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹ {subtotal.toFixed(0)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (18%)</Text>
          <Text style={styles.summaryValue}>₹ {tax.toFixed(0)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹ {total.toFixed(0)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('Checkout', {
              total,
              itemCount: getCartCount(),
              isDirectBuy: false,
            })
          }
        >
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout ({getCartCount()} items)
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

  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyText: { fontSize: 18, color: '#8A8A8A', fontWeight: '600' },
  shopButton: {
    backgroundColor: '#163841',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 8,
  },
  shopButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },

  listContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 14,
    padding: 14,
    alignItems: 'flex-start',
  },
  cartImage: { width: 80, height: 80, borderRadius: 12 },
  cartInfo: { flex: 1, marginHorizontal: 14 },
  cartTitle: { fontSize: 15, fontWeight: '700', color: '#171717', marginBottom: 6 },
  cartPrice: { fontSize: 17, fontWeight: '800', color: '#171717', marginBottom: 10 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 20, fontWeight: '700', color: '#171717' },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    minWidth: 24,
    textAlign: 'center',
  },
  itemTotal: { fontSize: 13, fontWeight: '600', color: '#7E6722', marginLeft: 4 },
  removeBtn: { padding: 8 },

  buyNowBtn: {
    backgroundColor: '#163841',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buyNowBtnText: { fontSize: 13, fontWeight: '700', color: '#FFFFFF' },

  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 16, color: '#6B6B6B' },
  summaryValue: { fontSize: 16, fontWeight: '600', color: '#171717' },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  totalLabel: { fontSize: 18, fontWeight: '800', color: '#171717' },
  totalValue: { fontSize: 20, fontWeight: '800', color: '#171717' },
  checkoutButton: {
    backgroundColor: '#FFEA30',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  checkoutButtonText: { fontSize: 18, fontWeight: '800', color: '#161616' },
});