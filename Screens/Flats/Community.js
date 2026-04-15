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

const actions = [
  { label: 'Community Bingo', icon: 'game-controller-outline', badgeImage: true },
  { label: 'Helpdesk', icon: 'construct-outline' },
  { label: 'Notice Board', icon: 'list-outline', badge: '9+' },
  { label: 'Daily Help', icon: 'sparkles-outline' },
  { label: 'Search Vehicle', icon: 'car-outline' },
  { label: 'Communi...', icon: 'chatbubble-ellipses-outline' },
  { label: 'Rent Parking', icon: 'car-sport-outline' },
  { label: "Emergency No's", icon: 'alert-circle-outline' },
  { label: 'Residents', icon: 'id-card-outline' },
  { label: 'View More', icon: 'chevron-down-outline' },
];

const classes = [
  {
    title: 'Tuition Classes For Nursery -...',
    teacher: 'Jhalak',
    category: 'Tuition',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    initials: 'J#',
    color: '#6F5AA5',
  },
  {
    title: 'Tuition available',
    teacher: 'Anushka Shrivastava',
    category: 'Tuition',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    initials: 'AS',
    color: '#8BA75C',
  },
];

const helpers = [
  { name: 'Kamal', role: 'Maid', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Vaishali', role: 'Maid', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const helpCategories = [
  { label: 'Maid (200)', icon: 'sparkles-outline', badge: '11 New' },
  { label: 'Milkman (24)', icon: 'wine-outline', badge: '1 New' },
  { label: 'Cook (22)', icon: 'restaurant-outline' },
  { label: 'Car Cleaner (14)', icon: 'car-sport-outline', badge: '1 New' },
];

const guards = [
  { label: 'Raise Alarm', kind: 'alarm' },
  { label: 'Message to Guard', kind: 'message' },
  { label: 'Usman ...\nMAIN G...', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
  { label: 'Pramod...\nMAIN G...', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
];

const contacts = [
  { name: 'Nyati Elan N...', phone: '020-66203732' },
  { name: 'Nyati Elan N...', phone: '020-66205777' },
];

const committee = [
  { initials: 'AJ', name: 'Ajay Jha', color: '#7663AE' },
  { initials: 'AD', name: 'Amol Di...', color: '#B16769' },
  { initials: 'AK', name: 'Ankit K', color: '#62A768' },
  { initials: 'AN', name: 'Atul Nai', color: '#B56E6B' },
];

const directory = [
  { initials: 'E', name: 'Er. Prashant khairnar', phone: '9067114516', color: '#7765AF' },
  { initials: 'N', name: 'Nyati Elan North Office', phone: '020-66205777', color: '#99B866' },
  { initials: 'P', name: 'Police Station Kesnand', phone: '9527069100', color: '#63A775' },
];

const directoryShortcuts = [
  { label: 'Tuition te...', count: '5 Contacts', icon: 'reader-outline' },
  { label: 'Society ...', count: '2 Contacts', icon: 'construct-outline' },
  { label: 'Pharmacy', count: '2 Contacts', icon: 'medical-outline' },
  { label: 'Add Contact', count: '', icon: 'add', filled: true },
];

const neighbourCards = [
  { flat: 'G9 801', members: ['VS', 'M'], colors: ['#6F5AA5', '#6BA76F'] },
  { flat: 'G9 803', members: ['AT', 'UZ', 'S'], colors: ['#6F5AA5', '#6C86B7', '#B16D69'], subtitle: '3 Members' },
  { flat: 'G9 804', members: ['SY', 'P'], colors: ['#ACA25D', '#68AD75'] },
];

const tribes = [
  { label: 'Music', count: '+51', avatars: ['https://randomuser.me/api/portraits/men/12.jpg', 'https://randomuser.me/api/portraits/men/36.jpg', 'https://randomuser.me/api/portraits/women/24.jpg'] },
  { label: 'IT Professional', count: '+20', avatars: ['https://randomuser.me/api/portraits/men/31.jpg', 'https://randomuser.me/api/portraits/women/49.jpg', 'https://randomuser.me/api/portraits/men/85.jpg'] },
  { label: 'Pune', count: '+9', avatars: ['https://randomuser.me/api/portraits/men/61.jpg', 'https://randomuser.me/api/portraits/women/62.jpg', 'https://randomuser.me/api/portraits/men/73.jpg'] },
  { label: 'Pets', count: '', avatars: ['https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=200&q=80'] },
];

function AppHeader() {
  return (
    <View style={styles.appHeader}>
      <View>
        <Text style={styles.flatTitle}>G9 802 <Ionicons name="chevron-down" size={18} /></Text>
        <Text style={styles.subHeader}>Ad-Supported</Text>
      </View>
      <View style={styles.headerIcons}>
        <Ionicons name="search-outline" size={28} color="#141414" />
        <View style={styles.chatWrap}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#141414" />
          <View style={styles.redDot} />
        </View>
        <View style={styles.avatarChip}>
          <Text style={styles.avatarChipText}>SC</Text>
        </View>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <AppHeader />

        <Text style={styles.sectionTitle}>Community Actions</Text>
        <View style={styles.actionGrid}>
          {actions.map((item) => (
            <TouchableOpacity key={item.label} style={styles.actionItem} activeOpacity={0.85}>
              <View style={styles.actionIconBox}>
                {item.badgeImage ? (
                  <Text style={styles.gamepad}>🎮</Text>
                ) : (
                  <Ionicons name={item.icon} size={30} color="#173A42" />
                )}
                {item.badge ? (
                  <View style={styles.actionBadge}>
                    <Text style={styles.actionBadgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.actionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.inlineHeader} activeOpacity={0.85}>
          <Text style={styles.sectionTitle}>Classes in your society</Text>
          <Ionicons name="chevron-forward" size={26} color="#182C33" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {classes.map((item) => (
            <View key={item.title} style={styles.classCard}>
              <Image source={{ uri: item.image }} style={styles.classImage} />
              <View style={styles.newPill}><Text style={styles.newPillText}>{item.badge}</Text></View>
              <View style={[styles.classAvatar, { backgroundColor: item.color }]}>
                <Text style={styles.classAvatarText}>{item.initials}</Text>
              </View>
              <Text style={styles.classTeacher}>{item.teacher}</Text>
              <Text style={styles.classTitle}>{item.title}</Text>
              <Text style={styles.classCategory}>{item.category}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Connect with Neighbours</Text>
        <Text style={styles.subtitle}>Residents of Block: G9, Floor: 8</Text>
        <View style={styles.neighbourWrap}>
          <View style={styles.homeHub}>
            <Ionicons name="home-outline" size={32} color="#202020" />
          </View>
          {neighbourCards.map((card) => (
            <View key={card.flat} style={styles.neighbourCard}>
              <Text style={styles.neighbourFlat}>{card.flat}</Text>
              {card.subtitle ? <Text style={styles.neighbourSubtitle}>{card.subtitle}</Text> : null}
              <View style={styles.memberRow}>
                {card.members.map((member, index) => (
                  <View
                    key={`${card.flat}-${member}`}
                    style={[styles.memberBubble, { backgroundColor: card.colors[index], marginLeft: index === 0 ? 0 : -8 }]}
                  >
                    <Text style={styles.memberBubbleText}>{member}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Find Your Tribe</Text>
        <Text style={styles.subtitle}>Discover residents who share your interests and background</Text>
        <View style={styles.tribeGrid}>
          {tribes.map((tribe) => (
            <View key={tribe.label} style={styles.tribeCard}>
              <Text style={styles.tribeTitle}>{tribe.label}</Text>
              <View style={styles.tribeAvatars}>
                {tribe.avatars.map((avatar, index) => (
                  <Image key={`${tribe.label}-${index}`} source={{ uri: avatar }} style={[styles.tribeAvatar, { marginLeft: index === 0 ? 0 : -10 }]} />
                ))}
                {tribe.count ? <Text style={styles.tribeCount}>{tribe.count}</Text> : null}
              </View>
              <View style={styles.addInterestRow}>
                <View style={styles.addCircle}><Ionicons name="add" size={18} color="#1E1E1E" /></View>
                <Text numberOfLines={1} style={styles.addInterestText}>
                  {tribe.label === 'Music' ? 'Add Your Inter...' : tribe.label === 'IT Professional' ? 'Add Your Job' : tribe.label === 'Pune' ? 'Add Your Home...' : 'Add Your Pets'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.inlineHeader} activeOpacity={0.85}>
          <Text style={styles.sectionTitle}>Find Daily Help</Text>
          <Ionicons name="chevron-forward" size={26} color="#182C33" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {helpers.map((helper) => (
            <View key={helper.name} style={styles.helperCard}>
              <Image source={{ uri: helper.image }} style={styles.helperPhoto} />
              <View style={styles.onlineDot} />
              <View>
                <Text style={styles.helperName}>{helper.name}</Text>
                <Text style={styles.helperRole}>{helper.role}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.helpGrid}>
          {helpCategories.map((item) => (
            <View key={item.label} style={styles.helpTile}>
              <View style={styles.helpIconBox}>
                <Ionicons name={item.icon} size={30} color="#173A42" />
                {item.badge ? (
                  <View style={styles.helpBadge}><Text style={styles.helpBadgeText}>{item.badge}</Text></View>
                ) : null}
              </View>
              <Text style={styles.helpTileLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.inlineHeader} activeOpacity={0.85}>
          <Text style={styles.sectionTitle}>Security</Text>
          <Ionicons name="chevron-forward" size={26} color="#182C33" />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {guards.map((item) => (
            <View key={item.label} style={styles.guardItem}>
              {item.kind === 'alarm' ? (
                <View style={[styles.guardCircle, styles.alarmCircle]}>
                  <Ionicons name="radio-outline" size={34} color="#FFFFFF" />
                </View>
              ) : item.kind === 'message' ? (
                <View style={[styles.guardCircle, styles.messageCircle]}>
                  <Ionicons name="mail-outline" size={34} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.guardPhotoWrap}>
                  <Image source={{ uri: item.image }} style={styles.guardPhoto} />
                  <View style={styles.callDot}><Ionicons name="call" size={16} color="#FFFFFF" /></View>
                </View>
              )}
              <Text style={styles.guardLabel}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.inlineHeader} activeOpacity={0.85}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Ionicons name="chevron-forward" size={26} color="#182C33" />
        </TouchableOpacity>
        <View style={styles.contactGrid}>
          {contacts.map((item) => (
            <View key={item.phone} style={styles.contactCard}>
              <View>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <Ionicons name="call" size={24} color="#36A14A" />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Management Committee</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {committee.map((member) => (
            <View key={member.initials} style={styles.committeeCard}>
              <View style={[styles.committeeAvatar, { backgroundColor: member.color }]}>
                <Text style={styles.committeeAvatarText}>{member.initials}</Text>
              </View>
              <Text style={styles.committeeName}>{member.name}</Text>
              <Text style={styles.committeeRole}>Mc Member -...</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.directoryCard}>
          <TouchableOpacity style={styles.inlineHeader} activeOpacity={0.85}>
            <Text style={styles.sectionTitle}>Local Directory</Text>
            <Ionicons name="chevron-forward" size={26} color="#182C33" />
          </TouchableOpacity>
          {directory.map((item, index) => (
            <View key={item.phone}>
              <View style={styles.directoryRow}>
                <View style={[styles.directoryAvatar, { backgroundColor: item.color }]}>
                  <Text style={styles.directoryAvatarText}>{item.initials}</Text>
                </View>
                <View style={styles.directoryTextWrap}>
                  <Text style={styles.directoryName}>{item.name}</Text>
                  <View style={styles.directoryMeta}>
                    <Text style={styles.directoryPhone}>{item.phone}</Text>
                    <Ionicons name="thumbs-up" size={18} color="#C3C3C3" />
                    <Text style={styles.directoryLikes}>1</Text>
                  </View>
                </View>
                <Ionicons name="call" size={26} color="#36A14A" />
              </View>
              {index < directory.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
          <View style={styles.shortcutGrid}>
            {directoryShortcuts.map((item) => (
              <View key={item.label} style={styles.shortcutItem}>
                <View style={[styles.shortcutIconBox, item.filled && styles.shortcutFilled]}>
                  <Ionicons name={item.icon} size={30} color="#173A42" />
                </View>
                <Text style={styles.shortcutLabel}>{item.label}</Text>
                {!!item.count && <Text style={styles.shortcutCount}>{item.count}</Text>}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2EEE6' },
  content: { paddingBottom: 24 },
  appHeader: {
    backgroundColor: '#F5F1E8',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#CFC7BA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  flatTitle: { fontSize: 22, fontWeight: '800', color: '#141414' },
  subHeader: { fontSize: 16, color: '#2F2F2F', marginTop: 2 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  chatWrap: { position: 'relative' },
  redDot: { position: 'absolute', right: -2, top: -3, width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF4747' },
  avatarChip: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#76B56A', alignItems: 'center', justifyContent: 'center' },
  avatarChipText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  sectionTitle: { fontSize: 27, fontWeight: '800', color: '#181818', paddingHorizontal: 20, marginTop: 18, marginBottom: 10 },
  inlineHeader: { flexDirection: 'row', alignItems: 'center', paddingRight: 20 },
  subtitle: { fontSize: 16, color: '#4C4C4C', paddingHorizontal: 20, marginBottom: 12 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  actionItem: { width: '18%', marginBottom: 18, alignItems: 'center' },
  actionIconBox: { width: 74, height: 74, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', position: 'relative', shadowColor: '#D3CBBD', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 4 },
  gamepad: { fontSize: 36 },
  actionBadge: { position: 'absolute', top: -6, right: -4, backgroundColor: '#FF4A60', borderRadius: 14, paddingHorizontal: 7, paddingVertical: 3 },
  actionBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  actionLabel: { marginTop: 10, fontSize: 12, fontWeight: '500', color: '#17333A', textAlign: 'center' },
  horizontalRow: { paddingHorizontal: 20, paddingRight: 8 },
  classCard: { width: 290, backgroundColor: '#FFFFFF', borderRadius: 26, overflow: 'hidden', marginRight: 18, marginBottom: 8, shadowColor: '#D1CABB', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 4 },
  classImage: { width: '100%', height: 150 },
  newPill: { position: 'absolute', top: 16, left: 14, backgroundColor: '#387CFF', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 7 },
  newPillText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  classAvatar: { position: 'absolute', top: 122, alignSelf: 'center', width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#FFFFFF' },
  classAvatarText: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  classTeacher: { marginTop: 44, textAlign: 'center', fontSize: 18, color: '#404040' },
  classTitle: { textAlign: 'center', fontSize: 22, fontWeight: '800', color: '#212121', paddingHorizontal: 20, marginTop: 8 },
  classCategory: { textAlign: 'center', fontSize: 16, color: '#5D5D5D', marginTop: 6, marginBottom: 18 },
  neighbourWrap: { paddingHorizontal: 20, marginBottom: 10, position: 'relative', minHeight: 210 },
  homeHub: { position: 'absolute', left: '50%', top: 70, marginLeft: -38, width: 76, height: 76, borderRadius: 38, backgroundColor: '#FFFFFF', borderWidth: 6, borderColor: '#E9E2D5', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  neighbourCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, marginBottom: 14, minHeight: 92 },
  neighbourFlat: { fontSize: 17, fontWeight: '500', color: '#1F363D' },
  neighbourSubtitle: { fontSize: 14, color: '#777777', marginTop: 4 },
  memberRow: { flexDirection: 'row', marginTop: 10 },
  memberBubble: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' },
  memberBubbleText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  tribeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  tribeCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, marginBottom: 16 },
  tribeTitle: { fontSize: 17, color: '#1E1E1E', marginBottom: 18 },
  tribeAvatars: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  tribeAvatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#FFFFFF' },
  tribeCount: { fontSize: 17, fontWeight: '800', marginLeft: 10, color: '#181818' },
  addInterestRow: { flexDirection: 'row', alignItems: 'center' },
  addCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFE02D', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  addInterestText: { flex: 1, fontSize: 14, color: '#343434' },
  helperCard: { width: 300, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  helperPhoto: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  onlineDot: { position: 'absolute', left: 68, top: 12, width: 14, height: 14, borderRadius: 7, backgroundColor: '#48B24E', borderWidth: 2, borderColor: '#FFFFFF' },
  helperName: { fontSize: 20, fontWeight: '800', color: '#2B2B2B' },
  helperRole: { fontSize: 18, color: '#444444', marginTop: 2 },
  helpGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 16 },
  helpTile: { width: '23%', alignItems: 'center', marginBottom: 18 },
  helpIconBox: { width: 92, height: 92, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 10, position: 'relative' },
  helpBadge: { position: 'absolute', bottom: -8, alignSelf: 'center', backgroundColor: '#DFF4FF', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 4 },
  helpBadgeText: { color: '#0A93D5', fontWeight: '700' },
  helpTileLabel: { textAlign: 'center', fontSize: 14, color: '#1C373E' },
  guardItem: { width: 130, alignItems: 'center', marginRight: 16 },
  guardCircle: { width: 94, height: 94, borderRadius: 47, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  alarmCircle: { backgroundColor: '#E42929' },
  messageCircle: { backgroundColor: '#073C48' },
  guardPhotoWrap: { width: 94, height: 94, marginBottom: 12, position: 'relative' },
  guardPhoto: { width: '100%', height: '100%', borderRadius: 47 },
  callDot: { position: 'absolute', right: -2, bottom: 2, width: 34, height: 34, borderRadius: 17, backgroundColor: '#46B458', alignItems: 'center', justifyContent: 'center' },
  guardLabel: { textAlign: 'center', fontSize: 15, color: '#1E1E1E' },
  contactGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 },
  contactCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  contactName: { fontSize: 16, fontWeight: '500', color: '#232323' },
  contactPhone: { fontSize: 15, color: '#6B6B6B', marginTop: 4 },
  committeeCard: { width: 150, alignItems: 'center', marginRight: 16 },
  committeeAvatar: { width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  committeeAvatarText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  committeeName: { fontSize: 16, color: '#262626', textAlign: 'center' },
  committeeRole: { fontSize: 14, color: '#7A7A7A', textAlign: 'center', marginTop: 4 },
  directoryCard: { backgroundColor: '#FFFFFF', borderRadius: 28, paddingVertical: 8, marginHorizontal: 20, marginTop: 12, marginBottom: 20 },
  directoryRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14 },
  directoryAvatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  directoryAvatarText: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  directoryTextWrap: { flex: 1 },
  directoryName: { fontSize: 18, color: '#262626' },
  directoryMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  directoryPhone: { fontSize: 16, color: '#727272', marginRight: 8 },
  directoryLikes: { fontSize: 16, color: '#727272' },
  divider: { height: 1, backgroundColor: '#E7E2D8', marginHorizontal: 18 },
  shortcutGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 18, marginBottom: 12 },
  shortcutItem: { width: '23%', alignItems: 'center' },
  shortcutIconBox: { width: 92, height: 92, borderRadius: 22, borderWidth: 1, borderColor: '#E1E1E1', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  shortcutFilled: { backgroundColor: '#F2F2F2' },
  shortcutLabel: { textAlign: 'center', fontSize: 14, color: '#2A2A2A' },
  shortcutCount: { textAlign: 'center', fontSize: 13, color: '#7B7B7B', marginTop: 4 },
});
