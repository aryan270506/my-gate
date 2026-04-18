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

const electionsData = [
  {
    id: 1,
    title: '2026 Building Committee Elections',
    status: 'Ongoing',
    startDate: '10 Apr 2026',
    endDate: '20 Apr 2026',
    votingStarted: true,
    candidates: 12,
    type: 'Election',
  },
  {
    id: 2,
    title: 'Last Year Committee Elections',
    status: 'Completed',
    startDate: '15 Apr 2025',
    endDate: '25 Apr 2025',
    votingStarted: false,
    candidates: 8,
    type: 'Election',
  },
];

const surveysData = [
  {
    id: 1,
    title: 'Community Facility Feedback Survey',
    description: 'Your valuable feedback on community facilities',
    status: 'Active',
    progress: 65,
    responses: 52,
    totalResidents: 80,
    type: 'Survey',
  },
  {
    id: 2,
    title: 'Annual Community Satisfaction Survey',
    description: 'Help us improve our services',
    status: 'Active',
    progress: 42,
    responses: 34,
    totalResidents: 80,
    type: 'Survey',
  },
  {
    id: 3,
    title: 'New Amenities Proposal Feedback',
    description: 'What amenities would you like in your community?',
    status: 'Completed',
    progress: 100,
    responses: 68,
    totalResidents: 80,
    type: 'Survey',
  },
];

export default function ElectionsAndSurveyScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState('Elections');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.title}>Elections & Survey</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Elections' && styles.activeTab]}
            onPress={() => setActiveTab('Elections')}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={activeTab === 'Elections' ? '#000' : '#999'}
            />
            <Text style={[styles.tabText, activeTab === 'Elections' && styles.activeTabText]}>
              Elections
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Survey' && styles.activeTab]}
            onPress={() => setActiveTab('Survey')}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={activeTab === 'Survey' ? '#000' : '#999'}
            />
            <Text style={[styles.tabText, activeTab === 'Survey' && styles.activeTabText]}>
              Surveys
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Elections' ? (
          <View>
            {electionsData.map((election) => (
              <View key={election.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>{election.title}</Text>
                    <Text style={styles.cardSubtitle}>{election.candidates} candidates</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      election.status === 'Ongoing' ? styles.ongoingBadge : styles.completedBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>{election.status}</Text>
                  </View>
                </View>

                <View style={styles.dateContainer}>
                  <View style={styles.dateItem}>
                    <Ionicons name="calendar-outline" size={16} color="#387CFF" />
                    <Text style={styles.dateText}>{election.startDate}</Text>
                  </View>
                  <Text style={styles.dateSeperator}>→</Text>
                  <View style={styles.dateItem}>
                    <Ionicons name="calendar-outline" size={16} color="#387CFF" />
                    <Text style={styles.dateText}>{election.endDate}</Text>
                  </View>
                </View>

                {election.votingStarted && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Vote Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View>
            {surveysData.map((survey) => (
              <View key={survey.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{survey.title}</Text>
                    <Text style={styles.cardSubtitle}>{survey.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      survey.status === 'Active' ? styles.activeBadge : styles.completedBadge,
                    ]}
                  >
                    <Text style={styles.statusText}>{survey.status}</Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, { width: `${survey.progress}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {survey.responses}/{survey.totalResidents} responses ({survey.progress}%)
                  </Text>
                </View>

                {survey.status === 'Active' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Take Survey</Text>
                  </TouchableOpacity>
                )}
                {survey.status === 'Completed' && (
                  <TouchableOpacity style={styles.resultButton}>
                    <Ionicons name="bar-chart-outline" size={18} color="#387CFF" />
                    <Text style={styles.resultButtonText}>View Results</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFD900',
    borderRadius: 12,
  },
  tabText: { fontSize: 13, fontWeight: '600', color: '#999' },
  activeTabText: { color: '#000', fontWeight: '700' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  cardSubtitle: { fontSize: 12, color: '#999', marginTop: 4 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ongoingBadge: { backgroundColor: '#E8F0FF' },
  activeBadge: { backgroundColor: '#E8F0FF' },
  completedBadge: { backgroundColor: '#E8F5E9' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#1A1A1A' },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  dateText: { fontSize: 12, color: '#666' },
  dateSeperator: { fontSize: 16, color: '#CCC', marginHorizontal: 4 },
  progressContainer: { marginBottom: 12 },
  progressBar: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#387CFF' },
  progressText: { fontSize: 12, color: '#777' },
  actionButton: {
    backgroundColor: '#FFD900',
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: { fontSize: 14, fontWeight: '700', color: '#000' },
  resultButton: {
    backgroundColor: '#E8F0FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  resultButtonText: { fontSize: 14, fontWeight: '700', color: '#387CFF' },
});
