import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const samplePasses = [
  { id: 1, name: 'Maid - Priya', validTill: '31 Dec 2025', active: true },
  { id: 2, name: 'Gym Trainer', validTill: '15 Jun 2025', active: true },
  { id: 3, name: 'Plumber', validTill: '30 Apr 2025', active: false },
];

export function MyPassesModal({ visible, onClose }) {
  const [passes, setPasses] = useState(samplePasses);

  const togglePass = (id) => {
    setPasses(
      passes.map((pass) =>
        pass.id === id ? { ...pass, active: !pass.active } : pass
      )
    );
  };

  const renderPassItem = ({ item }) => (
    <View style={[styles.passCard, !item.active && styles.passCardInactive]}>
      <View style={styles.passHeader}>
        <View style={styles.passInfo}>
          <Text style={styles.passName}>{item.name}</Text>
          <Text style={styles.passValidity}>Valid till {item.validTill}</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, item.active && styles.toggleButtonActive]}
          onPress={() => togglePass(item.id)}
        >
          <Ionicons
            name={item.active ? 'lock-open-outline' : 'lock-closed-outline'}
            size={18}
            color={item.active ? '#1E1E1E' : '#999'}
          />
        </TouchableOpacity>
      </View>
      {item.active && <View style={styles.activeIndicator} />}
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon Circle */}
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Ionicons name="card-outline" size={60} color="#1E1E1E" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>My Passes</Text>

          {/* Passes List */}
          <View style={styles.passesContainer}>
            {passes.length > 0 ? (
              <FlatList
                data={passes}
                renderItem={renderPassItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="card-outline" size={40} color="#DDD" />
                <Text style={styles.emptyStateText}>No passes found</Text>
              </View>
            )}
          </View>

          {/* Add New Pass Button */}
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Ionicons name="add-circle-outline" size={24} color="#1D97E8" />
            <Text style={styles.addButtonText}>Add New Pass</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '85%',
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    maxHeight: '80%',
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 36,
  },
  passesContainer: {
    width: '100%',
    marginBottom: 20,
    maxHeight: 250,
  },
  passCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD62E',
    position: 'relative',
  },
  passCardInactive: {
    borderLeftColor: '#DDD',
    opacity: 0.6,
  },
  passHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passInfo: {
    flex: 1,
  },
  passName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  passValidity: {
    fontSize: 11,
    color: '#999',
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FFE8A3',
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD62E',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E8F4FF',
    gap: 8,
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1D97E8',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
});
