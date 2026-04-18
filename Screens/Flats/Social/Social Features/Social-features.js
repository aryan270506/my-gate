// Social-features.js
import React, { useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { logFeatureInteraction } from '../../../../services/axios';

const trackFeatureTap = async (featureName, context = {}) => {
  const normalizedName = String(featureName || '').trim();

  if (!normalizedName) {
    return;
  }

  try {
    await logFeatureInteraction({
      featureName: normalizedName,
      source: 'social-features',
      screen: 'Social Features',
      actionType: 'press',
      metadata: context,
    });
  } catch (error) {
    console.log('Feature tracking failed:', error?.message || error);
  }
};

// PreApproveModal Component
const PreApproveModal = ({ visible, onClose, onSelectOption }) => {
  const preApproveOptions = [
    { label: 'Guest', icon: 'person-outline' },
    { label: 'Cab', icon: 'car-sport-outline' },
    { label: 'Delivery', icon: 'cube-outline' },
    { label: 'Visiting Help', icon: 'build-outline' },
  ];

  const handleOptionPress = (option) => {
    console.log('Pre-approve option selected:', option);
    trackFeatureTap(option, { section: 'pre-approve-modal' });
    if (onSelectOption) {
      onSelectOption(option);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={preApproveStyles.overlay}>
        <View style={preApproveStyles.modalContainer}>
          <View style={preApproveStyles.dragHandle} />
          
          <TouchableOpacity style={preApproveStyles.closeX} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color="#4A4A4A" />
          </TouchableOpacity>

          <View style={preApproveStyles.header}>
            <Text style={preApproveStyles.title}>G9 802</Text>
            <View style={preApproveStyles.adBadge}>
              <Text style={preApproveStyles.adBadgeText}>Ad-Supported</Text>
            </View>
          </View>

          <Text style={preApproveStyles.subtitle}>Allow Future Entries</Text>

          <View style={preApproveStyles.optionsGrid}>
            {preApproveOptions.map((option) => (
              <TouchableOpacity 
                key={option.label}
                style={preApproveStyles.option} 
                activeOpacity={0.7}
                onPress={() => handleOptionPress(option.label)}
              >
                <View style={preApproveStyles.optionIconContainer}>
                  <Ionicons name={option.icon} size={36} color="#0d3d2f" />
                </View>
                <Text style={preApproveStyles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Advertisement Section */}
          <View style={preApproveStyles.adSection}>
            <View style={preApproveStyles.adContent}>
              <View style={preApproveStyles.adTextBlock}>
                <Text style={preApproveStyles.adBrand}>INDRIYA</Text>
                <Text style={preApproveStyles.adCategory}>ADITYA BIRLA | JEWELLERY</Text>
              </View>
              <View style={preApproveStyles.adPromo}>
                <Text style={preApproveStyles.adDiscount}>35%</Text>
                <Text style={preApproveStyles.adPromoText}>off on gold jewellery</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Security Modal Component
const SecurityModal = ({ visible, onClose, onSelectOption }) => {
  const securityOptions = [
    { label: 'Raise Alert', icon: 'radio-button-outline' },
    { label: 'Call Security', icon: 'call-outline' },
    { label: 'Message to Guard', icon: 'mail-outline' },
    { label: 'Search a Vehicle', icon: 'car-sport-outline' },
    { label: 'Allow Kid Exit', icon: 'happy-outline' },
  ];

  const handleOptionPress = (option) => {
    console.log('Security option selected:', option);
    trackFeatureTap(option, { section: 'security-modal' });
    onClose();
    if (onSelectOption) {
      onSelectOption(option);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={securityStyles.overlay}>
        <View style={securityStyles.modalContainer}>
          <View style={securityStyles.dragHandle} />
          
          <TouchableOpacity style={securityStyles.closeX} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={20} color="#4A4A4A" />
          </TouchableOpacity>

          <Text style={securityStyles.title}>Security</Text>

          <View style={securityStyles.optionsGrid}>
            {securityOptions.map((option) => (
              <TouchableOpacity 
                key={option.label}
                style={securityStyles.option} 
                activeOpacity={0.7}
                onPress={() => handleOptionPress(option.label)}
              >
                <View style={securityStyles.optionIconContainer}>
                  <Ionicons name={option.icon} size={28} color="#0d3d2f" />
                </View>
                <Text style={securityStyles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Advertisement Section */}
          <View style={securityStyles.adSection}>
            <View style={securityStyles.adContent}>
              <View style={securityStyles.adTextBlock}>
                <Text style={securityStyles.adBrand}>LG</Text>
                <Text style={securityStyles.adCategory}>Life's Good.</Text>
              </View>
              <View style={securityStyles.adPromo}>
                <Text style={securityStyles.adBanner}>LG BIG French Door</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Daily Help Component
const DailyHelpScreen = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  
  const maidsList = [
    { id: '1', name: 'Rupali Dhan...', rating: '5.0', houses: '1 House', image: null },
  ];
  
  const cooksList = [
    { id: '1', name: 'Shital Yadav', rating: '2.8', houses: '4 Houses', status: 'Open to work', image: null },
  ];
  
  const allDailyHelps = [
    { id: '1', name: 'Driver', count: '8' },
    { id: '2', name: 'Milkman', count: '24' },
    { id: '3', name: 'Car Cleaner', count: '14' },
    { id: '4', name: 'Tuition Teacher', count: '5' },
    { id: '5', name: 'STP Cleaner', count: '1' },
    { id: '6', name: 'Doctor', count: '1' },
    { id: '7', name: 'Laundry', count: '4' },
    { id: '8', name: 'Flower Delivery', count: '2' },
    { id: '9', name: 'Interior Work', count: '2' },
    { id: '10', name: 'Water Supplier', count: '2' },
    { id: '11', name: 'Vegetable Vendor', count: '2' },
    { id: '12', name: 'Others', count: '1' },
  ];

  const renderHelpItem = ({ item }) => (
    <TouchableOpacity style={dailyHelpStyles.helpItem} activeOpacity={0.7}>
      <View style={dailyHelpStyles.helpItemLeft}>
        <View style={dailyHelpStyles.helpIconContainer}>
          <Ionicons name="person-outline" size={24} color="#666" />
        </View>
        <Text style={dailyHelpStyles.helpItemName}>{item.name}</Text>
      </View>
      <View style={dailyHelpStyles.helpItemRight}>
        <Text style={dailyHelpStyles.helpItemCount}>{item.count}</Text>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={dailyHelpStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={dailyHelpStyles.header}>
          <TouchableOpacity onPress={onClose} style={dailyHelpStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={dailyHelpStyles.headerTitle}>Daily help</Text>
          <View style={dailyHelpStyles.headerRight} />
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={dailyHelpStyles.searchContainer}>
            <View style={dailyHelpStyles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#999" />
              <TextInput
                style={dailyHelpStyles.searchInput}
                placeholder="Search by Name"
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          </View>
          
          {/* InstaHelp Banner */}
          <View style={dailyHelpStyles.instaHelpCard}>
            <View style={dailyHelpStyles.instaHelpHeader}>
              <Text style={dailyHelpStyles.instaHelpTitle}>InstaHelp</Text>
              <Text style={dailyHelpStyles.instaHelpSubtitle}>By Urban Company</Text>
            </View>
            <Text style={dailyHelpStyles.instaHelpMessage}>House help on leave?</Text>
            <Text style={dailyHelpStyles.instaHelpOffer}>
              Get house help in <Text style={dailyHelpStyles.instaHelpBold}>10 mins</Text>
            </Text>
            <TouchableOpacity style={dailyHelpStyles.instaHelpButton}>
              <Text style={dailyHelpStyles.instaHelpButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
          
          {/* Maids in your society */}
          <View style={dailyHelpStyles.section}>
            <View style={dailyHelpStyles.sectionHeader}>
              <Text style={dailyHelpStyles.sectionTitle}>Maids in your society</Text>
              <TouchableOpacity>
                <Text style={dailyHelpStyles.sectionSeeAll}>200 {'>'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dailyHelpStyles.horizontalScroll}>
              {maidsList.map((maid) => (
                <TouchableOpacity key={maid.id} style={dailyHelpStyles.serviceCard}>
                  <View style={dailyHelpStyles.serviceAvatar}>
                    <Ionicons name="person-circle-outline" size={60} color="#DDD" />
                  </View>
                  <Text style={dailyHelpStyles.serviceName}>{maid.name}</Text>
                  <View style={dailyHelpStyles.serviceRating}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={dailyHelpStyles.ratingText}>{maid.rating}</Text>
                  </View>
                  <Text style={dailyHelpStyles.serviceHouses}>{maid.houses}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Cooks in your society */}
          <View style={dailyHelpStyles.section}>
            <View style={dailyHelpStyles.sectionHeader}>
              <Text style={dailyHelpStyles.sectionTitle}>Cooks in your society</Text>
              <TouchableOpacity>
                <Text style={dailyHelpStyles.sectionSeeAll}>21 {'>'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dailyHelpStyles.horizontalScroll}>
              {cooksList.map((cook) => (
                <TouchableOpacity key={cook.id} style={dailyHelpStyles.serviceCard}>
                  <View style={dailyHelpStyles.serviceAvatar}>
                    <Ionicons name="person-circle-outline" size={60} color="#DDD" />
                  </View>
                  <Text style={dailyHelpStyles.serviceName}>{cook.name}</Text>
                  <View style={dailyHelpStyles.serviceRating}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={dailyHelpStyles.ratingText}>{cook.rating}</Text>
                  </View>
                  <Text style={dailyHelpStyles.serviceHouses}>{cook.houses}</Text>
                  <View style={dailyHelpStyles.openToWorkBadge}>
                    <Text style={dailyHelpStyles.openToWorkText}>{cook.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* All Daily Helps */}
          <View style={dailyHelpStyles.section}>
            <Text style={dailyHelpStyles.sectionTitle}>All Daily Helps</Text>
            <FlatList
              data={allDailyHelps}
              renderItem={renderHelpItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
// Deliveries Screen Component
const DeliveriesScreen = ({ visible, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('all'); // 'all', 'morning', 'afternoon', 'evening'
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const upcomingDeliveries = [
    {
      id: '1',
      item: 'Grocery Order',
      from: 'Big Basket',
      deliveryPerson: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      date: '2024-01-20',
      time: '10:30 AM',
      timeSlot: 'morning',
      status: 'confirmed',
      otp: '123456',
    },
    {
      id: '2',
      item: 'Food Delivery',
      from: 'Swiggy - Dominos',
      deliveryPerson: 'Suresh Patel',
      phone: '+91 98765 43211',
      date: '2024-01-20',
      time: '1:00 PM',
      timeSlot: 'afternoon',
      status: 'on_the_way',
      otp: '789012',
    },
    {
      id: '3',
      item: 'Amazon Package',
      from: 'Amazon',
      deliveryPerson: 'Rajesh Singh',
      phone: '+91 98765 43212',
      date: '2024-01-20',
      time: '6:30 PM',
      timeSlot: 'evening',
      status: 'pending',
      otp: '345678',
    },
    {
      id: '4',
      item: 'Medicine Delivery',
      from: '1mg',
      deliveryPerson: 'Amit Sharma',
      phone: '+91 98765 43213',
      date: '2024-01-21',
      time: '9:00 AM',
      timeSlot: 'morning',
      status: 'scheduled',
      otp: '901234',
    },
  ];

  const pastDeliveries = [
    {
      id: '5',
      item: 'Zomato Order',
      from: 'Zomato - Pizza Hut',
      deliveryPerson: 'Vikram',
      date: '2024-01-18',
      time: '8:30 PM',
      deliveredAt: '8:45 PM',
      status: 'delivered',
    },
    {
      id: '6',
      item: 'Flipkart Delivery',
      from: 'Flipkart',
      deliveryPerson: 'Manoj',
      date: '2024-01-17',
      time: '2:00 PM',
      deliveredAt: '2:15 PM',
      status: 'delivered',
    },
  ];

  const timeSlots = [
    { id: 'all', label: 'All', icon: 'time-outline' },
    { id: 'morning', label: 'Morning', icon: 'sunny-outline', time: '6 AM - 12 PM' },
    { id: 'afternoon', label: 'Afternoon', icon: 'partly-sunny-outline', time: '12 PM - 4 PM' },
    { id: 'evening', label: 'Evening', icon: 'moon-outline', time: '4 PM - 10 PM' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#4CAF50';
      case 'on_the_way': return '#FF9800';
      case 'pending': return '#FFC107';
      case 'scheduled': return '#2196F3';
      case 'delivered': return '#9E9E9E';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmed';
      case 'on_the_way': return 'On The Way';
      case 'pending': return 'Pending';
      case 'scheduled': return 'Scheduled';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const filteredDeliveries = selectedTab === 'upcoming' 
    ? upcomingDeliveries.filter(d => selectedTimeSlot === 'all' || d.timeSlot === selectedTimeSlot)
    : pastDeliveries;

  const renderDeliveryCard = ({ item }) => (
    <TouchableOpacity style={deliveriesStyles.deliveryCard} activeOpacity={0.8}>
      <View style={deliveriesStyles.cardHeader}>
        <View style={deliveriesStyles.itemInfo}>
          <View style={deliveriesStyles.itemIcon}>
            <Ionicons name="cube-outline" size={24} color="#0d3d2f" />
          </View>
          <View>
            <Text style={deliveriesStyles.itemName}>{item.item}</Text>
            <Text style={deliveriesStyles.itemFrom}>{item.from}</Text>
          </View>
        </View>
        <View style={[deliveriesStyles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[deliveriesStyles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={deliveriesStyles.cardDetails}>
        <View style={deliveriesStyles.detailRow}>
          <Ionicons name="calendar-outline" size={18} color="#999" />
          <Text style={deliveriesStyles.detailText}>{item.date}</Text>
        </View>
        <View style={deliveriesStyles.detailRow}>
          <Ionicons name="time-outline" size={18} color="#999" />
          <Text style={deliveriesStyles.detailText}>{item.time}</Text>
        </View>
        {item.deliveryPerson && (
          <View style={deliveriesStyles.detailRow}>
            <Ionicons name="person-outline" size={18} color="#999" />
            <Text style={deliveriesStyles.detailText}>{item.deliveryPerson}</Text>
          </View>
        )}
        {item.phone && (
          <View style={deliveriesStyles.detailRow}>
            <Ionicons name="call-outline" size={18} color="#999" />
            <Text style={deliveriesStyles.detailText}>{item.phone}</Text>
          </View>
        )}
        {item.otp && selectedTab === 'upcoming' && (
          <View style={deliveriesStyles.otpContainer}>
            <Text style={deliveriesStyles.otpLabel}>Delivery OTP:</Text>
            <Text style={deliveriesStyles.otpValue}>{item.otp}</Text>
          </View>
        )}
        {item.deliveredAt && (
          <View style={deliveriesStyles.detailRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#4CAF50" />
            <Text style={deliveriesStyles.detailText}>Delivered at: {item.deliveredAt}</Text>
          </View>
        )}
      </View>

      {selectedTab === 'upcoming' && item.status !== 'delivered' && (
        <View style={deliveriesStyles.cardActions}>
          <TouchableOpacity style={deliveriesStyles.actionButton}>
            <Ionicons name="call-outline" size={20} color="#0d3d2f" />
            <Text style={deliveriesStyles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={deliveriesStyles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#0d3d2f" />
            <Text style={deliveriesStyles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={deliveriesStyles.actionButton}>
            <Ionicons name="location-outline" size={20} color="#0d3d2f" />
            <Text style={deliveriesStyles.actionButtonText}>Track</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const ScheduleDeliveryModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showScheduleModal}
      onRequestClose={() => setShowScheduleModal(false)}
    >
      <View style={deliveriesStyles.scheduleOverlay}>
        <View style={deliveriesStyles.scheduleContainer}>
          <View style={deliveriesStyles.scheduleDragHandle} />
          
          <TouchableOpacity 
            style={deliveriesStyles.scheduleCloseX} 
            onPress={() => setShowScheduleModal(false)}>
            <Ionicons name="close" size={24} color="#4A4A4A" />
          </TouchableOpacity>

          <Text style={deliveriesStyles.scheduleTitle}>Schedule Delivery</Text>
          
          <View style={deliveriesStyles.datePickerContainer}>
            <Text style={deliveriesStyles.inputLabel}>Select Date</Text>
            <TouchableOpacity style={deliveriesStyles.dateButton}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={deliveriesStyles.dateButtonText}>Choose Date</Text>
            </TouchableOpacity>
          </View>

          <View style={deliveriesStyles.timeSlotContainer}>
            <Text style={deliveriesStyles.inputLabel}>Select Time Slot</Text>
            <View style={deliveriesStyles.timeSlotOptions}>
              {['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 10 PM)'].map((slot) => (
                <TouchableOpacity key={slot} style={deliveriesStyles.timeSlotOption}>
                  <Text style={deliveriesStyles.timeSlotOptionText}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={deliveriesStyles.deliveryInstructions}>
            <Text style={deliveriesStyles.inputLabel}>Delivery Instructions (Optional)</Text>
            <TextInput
              style={deliveriesStyles.instructionsInput}
              placeholder="e.g., Call before arriving, Leave at security..."
              placeholderTextColor="#999"
              multiline
            />
          </View>

          <TouchableOpacity style={deliveriesStyles.scheduleButton}>
            <Text style={deliveriesStyles.scheduleButtonText}>Schedule Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={deliveriesStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={deliveriesStyles.header}>
          <TouchableOpacity onPress={onClose} style={deliveriesStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={deliveriesStyles.headerTitle}>Deliveries</Text>
          <TouchableOpacity 
            style={deliveriesStyles.scheduleNewButton}
            onPress={() => setShowScheduleModal(true)}>
            <Ionicons name="add-circle-outline" size={24} color="#0d3d2f" />
          </TouchableOpacity>
        </View>

        {/* Tab Selector */}
        <View style={deliveriesStyles.tabContainer}>
          <TouchableOpacity 
            style={[deliveriesStyles.tab, selectedTab === 'upcoming' && deliveriesStyles.activeTab]}
            onPress={() => setSelectedTab('upcoming')}>
            <Text style={[deliveriesStyles.tabText, selectedTab === 'upcoming' && deliveriesStyles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[deliveriesStyles.tab, selectedTab === 'past' && deliveriesStyles.activeTab]}
            onPress={() => setSelectedTab('past')}>
            <Text style={[deliveriesStyles.tabText, selectedTab === 'past' && deliveriesStyles.activeTabText]}>
              Past Deliveries
            </Text>
          </TouchableOpacity>
        </View>

        {/* Time Filter (only for upcoming) */}
        {selectedTab === 'upcoming' && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={deliveriesStyles.timeFilterContainer}>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  deliveriesStyles.timeFilterChip,
                  selectedTimeSlot === slot.id && deliveriesStyles.activeTimeFilter
                ]}
                onPress={() => setSelectedTimeSlot(slot.id)}>
                <Ionicons 
                  name={slot.icon} 
                  size={16} 
                  color={selectedTimeSlot === slot.id ? '#0d3d2f' : '#666'} 
                />
                <Text style={[
                  deliveriesStyles.timeFilterText,
                  selectedTimeSlot === slot.id && deliveriesStyles.activeTimeFilterText
                ]}>
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Deliveries List */}
        <FlatList
          data={filteredDeliveries}
          renderItem={renderDeliveryCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={deliveriesStyles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={deliveriesStyles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#E1DBCF" />
              <Text style={deliveriesStyles.emptyText}>No deliveries found</Text>
            </View>
          }
        />

        {/* Schedule Delivery Modal */}
        <ScheduleDeliveryModal />
      </SafeAreaView>
    </Modal>
  );
};

const VisitorsScreen = ({ visible, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('expected'); // 'expected', 'active', 'history'
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [searchText, setSearchText] = useState('');
  
  // Expected Visitors (scheduled to come)
  const expectedVisitors = [
    {
      id: '1',
      name: 'Rajesh Sharma',
      phone: '+91 98765 43210',
      flatNo: 'A-1201',
      floor: '12th Floor',
      purpose: 'Family Visit',
      expectedTime: '11:00 AM',
      date: 'Today',
      duration: '2 hours',
      photo: null,
      approved: true,
    },
    {
      id: '2',
      name: 'Priya Patel',
      phone: '+91 98765 43211',
      flatNo: 'B-805',
      floor: '8th Floor',
      purpose: 'Friend Visit',
      expectedTime: '2:30 PM',
      date: 'Today',
      duration: '3 hours',
      photo: null,
      approved: true,
    },
    {
      id: '3',
      name: 'Amit Kumar',
      phone: '+91 98765 43212',
      flatNo: 'C-1502',
      floor: '15th Floor',
      purpose: 'Plumber',
      expectedTime: '4:00 PM',
      date: 'Today',
      duration: '1 hour',
      photo: null,
      approved: false,
      pendingApproval: true,
    },
    {
      id: '4',
      name: 'Sunita Reddy',
      phone: '+91 98765 43213',
      flatNo: 'D-1903',
      floor: '19th Floor',
      purpose: 'Electrician',
      expectedTime: '10:00 AM',
      date: 'Tomorrow',
      duration: '1.5 hours',
      photo: null,
      approved: false,
      pendingApproval: true,
    },
  ];

  // Active Visitors (currently in society)
  const activeVisitors = [
    {
      id: '5',
      name: 'Mohan Singh',
      phone: '+91 98765 43214',
      flatNo: 'A-304',
      floor: '3rd Floor',
      purpose: 'Furniture Delivery',
      checkInTime: '09:30 AM',
      checkInDate: 'Today',
      expectedDuration: '30 mins',
      photo: null,
      status: 'in_progress',
    },
    {
      id: '6',
      name: 'Kavita Joshi',
      phone: '+91 98765 43215',
      flatNo: 'B-456',
      floor: '4th Floor',
      purpose: 'Home Tuition',
      checkInTime: '10:15 AM',
      checkInDate: 'Today',
      expectedDuration: '2 hours',
      photo: null,
      status: 'in_progress',
    },
  ];

  // Visitor History
  const visitorHistory = [
    {
      id: '7',
      name: 'Ramesh Gupta',
      phone: '+91 98765 43216',
      flatNo: 'C-789',
      floor: '7th Floor',
      purpose: 'Newspaper Subscription',
      date: '2024-01-18',
      checkInTime: '08:00 AM',
      checkOutTime: '08:15 AM',
      duration: '15 mins',
      approvedBy: 'Security Guard',
    },
    {
      id: '8',
      name: 'Sneha Verma',
      phone: '+91 98765 43217',
      flatNo: 'A-123',
      floor: '1st Floor',
      purpose: 'Friend Visit',
      date: '2024-01-17',
      checkInTime: '06:30 PM',
      checkOutTime: '09:00 PM',
      duration: '2.5 hours',
      approvedBy: 'Resident',
    },
    {
      id: '9',
      name: 'Vikram Thakur',
      phone: '+91 98765 43218',
      flatNo: 'D-901',
      floor: '9th Floor',
      purpose: 'AC Repair',
      date: '2024-01-16',
      checkInTime: '11:00 AM',
      checkOutTime: '12:30 PM',
      duration: '1.5 hours',
      approvedBy: 'Resident',
    },
  ];

  const getPurposeIcon = (purpose) => {
    if (purpose.includes('Family') || purpose.includes('Friend')) return 'people-outline';
    if (purpose.includes('Plumber') || purpose.includes('Electrician') || purpose.includes('Repair')) return 'construct-outline';
    if (purpose.includes('Delivery')) return 'cube-outline';
    if (purpose.includes('Tuition')) return 'book-outline';
    return 'person-outline';
  };

  const renderExpectedVisitor = ({ item }) => (
    <TouchableOpacity 
      style={visitorsStyles.visitorCard} 
      activeOpacity={0.8}
      onPress={() => setSelectedVisitor(item)}>
      <View style={visitorsStyles.cardHeader}>
        <View style={visitorsStyles.visitorInfo}>
          <View style={visitorsStyles.visitorAvatar}>
            <Ionicons name={getPurposeIcon(item.purpose)} size={28} color="#0d3d2f" />
          </View>
          <View>
            <Text style={visitorsStyles.visitorName}>{item.name}</Text>
            <Text style={visitorsStyles.visitorPurpose}>{item.purpose}</Text>
          </View>
        </View>
        <View style={[
          visitorsStyles.approvalBadge,
          item.approved ? visitorsStyles.approvedBadge : visitorsStyles.pendingBadge
        ]}>
          <Text style={[
            visitorsStyles.approvalText,
            item.approved ? visitorsStyles.approvedText : visitorsStyles.pendingText
          ]}>
            {item.approved ? 'Approved' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={visitorsStyles.cardDetails}>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="call-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>{item.phone}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="home-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>Flat {item.flatNo}, {item.floor}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>{item.expectedTime} • {item.duration}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>{item.date}</Text>
        </View>
      </View>

      {!item.approved && item.pendingApproval && (
        <View style={visitorsStyles.actionButtons}>
          <TouchableOpacity style={visitorsStyles.approveButton}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
            <Text style={visitorsStyles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={visitorsStyles.rejectButton}>
            <Ionicons name="close-circle-outline" size={20} color="#F44336" />
            <Text style={visitorsStyles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderActiveVisitor = ({ item }) => (
    <TouchableOpacity 
      style={visitorsStyles.visitorCard} 
      activeOpacity={0.8}
      onPress={() => setSelectedVisitor(item)}>
      <View style={visitorsStyles.activeHeader}>
        <View style={visitorsStyles.visitorInfo}>
          <View style={[visitorsStyles.visitorAvatar, visitorsStyles.activeAvatar]}>
            <Ionicons name={getPurposeIcon(item.purpose)} size={28} color="#4CAF50" />
          </View>
          <View>
            <Text style={visitorsStyles.visitorName}>{item.name}</Text>
            <Text style={visitorsStyles.visitorPurpose}>{item.purpose}</Text>
          </View>
        </View>
        <View style={visitorsStyles.activeBadge}>
          <Ionicons name="radio-button-on" size={12} color="#4CAF50" />
          <Text style={visitorsStyles.activeText}>Active</Text>
        </View>
      </View>

      <View style={visitorsStyles.cardDetails}>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="call-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>{item.phone}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="home-outline" size={16} color="#999" />
          <Text style={visitorsStyles.detailText}>Flat {item.flatNo}, {item.floor}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="log-in-outline" size={16} color="#4CAF50" />
          <Text style={visitorsStyles.detailText}>Checked in at {item.checkInTime}</Text>
        </View>
        <View style={visitorsStyles.detailRow}>
          <Ionicons name="hourglass-outline" size={16} color="#FF9800" />
          <Text style={visitorsStyles.detailText}>Expected: {item.expectedDuration}</Text>
        </View>
      </View>

      <TouchableOpacity style={visitorsStyles.checkoutButton}>
        <Text style={visitorsStyles.checkoutButtonText}>Check Out</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderHistoryVisitor = ({ item }) => (
    <TouchableOpacity style={visitorsStyles.historyCard} activeOpacity={0.7}>
      <View style={visitorsStyles.historyHeader}>
        <View style={visitorsStyles.historyAvatar}>
          <Ionicons name="person-outline" size={24} color="#999" />
        </View>
        <View style={visitorsStyles.historyInfo}>
          <Text style={visitorsStyles.historyName}>{item.name}</Text>
          <Text style={visitorsStyles.historyPurpose}>{item.purpose}</Text>
          <Text style={visitorsStyles.historyFlat}>Flat {item.flatNo}, {item.floor}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
      </View>
      
      <View style={visitorsStyles.historyDetails}>
        <View style={visitorsStyles.historyTimeRow}>
          <Ionicons name="calendar-outline" size={14} color="#999" />
          <Text style={visitorsStyles.historyDate}>{item.date}</Text>
        </View>
        <View style={visitorsStyles.historyTimeRow}>
          <Ionicons name="time-outline" size={14} color="#999" />
          <Text style={visitorsStyles.historyTime}>{item.checkInTime} - {item.checkOutTime}</Text>
        </View>
        <View style={visitorsStyles.historyTimeRow}>
          <Ionicons name="timer-outline" size={14} color="#999" />
          <Text style={visitorsStyles.historyDuration}>Duration: {item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const AddVisitorModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddVisitor}
      onRequestClose={() => setShowAddVisitor(false)}
    >
      <View style={visitorsStyles.addVisitorOverlay}>
        <View style={visitorsStyles.addVisitorContainer}>
          <View style={visitorsStyles.addVisitorDragHandle} />
          
          <TouchableOpacity 
            style={visitorsStyles.addVisitorCloseX} 
            onPress={() => setShowAddVisitor(false)}>
            <Ionicons name="close" size={24} color="#4A4A4A" />
          </TouchableOpacity>

          <Text style={visitorsStyles.addVisitorTitle}>Add Expected Visitor</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={visitorsStyles.inputGroup}>
              <Text style={visitorsStyles.inputLabel}>Visitor Name *</Text>
              <TextInput style={visitorsStyles.textInput} placeholder="Enter full name" />
            </View>

            <View style={visitorsStyles.inputGroup}>
              <Text style={visitorsStyles.inputLabel}>Phone Number *</Text>
              <TextInput style={visitorsStyles.textInput} placeholder="Enter mobile number" keyboardType="phone-pad" />
            </View>

            <View style={visitorsStyles.rowInput}>
              <View style={[visitorsStyles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={visitorsStyles.inputLabel}>Flat No.</Text>
                <TextInput style={visitorsStyles.textInput} placeholder="e.g., A-1201" />
              </View>
              <View style={[visitorsStyles.inputGroup, { flex: 1 }]}>
                <Text style={visitorsStyles.inputLabel}>Floor</Text>
                <TextInput style={visitorsStyles.textInput} placeholder="e.g., 12th Floor" />
              </View>
            </View>

            <View style={visitorsStyles.inputGroup}>
              <Text style={visitorsStyles.inputLabel}>Purpose of Visit *</Text>
              <View style={visitorsStyles.purposeContainer}>
                {['Family', 'Friend', 'Service', 'Delivery', 'Other'].map((purpose) => (
                  <TouchableOpacity key={purpose} style={visitorsStyles.purposeChip}>
                    <Text style={visitorsStyles.purposeChipText}>{purpose}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={visitorsStyles.rowInput}>
              <View style={[visitorsStyles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={visitorsStyles.inputLabel}>Date *</Text>
                <TouchableOpacity style={visitorsStyles.dateInput}>
                  <Text style={visitorsStyles.dateInputText}>Select Date</Text>
                  <Ionicons name="calendar-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
              <View style={[visitorsStyles.inputGroup, { flex: 1 }]}>
                <Text style={visitorsStyles.inputLabel}>Time *</Text>
                <TouchableOpacity style={visitorsStyles.dateInput}>
                  <Text style={visitorsStyles.dateInputText}>Select Time</Text>
                  <Ionicons name="time-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={visitorsStyles.inputGroup}>
              <Text style={visitorsStyles.inputLabel}>Expected Duration</Text>
              <TextInput style={visitorsStyles.textInput} placeholder="e.g., 2 hours" />
            </View>

            <TouchableOpacity style={visitorsStyles.submitButton}>
              <Text style={visitorsStyles.submitButtonText}>Add Visitor</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const VisitorDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedVisitor}
      onRequestClose={() => setSelectedVisitor(null)}
    >
      <View style={visitorsStyles.detailOverlay}>
        <View style={visitorsStyles.detailContainer}>
          <View style={visitorsStyles.detailDragHandle} />
          
          <TouchableOpacity 
            style={visitorsStyles.detailCloseX} 
            onPress={() => setSelectedVisitor(null)}>
            <Ionicons name="close" size={24} color="#4A4A4A" />
          </TouchableOpacity>

          {selectedVisitor && (
            <>
              <View style={visitorsStyles.detailHeader}>
                <View style={visitorsStyles.detailAvatar}>
                  <Ionicons name={getPurposeIcon(selectedVisitor.purpose)} size={50} color="#0d3d2f" />
                </View>
                <Text style={visitorsStyles.detailName}>{selectedVisitor.name}</Text>
                <Text style={visitorsStyles.detailPurpose}>{selectedVisitor.purpose}</Text>
              </View>

              <View style={visitorsStyles.detailInfo}>
                <View style={visitorsStyles.detailInfoRow}>
                  <Ionicons name="call-outline" size={20} color="#0d3d2f" />
                  <Text style={visitorsStyles.detailInfoText}>{selectedVisitor.phone}</Text>
                </View>
                <View style={visitorsStyles.detailInfoRow}>
                  <Ionicons name="home-outline" size={20} color="#0d3d2f" />
                  <Text style={visitorsStyles.detailInfoText}>Flat {selectedVisitor.flatNo}, {selectedVisitor.floor}</Text>
                </View>
                {selectedVisitor.expectedTime && (
                  <View style={visitorsStyles.detailInfoRow}>
                    <Ionicons name="time-outline" size={20} color="#0d3d2f" />
                    <Text style={visitorsStyles.detailInfoText}>{selectedVisitor.expectedTime} • {selectedVisitor.duration}</Text>
                  </View>
                )}
                {selectedVisitor.checkInTime && (
                  <View style={visitorsStyles.detailInfoRow}>
                    <Ionicons name="log-in-outline" size={20} color="#4CAF50" />
                    <Text style={visitorsStyles.detailInfoText}>Checked in at {selectedVisitor.checkInTime}</Text>
                  </View>
                )}
                {selectedVisitor.approvedBy && (
                  <View style={visitorsStyles.detailInfoRow}>
                    <Ionicons name="shield-outline" size={20} color="#FF9800" />
                    <Text style={visitorsStyles.detailInfoText}>Approved by: {selectedVisitor.approvedBy}</Text>
                  </View>
                )}
              </View>

              <View style={visitorsStyles.detailActions}>
                <TouchableOpacity style={visitorsStyles.detailCallButton}>
                  <Ionicons name="call-outline" size={20} color="#FFFFFF" />
                  <Text style={visitorsStyles.detailCallButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={visitorsStyles.detailMessageButton}>
                  <Ionicons name="chatbubble-outline" size={20} color="#0d3d2f" />
                  <Text style={visitorsStyles.detailMessageButtonText}>Message</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={visitorsStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={visitorsStyles.header}>
          <TouchableOpacity onPress={onClose} style={visitorsStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={visitorsStyles.headerTitle}>Visitors</Text>
          <TouchableOpacity 
            style={visitorsStyles.addButton}
            onPress={() => setShowAddVisitor(true)}>
            <Ionicons name="add-circle-outline" size={24} color="#0d3d2f" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={visitorsStyles.searchContainer}>
          <View style={visitorsStyles.searchBox}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <TextInput
              style={visitorsStyles.searchInput}
              placeholder="Search visitors by name, flat, or phone"
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Tab Selector */}
        <View style={visitorsStyles.tabContainer}>
          <TouchableOpacity 
            style={[visitorsStyles.tab, selectedTab === 'expected' && visitorsStyles.activeTab]}
            onPress={() => setSelectedTab('expected')}>
            <Text style={[visitorsStyles.tabText, selectedTab === 'expected' && visitorsStyles.activeTabText]}>
              Expected ({expectedVisitors.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[visitorsStyles.tab, selectedTab === 'active' && visitorsStyles.activeTab]}
            onPress={() => setSelectedTab('active')}>
            <Text style={[visitorsStyles.tabText, selectedTab === 'active' && visitorsStyles.activeTabText]}>
              Active ({activeVisitors.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[visitorsStyles.tab, selectedTab === 'history' && visitorsStyles.activeTab]}
            onPress={() => setSelectedTab('history')}>
            <Text style={[visitorsStyles.tabText, selectedTab === 'history' && visitorsStyles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Visitor Lists */}
        <FlatList
          data={selectedTab === 'expected' ? expectedVisitors : selectedTab === 'active' ? activeVisitors : visitorHistory}
          renderItem={selectedTab === 'expected' ? renderExpectedVisitor : selectedTab === 'active' ? renderActiveVisitor : renderHistoryVisitor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={visitorsStyles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={visitorsStyles.emptyContainer}>
              <Ionicons name="people-outline" size={64} color="#E1DBCF" />
              <Text style={visitorsStyles.emptyText}>No visitors found</Text>
            </View>
          }
        />

        {/* Modals */}
        <AddVisitorModal />
        <VisitorDetailModal />
      </SafeAreaView>
    </Modal>
  );
};

// Styles for Visitors Screen
const visitorsStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0d3d2f',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0d3d2f',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  visitorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  visitorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  visitorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  visitorPurpose: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  approvalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  approvedBadge: {
    backgroundColor: '#EAF7F1',
  },
  pendingBadge: {
    backgroundColor: '#FFF8E7',
  },
  approvalText: {
    fontSize: 12,
    fontWeight: '600',
  },
  approvedText: {
    color: '#0d3d2f',
  },
  pendingText: {
    color: '#FFC107',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  approveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
  },
  approveButtonText: {
    marginLeft: 6,
    color: '#4CAF50',
    fontWeight: '600',
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
  },
  rejectButtonText: {
    marginLeft: 6,
    color: '#F44336',
    fontWeight: '600',
  },
  activeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeAvatar: {
    backgroundColor: '#EAF7F1',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF7F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0d3d2f',
    marginLeft: 4,
  },
  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  historyPurpose: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  historyFlat: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  historyDetails: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  historyTime: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  historyDuration: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  // Add Visitor Modal Styles
  addVisitorOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  addVisitorContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  addVisitorDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  addVisitorCloseX: {
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
  addVisitorTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F8F8F8',
  },
  rowInput: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  purposeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  purposeChip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  purposeChipText: {
    fontSize: 14,
    color: '#666',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInputText: {
    fontSize: 14,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#0d3d2f',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Visitor Detail Modal Styles
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  detailContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  detailDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  detailCloseX: {
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
  detailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  detailAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  detailName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
  },
  detailPurpose: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailInfo: {
    marginBottom: 24,
  },
  detailInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailInfoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailCallButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0d3d2f',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  detailCallButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailMessageButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  detailMessageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#0d3d2f',
  },
};

// Styles for Deliveries Screen
const deliveriesStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  scheduleNewButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0d3d2f',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0d3d2f',
    fontWeight: '600',
  },
  timeFilterContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  timeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  activeTimeFilter: {
    backgroundColor: '#FFF3E0',
  },
  timeFilterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  activeTimeFilterText: {
    color: '#0d3d2f',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  itemFrom: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 10,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
  },
  otpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
    marginRight: 8,
  },
  otpValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF9800',
    letterSpacing: 2,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#0d3d2f',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  scheduleOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  scheduleContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  scheduleDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  scheduleCloseX: {
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
  scheduleTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#F8F8F8',
  },
  dateButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  timeSlotContainer: {
    marginBottom: 20,
  },
  timeSlotOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlotOption: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  timeSlotOptionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  deliveryInstructions: {
    marginBottom: 24,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  scheduleButton: {
    backgroundColor: '#0d3d2f',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
};

// Styles for PreApprove Modal
const preApproveStyles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  closeX: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  adBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  adBadgeText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  option: {
    width: '24%',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#0d3d2f',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 14,
  },
  adSection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adTextBlock: {
    flex: 1,
  },
  adBrand: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0d3d2f',
    letterSpacing: 1.2,
  },
  adCategory: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 1,
  },
  adPromo: {
    alignItems: 'center',
  },
  adDiscount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFC107',
  },
  adPromoText: {
    fontSize: 8,
    fontWeight: '500',
    color: '#666666',
    marginTop: 1,
  },
};

// Styles for Security Modal
const securityStyles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  closeX: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingHorizontal: 6,
  },
  option: {
    width: '30%',
    maxWidth: 110,
    minWidth: 92,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: '1.6%',
  },
  optionIconContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#0d3d2f',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 15,
  },
  adSection: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  adContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adTextBlock: {
    flex: 1,
  },
  adBrand: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0d3d2f',
    letterSpacing: 1.2,
  },
  adCategory: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 1,
  },
  adBanner: {
    fontSize: 9,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'right',
  },
  adPromo: {
    alignItems: 'flex-end',
  },
};

// Styles for Daily Help Screen
const dailyHelpStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16 
    ,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  instaHelpCard: {
    backgroundColor: '#FFF8E7',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE4B5',
  },
  instaHelpHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  instaHelpTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF8C00',
  },
  instaHelpSubtitle: {
    fontSize: 12,
    color: '#FF8C00',
    marginLeft: 8,
  },
  instaHelpMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  instaHelpOffer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  instaHelpBold: {
    fontWeight: '700',
    color: '#333',
  },
  instaHelpButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  instaHelpButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  sectionSeeAll: {
    fontSize: 14,
    color: '#0d3d2f',
    fontWeight: '600',
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  serviceCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  serviceAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  serviceRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  serviceHouses: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  openToWorkBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  openToWorkText: {
    fontSize: 8,
    color: '#4CAF50',
    fontWeight: '600',
  },
  helpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  helpItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  helpItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpItemCount: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
};

// ============================================
// QUICK ACTIONS COMPONENTS & DATA
// ============================================

// Quick Actions Data
const homeActions = [
  { label: 'Pre-Appr...', icon: 'person-add-outline' },
  { label: 'Security', icon: 'shield-outline' },
  { label: 'Ask Society', icon: 'help-circle-outline' },
  { label: 'Posts', icon: 'document-text-outline' },
];

const moreActions = [
  { label: 'Invest S...', icon: 'home-outline' },
  { label: 'Find Daily...', icon: 'briefcase-outline' },
  { label: 'InstaHelp', icon: 'flash-outline' },
  { label: 'View More', icon: 'add-circle-outline' },
];

const specialItemStyles = {
  'Invest S...': { backgroundColor: '#B8E6FF', textColor: '#0066CC', showImage: true },
  'InstaHelp': { backgroundColor: '#7B3FF2', textColor: '#FFFFFF' },
  'View More': { backgroundColor: '#FFD700', textColor: '#20353A' },
};

// Special Quick Action Item Component
function SpecialQuickActionItem({ label, icon, backgroundColor, textColor, onPress, showImage }) {
  return (
    <TouchableOpacity
      style={quickActionsStyles.quickActionItem}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={[quickActionsStyles.quickActionIconBox, { backgroundColor }]}>
        {showImage ? (
          <View style={quickActionsStyles.investImageContainer}>
            <Text style={quickActionsStyles.investLabel}>Buy</Text>
            <Text style={quickActionsStyles.investSubLabel}>a New Home</Text>
          </View>
        ) : (
          <Ionicons name={icon} size={26} color={textColor || '#20353A'} />
        )}
      </View>
      <Text style={quickActionsStyles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Quick Action Grid Component
function QuickActionGrid({ items, onItemPress, specialItems }) {
  return (
    <View style={quickActionsStyles.quickActionGrid}>
      {items.map((item) => {
        const special = specialItems && specialItems[item.label];
        if (special) {
          return (
            <SpecialQuickActionItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              backgroundColor={special.backgroundColor}
              textColor={special.textColor}
              onPress={() => onItemPress && onItemPress(item.label)}
              showImage={special.showImage}
            />
          );
        }
        return (
          <TouchableOpacity
            key={item.label}
            style={quickActionsStyles.quickActionItem}
            activeOpacity={0.85}
            onPress={() => onItemPress && onItemPress(item.label)}
          >
            <View style={quickActionsStyles.quickActionIconBox}>
              <Ionicons name={item.icon} size={26} color="#20353A" />
            </View>
            <Text style={quickActionsStyles.quickActionLabel}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// InstaHelp Modal Component
const InstaHelpModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={instaHelpStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View style={instaHelpStyles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={instaHelpStyles.headerTitle}>InstaHelp</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={instaHelpStyles.content}>
          <View style={instaHelpStyles.badge}>
            <Ionicons name="flash" size={16} color="#FFFFFF" />
            <Text style={instaHelpStyles.badgeText}>10 mins</Text>
          </View>

          <Text style={instaHelpStyles.title}>Household in 10 minutes</Text>
          <Text style={instaHelpStyles.subtitle}>Quick household help & services</Text>

          <View style={instaHelpStyles.servicesGrid}>
            {['Cleaning', 'Cooking', 'Laundry', 'Repairs'].map((service) => (
              <TouchableOpacity key={service} style={instaHelpStyles.serviceCard} activeOpacity={0.7}>
                <Ionicons name="briefcase-outline" size={32} color="#0d3d2f" />
                <Text style={instaHelpStyles.serviceLabel}>{service}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={instaHelpStyles.bookButton}>
            <Text style={instaHelpStyles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Quick Actions Styles
const quickActionsStyles = StyleSheet.create({
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quickActionItem: {
    width: '23.5%',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIconBox: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 14,
  },
  investImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  investLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066CC',
  },
  investSubLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0066CC',
    marginTop: 2,
  },
});

// InstaHelp Styles
const instaHelpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  badge: {
    backgroundColor: '#0d3d2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceLabel: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#0d3d2f',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export { 
  PreApproveModal,
  SecurityModal,
  DailyHelpScreen, 
  DeliveriesScreen, 
  VisitorsScreen,
  QuickActionGrid,
  SpecialQuickActionItem,
  InstaHelpModal,
  homeActions,
  moreActions,
  specialItemStyles,
};