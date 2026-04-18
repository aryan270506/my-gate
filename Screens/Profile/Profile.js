import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ onClose }) {
  const listRow = (icon, label, rightText) => (
    <TouchableOpacity style={styles.listRow} activeOpacity={0.8}>
      <View style={styles.listLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={24} color="#173A42" />
        </View>
        <Text style={styles.listLabel}>{label}</Text>
      </View>
      <View style={styles.listRight}>
        {rightText ? <Text style={styles.rightPill}>{rightText}</Text> : null}
        <Ionicons name="chevron-forward" size={24} color="#173A42" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerIconButton} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={34} color="#173A42" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.8}>
            <Ionicons name="help-circle-outline" size={34} color="#173A42" />
          </TouchableOpacity>
        </View>

        <View style={styles.adNotice}>
          <Text style={styles.adNoticeText}>Your society is on Ad-Supported plan </Text>
          <Text style={styles.adNoticeLink}>Learn more</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>SC</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Shubham Chougule</Text>
            <View style={styles.idRow}>
              <View style={styles.idBadge}>
                <Text style={styles.idLabel}>mygate ID </Text>
                <Text style={styles.idNumber}>372 932</Text>
                <Ionicons name="information-circle-outline" size={18} color="#173A42" />
              </View>
              <View style={styles.qrBox}>
                <Ionicons name="qr-code-outline" size={24} color="#173A42" />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.profileCompletion} activeOpacity={0.8}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>0%</Text>
          </View>
          <View style={styles.progressCopy}>
            <Text style={styles.progressTitle}>Let neighbours discover you!</Text>
            <Text style={styles.progressSubtitle}>Complete your profile</Text>
          </View>
          <View style={styles.profileActionRow}>
            <Text style={styles.viewProfileText}>View Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#173A42" />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="people-outline" size={24} color="#173A42" />
              <Text style={styles.sectionTitle}>Household</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.householdGrid}>
            <View style={styles.houseCard}>
              <Text style={styles.houseCardTitle}>My Housemates</Text>
              <Text style={styles.houseCardSub}>1 member</Text>
              <View style={styles.houseCardIcon}>
                <Ionicons name="person-outline" size={20} color="#173A42" />
              </View>
            </View>

            <View style={styles.houseCardDashed}>
              <Text style={styles.houseCardTitle}>Daily Help</Text>
              <Text style={styles.houseCardAdd}>+ Add</Text>
              <View style={styles.houseCardIcon}>
                <Ionicons name="bug-outline" size={20} color="#173A42" />
              </View>
              <View style={styles.addDot}>
                <Ionicons name="add" size={14} color="#173A42" />
              </View>
            </View>

            <View style={styles.houseCardDashed}>
              <Text style={styles.houseCardTitle}>Vehicles</Text>
              <Text style={styles.houseCardAdd}>+ Add</Text>
              <View style={styles.houseCardIcon}>
                <Ionicons name="car-outline" size={20} color="#173A42" />
              </View>
              <View style={styles.addDot}>
                <Ionicons name="add" size={14} color="#173A42" />
              </View>
            </View>

            <View style={styles.houseCardDashed}>
              <Text style={styles.houseCardTitle}>Pets</Text>
              <Text style={styles.houseCardAdd}>+ Add</Text>
              <View style={styles.houseCardIcon}>
                <Ionicons name="paw-outline" size={20} color="#173A42" />
              </View>
              <View style={styles.addDot}>
                <Ionicons name="add" size={14} color="#173A42" />
              </View>
            </View>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressTitle}>My Address</Text>
              <TouchableOpacity style={styles.shareRow} activeOpacity={0.8}>
                <Text style={styles.shareText}>Share</Text>
                <Ionicons name="share-social-outline" size={24} color="#173A42" />
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>8th Floor, G9 802, Nyati Elan North-South East, Bakori Road, Wagholi, Pune,</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.graySectionTitle}>Security & Notifications</Text>
          <TouchableOpacity style={styles.testNowCard} activeOpacity={0.8}>
            <Text style={styles.testNowText}>Not Getting Notifications ?</Text>
            <View style={styles.testNowRight}>
              <Text style={styles.testNowLink}>Test Now</Text>
              <Ionicons name="chevron-forward" size={22} color="#173A42" />
            </View>
          </TouchableOpacity>

          {listRow('notifications-outline', 'Notification Preferences')}
          {listRow('radio-outline', 'Security Alert List')}
        </View>

        <View style={styles.section}>
          <Text style={styles.graySectionTitle}>Purchases</Text>
          {listRow('newspaper-outline', 'My Orders')}
          {listRow('ribbon-outline', 'My Plans', 'Ad-Supported')}
        </View>

        <View style={styles.section}>
          <Text style={styles.graySectionTitle}>Manage Flats</Text>
          {listRow('home-outline', 'G9 802, Nyati Elan North-S...', 'Active')}
          <TouchableOpacity style={styles.listRow} activeOpacity={0.8}>
            <View style={styles.listLeft}>
              <View style={styles.addFlatIconCircle}>
                <Ionicons name="add" size={38} color="#173A42" />
              </View>
              <Text style={styles.listLabel}>Add Flat/Villa/Office</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.graySectionTitle}>General Settings</Text>
          {listRow('help-circle-outline', 'Support & Feedback')}
          {listRow('share-social-outline', 'Tell a friend about mygate')}
          {listRow('person-outline', 'Account Information')}
          {listRow('log-out-outline', 'Logout')}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>mygate</Text>
          <Text style={styles.footerLinks}>Terms & Conditions | Privacy Policy</Text>
          <Text style={styles.footerVersion}>Version 7.25.2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 36,
  },
  header: {
    height: 88,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  headerIconButton: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: '500',
    color: '#1B1B1B',
  },
  adNotice: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  adNoticeText: {
    fontSize: 14,
    color: '#2E2E2E',
  },
  adNoticeLink: {
    fontSize: 15,
    color: '#173A42',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  profileCard: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  avatarLarge: {
    width: 65,
    height: 65,
    borderRadius: 42,
    backgroundColor: '#5DA36F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#171717',
    marginBottom: 10,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    gap: 4,
  },
  idLabel: {
    fontSize: 14,
    color: '#313131',
  },
  idNumber: {
    fontSize: 16,
    color: '#0E0E0E',
    fontWeight: '700',
  },
  qrBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCompletion: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: '#F8F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressText: {
    color: '#D86A7C',
    fontWeight: '700',
    fontSize: 18,
  },
  progressCopy: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    color: '#313131',
  },
  progressSubtitle: {
    marginTop: 2,
    fontSize: 14,
    color: '#747474',
  },
  profileActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewProfileText: {
    fontSize: 15,
    color: '#173A42',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '700',
  },
  manageText: {
    fontSize: 20,
    color: '#173A42',
    fontWeight: '600',
  },
  householdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  houseCard: {
    width: '48.5%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    minHeight: 102,
  },
  houseCardDashed: {
    width: '48.5%',
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D6D6D6',
    padding: 12,
    marginBottom: 10,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    minHeight: 102,
  },
  houseCardTitle: {
    fontSize: 14,
    color: '#1D1D1D',
  },
  houseCardSub: {
    marginTop: 4,
    fontSize: 14,
    color: '#666666',
  },
  houseCardAdd: {
    marginTop: 4,
    fontSize: 14,
    color: '#173A42',
    fontWeight: '600',
  },
  houseCardIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F1F3F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDot: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F8D928',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 14,
    overflow: 'hidden',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  addressTitle: {
    fontSize: 18,
    color: '#1B1B1B',
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shareText: {
    fontSize: 16,
    color: '#173A42',
    fontWeight: '500',
  },
  addressText: {
    padding: 14,
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
  },
  graySectionTitle: {
    fontSize: 20,
    color: '#8D8D8D',
    marginBottom: 14,
  },
  testNowCard: {
    backgroundColor: '#ECE8E3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  testNowText: {
    fontSize: 15,
    color: '#1B1B1B',
  },
  testNowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  testNowLink: {
    fontSize: 15,
    color: '#173A42',
    fontWeight: '700',
  },
  listRow: {
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F3F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  addFlatIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#173A42',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  listLabel: {
    fontSize: 17,
    color: '#1A1A1A',
    flexShrink: 1,
  },
  listRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightPill: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E0ECE6',
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 14,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  footerBrand: {
    fontSize: 30,
    fontWeight: '800',
    color: '#173A42',
    marginBottom: 6,
  },
  footerLinks: {
    fontSize: 15,
    color: '#1E1E1E',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  footerVersion: {
    fontSize: 12,
    color: '#8C8C8C',
  },
});
