import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const emergencyContactsData = [
  {
    id: 1,
    name: 'Police Station',
    number: '100',
    phone: '020-2534-8888',
    category: 'Security',
    icon: 'shield-checkmark-outline',
    color: '#FF4A60',
    description: 'Emergency police assistance',
  },
  {
    id: 2,
    name: 'Ambulance / Medical',
    number: '108',
    phone: '1298 (Arogya Sevak)',
    category: 'Medical',
    icon: 'medkit-outline',
    color: '#48B24E',
    description: 'Emergency medical assistance',
  },
  {
    id: 3,
    name: 'Fire Department',
    number: '101',
    phone: '020-2534-1111',
    category: 'Safety',
    icon: 'flame-outline',
    color: '#FF6B35',
    description: 'Fire emergency & rescue',
  },
  {
    id: 4,
    name: 'Disaster Management',
    number: '1070',
    phone: '020-2534-4700',
    category: 'Disaster',
    icon: 'alert-outline',
    color: '#FF9500',
    description: 'Natural disaster assistance',
  },
  {
    id: 5,
    name: 'Women Helpline',
    number: '1091',
    phone: '1298 (Arogya Sevak)',
    category: 'Support',
    icon: 'shield-outline',
    color: '#9C27B0',
    description: 'Women safety & support',
  },
  {
    id: 6,
    name: 'Child Helpline',
    number: '1098',
    phone: '020-25343244',
    category: 'Support',
    icon: 'happy-outline',
    color: '#2196F3',
    description: 'Child abuse prevention',
  },
  {
    id: 7,
    name: 'Poison Control',
    number: '1800-22-8764',
    phone: '020-2625-0101',
    category: 'Medical',
    icon: 'warning-outline',
    color: '#FF5252',
    description: 'Poison emergency helpline',
  },
  {
    id: 8,
    name: 'Building Security',
    number: 'Ext 100',
    phone: '020-2350-1234',
    category: 'Building',
    icon: 'key-outline',
    color: '#173A42',
    description: 'Building security office',
  },
];

export default function EmergencyContactsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...new Set(emergencyContactsData.map((c) => c.category))];

  const filteredContacts = emergencyContactsData.filter(
    (contact) => selectedCategory === 'All' || contact.category === selectedCategory
  );

  const handleCall = (number) => {
    alert(`Calling ${number}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Emergency</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.warningCard}>
          <Ionicons name="alert-circle" size={24} color="#FF4A60" />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Emergency?</Text>
            <Text style={styles.warningText}>Use these contacts for immediate help</Text>
          </View>
        </View>

        <View style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, selectedCategory === cat && styles.activeCategoryTab]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.activeCategoryText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredContacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Ionicons name={contact.icon} size={24} color="#FFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactCategory}>{contact.category}</Text>
              </View>
            </View>

            <Text style={styles.description}>{contact.description}</Text>

            <View style={styles.numbersContainer}>
              {contact.number && (
                <View style={styles.numberBox}>
                  <Text style={styles.numberLabel}>Emergency Number</Text>
                  <Text style={styles.numberText}>{contact.number}</Text>
                </View>
              )}
              {contact.phone && (
                <View style={styles.numberBox}>
                  <Text style={styles.numberLabel}>Direct Number</Text>
                  <Text style={styles.numberText}>{contact.phone}</Text>
                </View>
              )}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(contact.number)}
              >
                <Ionicons name="call" size={20} color="#FFF" />
                <Text style={styles.callButtonText}>Call Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={20} color={contact.color} />
              </TouchableOpacity>
            </View>
          </View>
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
  warningCard: {
    backgroundColor: '#FFE8EB',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4A60',
  },
  warningTitle: { fontSize: 14, fontWeight: '700', color: '#FF4A60' },
  warningText: { fontSize: 12, color: '#D32F2F', marginTop: 2 },
  categoryScroll: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeCategoryTab: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeCategoryText: { color: '#000', fontWeight: '700' },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  contactCategory: { fontSize: 12, color: '#999', marginTop: 2 },
  description: { fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 18 },
  numbersContainer: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  numberBox: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
  },
  numberLabel: { fontSize: 11, color: '#999', fontWeight: '600' },
  numberText: { fontSize: 14, fontWeight: '800', color: '#1A1A1A', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 10 },
  callButton: {
    flex: 1,
    backgroundColor: '#FF4A60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  callButtonText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
