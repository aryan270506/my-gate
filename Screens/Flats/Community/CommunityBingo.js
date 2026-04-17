import React from 'react';
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

const bingoData = [
  {
    title: 'Weekly Bingo',
    date: 'Every Saturday',
    time: '7:00 PM - 8:00 PM',
    prize: '₹ 5,000',
    players: '45 joined',
    status: 'Upcoming',
  },
  {
    title: 'Family Bingo Night',
    date: 'Last Sunday',
    time: '6:00 PM - 9:00 PM',
    prize: '₹ 10,000',
    players: '78 joined',
    status: 'Completed',
  },
];

const rules = [
  '5x5 grid with numbers 1-75',
  'Mark numbers as they are called',
  'First to complete a line (horizontal, vertical or diagonal) wins',
  'Prize: ₹ 5,000 per winner',
];

export default function CommunityBingoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Community Bingo</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Games</Text>
          {bingoData.map((item, index) => (
            <View key={index} style={styles.gameCard}>
              <View style={styles.gameHeader}>
                <View>
                  <Text style={styles.gameTitle}>{item.title}</Text>
                  <Text style={styles.gameDate}>{item.date}</Text>
                </View>
                <View style={[styles.statusBadge, item.status === 'Completed' && styles.completedBadge]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.gameDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={18} color="#666" />
                  <Text style={styles.detailText}>{item.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="gift-outline" size={18} color="#666" />
                  <Text style={styles.detailText}>{item.prize}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="people-outline" size={18} color="#666" />
                  <Text style={styles.detailText}>{item.players}</Text>
                </View>
              </View>
              {item.status === 'Upcoming' && (
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Game</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How to Play</Text>
          {rules.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <View style={styles.ruleBullet}>
                <Text style={styles.bulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Score</Text>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Games Played</Text>
              <Text style={styles.scoreValue}>12</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Wins</Text>
              <Text style={styles.scoreWin}>3</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Winnings</Text>
              <Text style={styles.scoreValue}>₹ 15,000</Text>
            </View>
          </View>
        </View>
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
  title: { fontSize: 26, fontWeight: '800', color: '#171717' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#171717', marginBottom: 14 },
  gameCard: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gameTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  gameDate: { fontSize: 13, color: '#666', marginTop: 4 },
  statusBadge: {
    backgroundColor: '#FFD900',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedBadge: { backgroundColor: '#E8E8E8' },
  statusText: { fontSize: 12, fontWeight: '600', color: '#171717' },
  gameDetails: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13, color: '#555' },
  joinButton: {
    backgroundColor: '#FFD900',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: { fontSize: 14, fontWeight: '700', color: '#000' },
  ruleItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  ruleBullet: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: { fontSize: 14, fontWeight: '700', color: '#000' },
  ruleText: { flex: 1, fontSize: 14, color: '#333', marginTop: 6 },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  scoreItem: { alignItems: 'center' },
  scoreLabel: { fontSize: 13, color: '#666', marginBottom: 6 },
  scoreValue: { fontSize: 20, fontWeight: '800', color: '#171717' },
  scoreWin: { fontSize: 20, fontWeight: '800', color: '#48B24E' },
});
