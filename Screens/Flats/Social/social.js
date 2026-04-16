import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const homeActions = [
  { label: 'Visitors', icon: 'people-outline' },
  { label: 'Pre-approve', icon: 'shield-outline' },
  { label: 'Deliveries', icon: 'cube-outline' },
  { label: 'Daily Help', icon: 'briefcase-outline' },
];

const todayEntries = [
  {
    name: 'Rahul S.',
    time: '10:45 AM',
    tag: 'DELIVERY',
    icon: 'person-outline',
    tagStyle: 'delivery',
  },
  {
    name: 'Sunita M.',
    time: '08:15 AM',
    tag: 'DAILY HELP',
    icon: 'briefcase-outline',
    tagStyle: 'help',
  },
];

const quickActionSections = [
  {
    title: 'Visitors & Security',
    actionText: 'Raise Alert',
    actionIcon: 'alert-circle-outline',
    items: [
      { label: 'Invite\nGuest', icon: 'person-outline' },
      { label: 'Cab/Auto', icon: 'car-sport-outline' },
      { label: 'Allow\nDelivery', icon: 'bicycle-outline' },
      { label: 'Visiting\nHelp', icon: 'construct-outline' },
      { label: 'Call\nSecurity', icon: 'call-outline' },
      { label: 'Message\nGuard', icon: 'mail-outline' },
      { label: 'MyPasses', icon: 'card-outline' },
      { label: 'Allow Kid\nExit', icon: 'happy-outline' },
    ],
  },
  {
    title: 'Community',
    actionText: 'View all',
    items: [
      { label: 'Communic\nations', icon: 'chatbubble-ellipses-outline' },
      { label: 'Search\nVehicle', icon: 'car-outline' },
      { label: 'Find Daily\nHelp', icon: 'bug-outline' },
      { label: 'Classes', icon: 'document-text-outline' },
    ],
  },
  {
    title: 'Feed',
    actionText: 'View all posts',
    items: [
      { label: 'Create Post', icon: 'newspaper-outline' },
      { label: 'Create poll', icon: 'bar-chart-outline' },
      { label: 'Host an\nEvent', icon: 'calendar-outline' },
      { label: 'My Posts', icon: 'id-card-outline' },
    ],
  },
  {
    title: 'Smart Devices',
    items: [
      { label: 'Manage\nDevices', icon: 'phone-portrait-outline' },
      { label: 'Mygate\nLocks', icon: 'lock-closed-outline' },
    ],
  },
  {
    title: 'Marketplace',
    actionText: 'Explore',
    items: [
      { label: 'Find\nHomes', icon: 'home-outline' },
      { label: 'Find\nFurniture', icon: 'bed-outline' },
      { label: 'Create a\nlisting', icon: 'pricetag-outline' },
    ],
  },
  {
    title: 'Household',
    actionText: 'Manage',
    items: [
      { label: 'My Family', icon: 'people-circle-outline' },
      { label: 'My Daily\nHelp', icon: 'sparkles-outline' },
      { label: 'Home\nPlanner', icon: 'calendar-clear-outline' },
      { label: 'My\nVehicles', icon: 'car-outline' },
    ],
  },
  {
    title: 'Settings',
    actionText: 'View all',
    items: [
      { label: 'Test\nNotification', icon: 'notifications-outline' },
      { label: 'My Flat', icon: 'business-outline' },
      { label: 'My Plans', icon: 'diamond-outline' },
      { label: 'Help &\nSupport', icon: 'help-circle-outline' },
    ],
  },
];

function SectionAction({ title, actionText, actionIcon, onRaiseAlert }) {
  if (!actionText) {
    return <Text style={styles.quickSectionTitle}>{title}</Text>;
  }

  const isAlert = title === 'Visitors & Security';

  return (
    <View style={styles.quickSectionHeader}>
      <Text style={styles.quickSectionTitle}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.85}
        style={isAlert ? styles.raiseAlertButton : styles.sectionLinkButton}
        onPress={isAlert ? onRaiseAlert : undefined}
      >
        {actionIcon ? (
          <Ionicons
            name={actionIcon}
            size={isAlert ? 20 : 18}
            color={isAlert ? '#D73A32' : '#1D97E8'}
            style={styles.sectionLinkIcon}
          />
        ) : null}
        <Text style={isAlert ? styles.raiseAlertText : styles.sectionLinkText}>{actionText}</Text>
        {!isAlert ? <Ionicons name="chevron-forward" size={20} color="#1D97E8" /> : null}
      </TouchableOpacity>
    </View>
  );
}

function QuickGrid({ items, onItemPress }) {
  return (
    <View style={styles.quickGrid}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.quickTile}
          activeOpacity={0.85}
          onPress={() => onItemPress && onItemPress(item.label)}
        >
          <View style={styles.quickTileIconBox}>
            <Ionicons name={item.icon} size={29} color="#20353A" />
          </View>
          <Text style={styles.quickTileLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function RaiseAlertModal({ visible, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertModalContainer}>
          {/* Drag Handle */}
          <View style={styles.alertDragHandle} />
          
          {/* Close X Button */}
          <TouchableOpacity style={styles.alertCloseX} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color="#4A4A4A" />
          </TouchableOpacity>

          {/* Header with G9 802 and Ad-Supported */}
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>G9 802</Text>
            <View style={styles.adBadge}>
              <Text style={styles.adBadgeText}>Ad-Supported</Text>
            </View>
          </View>

          {/* For moments that don't need going out */}
          <Text style={styles.alertSubtitle}>
            For moments{"\n"}that don't need going out
          </Text>

          {/* Yellow Circle Icon in Center */}
          <View style={styles.centerIconContainer}>
            <View style={styles.yellowCircle}>
              <Ionicons name="alert" size={50} color="#FF8C00" />
            </View>
          </View>

          {/* 4 Alert Options */}
          <View style={styles.alertOptionsGrid}>
            <TouchableOpacity style={styles.alertOption} activeOpacity={0.7}>
              <Text style={styles.alertOptionText}>Fire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertOption} activeOpacity={0.7}>
              <Text style={styles.alertOptionText}>Stuck In Lift</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertOption} activeOpacity={0.7}>
              <Text style={styles.alertOptionText}>Animal Threat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertOption} activeOpacity={0.7}>
              <Text style={styles.alertOptionText}>Visitor Threat</Text>
            </TouchableOpacity>
          </View>

          {/* Any Other Issue */}
          <TouchableOpacity style={styles.otherIssueButton} activeOpacity={0.7}>
            <Text style={styles.otherIssueText}>Any Other Issue</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Notify my alert list */}
          <View style={styles.notifySection}>
            <Text style={styles.notifyLabel}>Notify my alert list</Text>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
              <Ionicons name="add-circle-outline" size={24} color="#1D97E8" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Society Security */}
          <Text style={styles.societySecurityText}>Society Security</Text>

          {/* Raise Alarm Button - Light Yellow */}
          <TouchableOpacity style={styles.raiseAlarmButton} activeOpacity={0.8}>
            <Text style={styles.raiseAlarmText}>Raise Alarm</Text>
          </TouchableOpacity>

          {/* Updates Section */}
          <View style={styles.updatesSection}>
            <View style={styles.updatesHeader}>
              <Text style={styles.updatesTitle}>Updates</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noUpdatesContainer}>
              <Ionicons name="notifications-outline" size={32} color="#E1DBCF" />
              <Text style={styles.noUpdatesText}>No updates yet</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}



export default function SocialScreen() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showRaiseAlert, setShowRaiseAlert] = useState(false);
  

  // Removed Guest Invite handler - now does nothing
  const handleQuickItemPress = (itemLabel) => {
    // Guest Invite option removed - no action
    console.log('Pressed:', itemLabel);
  };

  const handleHomeActionPress = (actionLabel) => {
  // Pre-approve does nothing now
  console.log('Pressed:', actionLabel);
};

  const handleRaiseAlert = () => {
    setShowQuickActions(false);
    setShowRaiseAlert(true);
  };

  const handleCloseRaiseAlert = () => {
    setShowRaiseAlert(false);
    setShowQuickActions(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F3EA" />

      <View style={styles.screen}>
        <View style={styles.headerBar}>
          <TouchableOpacity activeOpacity={0.8} style={styles.headerIconButton}>
            <Ionicons name="menu-outline" size={20} color="#726B60" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>G9 802</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.8} style={styles.headerIconButton}>
              <Ionicons name="search-outline" size={18} color="#7B7469" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={18} color="#7B7469" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeCopy}>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>STATUS: SECURE</Text>
              </View>
              <Text style={styles.welcomeText}>
                Welcome back <Text style={styles.wave}>👋</Text>
              </Text>
            </View>
            <Ionicons name="shield-outline" size={68} color="#EEEAE2" />
          </View>

          <View style={styles.actionsGrid}>
            {homeActions.map((action) => (
              <TouchableOpacity 
                key={action.label} 
                style={styles.actionCard} 
                activeOpacity={0.85}
                onPress={() => handleHomeActionPress(action.label)}
              >
                <View style={styles.actionIconCircle}>
                  <Ionicons name={action.icon} size={18} color="#7D755F" />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewMoreButton}
            activeOpacity={0.9}
            onPress={() => setShowQuickActions(true)}
          >
            <Ionicons name="add-outline" size={18} color="#1E1E1E" />
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COMMUNITY UPDATES</Text>
            <View style={styles.updatesCard}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="copy-outline" size={22} color="#E1DBCF" />
              </View>
              <Text style={styles.emptyText}>You have no new updates</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TODAY'S ENTRY</Text>
            <View style={styles.entriesRow}>
              {todayEntries.map((entry) => (
                <View key={entry.name} style={styles.entryCard}>
                  <View style={styles.entryAvatar}>
                    <Ionicons
                      name={entry.icon}
                      size={entry.tagStyle === 'help' ? 22 : 28}
                      color={entry.tagStyle === 'help' ? '#C24F31' : '#4E8FA5'}
                    />
                  </View>
                  <Text style={styles.entryName}>{entry.name}</Text>
                  <Text style={styles.entryTime}>{entry.time}</Text>
                  <View
                    style={[
                      styles.entryBadge,
                      entry.tagStyle === 'help' ? styles.helpBadge : styles.deliveryBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.entryBadgeText,
                        entry.tagStyle === 'help' ? styles.helpBadgeText : styles.deliveryBadgeText,
                      ]}
                    >
                      {entry.tag}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Quick Actions Modal */}
      <Modal
        animationType="slide"
        visible={showQuickActions}
        onRequestClose={() => setShowQuickActions(false)}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalBody}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.closeButton}
                onPress={() => setShowQuickActions(false)}
              >
                <Ionicons name="close" size={34} color="#131313" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Quick Actions</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={24} color="#243335" />
              <TextInput
                placeholder="Search all features"
                placeholderTextColor="#778489"
                style={styles.searchInput}
              />
            </View>

            {quickActionSections.map((section) => (
              <View key={section.title} style={styles.quickSection}>
                <SectionAction
                  title={section.title}
                  actionText={section.actionText}
                  actionIcon={section.actionIcon}
                  onRaiseAlert={handleRaiseAlert}
                />
                <QuickGrid 
                  items={section.items} 
                  onItemPress={handleQuickItemPress}
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Raise Alert Modal */}
      <RaiseAlertModal 
        visible={showRaiseAlert} 
        onClose={handleCloseRaiseAlert}
      />

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F3EA',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F7F3EA',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerIconButton: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 28,
    fontWeight: '700',
    color: '#4F4A40',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F35345',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 18,
  },
  welcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FBFAF7',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#C7BCAB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 5,
  },
  welcomeCopy: {
    flex: 1,
    paddingRight: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0D138',
    marginRight: 6,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: '#C3BBB0',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#35312A',
  },
  wave: {
    fontSize: 26,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#FBFAF7',
    borderRadius: 22,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 14,
    shadowColor: '#C9BEAE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },
  actionIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3EFE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#656055',
  },
  viewMoreButton: {
    marginTop: 4,
    marginBottom: 18,
    borderRadius: 28,
    backgroundColor: '#FFD62E',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E8C72D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 4,
  },
  viewMoreText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '800',
    color: '#2F2B20',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#C0B6AA',
  },
  updatesCard: {
    backgroundColor: '#FBFAF7',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    shadowColor: '#C9BEAE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  emptyIconWrap: {
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7F786D',
  },
  entriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryCard: {
    width: '47%',
    backgroundColor: '#FBFAF7',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 18,
    shadowColor: '#C9BEAE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },
  entryAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  entryName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B352D',
    textAlign: 'center',
  },
  entryTime: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    color: '#B1A79B',
    textAlign: 'center',
  },
  entryBadge: {
    marginTop: 12,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deliveryBadge: {
    backgroundColor: '#F7F1C9',
  },
  helpBadge: {
    backgroundColor: '#F7E8C4',
  },
  entryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  deliveryBadgeText: {
    color: '#9B8430',
  },
  helpBadgeText: {
    color: '#A4722C',
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginBottom: 24,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0B0B0B',
  },
  headerSpacer: {
    width: 44,
  },
  searchBox: {
    height: 64,
    borderRadius: 26,
    backgroundColor: '#F4F6F8',
    borderWidth: 1,
    borderColor: '#D9E0E4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#223236',
    marginLeft: 12,
  },
  quickSection: {
    marginBottom: 28,
  },
  quickSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  quickSectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#18272C',
  },
  raiseAlertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E1E4E8',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  raiseAlertText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D73A32',
  },
  sectionLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLinkIcon: {
    marginRight: 6,
  },
  sectionLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D97E8',
    marginRight: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickTile: {
    width: '23%',
    marginBottom: 18,
    alignItems: 'center',
  },
  quickTileIconBox: {
    width: 88,
    height: 88,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E6EA',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickTileLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: '#1C2B2F',
    textAlign: 'center',
  },
  // Raise Alert Modal Styles
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  alertModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  alertDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  alertCloseX: {
    position: 'absolute',
    top: 12,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  adBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adBadgeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  alertSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 22,
  },
  centerIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  yellowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE5B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  alertOption: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  alertOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  otherIssueButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 20,
  },
  otherIssueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notifySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  notifyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#1D97E8',
    marginLeft: 4,
    fontWeight: '600',
  },
  societySecurityText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    marginBottom: 24,
  },
  raiseAlarmButton: {
    backgroundColor: 'rgb(247, 80, 80)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  raiseAlarmText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#f9f5f5',
  },
  updatesSection: {
    marginBottom: 10,
  },
  updatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updatesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1D97E8',
    fontWeight: '600',
  },
  noUpdatesContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  noUpdatesText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  // Pre-approve Modal Styles
  preApproveOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  preApproveModalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  preApproveDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  preApproveCloseX: {
    position: 'absolute',
    top: 12,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preApproveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  preApproveTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  preApproveAdBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  preApproveAdBadgeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  preApproveSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 22,
  },
  preApproveOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  preApproveOption: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  preApproveOptionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  preApproveOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  preApproveFooterNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});