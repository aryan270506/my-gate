import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const GREEN  = '#0d3d2f';
const YELLOW = '#FFC107';

// ─── QUICK INVITE ─────────────────────────────────────────────────────────────
const QuickInvite = ({ onClose }) => {
  const [subTab, setSubTab]     = useState('once');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowEntry, setAllowEntry] = useState('1 week');

  return (
    <View>
      {/* sub-tabs */}
      <View style={s.subTabRow}>
        {['once', 'frequently'].map(t => (
          <TouchableOpacity
            key={t}
            style={[s.subTab, subTab === t && s.subTabActive]}
            onPress={() => setSubTab(t)}
          >
            <Text style={[s.subTabTxt, subTab === t && s.subTabTxtActive]}>
              {t === 'once' ? 'Once' : 'Frequently'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.body}>
        {subTab === 'once' ? (
          <>
            <View style={s.row}>
              <TouchableOpacity
                style={[s.check, isPrivate && s.checkOn]}
                onPress={() => setIsPrivate(!isPrivate)}
              >
                {isPrivate && <Text style={s.checkMark}>✓</Text>}
              </TouchableOpacity>
              <Text style={s.checkLbl}>Make it private</Text>
            </View>

            {isPrivate && (
              <View style={s.infoBox}>
                <Text style={s.infoTxt}>
                  🔒  This allows silent entries of your guests without disturbing others
                </Text>
                <Text style={s.knowMore}>  Know more</Text>
              </View>
            )}

            <Text style={s.lbl}>Select Date</Text>
            <View style={s.field}>
              <Text style={s.fieldTxt}>Today</Text>
              <Text style={s.ico}>📅</Text>
            </View>

            <View style={s.twoCol}>
              <View style={s.half}>
                <Text style={s.subLbl}>Starting from</Text>
                <View style={s.field}>
                  <Text style={s.fieldTxt}>02:49 PM</Text>
                  <Text style={s.ico}>🕐</Text>
                </View>
              </View>
              <View style={s.half}>
                <Text style={s.subLbl}>Valid for</Text>
                <View style={s.field}>
                  <Text style={s.fieldTxt}>8 Hours</Text>
                  <Text style={s.ico}>🕐</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={s.lbl}>Allow entry for next</Text>
            <View style={s.segRow}>
              {['1 week', '1 month', '>1 month'].map(o => (
                <TouchableOpacity
                  key={o}
                  style={[s.seg, allowEntry === o && s.segOn]}
                  onPress={() => setAllowEntry(o)}
                >
                  <Text style={[s.segTxt, allowEntry === o && s.segTxtOn]}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.twoCol}>
              <View style={s.half}>
                <Text style={s.subLbl}>Start date</Text>
                <View style={s.field}>
                  <Text style={s.fieldTxt}>18 Apr</Text>
                  <Text style={s.ico}>📅</Text>
                </View>
              </View>
              <View style={s.half}>
                <Text style={s.subLbl}>End date</Text>
                <View style={s.field}>
                  <Text style={s.fieldTxt}>18 May</Text>
                  <Text style={s.ico}>📅</Text>
                </View>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={s.cta}>
          <Text style={s.ctaTxt}>Select Guest(s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── PARTY / GROUP INVITE ─────────────────────────────────────────────────────
const PartyGroupInvite = ({ onClose }) => {
  const [sel, setSel] = useState(0);
  const emojis = ['🏠', '🎂', '🎈', '▶️', '🎴', '🎉'];

  return (
    <View style={[s.body, { backgroundColor: '#F7F3EA' }]}>
      <Text style={s.partyMsg}>
        <Text style={{ fontWeight: '700' }}>Shubham Chougule</Text> has invited you.
      </Text>
      <TouchableOpacity style={s.noteBtn}>
        <Text style={s.noteBtnTxt}>Add a note</Text>
      </TouchableOpacity>
      <View style={s.emojiGrid}>
        {emojis.map((e, i) => (
          <TouchableOpacity
            key={i}
            style={[s.emojiCard, sel === i && s.emojiCardOn]}
            onPress={() => setSel(i)}
          >
            <Text style={{ fontSize: 28 }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={s.cta}>
        <Text style={s.ctaTxt}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── FREQUENT INVITE ──────────────────────────────────────────────────────────
const FrequentInvite = ({ onClose }) => {
  const [freq, setFreq] = useState('daily');
  const [days, setDays] = useState(['Mon', 'Wed', 'Fri']);
  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const toggle = d =>
    setDays(p => (p.includes(d) ? p.filter(x => x !== d) : [...p, d]));

  return (
    <View style={s.body}>
      <Text style={s.lbl}>Frequency Type</Text>
      <View style={s.segRow}>
        {['daily', 'weekly', 'monthly'].map(t => (
          <TouchableOpacity
            key={t}
            style={[s.seg, freq === t && s.segOn]}
            onPress={() => setFreq(t)}
          >
            <Text style={[s.segTxt, freq === t && s.segTxtOn]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {freq === 'weekly' && (
        <>
          <Text style={[s.lbl, { marginTop: 12 }]}>Select Days</Text>
          <View style={s.daysGrid}>
            {allDays.map(d => (
              <TouchableOpacity
                key={d}
                style={[s.dayBtn, days.includes(d) && s.dayBtnOn]}
                onPress={() => toggle(d)}
              >
                <Text style={[s.dayTxt, days.includes(d) && s.dayTxtOn]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text style={[s.lbl, { marginTop: 12 }]}>Validity Period</Text>
      <View style={s.twoCol}>
        <View style={s.half}>
          <Text style={s.subLbl}>Start date</Text>
          <View style={s.field}>
            <Text style={s.fieldTxt}>18 Apr</Text>
            <Text style={s.ico}>📅</Text>
          </View>
        </View>
        <View style={s.half}>
          <Text style={s.subLbl}>End date</Text>
          <View style={s.field}>
            <Text style={s.fieldTxt}>18 May</Text>
            <Text style={s.ico}>📅</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={s.cta}>
        <Text style={s.ctaTxt}>Select Guest(s)</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── PRIVATE INVITE ───────────────────────────────────────────────────────────
const PrivateInvite = ({ onClose }) => {
  const [silent, setSilent] = useState(true);
  const [notes, setNotes]   = useState('');

  return (
    <View style={s.body}>
      <View style={s.row}>
        <Text style={{ fontSize: 14, color: '#9C27B0' }}>🔒 </Text>
        <Text style={s.purpleLbl}>Private & Silent Entry</Text>
      </View>
      <Text style={s.purpleDesc}>
        Guest will enter silently without any announcements or disturbances to other residents.
      </Text>

      <View style={s.toggleRow}>
        <Text style={s.toggleLbl}>Silent Mode</Text>
        <TouchableOpacity
          style={[s.toggle, silent && s.toggleOn]}
          onPress={() => setSilent(!silent)}
        >
          <View style={[s.thumb, silent && s.thumbOn]} />
        </TouchableOpacity>
      </View>

      <Text style={[s.lbl, { marginTop: 12 }]}>Select Date</Text>
      <View style={s.field}>
        <Text style={s.fieldTxt}>Today</Text>
        <Text style={[s.ico, { color: '#9C27B0' }]}>📅</Text>
      </View>

      <View style={s.twoCol}>
        <View style={s.half}>
          <Text style={s.subLbl}>Starting from</Text>
          <View style={s.field}>
            <Text style={s.fieldTxt}>02:49 PM</Text>
            <Text style={[s.ico, { color: '#9C27B0' }]}>🕐</Text>
          </View>
        </View>
        <View style={s.half}>
          <Text style={s.subLbl}>Valid for</Text>
          <View style={s.field}>
            <Text style={s.fieldTxt}>8 Hours</Text>
            <Text style={[s.ico, { color: '#9C27B0' }]}>🕐</Text>
          </View>
        </View>
      </View>

      <Text style={[s.lbl, { marginTop: 12 }]}>Additional Notes (Optional)</Text>
      <TextInput
        style={s.notesInput}
        placeholder="Add any special instructions..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={s.cta}>
        <Text style={s.ctaTxt}>Select Guest(s)</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── GUEST MODAL (main export) ────────────────────────────────────────────────
const GuestModal = ({ visible, onClose }) => {
  const [tab, setTab] = useState('quick');

  const tabs = [
    { id: 'quick',    label: 'Quick'       },
    { id: 'party',    label: 'Party/Group' },
    { id: 'frequent', label: 'Frequent'    },
    { id: 'private',  label: 'Private'     },
  ];

  // ✅ FIX: render content inline, NOT as a nested component definition
  const renderContent = () => {
    if (tab === 'quick')    return <QuickInvite onClose={onClose} />;
    if (tab === 'party')    return <PartyGroupInvite onClose={onClose} />;
    if (tab === 'frequent') return <FrequentInvite onClose={onClose} />;
    if (tab === 'private')  return <PrivateInvite onClose={onClose} />;
    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"          // ✅ 'slide' is more reliable than 'fade' for sheet modals
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        {/* backdrop tap to close */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* card — must NOT be inside the TouchableOpacity above */}
        <View style={s.card}>
          {/* header */}
          <View style={s.header}>
            <View style={{ width: 28 }} />
            <Text style={s.headerTxt}>Invite Guest</Text>
            <TouchableOpacity style={s.closeBtn} onPress={onClose}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* main tabs */}
          <View style={s.tabRow}>
            {tabs.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[s.tabBtn, tab === t.id && s.tabBtnActive]}
                onPress={() => setTab(t.id)}
              >
                <Text style={[s.tabTxt, tab === t.id && s.tabTxtActive]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* scrollable content */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  // modal shell
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.82,
    backgroundColor: '#ffffff',        // ✅ explicit white
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },

  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  headerTxt: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  closeBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  closeTxt: { fontSize: 16, color: '#555555' },

  // main tabs
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: { borderBottomColor: GREEN },
  tabTxt: { fontSize: 11, color: '#999999', fontWeight: '500', textAlign: 'center' },
  tabTxtActive: { color: GREEN, fontWeight: '700' },

  // shared body
  body: { padding: 16, backgroundColor: '#FFFFFF' },
  lbl:  { fontSize: 13, fontWeight: '600', color: '#333333', marginBottom: 8 },
  subLbl: { fontSize: 12, fontWeight: '600', color: '#666666', marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    marginBottom: 12,
  },
  fieldTxt: { fontSize: 14, color: '#333333', fontWeight: '500' },
  ico: { fontSize: 16 },
  twoCol: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },

  // segment controls
  segRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  seg: {
    flex: 1,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  segOn:    { backgroundColor: GREEN, borderColor: GREEN },
  segTxt:   { fontSize: 12, color: '#666666', fontWeight: '500', textAlign: 'center' },
  segTxtOn: { color: '#FFFFFF', fontWeight: '600' },

  // CTA button
  cta: {
    backgroundColor: YELLOW,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  ctaTxt: { fontSize: 16, fontWeight: '700', color: '#000000' },

  // quick — checkbox
  check: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkOn:   { backgroundColor: '#E3F2FD', borderColor: '#1D97E8' },
  checkMark: { fontSize: 13, color: '#1D97E8', fontWeight: '700' },
  checkLbl:  { fontSize: 14, color: '#333333', fontWeight: '500' },
  infoBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  infoTxt:  { fontSize: 12, color: '#555555', flex: 1 },
  knowMore: { fontSize: 12, color: '#1D97E8', fontWeight: '600' },

  // quick — sub-tabs
  subTabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  subTab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  subTabActive:    { borderBottomColor: GREEN },
  subTabTxt:       { fontSize: 14, color: '#999999', fontWeight: '500' },
  subTabTxtActive: { color: GREEN, fontWeight: '700' },

  // party
  partyMsg: {
    fontSize: 19,
    color: '#222222',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  noteBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 22,
    alignSelf: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  noteBtnTxt: { fontSize: 13, color: '#888888', fontWeight: '500' },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  emojiCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiCardOn: { borderColor: '#1D97E8', backgroundColor: '#E3F2FD' },

  // frequent — days grid
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 4 },
  dayBtn: {
    width: '22%',
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dayBtnOn: { backgroundColor: GREEN, borderColor: GREEN },
  dayTxt:   { fontSize: 12, color: '#555555', fontWeight: '600' },
  dayTxtOn: { color: '#FFFFFF' },

  // private
  purpleLbl:  { fontSize: 13, fontWeight: '600', color: '#9C27B0', marginLeft: 4 },
  purpleDesc: { fontSize: 12, color: '#555555', marginLeft: 22, lineHeight: 17, marginBottom: 12 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 4,
  },
  toggleLbl: { fontSize: 14, fontWeight: '600', color: '#333333' },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn:  { backgroundColor: '#9C27B0' },
  thumb:     { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF', alignSelf: 'flex-start' },
  thumbOn:   { alignSelf: 'flex-end' },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 13,
    color: '#333333',
    textAlignVertical: 'top',
    marginBottom: 4,
    minHeight: 80,
  },
});

export default GuestModal;