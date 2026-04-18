import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const PartyGroupInvite = ({ visible, onClose }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const emojis = ['🏠', '🎂', '🎈', '▶️', '🎴', '🎉'];

  if (!visible) return null;

  return (
    <View style={styles.content}>
      <Text style={styles.inviteMsg}>
        <Text style={styles.userName}>Shubham Chougule</Text> has invited you.
      </Text>

      <TouchableOpacity style={styles.addNoteButton}>
        <Text style={styles.addNoteText}>Add a note</Text>
      </TouchableOpacity>

      <View style={styles.emojiGrid}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.emojiCard, selectedEmoji === index && styles.emojiCardSelected]}
            onPress={() => setSelectedEmoji(index)}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.ctaBtn}
        onPress={() => Alert.alert('Party Invite', `Sent with ${emojis[selectedEmoji]}`)}
      >
        <Text style={styles.ctaBtnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { padding: 16, backgroundColor: '#F7F3EA' },
  inviteMsg: {
    fontSize: 20, color: '#333', fontWeight: '600',
    textAlign: 'center', marginBottom: 12, lineHeight: 28,
  },
  userName: { fontWeight: '700' },
  addNoteButton: {
    backgroundColor: '#FFF', borderRadius: 20, paddingVertical: 9, paddingHorizontal: 22,
    alignSelf: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0',
  },
  addNoteText: { fontSize: 13, color: '#999', fontWeight: '500' },
  emojiGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 14,
  },
  emojiCard: {
    width: '30%', aspectRatio: 1, borderRadius: 12, backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
    borderWidth: 2, borderColor: 'transparent',
  },
  emojiCardSelected: { borderColor: '#1D97E8', backgroundColor: '#E3F2FD' },
  emoji: { fontSize: 28 },
  ctaBtn: {
    backgroundColor: '#FFC107', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  ctaBtnText: { fontSize: 16, fontWeight: '700', color: '#000' },
});

export default PartyGroupInvite;