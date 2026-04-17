import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function MyPostsModal({ visible, onClose }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [posts, setPosts] = useState([
    {
      id: '1',
      type: 'post',
      title: 'Community Cleanup Drive',
      category: 'General',
      content: 'Let\'s organize a community cleanup drive this weekend. Who\'s interested?',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      liked: false,
      isAnonymous: false,
      author: 'Your Name',
      status: 'active',
    },
    {
      id: '2',
      type: 'poll',
      title: 'Should we have a community meeting?',
      category: 'Meeting',
      options: ['Yes', 'No', 'Maybe'],
      votes: [45, 12, 8],
      totalVotes: 65,
      timestamp: '6 hours ago',
      voted: true,
      status: 'active',
    },
    {
      id: '3',
      type: 'event',
      title: 'Community Picnic',
      category: 'Social',
      description: 'Family-friendly picnic at the community park',
      date: '15 Mar 2024',
      time: '10:00 AM',
      venue: 'Park',
      attendees: 42,
      timestamp: '1 day ago',
      going: true,
      status: 'upcoming',
    },
    {
      id: '4',
      type: 'post',
      title: 'Lost Cat',
      category: 'Lost & Found',
      content: 'Lost a tabby cat near building A. Please contact if you see it.',
      timestamp: '3 days ago',
      likes: 5,
      comments: 3,
      liked: false,
      isAnonymous: false,
      author: 'Your Name',
      status: 'active',
    },
    {
      id: '5',
      type: 'event',
      title: 'Sports Tournament',
      category: 'Sports',
      description: 'Badminton tournament for all age groups',
      date: '8 Apr 2024',
      time: '4:00 PM',
      venue: 'Gymnasium',
      attendees: 28,
      timestamp: '5 days ago',
      going: false,
      status: 'upcoming',
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Posts', value: 'post' },
    { label: 'Polls', value: 'poll' },
    { label: 'Events', value: 'event' },
  ];

  const filteredPosts = selectedFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === selectedFilter);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setPosts(posts.filter(post => post.id !== postId));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditPost = (postId) => {
    Alert.alert('Edit Post', 'Edit functionality coming soon');
  };

  const renderPostItem = ({ item }) => {
    if (item.type === 'post') {
      return (
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <View style={styles.authorInfo}>
              <View style={styles.authorAvatar}>
                <Ionicons name="person-circle-outline" size={40} color="#DDD" />
              </View>
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>
                  {item.isAnonymous ? 'Anonymous' : item.author}
                </Text>
                <Text style={styles.postTime}>{item.timestamp}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.postBody}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{item.category}</Text>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>

          <View style={styles.postFooter}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
              <Ionicons 
                name={item.liked ? 'heart' : 'heart-outline'} 
                size={18} 
                color={item.liked ? '#FF6B6B' : '#999'}
              />
              <Text style={styles.actionText}>{item.likes} Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#999" />
              <Text style={styles.actionText}>{item.comments} Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleDeletePost(item.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
              <Text style={[styles.actionText, { color: '#FF6B6B' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (item.type === 'poll') {
      return (
        <View style={styles.pollCard}>
          <View style={styles.pollHeader}>
            <View style={styles.pollBadgeTop}>
              <Ionicons name="bar-chart-outline" size={14} color="#FFF" />
              <Text style={styles.pollBadgeText}>POLL</Text>
            </View>
            <Text style={styles.pollTitle}>{item.title}</Text>
          </View>

          <View style={styles.pollBody}>
            {item.options.map((option, index) => (
              <View key={index} style={styles.pollOption}>
                <View style={styles.pollBar}>
                  <View 
                    style={[
                      styles.pollProgress,
                      { 
                        width: item.totalVotes > 0 
                          ? `${(item.votes[index] / item.totalVotes) * 100}%` 
                          : '0%'
                      }
                    ]}
                  />
                </View>
                <View style={styles.pollOptionLabel}>
                  <Text style={styles.optionName}>{option}</Text>
                  <Text style={styles.voteCount}>{item.votes[index]} votes</Text>
                </View>
              </View>
            ))}
            <Text style={styles.totalVotes}>{item.totalVotes} total votes • {item.timestamp}</Text>
          </View>
        </View>
      );
    }

    if (item.type === 'event') {
      return (
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventCategory}>{item.category}</Text>
            </View>
            <View style={styles.eventStatusBadge}>
              <Text style={styles.eventStatusText}>{item.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.eventBody}>
            <View style={styles.eventDetailRow}>
              <Ionicons name="calendar-outline" size={16} color="#1D97E8" />
              <Text style={styles.eventDetailText}>{item.date}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Ionicons name="time-outline" size={16} color="#1D97E8" />
              <Text style={styles.eventDetailText}>{item.time}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Ionicons name="location-outline" size={16} color="#1D97E8" />
              <Text style={styles.eventDetailText}>{item.venue}</Text>
            </View>
            <View style={styles.eventDetailRow}>
              <Ionicons name="people-outline" size={16} color="#1D97E8" />
              <Text style={styles.eventDetailText}>{item.attendees} attendees</Text>
            </View>
          </View>

          <View style={styles.eventFooter}>
            <TouchableOpacity 
              style={[styles.eventButton, item.going && styles.eventButtonActive]}
            >
              <Ionicons 
                name={item.going ? 'checkmark-circle' : 'checkmark-circle-outline'} 
                size={18} 
                color={item.going ? '#FFF' : '#1D97E8'}
              />
              <Text style={[styles.eventButtonText, item.going && styles.eventButtonTextActive]}>
                {item.going ? 'Going' : 'Not Going'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.eventDeleteButton}
              onPress={() => handleDeletePost(item.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Posts</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedFilter === filter.value && styles.filterButtonTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <FlatList
            data={filteredPosts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color="#DDD" />
            <Text style={styles.emptyStateText}>No {selectedFilter === 'all' ? 'posts' : selectedFilter}s yet</Text>
            <Text style={styles.emptyStateSubtext}>Start by creating your first {selectedFilter === 'all' ? 'post' : selectedFilter}</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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
  headerSpacer: {
    width: 40,
  },
  filterScroll: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#1D97E8',
    borderColor: '#1D97E8',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  listContent: {
    padding: 12,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    marginRight: 10,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  postBody: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  postContent: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  pollCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  pollHeader: {
    marginBottom: 12,
  },
  pollBadgeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D97E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  pollBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 4,
  },
  pollTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  pollBody: {
    borderRadius: 8,
  },
  pollOption: {
    marginVertical: 8,
  },
  pollBar: {
    height: 24,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  pollProgress: {
    height: '100%',
    backgroundColor: '#1D97E8',
  },
  pollOptionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  voteCount: {
    fontSize: 12,
    color: '#999',
  },
  totalVotes: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  eventCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  eventStatusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  eventStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4CAF50',
  },
  eventBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 10,
    marginBottom: 10,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  eventDetailText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1D97E8',
    backgroundColor: '#FFF',
  },
  eventButtonActive: {
    backgroundColor: '#1D97E8',
  },
  eventButtonText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#1D97E8',
    fontWeight: '600',
  },
  eventButtonTextActive: {
    color: '#FFF',
  },
  eventDeleteButton: {
    marginLeft: 10,
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
