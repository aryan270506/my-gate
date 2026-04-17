import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const communicationsData = [
  {
    id: 1,
    title: 'Building Maintenance Update',
    category: 'Announcement',
    author: 'Admin',
    timestamp: '2 hours ago',
    message: 'The water supply will be down tomorrow from 10 AM to 2 PM for maintenance.',
    replies: 5,
    icon: 'megaphone-outline',
    color: '#FF6B6B',
  },
  {
    id: 2,
    title: 'Lost Pet - Black Labrador',
    category: 'Lost & Found',
    author: 'Rajesh Kumar',
    timestamp: '1 day ago',
    message: 'Missing since yesterday evening near the main gate. Please contact if spotted.',
    replies: 12,
    icon: 'paw-outline',
    color: '#FFA500',
  },
  {
    id: 3,
    title: 'Community Sports Meet',
    category: 'Event',
    author: 'Sports Committee',
    timestamp: '3 days ago',
    message: 'Cricket tournament next weekend. All residents welcome to participate!',
    replies: 23,
    icon: 'football-outline',
    color: '#4CAF50',
  },
];

export function CommunicationsModal({ visible, onClose }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Announcement', 'Lost & Found', 'Event', 'Rules'];

  const filteredData = communicationsData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCommunicationItem = ({ item }) => (
    <TouchableOpacity style={styles.communicationCard} activeOpacity={0.8}>
      <View style={styles.cardContent}>
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: item.color + '20' },
          ]}
        >
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTime}>{item.timestamp}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardAuthor}>by {item.author}</Text>
          <Text style={styles.cardMessage} numberOfLines={2}>
            {item.message}
          </Text>
          <View style={styles.cardFooter}>
            <Ionicons name="chatbubble-outline" size={14} color="#999" />
            <Text style={styles.repliesCount}>{item.replies} replies</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#DDD" />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Communications</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communications..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredData}
        renderItem={renderCommunicationItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-outline" size={48} color="#DDD" />
            <Text style={styles.emptyText}>No communications found</Text>
          </View>
        }
      />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  headerSpacer: {
    width: 40,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#1E1E1E',
  },
  categoryScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  categoryButtonActive: {
    backgroundColor: '#FFD62E',
    borderColor: '#FFD62E',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#1E1E1E',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  communicationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
  },
  cardTime: {
    fontSize: 10,
    color: '#999',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  cardAuthor: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  cardMessage: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  repliesCount: {
    fontSize: 10,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
});
