import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PreApproveModal, SecurityModal, DailyHelpScreen, DeliveriesScreen, VisitorsScreen, QuickActionGrid, homeActions, moreActions, specialItemStyles, InstaHelpModal } from './Social Features/Social-features';
import GuestModal from './Guest/GuestModal';
import InvestSmart from './InvestSmart/InvestSmart';
import { InviteGuestModal } from './View More Files/Visitors & Security/Invite-guest';
import { AllowKidExitModal } from './View More Files/Visitors & Security/Allow-Kid-Exit';
import { AllowDeliveryModal } from './View More Files/Visitors & Security/Allow-Delivery';
import { CabAutoModal } from './View More Files/Visitors & Security/cab-auto';
import { CallSecurityModal } from './View More Files/Visitors & Security/Call-Security';
import { MessageGuardModal } from './View More Files/Visitors & Security/Message-Guard';
import { MyPassesModal } from './View More Files/Visitors & Security/My-Passes';
import { VisitingHelpModal } from './View More Files/Visitors & Security/Visiting-help';
import { RaiseAlertModal as VisitorsRaiseAlertModal } from './View More Files/Visitors & Security/Raise-Alert';
import { ClassesModal, CommunicationsModal, FindDailyHelpModal, SearchVehicleModal } from './View More Files/Community';
import { CreatePostModal, CreatePollModal, HostEventModal, MyPostsModal } from './View More Files/Feed';
import ProfileScreen from '../../Profile/Profile';
import { logFeatureInteraction } from '../../../services/axios';

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

const customizeQuickActionCatalog = [
  { key: 'preapprove', label: 'Pre-Appr...', displayLabel: 'Pre-Approve', icon: 'person-add-outline' },
  { key: 'security', label: 'Security', displayLabel: 'Security', icon: 'shield-outline' },
  { key: 'askSociety', label: 'Ask Society', displayLabel: 'Ask Society', icon: 'help-circle-outline' },
  { key: 'posts', label: 'Posts', displayLabel: 'Posts', icon: 'document-text-outline' },
  { key: 'invest', label: 'Invest S...', displayLabel: 'Invest Smartly', icon: 'home-outline' },
  { key: 'findDaily', label: 'Find Daily...', displayLabel: 'Find Daily Help', icon: 'briefcase-outline' },
  { key: 'instaHelp', label: 'InstaHelp', displayLabel: 'InstaHelp', icon: 'flash-outline' },
  { key: 'viewMore', label: 'View More', displayLabel: 'View More', icon: 'add-circle-outline' },
  { key: 'raiseAlert', label: 'Raise Alert', displayLabel: 'Raise Alert', icon: 'radio-outline' },
  { key: 'communications', label: 'Communications', displayLabel: 'Communications', icon: 'chatbubble-outline' },
  { key: 'createListing', label: 'Create a listing', displayLabel: 'Create a listing', icon: 'pricetag-outline' },
  { key: 'homePlanner', label: 'Home Planner', displayLabel: 'Home Planner', icon: 'calendar-outline' },
  { key: 'helpdesk', label: 'Helpdesk', displayLabel: 'Helpdesk', icon: 'construct-outline' },
  { key: 'directory', label: 'Directory', displayLabel: 'Directory', icon: 'book-outline' },
  { key: 'payments', label: 'Payments', displayLabel: 'Payments', icon: 'wallet-outline' },
  { key: 'myPasses', label: 'MyPasses', displayLabel: 'MyPasses', icon: 'id-card-outline' },
  { key: 'classes', label: 'Classes', displayLabel: 'Classes', icon: 'document-text-outline' },
  { key: 'searchVehicle', label: 'Search Vehicle', displayLabel: 'Search Vehicle', icon: 'car-outline' },
  { key: 'inviteGuest', label: 'Invite Guest', displayLabel: 'Invite Guest', icon: 'person-outline' },
  { key: 'cabAuto', label: 'Cab/Auto', displayLabel: 'Cab/Auto', icon: 'car-sport-outline' },
  { key: 'allowDelivery', label: 'Allow Delivery', displayLabel: 'Allow Delivery', icon: 'bicycle-outline' },
  { key: 'visitingHelp', label: 'Visiting Help', displayLabel: 'Visiting Help', icon: 'construct-outline' },
  { key: 'callSecurity', label: 'Call Security', displayLabel: 'Call Security', icon: 'call-outline' },
  { key: 'messageGuard', label: 'Message Guard', displayLabel: 'Message Guard', icon: 'mail-outline' },
  { key: 'allowKidExit', label: 'Allow Kid Exit', displayLabel: 'Allow Kid Exit', icon: 'happy-outline' },
  { key: 'residents', label: 'Residents', displayLabel: 'Residents', icon: 'id-card-outline' },
  { key: 'localDirectory', label: 'Local Directory', displayLabel: 'Local Directory', icon: 'location-outline' },
  { key: 'createPost', label: 'Create Post', displayLabel: 'Create Post', icon: 'newspaper-outline' },
  { key: 'createPoll', label: 'Create poll', displayLabel: 'Create poll', icon: 'bar-chart-outline' },
  { key: 'myPosts', label: 'My Posts', displayLabel: 'My Posts', icon: 'chatbubbles-outline' },
  { key: 'hostEvent', label: 'Host an Event', displayLabel: 'Host an Event', icon: 'calendar-clear-outline' },
  { key: 'manageDevices', label: 'Manage Devices', displayLabel: 'Manage Devices', icon: 'phone-portrait-outline' },
  { key: 'mygateLocks', label: 'Mygate Locks', displayLabel: 'Mygate Locks', icon: 'lock-closed-outline' },
  { key: 'findHomes', label: 'Find Homes', displayLabel: 'Find Homes', icon: 'home-outline' },
  { key: 'myListings', label: 'My Listings', displayLabel: 'My Listings', icon: 'file-tray-full-outline' },
  { key: 'findFurniture', label: 'Find Furniture', displayLabel: 'Find Furniture', icon: 'bed-outline' },
  { key: 'myFamily', label: 'My Family', displayLabel: 'My Family', icon: 'people-outline' },
  { key: 'myVehicles', label: 'My Vehicles', displayLabel: 'My Vehicles', icon: 'car-outline' },
  { key: 'testNotification', label: 'Test Notification', displayLabel: 'Test Notification', icon: 'notifications-outline' },
  { key: 'myFlat', label: 'My Flat', displayLabel: 'My Flat', icon: 'home-outline' },
  { key: 'myPlans', label: 'My Plans', displayLabel: 'My Plans', icon: 'ribbon-outline' },
  { key: 'helpSupport', label: 'Help & Support', displayLabel: 'Help & Support', icon: 'help-circle-outline' },
  { key: 'myDailyHelp', label: 'My Daily Help', displayLabel: 'My Daily Help', icon: 'bug-outline' },
];

const quickActionSections = [
  {
    title: 'Visitors & Security',
    items: [
      { label: 'Invite\nGuest', icon: 'person-outline' },
      { label: 'Cab/Auto', icon: 'car-sport-outline' },
      { label: 'Allow\nDelivery', icon: 'bicycle-outline' },
      { label: 'Visiting\nHelp', icon: 'construct-outline' },
      { label: 'Call\nSecurity', icon: 'call-outline' },
      { label: 'Message\nGuard', icon: 'mail-outline' },
      { label: 'MyPasses', icon: 'id-card-outline' },
      { label: 'Allow Kid Exit', icon: 'happy-outline' },
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
  const isVisitorsSecurity = title === 'Visitors & Security';

  if (isVisitorsSecurity) {
    return (
      <View style={styles.quickSectionHeader}>
        <Text style={styles.quickSectionTitle}>{title}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.visitorRaiseAlertButton}
          onPress={onRaiseAlert}
        >
          <Ionicons name="radio-outline" size={22} color="#C61F2A" />
          <Text style={styles.visitorRaiseAlertText}>Raise Alert</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!actionText) {
    return <Text style={styles.quickSectionTitle}>{title}</Text>;
  }

  return (
    <View style={styles.quickSectionHeader}>
      <Text style={styles.quickSectionTitle}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.sectionLinkButton}
        onPress={undefined}
      >
        {actionIcon ? (
          <Ionicons
            name={actionIcon}
            size={18}
            color="#1D97E8"
            style={styles.sectionLinkIcon}
          />
        ) : null}
        <Text style={styles.sectionLinkText}>{actionText}</Text>
        <Ionicons name="chevron-forward" size={20} color="#1D97E8" />
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

// Advertisement Component
function AdvertisementBlock() {
  return (
    <View style={styles.adContainer}>
      <View style={styles.adContent}>
        <View style={styles.adTextSection}>
          <Text style={styles.adMainText}>CONSTRUCT YOUR</Text>
          <Text style={styles.adHighlight}>DREAM HOME</Text>
          <TouchableOpacity style={styles.adCtaButton}>
            <Text style={styles.adCtaText}>Get in Touch</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.adImageSection}>
          <View style={styles.adImagePlaceholder} />
        </View>
      </View>
      <Text style={styles.adLabel}>AD</Text>
    </View>
  );
}

export default function SocialScreen() {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showRaiseAlert, setShowRaiseAlert] = useState(false);
  const [showPreApprove, setShowPreApprove] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showDailyHelp, setShowDailyHelp] = useState(false);
  const [showDeliveries, setShowDeliveries] = useState(false);
  const [showVisitors, setShowVisitors] = useState(false);
  const [showInviteGuest, setShowInviteGuest] = useState(false);
  const [showAllowKidExit, setShowAllowKidExit] = useState(false);
  const [showAllowDelivery, setShowAllowDelivery] = useState(false);
  const [showCabAuto, setShowCabAuto] = useState(false);
  const [showCallSecurity, setShowCallSecurity] = useState(false);
  const [showMessageGuard, setShowMessageGuard] = useState(false);
  const [showMyPasses, setShowMyPasses] = useState(false);
  const [showVisitingHelp, setShowVisitingHelp] = useState(false);
  const [showClasses, setShowClasses] = useState(false);
  const [showCommunications, setShowCommunications] = useState(false);
  const [showFindDailyHelp, setShowFindDailyHelp] = useState(false);
  const [showSearchVehicle, setShowSearchVehicle] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showHostEvent, setShowHostEvent] = useState(false);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showInstaHelp, setShowInstaHelp] = useState(false);
  const [showInvestSmart, setShowInvestSmart] = useState(false);
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  const [showCustomizeQuickActions, setShowCustomizeQuickActions] = useState(false);
  const [dashboardQuickActions, setDashboardQuickActions] = useState(customizeQuickActionCatalog);
  const [draftQuickActions, setDraftQuickActions] = useState(customizeQuickActionCatalog);
  const [selectedQuickActionKey, setSelectedQuickActionKey] = useState(null);
  const [returnToSecurity, setReturnToSecurity] = useState(false);

  const normalizeFeatureLabel = (label) => String(label || '').replace(/\n/g, ' ').trim();

  const trackFeaturePress = async (featureName, context = {}) => {
    const normalizedName = normalizeFeatureLabel(featureName);

    if (!normalizedName) {
      return;
    }

    try {
      await logFeatureInteraction({
        featureName: normalizedName,
        source: 'social-screen',
        screen: 'Social',
        actionType: 'press',
        metadata: context,
      });
    } catch (error) {
      console.log('Feature tracking failed:', error?.message || error);
    }
  };

  // Handle Quick Item Press
  const handleQuickItemPress = (itemLabel) => {
    trackFeaturePress(itemLabel, { section: 'quick-actions-modal' });

    switch (itemLabel) {
      case 'Pre Approv':
        setShowPreApprove(true);
        break;
      case 'Invite\nGuest':
        setShowQuickActions(false);
        setShowGuestModal(true);
        break;
      case 'Cab/Auto':
        setShowCabAuto(true);
        break;
      case 'Allow\nDelivery':
        setShowAllowDelivery(true);
        break;
      case 'Visiting\nHelp':
        setShowVisitingHelp(true);
        break;
      case 'Call\nSecurity':
        setShowCallSecurity(true);
        break;
      case 'Message\nGuard':
        setShowMessageGuard(true);
        break;
      case 'MyPasses':
        setShowMyPasses(true);
        break;
      case 'Allow Kid\nExit':
        setShowAllowKidExit(true);
        break;
      case 'Communic\nations':
        setShowCommunications(true);
        break;
      case 'Search\nVehicle':
        setShowSearchVehicle(true);
        break;
      case 'Find Daily\nHelp':
        setShowFindDailyHelp(true);
        break;
      case 'Classes':
        setShowClasses(true);
        break;
      case 'Create Post':
        setShowCreatePost(true);
        break;
      case 'Create poll':
        setShowCreatePoll(true);
        break;
      case 'Host an\nEvent':
        setShowHostEvent(true);
        break;
      case 'My Posts':
        setShowMyPosts(true);
        break;
      default:
        console.log('Pressed:', itemLabel);
    }
  };

  // Update handleHomeActionPress function
const handleHomeActionPress = (actionLabel) => {
  trackFeaturePress(actionLabel, { section: 'home-actions' });

  if (actionLabel === 'Pre-Appr...') {
    setShowPreApprove(true);
  } else if (actionLabel === 'Security') {
    setShowSecurity(true);
  } else if (actionLabel === 'Ask Society') {
    setShowCreatePost(true);
  } else if (actionLabel === 'Posts') {
    setShowMyPosts(true);
  } else if (actionLabel === 'Daily Help') {
    setShowDailyHelp(true);
  } else if (actionLabel === 'Deliveries') {
    setShowDeliveries(true);
  } else if (actionLabel === 'Visitors') {
    setShowVisitors(true);
  } else {
    console.log('Pressed:', actionLabel);
  }
};

  // Add close handler for deliveries
const handleCloseDeliveries = () => {
  setShowDeliveries(false);
};

const handleCloseVisitors = () => {
  setShowVisitors(false);
};


  const handleRaiseAlert = () => {
    trackFeaturePress('Raise Alert', { section: 'visitors-security' });
    setShowQuickActions(false);
    setShowRaiseAlert(true);
  };

  const handleCloseRaiseAlert = () => {
    setShowRaiseAlert(false);
    setShowQuickActions(false);
    if (returnToSecurity) {
      setReturnToSecurity(false);
      setShowSecurity(true);
    }
  };

  const handleClosePreApprove = () => {
    setShowPreApprove(false); // ← CLOSE PRE-APPROVE MODAL
  };

  const handlePreApproveOptionSelect = (option) => {
    console.log('Pre-approve option selected:', option);
    trackFeaturePress(option, { section: 'pre-approve-modal' });
    // Navigate to the appropriate screen based on selected option
    switch (option) {
      case 'Guest':
        setShowGuestModal(true);
        break;
      case 'Cab':
        setShowCabAuto(true);
        break;
      case 'Delivery':
        setShowAllowDelivery(true);
        break;
      case 'Visiting Help':
        setShowVisitingHelp(true);
        break;
      default:
        console.log('Unknown option:', option);
    }
  };

  const handleCloseSecurity = () => {
    setShowSecurity(false);
    setReturnToSecurity(false);
  };

  const handleSecurityOptionSelect = (option) => {
    console.log('Security option selected:', option);
    trackFeaturePress(option, { section: 'security-modal' });
    setReturnToSecurity(true);
    // Navigate to the appropriate screen based on selected option
    switch (option) {
      case 'Raise Alert':
        setShowRaiseAlert(true);
        break;
      case 'Call Security':
        setShowCallSecurity(true);
        break;
      case 'Message to Guard':
        setShowMessageGuard(true);
        break;
      case 'Search a Vehicle':
        setShowSearchVehicle(true);
        break;
      case 'Allow Kid Exit':
        setShowAllowKidExit(true);
        break;
      default:
        console.log('Unknown security option:', option);
    }
  };
   
  const handleCloseDailyHelp = () => {
  setShowDailyHelp(false);
};

const handleCloseInviteGuest = () => {
  setShowInviteGuest(false);
};

const handleSelectInviteOption = (option) => {
  console.log('Selected invite option:', option.title);
  trackFeaturePress(option?.title || 'Invite Option', { section: 'invite-guest-modal' });
  // Add logic here to handle different invite options
  // For now, just logging the selected option
};

// Close handlers for all modals
const handleCloseAllowKidExit = () => setShowAllowKidExit(false);
const handleCloseAllowDelivery = () => setShowAllowDelivery(false);
const handleCloseCabAuto = () => setShowCabAuto(false);
const handleCloseCallSecurity = () => {
  setShowCallSecurity(false);
  if (returnToSecurity) {
    setReturnToSecurity(false);
    setShowSecurity(true);
  }
};
const handleCloseMessageGuard = () => {
  setShowMessageGuard(false);
  if (returnToSecurity) {
    setReturnToSecurity(false);
    setShowSecurity(true);
  }
};
const handleCloseMyPasses = () => setShowMyPasses(false);
const handleCloseVisitingHelp = () => setShowVisitingHelp(false);
const handleCloseClasses = () => setShowClasses(false);
const handleCloseCommunications = () => setShowCommunications(false);
const handleCloseFindDailyHelp = () => setShowFindDailyHelp(false);
const handleCloseSearchVehicle = () => {
  setShowSearchVehicle(false);
  if (returnToSecurity) {
    setReturnToSecurity(false);
    setShowSecurity(true);
  }
};

const handleCloseAllowKidExitFromSecurity = () => {
  setShowAllowKidExit(false);
  if (returnToSecurity) {
    setReturnToSecurity(false);
    setShowSecurity(true);
  }
};

// Close handlers for Feed modals
const handleCloseCreatePost = () => setShowCreatePost(false);
const handleCloseCreatePoll = () => setShowCreatePoll(false);
const handleCloseHostEvent = () => setShowHostEvent(false);
const handleCloseMyPosts = () => setShowMyPosts(false);

const handleDashboardActionPress = (actionLabel) => {
  trackFeaturePress(actionLabel, { section: 'dashboard-quick-actions' });

  if (actionLabel === 'Pre-Appr...') {
    setShowPreApprove(true);
  } else if (actionLabel === 'Security') {
    setShowSecurity(true);
  } else if (actionLabel === 'Ask Society') {
    setShowCreatePost(true);
  } else if (actionLabel === 'Posts') {
    setShowMyPosts(true);
  } else if (actionLabel === 'Find Daily...') {
    setShowFindDailyHelp(true);
  } else if (actionLabel === 'Raise Alert') {
    setShowRaiseAlert(true);
  } else if (actionLabel === 'Communications') {
    setShowCommunications(true);
  } else if (actionLabel === 'Invite Guest') {
    setShowGuestModal(true);
  } else if (actionLabel === 'Search Vehicle') {
    setShowSearchVehicle(true);
  } else if (actionLabel === 'Allow Delivery') {
    setShowAllowDelivery(true);
  } else if (actionLabel === 'Visiting Help') {
    setShowVisitingHelp(true);
  } else if (actionLabel === 'Call Security') {
    setShowCallSecurity(true);
  } else if (actionLabel === 'Message Guard') {
    setShowMessageGuard(true);
  } else if (actionLabel === 'Allow Kid Exit') {
    setShowAllowKidExit(true);
  } else if (actionLabel === 'Classes') {
    setShowClasses(true);
  } else if (actionLabel === 'Create Post') {
    setShowCreatePost(true);
  } else if (actionLabel === 'Create poll') {
    setShowCreatePoll(true);
  } else if (actionLabel === 'My Posts') {
    setShowMyPosts(true);
  } else if (actionLabel === 'Host an Event') {
    setShowHostEvent(true);
  } else if (actionLabel === 'My Daily Help') {
    setShowFindDailyHelp(true);
  } else if (actionLabel === 'Invest S...') {
    setShowInvestSmart(true);
  } else if (actionLabel === 'InstaHelp') {
    setShowInstaHelp(true);
  } else if (actionLabel === 'View More') {
    setShowQuickActions(true);
  } else if (actionLabel === 'Daily Help') {
    setShowDailyHelp(true);
  } else if (actionLabel === 'Deliveries') {
    setShowDeliveries(true);
  } else if (actionLabel === 'Visitors') {
    setShowVisitors(true);
  } else {
    console.log('Pressed:', actionLabel);
  }
};

const openCustomizeQuickActions = () => {
  setDraftQuickActions([...dashboardQuickActions]);
  setSelectedQuickActionKey(null);
  setShowCustomizeQuickActions(true);
};

const handleCloseCustomizeQuickActions = () => {
  setShowCustomizeQuickActions(false);
  setSelectedQuickActionKey(null);
};

const handleResetCustomizeQuickActions = () => {
  setDraftQuickActions([...customizeQuickActionCatalog]);
  setSelectedQuickActionKey(null);
};

const handleSaveCustomizeQuickActions = () => {
  setDashboardQuickActions([...draftQuickActions]);
  setShowCustomizeQuickActions(false);
  setSelectedQuickActionKey(null);
};

const handleQuickActionTilePress = (targetKey) => {
  if (!selectedQuickActionKey) {
    setSelectedQuickActionKey(targetKey);
    return;
  }

  if (selectedQuickActionKey === targetKey) {
    setSelectedQuickActionKey(null);
    return;
  }

  const sourceIndex = draftQuickActions.findIndex((item) => item.key === selectedQuickActionKey);
  const targetIndex = draftQuickActions.findIndex((item) => item.key === targetKey);

  if (sourceIndex === -1 || targetIndex === -1) {
    setSelectedQuickActionKey(null);
    return;
  }

  const nextDraft = [...draftQuickActions];
  [nextDraft[sourceIndex], nextDraft[targetIndex]] = [nextDraft[targetIndex], nextDraft[sourceIndex]];
  setDraftQuickActions(nextDraft);
  setSelectedQuickActionKey(null);
};

const dashboardTopActions = dashboardQuickActions.slice(0, 4);
const dashboardBottomActions = dashboardQuickActions.slice(4, 8);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F3EA" />

      <View style={styles.screen}>
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>G9 802</Text>
            <View style={styles.adSupportedBadge}>
              <Text style={styles.adSupportedText}>Ad-Supported</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.8} style={styles.headerIconButton}>
              <Ionicons name="search-outline" size={24} color="#7B7469" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.notificationButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#7B7469" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.profileButton}
              onPress={() => setShowProfileScreen(true)}
            >
              <View style={styles.profileCircle}>
                <Text style={styles.profileInitials}>SC</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Advertisement Banner at Top */}
          <AdvertisementBlock />

          {/* Quick Actions Section */}
          <View style={styles.quickActionsSection}>
            <View style={styles.quickActionsHeader}>
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={openCustomizeQuickActions}>
                <Text style={styles.customizeText}>Customise</Text>
              </TouchableOpacity>
            </View>
            <QuickActionGrid 
              items={dashboardTopActions}
              specialItems={specialItemStyles}
              onItemPress={handleDashboardActionPress}
            />
          </View>

          {/* More Quick Actions */}
          <View style={styles.moreQuickActionsSection}>
            <QuickActionGrid 
              items={dashboardBottomActions}
              specialItems={specialItemStyles}
              onItemPress={handleDashboardActionPress}
            />
          </View>

          {/* Advertisement 1 */}
          <AdvertisementBlock />

          {/* Updates Section */}
          <View style={styles.section}>
            <Text style={styles.noUpdatesTitle}>You have no new updates</Text>
          </View>

          {/* Today's Entry Updates */}
          <View style={styles.section}>
            <View style={styles.todayHeaderRow}>
              <Text style={styles.sectionTitle}>TODAY'S ENTRY UPDATES</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>
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

          {/* Advertisement 2 */}
          <AdvertisementBlock />

          {/* Community Posts Section */}
          <View style={styles.section}>
            <View style={styles.communityHeaderRow}>
              <Text style={styles.communityTitle}>Community Posts</Text>
              <TouchableOpacity style={styles.newPostButton} activeOpacity={0.85}>
                <Ionicons name="create-outline" size={16} color="#1D97E8" />
                <Text style={styles.newPostText}>New Post</Text>
              </TouchableOpacity>
            </View>
            {/* Posts will be displayed here */}
          </View>
        </ScrollView>
      </View>

      {/* Quick Actions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCustomizeQuickActions}
        onRequestClose={handleCloseCustomizeQuickActions}
      >
        <View style={styles.customizeOverlay}>
          <View style={styles.customizeSheet}>
            <View style={styles.customizeDragHandle} />

            <TouchableOpacity
              style={styles.customizeCloseButton}
              onPress={handleCloseCustomizeQuickActions}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={34} color="#1A1A1A" />
            </TouchableOpacity>

            <Text style={styles.customizeTitle}>Customise Quick Actions</Text>
            <Text style={styles.customizeSubtitle}>Press and hold to rearrange the actions</Text>

            <ScrollView
              style={styles.customizeScroll}
              contentContainerStyle={styles.customizeScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.customizeGrid}>
                {draftQuickActions.map((item, index) => {
                  const isSelected = selectedQuickActionKey === item.key;
                  const special = specialItemStyles[item.label];
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.customizeItem}
                      activeOpacity={0.9}
                      onLongPress={() => setSelectedQuickActionKey(item.key)}
                      onPress={() => handleQuickActionTilePress(item.key)}
                      delayLongPress={180}
                    >
                      <View
                        style={[
                          styles.customizeIconBox,
                          special ? { backgroundColor: special.backgroundColor } : null,
                          isSelected && styles.customizeIconBoxSelected,
                        ]}
                      >
                        <Ionicons
                          name={item.icon}
                          size={30}
                          color={special ? (special.textColor || '#20353A') : '#20353A'}
                        />
                        {index < 8 ? (
                          <View style={styles.customizePinBadge}>
                            <Ionicons name="star" size={12} color="#FFFFFF" />
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.customizeItemLabel}>{item.displayLabel || item.label.replace('...', '')}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.customizeFooter}>
              <TouchableOpacity
                style={styles.customizeResetButton}
                onPress={handleResetCustomizeQuickActions}
                activeOpacity={0.85}
              >
                <Text style={styles.customizeResetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.customizeSaveButton}
                onPress={handleSaveCustomizeQuickActions}
                activeOpacity={0.85}
              >
                <Text style={styles.customizeSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Quick Actions Modal */}
      <Modal
        animationType="slide"
        visible={showProfileScreen}
        onRequestClose={() => setShowProfileScreen(false)}
      >
        <ProfileScreen onClose={() => setShowProfileScreen(false)} />
      </Modal>

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
      <VisitorsRaiseAlertModal 
        visible={showRaiseAlert} 
        onClose={handleCloseRaiseAlert}
      />

      {/* Pre-approve Modal - ADD THIS */}
      <PreApproveModal 
        visible={showPreApprove} 
        onClose={handleClosePreApprove}
        onSelectOption={handlePreApproveOptionSelect}
        />

      {/* Guest Modal */}
      <GuestModal 
        visible={showGuestModal}
        onClose={() => setShowGuestModal(false)}
      />

      {/* Security Modal */}
      <SecurityModal 
        visible={showSecurity} 
        onClose={handleCloseSecurity}
        onSelectOption={handleSecurityOptionSelect}
        />

       {/* Daily Help Modal */}
<DailyHelpScreen 
  visible={showDailyHelp} 
  onClose={handleCloseDailyHelp}
/>

  {/* InstaHelp Modal */}
<InstaHelpModal 
  visible={showInstaHelp} 
  onClose={() => setShowInstaHelp(false)}
/>

  {/* Invest Smartly Modal */}
<InvestSmart 
  visible={showInvestSmart} 
  onClose={() => setShowInvestSmart(false)}
/>

  {/* Deliveries Modal */}
<DeliveriesScreen 
  visible={showDeliveries} 
  onClose={handleCloseDeliveries}
/>

    {/* Visitors Modal */}
<VisitorsScreen 
  visible={showVisitors} 
  onClose={handleCloseVisitors}
/>

    {/* Invite Guest Modal */}
<InviteGuestModal 
  visible={showInviteGuest} 
  onClose={handleCloseInviteGuest}
  onSelectOption={handleSelectInviteOption}
/>

    {/* Allow Kid Exit Modal */}
<AllowKidExitModal 
  visible={showAllowKidExit} 
  onClose={handleCloseAllowKidExitFromSecurity}
/>

    {/* Allow Delivery Modal */}
<AllowDeliveryModal 
  visible={showAllowDelivery} 
  onClose={handleCloseAllowDelivery}
/>

    {/* Cab/Auto Modal */}
<CabAutoModal 
  visible={showCabAuto} 
  onClose={handleCloseCabAuto}
/>

    {/* Call Security Modal */}
<CallSecurityModal 
  visible={showCallSecurity} 
  onClose={handleCloseCallSecurity}
/>

    {/* Message Guard Modal */}
<MessageGuardModal 
  visible={showMessageGuard} 
  onClose={handleCloseMessageGuard}
/>

    {/* My Passes Modal */}
<MyPassesModal 
  visible={showMyPasses} 
  onClose={handleCloseMyPasses}
/>

    {/* Visiting Help Modal */}
<VisitingHelpModal 
  visible={showVisitingHelp} 
  onClose={handleCloseVisitingHelp}
/>

    {/* Classes Modal */}
<ClassesModal 
  visible={showClasses} 
  onClose={handleCloseClasses}
/>

    {/* Communications Modal */}
<CommunicationsModal 
  visible={showCommunications} 
  onClose={handleCloseCommunications}
/>

    {/* Find Daily Help Modal */}
<FindDailyHelpModal 
  visible={showFindDailyHelp} 
  onClose={handleCloseFindDailyHelp}
/>

    {/* Search Vehicle Modal */}
<SearchVehicleModal 
  visible={showSearchVehicle} 
  onClose={handleCloseSearchVehicle}
/>

    {/* Create Post Modal */}
<CreatePostModal 
  visible={showCreatePost} 
  onClose={handleCloseCreatePost}
/>

    {/* Create Poll Modal */}
<CreatePollModal 
  visible={showCreatePoll} 
  onClose={handleCloseCreatePoll}
/>

    {/* Host Event Modal */}
<HostEventModal 
  visible={showHostEvent} 
  onClose={handleCloseHostEvent}
/>

    {/* My Posts Modal */}
<MyPostsModal 
  visible={showMyPosts} 
  onClose={handleCloseMyPosts}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d3d2f',
  },
  adSupportedBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  adSupportedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
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
  profileButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  profileCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 80,
  },
  quickActionsSection: {
    marginBottom: 16,
  },
  quickActionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  customizeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0d7d5f',
  },
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
  moreQuickActionsSection: {
    marginBottom: 16,
  },
  adContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  adLabel: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
  },
  adContent: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  adTextSection: {
    flex: 1,
  },
  adMainText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888888',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  adHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E8743B',
    marginBottom: 10,
  },
  adCtaButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  adCtaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333333',
  },
  adImageSection: {
    width: '35%',
    height: 80,
    marginLeft: 8,
  },
  adImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
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
  noUpdatesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    paddingVertical: 28,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#999999',
  },
  todayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    gap: 4,
  },
  newPostText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d7d5f',
  },
  viewAllLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0d7d5f',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 2,
  },
  entryAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  entryName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  entryTime: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    color: '#999999',
    textAlign: 'center',
  },
  entryBadge: {
    marginTop: 12,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deliveryBadge: {
    backgroundColor: '#FFF3E0',
  },
  helpBadge: {
    backgroundColor: '#F5F5F5',
  },
  entryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  deliveryBadgeText: {
    color: '#FF9800',
  },
  helpBadgeText: {
    color: '#666666',
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
    color: '#1a1a1a',
  },
  headerSpacer: {
    width: 44,
  },
  searchBox: {
    height: 64,
    borderRadius: 26,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
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
  visitorRaiseAlertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D7D7D7',
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  visitorRaiseAlertText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#C61F2A',
  },
  quickSectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
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
    color: '#FF4444',
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
    color: '#0d7d5f',
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
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickTileLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: '#333333',
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
    backgroundColor: '#EEEEEE',
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
    color: '#1a1a1a',
  },
  adBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adBadgeText: {
    fontSize: 12,
    color: '#999999',
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
    backgroundColor: '#FFE5CC',
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
    color: '#333333',
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
    color: '#333333',
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
    color: '#333333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#0d7d5f',
    marginLeft: 4,
    fontWeight: '600',
  },
  societySecurityText: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 24,
  },
  raiseAlarmButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  raiseAlarmText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
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
    color: '#333333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#0d7d5f',
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
    color: '#999999',
    marginTop: 8,
  },
  customizeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'flex-end',
  },
  customizeSheet: {
    backgroundColor: '#F1EEEA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
    maxHeight: '92%',
  },
  customizeDragHandle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4C0BA',
    alignSelf: 'center',
    marginBottom: 8,
  },
  customizeCloseButton: {
    position: 'absolute',
    top: 10,
    right: 14,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  customizeTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
  },
  customizeSubtitle: {
    marginTop: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#4F4B45',
    textAlign: 'center',
    lineHeight: 20,
  },
  customizeScroll: {
    maxHeight: '68%',
  },
  customizeScrollContent: {
    paddingBottom: 6,
  },
  customizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  customizeItem: {
    width: '23%',
    marginBottom: 18,
    alignItems: 'center',
  },
  customizeIconBox: {
    width: 82,
    height: 82,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3DFD8',
  },
  customizeIconBoxSelected: {
    borderColor: '#0d3d2f',
    borderWidth: 2,
  },
  customizePinBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#506873',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F1EEEA',
  },
  customizeItemLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: '#212121',
    textAlign: 'center',
    fontWeight: '500',
  },
  customizeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 4,
  },
  customizeResetButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D5D1CA',
    backgroundColor: '#ECE9E4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  customizeResetText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#98A0A5',
  },
  customizeSaveButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#8C9AA0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  customizeSaveText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: '#EEEEEE',
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
    color: '#1a1a1a',
  },
  preApproveAdBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  preApproveAdBadgeText: {
    fontSize: 12,
    color: '#999999',
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  preApproveOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  preApproveFooterNote: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
  },
});