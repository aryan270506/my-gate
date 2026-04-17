import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../context/CartContext';
import SocialScreen from './Social/social';
import BuySellScreen from './BuySell';
import CommunityScreen from './Community';
import ServicesScreen from './Services';
import DevicesScreen from './Devices';
import ProductDetailsScreen from './ProductDetails';
import CartScreen from './Cart';             // Now a plain screen component
import CheckoutScreen from './Checkout';
import OrderConfirmationScreen from './OrderConfirmation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabConfig = {
  Social:     { activeIcon: 'home',           inactiveIcon: 'home-outline',           label: 'Social' },
  'Buy&Sell': { activeIcon: 'pricetag',       inactiveIcon: 'pricetag-outline',       label: 'Buy&Sell' },
  Community:  { activeIcon: 'people',         inactiveIcon: 'people-outline',         label: 'Community', isPrimary: true },
  Services:   { activeIcon: 'construct',      inactiveIcon: 'construct-outline',      label: 'Services' },
  Devices:    { activeIcon: 'phone-portrait', inactiveIcon: 'phone-portrait-outline', label: 'Devices' },
  Cart:       { activeIcon: 'cart',           inactiveIcon: 'cart-outline',           label: 'Cart' },
};

// ─── Devices Stack ────────────────────────────────────────────────────────────
function DevicesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DevicesList" component={DevicesScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

// ─── Cart Stack ───────────────────────────────────────────────────────────────
// This is the SINGLE owner of the cart navigation flow.
// Cart.js is now a plain screen — no nested Stack inside it.
function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartList" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
}

// ─── Cart Badge Icon ──────────────────────────────────────────────────────────
function CartTabIcon({ isFocused }) {
  const context = useContext(CartContext);
  const count = context?.getCartCount ? context.getCartCount() : 0;

  return (
    <View style={styles.cartIconWrapper}>
      <Ionicons
        name={isFocused ? 'cart' : 'cart-outline'}
        size={20}
        color={isFocused ? '#7E6722' : '#BDB5A8'}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </View>
  );
}

// ─── Bottom Tab Navigator ─────────────────────────────────────────────────────
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.hiddenTabBar,
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <View style={styles.bottomNav}>
          <View style={styles.navItems}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;
              const config = tabConfig[route.name];

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({ type: 'tabLongPress', target: route.key });
              };

              // Primary (Community) floating button
              if (config.isPrimary) {
                return (
                  <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarButtonTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.primaryTabItem}
                    activeOpacity={0.9}
                  >
                    <View style={styles.primaryButton}>
                      <Ionicons name={config.activeIcon} size={24} color="#191919" />
                    </View>
                    <Text style={[styles.navLabel, styles.primaryLabel]}>{config.label}</Text>
                  </TouchableOpacity>
                );
              }

              // Cart tab — with badge
              if (route.name === 'Cart') {
                return (
                  <TouchableOpacity
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarButtonTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={styles.navItem}
                    activeOpacity={0.85}
                  >
                    <CartTabIcon isFocused={isFocused} />
                    <Text style={[styles.navLabel, isFocused && styles.navLabelFocused]}>
                      {config.label}
                    </Text>
                  </TouchableOpacity>
                );
              }

              // All other tabs
              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.navItem}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={isFocused ? config.activeIcon : config.inactiveIcon}
                    size={20}
                    color={isFocused ? '#7E6722' : '#BDB5A8'}
                  />
                  <Text style={[styles.navLabel, isFocused && styles.navLabelFocused]}>
                    {config.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    >
      <Tab.Screen name="Social"    component={SocialScreen} />
      <Tab.Screen name="Buy&Sell"  component={BuySellScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Services"  component={ServicesScreen} />
      <Tab.Screen name="Devices"   component={DevicesStackNavigator} />
      <Tab.Screen name="Cart"      component={CartStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  hiddenTabBar: { display: 'none' },
  bottomNav: {
    backgroundColor: '#FBF7EF',
    borderTopWidth: 1,
    borderTopColor: '#ECE2D5',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  primaryTabItem: {
    flex: 1,
    alignItems: 'center',
    marginTop: -24,
  },
  primaryButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFD62E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DAB81E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 5,
    marginBottom: 6,
  },
  navLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#D0C8BB',
  },
  navLabelFocused: { color: '#A18935' },
  primaryLabel: { marginTop: 0, color: '#A18935' },

  // Cart badge
  cartIconWrapper: {
    position: 'relative',
    width: 28,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FBF7EF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 12,
  },
});