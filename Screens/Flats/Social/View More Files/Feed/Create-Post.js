import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function CreatePostModal({ visible, onClose }) {
  const [postContent, setPostContent] = useState('');
  const [audienceType, setAudienceType] = useState('All Residents');

  const audienceOptions = ['All Residents', 'Friends', 'Building Only'];

  const handlePost = () => {
    if (postContent.trim() === '') {
      alert('Please write something in your post');
      return;
    }
    console.log('Post Created:', {
      content: postContent,
      audienceType: audienceType,
      timestamp: new Date(),
    });
    setPostContent('');
    setAudienceType('All Residents');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Post</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.guidelineButton}>
                <Text style={styles.guidelineText}>Guideline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoButton}>
                <Ionicons name="information-circle" size={24} color="#0d3d2f" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* User Info Section */}
            <View style={styles.userSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>SC</Text>
              </View>
              <View style={styles.userInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName}>Shubham Chougule</Text>
                </View>
                <Text style={styles.buildingName}>G9 802</Text>
              </View>
              <TouchableOpacity style={styles.audienceDropdown}>
                <Text style={styles.audienceText}>{audienceType}</Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Post Content Input */}
            <TextInput
              style={styles.textInput}
              placeholder="What do you want to talk about?"
              placeholderTextColor="#999"
              multiline
              value={postContent}
              onChangeText={setPostContent}
            />

            {/* Media Options */}
            <View style={styles.mediaSection}>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="image-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="camera-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="videocam-outline" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="attach-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Post Button */}
          <View style={styles.bottomBar}>
            <TouchableOpacity 
              onPress={handlePost}
              style={[styles.postButton, postContent.trim() === '' && styles.postButtonDisabled]}
            >
              <Text style={styles.postButtonText}>Post</Text>
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guidelineButton: {
    paddingHorizontal: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#0d3d2f',
    fontWeight: '500',
  },
  infoButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0d3d2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  buildingName: {
    fontSize: 14,
    color: '#666',
  },
  audienceDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    gap: 4,
  },
  audienceText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  textInput: {
    minHeight: 150,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  mediaSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 120,
  },
  mediaButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  postButton: {
    backgroundColor: '#0d3d2f',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  postButtonDisabled: {
    backgroundColor: '#CCC',
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
