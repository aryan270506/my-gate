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
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const categories = [
    { label: 'General', icon: 'chatbubble-outline' },
    { label: 'Complaint', icon: 'alert-circle-outline' },
    { label: 'Suggestion', icon: 'bulb-outline' },
    { label: 'Celebration', icon: 'heart-outline' },
    { label: 'Lost & Found', icon: 'search-outline' },
    { label: 'Emergency', icon: 'warning-outline' },
  ];

  const handlePost = () => {
    if (postContent.trim() === '') {
      alert('Please write something in your post');
      return;
    }
    console.log('Post Created:', {
      content: postContent,
      category: selectedCategory,
      isAnonymous: isAnonymous,
      timestamp: new Date(),
    });
    setPostContent('');
    setSelectedCategory('General');
    setIsAnonymous(false);
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
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Post</Text>
            <TouchableOpacity 
              onPress={handlePost}
              style={[styles.postButton, postContent.trim() === '' && styles.postButtonDisabled]}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
            {/* User Info */}
            <View style={styles.userSection}>
              <View style={styles.avatar}>
                <Ionicons name="person-circle-outline" size={48} color="#DDD" />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Your Name</Text>
                <View style={styles.anonymousToggle}>
                  <TouchableOpacity
                    style={[styles.checkBox, isAnonymous && styles.checkBoxChecked]}
                    onPress={() => setIsAnonymous(!isAnonymous)}
                  >
                    {isAnonymous && <Ionicons name="checkmark" size={16} color="#FFF" />}
                  </TouchableOpacity>
                  <Text style={styles.anonymousText}>Post Anonymously</Text>
                </View>
              </View>
            </View>

            {/* Post Content Input */}
            <View style={styles.contentSection}>
              <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#999"
                multiline
                maxLength={500}
                value={postContent}
                onChangeText={setPostContent}
              />
              <View style={styles.charCounter}>
                <Text style={styles.charCountText}>{postContent.length}/500</Text>
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.categorySection}>
              <Text style={styles.sectionTitle}>Select Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.label}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.label && styles.categoryButtonActive,
                    ]}
                    onPress={() => setSelectedCategory(category.label)}
                  >
                    <Ionicons 
                      name={category.icon} 
                      size={20} 
                      color={selectedCategory === category.label ? '#FFF' : '#1D97E8'}
                    />
                    <Text
                      style={[
                        styles.categoryButtonText,
                        selectedCategory === category.label && styles.categoryButtonTextActive,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Privacy Settings */}
            <View style={styles.privacySection}>
              <Text style={styles.sectionTitle}>Privacy</Text>
              <TouchableOpacity style={styles.privacyOption}>
                <Ionicons name="people-outline" size={20} color="#1D97E8" />
                <View style={styles.privacyInfo}>
                  <Text style={styles.privacyLabel}>All Residents</Text>
                  <Text style={styles.privacyDesc}>Visible to everyone in G9 802</Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>

            {/* Tips */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips for a good post:</Text>
              <Text style={styles.tipItem}>• Be respectful and courteous</Text>
              <Text style={styles.tipItem}>• Avoid personal attacks or harassment</Text>
              <Text style={styles.tipItem}>• Stay on topic and relevant</Text>
              <Text style={styles.tipItem}>• No spam or promotional content</Text>
            </View>
          </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#1D97E8',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: '#CCC',
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1D97E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkBoxChecked: {
    backgroundColor: '#1D97E8',
  },
  anonymousText: {
    fontSize: 14,
    color: '#666',
  },
  contentSection: {
    marginBottom: 20,
  },
  textInput: {
    borderRadiusize: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    minHeight: 120,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    borderRadius: 8,
  },
  charCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  charCountText: {
    fontSize: 12,
    color: '#999',
  },
  categorySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1D97E8',
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  categoryButtonActive: {
    backgroundColor: '#1D97E8',
  },
  categoryButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#1D97E8',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFF',
  },
  privacySection: {
    marginBottom: 20,
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  privacyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  privacyDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  tipsSection: {
    backgroundColor: '#F5F9FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
});
