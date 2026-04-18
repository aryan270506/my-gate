import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const chatsData = [
  {
    id: 1,
    name: 'Building Committee',
    avatar: 'BC',
    color: '#387CFF',
    lastMessage: 'Water supply maintenance scheduled for tomorrow',
    time: '2:30 PM',
    unread: true,
    isCommunity: true,
    memberCount: 34,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Thanks for the help yesterday!',
    time: '1:15 PM',
    unread: false,
    isCommunity: false,
  },
  {
    id: 3,
    name: 'G9 Floor Group',
    avatar: 'G9',
    color: '#48B24E',
    lastMessage: "Let's plan a floor gathering next month",
    time: 'Yesterday',
    unread: true,
    isCommunity: true,
    memberCount: 12,
  },
  {
    id: 4,
    name: 'Rajesh Patel',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    lastMessage: 'Sure, I can help with that',
    time: 'Yesterday',
    unread: false,
    isCommunity: false,
  },
  {
    id: 5,
    name: 'Social Committee',
    avatar: 'SC',
    color: '#FF9500',
    lastMessage: 'Annual event planning in progress',
    time: '3 days ago',
    unread: false,
    isCommunity: true,
    memberCount: 18,
  },
];

export default function CommunicationScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState('');

  const filteredChats = chatsData.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={28} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            placeholder="Search chats..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterTab, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Communities</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterText}>Direct</Text>
          </TouchableOpacity>
        </View>

        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatCard}>
              {chat.isCommunity ? (
                <View style={[styles.avatar, { backgroundColor: chat.color }]}>
                  <Text style={styles.avatarText}>{chat.avatar}</Text>
                </View>
              ) : (
                <Image source={{ uri: chat.avatar }} style={styles.avatarImage} />
              )}

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <View style={styles.messageRow}>
                  <Text
                    numberOfLines={1}
                    style={[styles.lastMessage, chat.unread && styles.unreadMessage]}
                  >
                    {chat.lastMessage}
                  </Text>
                  {chat.unread && <View style={styles.unreadDot} />}
                </View>
                {chat.isCommunity && (
                  <Text style={styles.memberCount}>{chat.memberCount} members</Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color="#CCC" />
            <Text style={styles.emptyStateText}>No chats found</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create-outline" size={28} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F1E8' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 80 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: '800', color: '#171717', flex: 1, textAlign: 'center' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginLeft: 8, fontSize: 14, color: '#333' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  activeFilter: { backgroundColor: '#FFD900', borderColor: '#FFD900' },
  filterText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeFilterText: { fontSize: 12, fontWeight: '700', color: '#000' },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#FFF' },
  avatarImage: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  chatContent: { flex: 1 },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  chatTime: { fontSize: 12, color: '#999' },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastMessage: { flex: 1, fontSize: 13, color: '#777' },
  unreadMessage: { color: '#1A1A1A', fontWeight: '600' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#387CFF' },
  memberCount: { fontSize: 11, color: '#999', marginTop: 2 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyStateText: { fontSize: 16, color: '#999', marginTop: 12 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4B900',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});
