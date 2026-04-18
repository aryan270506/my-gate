import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './Screens/Login/Login';
import BottomTabNavigator from './Screens/Flats/BottomTab';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          {isLoggedIn ? <BottomTabNavigator /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          <StatusBar style="light" />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
