import React, { useContext } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../../context/CartContext';
import FurnitureScreen from './Categories/Furniture';
import FoodScreen from './Categories/Food';
import ServicesScreen from './Categories/Services';
import HomeDecorScreen from './Categories/HomeDecor';
import ElectronicsScreen from './Categories/Electronics';
import VehiclesScreen from './Categories/Vehicles';
import KidsItemsScreen from './Categories/KidsItems';
import OthersScreen from './Categories/Others';

const categories = [
  { label: 'Furniture', count: '1.7K+', icon: 'bed-outline' },
  { label: 'Food', count: '250+', icon: 'restaurant-outline' },
  { label: 'Services', count: '150+', icon: 'reader-outline' },
  { label: 'Home Decor', count: '50+', icon: 'image-outline' },
  { label: 'Electronics', count: '750+', icon: 'hardware-chip-outline' },
  { label: 'Vehicles', count: '350+', icon: 'car-sport-outline' },
  { label: 'Kids Items', count: '400+', icon: 'happy-outline' },
  { label: 'Others', count: '450+', icon: 'document-text-outline' },
];

const listings = [
  {
    title: 'Washing Machine...',
    subtitle: 'Gera World of Joy, For...',
    price: '₹ 600',
    oldPrice: '₹ 1,200',
    image:
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mi Smart Tv',
    subtitle: 'Purva Silversands, M...',
    price: '₹ 11,000',
    oldPrice: '₹ 18,000',
    image:
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wooden Cabinet',
    subtitle: 'Tower 7, Block C...',
    price: '₹ 2,500',
    oldPrice: '₹ 4,500',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Study Table',
    subtitle: 'Maple Heights, A...',
    price: '₹ 1,800',
    oldPrice: '₹ 3,200',
    image:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
  },
];

const homesPreviewImages = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=700&q=80',
];

const homesAdImage =
  'https://images.unsplash.com/photo-1707684722616-9de40c88001f?auto=format&fit=crop&w=1600&q=80';

const popularCities = [
  'Bangalore',
  'Hyderabad',
  'Pune',
  'New Delhi',
  'Chennai',
  'Mumbai',
  'Secunderabad',
];

const nearbySocietyListings = [
  {
    id: '1',
    title: '2 BHK, Nyati Elan North-South',
    location: 'Wagholi, Pune',
    image:
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    title: '1 BHK, Nyati Elan North-South',
    location: 'Wagholi, Pune',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
  },
];

const propertyServices = [
  { id: '1', label: 'Property\nManagement', icon: 'home-outline' },
  { id: '2', label: 'Cleaning', icon: 'trash-outline' },
  { id: '3', label: 'Painting', icon: 'color-wand-outline' },
  { id: '4', label: 'Movers\n&\nPackers', icon: 'car-outline' },
  { id: '5', label: 'Pest\nControl', icon: 'bug-outline' },
  { id: '6', label: 'Rent\nAgreement', icon: 'document-text-outline' },
];

const testimonials = [
  {
    id: '1',
    name: 'Mandar Galwankar',
    meta: 'Owner • Bren Edgewaters, Bangalore',
    text:
      'MyGate Homes has been a revelation in itself. It is so secure and uncluttered, with no unwanted ads. It is posting process is a breeze with great user workflows and it adds...',
  },
  {
    id: '2',
    name: 'Rahul Deshpande',
    meta: 'Owner • Elan Society, Pune',
    text:
      'Great visibility and genuine leads. The platform is simple and fast for posting and managing my home listing in one place.',
  },
];

const defaultLocationTags = ['Electronic City', 'Whitefield', 'Sarjapura', 'Bellandur', 'HSR Layout'];

const popularLocations = [
  { id: '1', name: 'Whitefield', city: 'Bangalore' },
  { id: '2', name: 'Sarjapura', city: 'Bangalore' },
  { id: '3', name: 'Bellandur', city: 'Bangalore' },
  { id: '4', name: 'Electronic City', city: 'Bangalore' },
];

const propertyResults = [
  {
    id: 'pr-1',
    title: '2 BHK, Orchid Lake View',
    price: '₹ 60,000/m',
    meta: '1250 Sq ft  •  Fully Furnished',
    location: 'Belandur, Bengaluru',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pr-2',
    title: '3 BHK, Orchid Lake View',
    price: '₹ 85,000/m',
    meta: '1650 Sq ft  •  Semi Furnished',
    location: 'Bellandur, Bengaluru',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function BuySellScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showHomesScreen, setShowHomesScreen] = React.useState(false);
  const [showCitySelector, setShowCitySelector] = React.useState(false);
  const [selectedHomeTab, setSelectedHomeTab] = React.useState('Rent');
  const [selectedExploreTab, setSelectedExploreTab] = React.useState('Rent');
  const [selectedCity, setSelectedCity] = React.useState('Bangalore');
  const [draftCity, setDraftCity] = React.useState('Bangalore');
  const [isAdVisible, setIsAdVisible] = React.useState(true);
  const [showPostPropertyScreen, setShowPostPropertyScreen] = React.useState(false);
  const [listingType, setListingType] = React.useState('Sell');
  const [propertyName, setPropertyName] = React.useState('802 Nyati Elan North-South E...');
  const [moveInDate, setMoveInDate] = React.useState('');
  const [showLocationSearchScreen, setShowLocationSearchScreen] = React.useState(false);
  const [showPropertyResultsScreen, setShowPropertyResultsScreen] = React.useState(false);
  const [selectedLocationTags, setSelectedLocationTags] = React.useState(defaultLocationTags);
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();

  const toggleLocationTag = (locationName) => {
    setSelectedLocationTags((prevTags) => {
      if (prevTags.includes(locationName)) {
        return prevTags.filter((tag) => tag !== locationName);
      }
      return [...prevTags, locationName];
    });
  };

  const categoryNavigationMap = {
    'Furniture': FurnitureScreen,
    'Food': FoodScreen,
    'Services': ServicesScreen,
    'Home Decor': HomeDecorScreen,
    'Electronics': ElectronicsScreen,
    'Vehicles': VehiclesScreen,
    'Kids Items': KidsItemsScreen,
    'Others': OthersScreen,
  };

  // If a category is selected, show its screen
  if (selectedCategory) {
    const CategoryScreen = categoryNavigationMap[selectedCategory];
    return (
      <CategoryScreen
        navigation={{
          goBack: () => setSelectedCategory(null),
          navigate: navigation?.navigate,
        }}
      />
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Buy &amp; Sell</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
              <Ionicons name="pricetags-outline" size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topIconButton} activeOpacity={0.85}>
              <Ionicons name="bookmark-outline" size={24} color="#111111" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation?.navigate('Cart')} style={styles.topIconButton}>
              <View style={styles.cartIconContainer}>
                <Ionicons name="cart-outline" size={24} color="#111111" />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {isAdVisible ? (
          <View style={styles.topAdCard}>
            <Text style={styles.topAdTag}>AD</Text>
            <Image
              source={{ uri: homesAdImage }}
              style={styles.topAdImage}
              onError={() => setIsAdVisible(false)}
            />
          </View>
        ) : (
          <View style={styles.noAdCard}>
            <Text style={styles.noAdText}>Advertisement unavailable right now</Text>
          </View>
        )}

        <View style={styles.homesCard}>
          <View style={styles.homesHeader}>
            <View style={styles.homesTitleWrap}>
              <Ionicons name="home-outline" size={25} color="#0F2330" />
              <View style={styles.homesTitleTextWrap}>
                <Text style={styles.homesTitle}>Homes</Text>
                <Text style={styles.homesSubTitle}>List • Buy • Rent</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.exploreBtn}
              activeOpacity={0.85}
              onPress={() => setShowHomesScreen(true)}
            >
              <Text style={styles.exploreBtnText}>Explore</Text>
              <Ionicons name="chevron-forward" size={15} color="#0FA3E2" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.homesImageRow}
          >
            {homesPreviewImages.map((uri, index) => (
              <View key={`${uri}-${index}`} style={styles.homesImageCard}>
                <Image source={{ uri }} style={styles.homesImage} />
                {index === 1 && (
                  <View style={styles.homesOverlayStat}>
                    <Text style={styles.homesOverlayTitle}>500+</Text>
                    <Text style={styles.homesOverlayText}>New Listings</Text>
                    <Text style={styles.homesOverlayText}>This Week</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.85}
          onPress={() => setShowLocationSearchScreen(true)}
        >
          <Ionicons name="search-outline" size={24} color="#121212" />
          <Text style={styles.searchInput}>What are you looking for?</Text>
        </TouchableOpacity>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.label}
              style={styles.categoryItem}
              activeOpacity={0.85}
              onPress={() => setSelectedCategory(category.label)}
            >
              <View style={styles.categoryIconCard}>
                <Ionicons name={category.icon} size={34} color="#131313" />
              </View>
              <Text style={styles.categoryLabel}>{category.label}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.listingHeading}>Recent Listings</Text>
            <Text style={styles.listingCount}>4.3k+ listings</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton} activeOpacity={0.85}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={24} color="#123841" />
          </TouchableOpacity>
        </View>

        <View style={styles.listingsGrid}>
          {listings.map((item) => (
            <TouchableOpacity 
              key={item.title} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => navigation?.navigate('ProductDetails', { product: item })}
            >
              <View style={styles.productImageWrap}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>
              </View>
              <View style={styles.productTextBlock}>
                <Text numberOfLines={1} style={styles.productTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.productSubtitle}>
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Ionicons name="add" size={30} color="#151515" />
      </TouchableOpacity>

      <Modal visible={showHomesScreen} animationType="slide" onRequestClose={() => setShowHomesScreen(false)}>
        <SafeAreaView style={styles.homesSafeArea}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.homesContent}>
            <View style={styles.homesTopHeader}>
              <TouchableOpacity onPress={() => setShowHomesScreen(false)} activeOpacity={0.8}>
                <Ionicons name="arrow-back" size={30} color="#0F2330" />
              </TouchableOpacity>
              <Text style={styles.homesScreenTitle}>Homes</Text>
              <View style={styles.homesTopIcons}>
                <TouchableOpacity style={styles.homesIconButton} activeOpacity={0.85}>
                  <Ionicons name="pricetags-outline" size={24} color="#111111" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.homesIconButton} activeOpacity={0.85}>
                  <Ionicons name="bookmark-outline" size={24} color="#111111" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.homesIconButton} activeOpacity={0.85}>
                  <Ionicons name="chatbubble-outline" size={24} color="#111111" />
                </TouchableOpacity>
              </View>
            </View>

            {isAdVisible ? (
              <View style={styles.homesAdCard}>
                <Text style={styles.topAdTag}>AD</Text>
                <Image source={{ uri: homesAdImage }} style={styles.homesAdImage} onError={() => setIsAdVisible(false)} />
              </View>
            ) : (
              <View style={styles.noAdCard}>
                <Text style={styles.noAdText}>Advertisement unavailable right now</Text>
              </View>
            )}

            <View style={styles.rentBuyCard}>
              <View style={styles.rentBuyTabRow}>
                <TouchableOpacity
                  style={[styles.rentBuyTab, selectedHomeTab === 'Rent' && styles.rentBuyTabActive]}
                  onPress={() => setSelectedHomeTab('Rent')}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.rentBuyTabText, selectedHomeTab === 'Rent' && styles.rentBuyTabTextActive]}>Rent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.rentBuyTab, selectedHomeTab === 'Buy' && styles.rentBuyTabActive]}
                  onPress={() => setSelectedHomeTab('Buy')}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.rentBuyTabText, selectedHomeTab === 'Buy' && styles.rentBuyTabTextActive]}>Buy</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.exploreTabsRow}>
                {['Rent', 'Buy', 'Services'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.exploreTabItem, selectedExploreTab === tab && styles.exploreTabItemActive]}
                    activeOpacity={0.85}
                    onPress={() => setSelectedExploreTab(tab)}
                  >
                    <Text style={[styles.exploreTabText, selectedExploreTab === tab && styles.exploreTabTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {selectedExploreTab !== 'Services' && (
                <>
                  <View style={styles.findingInRow}>
                    <Text style={styles.findingInText}>Finding in </Text>
                    <TouchableOpacity
                      style={styles.cityChip}
                      activeOpacity={0.85}
                      onPress={() => {
                        setDraftCity(selectedCity);
                        setShowCitySelector(true);
                      }}
                    >
                      <Text style={styles.cityChipText}>{selectedCity}</Text>
                      <Ionicons name="chevron-down" size={18} color="#0F2330" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.homesSearchInputWrap}
                    activeOpacity={0.85}
                    onPress={() => setShowLocationSearchScreen(true)}
                  >
                    <Ionicons name="search-outline" size={34} color="#173A42" />
                    <Text style={styles.homesSearchPlaceholder}>Search for localities, projects, l...</Text>
                  </TouchableOpacity>

                  <Text style={styles.exploreListingText}>Explore from 50k+ listings</Text>
                </>
              )}
            </View>

            {selectedExploreTab !== 'Services' ? (
              <>
                <Text style={styles.nearbyTitle}>From Nearby Societies</Text>

                <View style={styles.nearbyGrid}>
                  {nearbySocietyListings.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.nearbyCard} activeOpacity={0.85}>
                      <Image source={{ uri: item.image }} style={styles.nearbyImage} />
                      <View style={styles.nearbyTextWrap}>
                        <Text numberOfLines={1} style={styles.nearbyName}>{item.title}</Text>
                        <Text style={styles.nearbyLocation}>{item.location}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.servicesTitle}>Property Services</Text>
                <View style={styles.servicesGrid}>
                  {propertyServices.map((service) => (
                    <TouchableOpacity key={service.id} style={styles.serviceItem} activeOpacity={0.85}>
                      <View style={styles.serviceIconCard}>
                        <Ionicons name={service.icon} size={34} color="#163C44" />
                      </View>
                      <Text style={styles.serviceLabel}>{service.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.testimonialTitle}>Testimonials</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.testimonialRow}>
                  {testimonials.map((item) => (
                    <View key={item.id} style={styles.testimonialCard}>
                      <View style={styles.testimonialHead}>
                        <View style={styles.testimonialAvatar}>
                          <Ionicons name="person-outline" size={22} color="#173A42" />
                        </View>
                        <View style={styles.testimonialMetaWrap}>
                          <Text style={styles.testimonialName}>{item.name}</Text>
                          <Text style={styles.testimonialMeta}>{item.meta}</Text>
                        </View>
                      </View>
                      <Text style={styles.testimonialQuote}>❝</Text>
                      <Text style={styles.testimonialText}>{item.text}</Text>
                      <Text style={styles.readMoreText}>Read more ↗</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.reviewCard}>
                  <Text style={styles.reviewText}>Be a voice & rate your society to help your potential Neighbors</Text>
                  <TouchableOpacity style={styles.reviewBtn} activeOpacity={0.85}>
                    <Text style={styles.reviewBtnText}>Review now</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.postPropertyFab} activeOpacity={0.9} onPress={() => setShowPostPropertyScreen(true)}>
            <Ionicons name="add" size={32} color="#151515" />
            <Text style={styles.postPropertyFabText}>Post Property</Text>
          </TouchableOpacity>

          <Modal
            visible={showPostPropertyScreen}
            animationType="slide"
            onRequestClose={() => setShowPostPropertyScreen(false)}
          >
            <SafeAreaView style={styles.postSafeArea}>
              <View style={styles.postHeader}>
                <TouchableOpacity onPress={() => setShowPostPropertyScreen(false)} activeOpacity={0.85}>
                  <Ionicons name="arrow-back" size={28} color="#173A42" />
                </TouchableOpacity>
                <Text style={styles.postHeaderTitle}>New Post</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={styles.postBody} contentContainerStyle={styles.postBodyContent}>
                <View style={styles.noteBox}>
                  <Ionicons name="information-circle" size={22} color="#2E73D4" />
                  <Text style={styles.noteText}>Please Note: Everyone living in the flat can view this listing</Text>
                </View>

                <View style={styles.editTitleWrap}>
                  <Text style={styles.editTitle}>Edit Listing Details</Text>
                  <View style={styles.editTitleUnderline} />
                </View>

                <Text style={styles.formLabel}>Select the property <Text style={styles.required}>*</Text></Text>
                <Text style={styles.formSubLabel}>Only properties added on MyGate can be listed</Text>
                <TouchableOpacity style={styles.formInput} activeOpacity={0.85}>
                  <Text style={styles.formInputText}>{propertyName}</Text>
                </TouchableOpacity>

                <Text style={styles.formLabel}>Select the listing type <Text style={styles.required}>*</Text></Text>
                <View style={styles.typeRow}>
                  <TouchableOpacity
                    style={[styles.typeBtn, listingType === 'Sell' && styles.typeBtnActive]}
                    onPress={() => setListingType('Sell')}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.typeBtnText, listingType === 'Sell' && styles.typeBtnTextActive]}>Sell</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.typeBtn, listingType === 'Rent Out' && styles.typeBtnActive]}
                    onPress={() => setListingType('Rent Out')}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.typeBtnText, listingType === 'Rent Out' && styles.typeBtnTextActive]}>Rent Out</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.formLabel}>Available from <Text style={styles.required}>*</Text></Text>
                <TouchableOpacity
                  style={styles.formInput}
                  onPress={() => setMoveInDate('12 May 2026')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.formInputText}>{moveInDate || 'Select move-in date'}</Text>
                  <Ionicons name="calendar-outline" size={26} color="#888888" />
                </TouchableOpacity>
              </ScrollView>

              <View style={styles.postFooter}>
                <TouchableOpacity
                  style={[styles.previewBtn, !moveInDate && styles.previewBtnDisabled]}
                  activeOpacity={0.85}
                  disabled={!moveInDate}
                >
                  <Text style={[styles.previewBtnText, !moveInDate && styles.previewBtnTextDisabled]}>Preview</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>

          <Modal
            visible={showCitySelector}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCitySelector(false)}
          >
            <View style={styles.cityPickerOverlay}>
              <View style={styles.cityPickerSheet}>
                <View style={styles.citySearchWrap}>
                  <Ionicons name="search-outline" size={32} color="#173A42" />
                  <Text style={styles.citySearchText}>Search for a City</Text>
                </View>

                <Text style={styles.popularCityTitle}>Popular Cities</Text>

                <View style={styles.cityGrid}>
                  {popularCities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={[styles.cityCard, draftCity === city && styles.cityCardSelected]}
                      onPress={() => setDraftCity(city)}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name="business-outline"
                        size={42}
                        color={draftCity === city ? '#173A42' : '#7D7D7D'}
                      />
                      <Text style={styles.cityName}>{city}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.cityPickerFooter}>
                  <TouchableOpacity
                    style={styles.cityCancelBtn}
                    activeOpacity={0.85}
                    onPress={() => setShowCitySelector(false)}
                  >
                    <Text style={styles.cityCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cityConfirmBtn}
                    activeOpacity={0.85}
                    onPress={() => {
                      setSelectedCity(draftCity);
                      setShowCitySelector(false);
                    }}
                  >
                    <Text style={styles.cityConfirmText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showLocationSearchScreen}
            animationType="slide"
            onRequestClose={() => setShowLocationSearchScreen(false)}
          >
            <SafeAreaView style={styles.locationSafeArea}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.locationContent}>
                <View style={styles.locationHeader}>
                  <TouchableOpacity onPress={() => setShowLocationSearchScreen(false)} activeOpacity={0.85}>
                    <Ionicons name="arrow-back" size={30} color="#173A42" />
                  </TouchableOpacity>
                  <Text style={styles.locationHeaderTitle}>Search for locations</Text>
                  <TouchableOpacity onPress={() => setShowLocationSearchScreen(false)} activeOpacity={0.85}>
                    <Ionicons name="close-circle" size={25} color="#C2C2C2" />
                  </TouchableOpacity>
                </View>

                <View style={styles.locationTagWrap}>
                  {selectedLocationTags.map((tag) => (
                    <View key={tag} style={styles.locationTagChip}>
                      <Text style={styles.locationTagText}>{tag}</Text>
                      <TouchableOpacity onPress={() => toggleLocationTag(tag)} activeOpacity={0.8}>
                        <Ionicons name="close" size={24} color="#173A42" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.locationSearchBtn, selectedLocationTags.length === 0 && styles.locationSearchBtnDisabled]}
                  activeOpacity={0.85}
                  disabled={selectedLocationTags.length === 0}
                  onPress={() => {
                    setShowLocationSearchScreen(false);
                    setShowPropertyResultsScreen(true);
                  }}
                >
                  <Text style={styles.locationSearchBtnText}>Search</Text>
                  <Ionicons name="arrow-forward" size={18} color="#173A42" />
                </TouchableOpacity>

                <Text style={styles.locationSectionTitle}>RECENT SEARCHES</Text>
                <View style={styles.recentSearchGrid}>
                  {popularLocations.map((item) => (
                    <TouchableOpacity
                      key={`recent-${item.id}`}
                      style={styles.recentSearchChip}
                      activeOpacity={0.85}
                      onPress={() => toggleLocationTag(item.name)}
                    >
                      <Ionicons name="refresh-circle-outline" size={24} color="#7D7D7D" />
                      <Text style={styles.recentSearchChipText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.locationSectionTitle, styles.popularSectionSpacing]}>POPULAR SEARCHES</Text>
                {popularLocations.map((item) => (
                  <TouchableOpacity
                    key={`popular-${item.id}`}
                    style={styles.popularRow}
                    activeOpacity={0.85}
                    onPress={() => toggleLocationTag(item.name)}
                  >
                    <Text style={styles.popularName}>{item.name}</Text>
                    <Text style={styles.popularCity}>{item.city}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.poweredByText}>Powered by MAPPLS | MapMyIndia</Text>
              </ScrollView>
            </SafeAreaView>
          </Modal>

          <Modal
            visible={showPropertyResultsScreen}
            animationType="slide"
            onRequestClose={() => setShowPropertyResultsScreen(false)}
          >
            <SafeAreaView style={styles.resultsSafeArea}>
              <View style={styles.resultsHeader}>
                <TouchableOpacity onPress={() => setShowPropertyResultsScreen(false)} activeOpacity={0.85}>
                  <Ionicons name="arrow-back" size={31} color="#173A42" />
                </TouchableOpacity>
                <Text style={styles.resultsHeaderTitle}>{selectedExploreTab}</Text>
                <View style={styles.resultsHeaderIcons}>
                  <TouchableOpacity style={styles.resultsIconBtn} activeOpacity={0.85}>
                    <Ionicons name="pricetags-outline" size={26} color="#111111" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.resultsIconBtn} activeOpacity={0.85}>
                    <Ionicons name="bookmark-outline" size={26} color="#111111" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.resultsFilterRow}>
                <Text style={styles.resultsCountText}>1000 properties found</Text>
                <View style={styles.resultsActionWrap}>
                  <TouchableOpacity style={styles.resultsActionCircle} activeOpacity={0.85}>
                    <Ionicons name="funnel-outline" size={25} color="#173A42" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.resultsActionCircle} activeOpacity={0.85}>
                    <Ionicons name="options-outline" size={25} color="#173A42" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsContent}>
                {propertyResults.map((item) => (
                  <TouchableOpacity key={item.id} style={styles.resultCard} activeOpacity={0.9}>
                    <Image source={{ uri: item.image }} style={styles.resultImage} />
                    <View style={styles.mygatePill}>
                      <Text style={styles.mygatePillText}>Mygate</Text>
                    </View>
                    <TouchableOpacity style={styles.resultBookmark} activeOpacity={0.85}>
                      <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.resultInfo}>
                      <View style={styles.resultTopRow}>
                        <Text style={styles.resultTitle}>{item.title}</Text>
                        <Text style={styles.resultPrice}>{item.price}</Text>
                      </View>
                      <Text style={styles.resultMeta}>{item.meta}</Text>
                      <View style={styles.resultDivider} />
                      <View style={styles.resultLocationRow}>
                        <Ionicons name="location-outline" size={21} color="#B1B1B1" />
                        <Text style={styles.resultLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#171717',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topIconButton: {
    marginLeft: 18,
  },
  searchBar: {
    height: 68,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 26,
    shadowColor: '#D9D1C3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  topAdCard: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#0F2330',
    marginBottom: 18,
    position: 'relative',
  },
  topAdTag: {
    position: 'absolute',
    top: 10,
    left: 12,
    zIndex: 2,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  topAdImage: {
    width: '100%',
    height: 150,
  },
  noAdCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E9E3D9',
  },
  noAdText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  homesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },
  homesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  homesTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homesTitleTextWrap: {
    marginLeft: 10,
  },
  homesTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#101010',
    lineHeight: 48,
  },
  homesSubTitle: {
    fontSize: 13,
    color: '#4A4A4A',
    marginTop: 2,
  },
  exploreBtn: {
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0FA3E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  exploreBtnText: {
    fontSize: 15,
    color: '#0FA3E2',
    fontWeight: '800',
    marginRight: 4,
  },
  homesImageRow: {
    paddingVertical: 4,
  },
  homesImageCard: {
    width: 110,
    height: 110,
    borderRadius: 22,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: '#ECECEC',
  },
  homesImage: {
    width: '100%',
    height: '100%',
  },
  homesOverlayStat: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homesOverlayTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 36,
  },
  homesOverlayText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    color: '#222222',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  categoryItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 22,
  },
  categoryIconCard: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#D7CFC2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191919',
    textAlign: 'center',
  },
  categoryCount: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '500',
    color: '#7E7E7E',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    flex: 1,
  },
  listingHeading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#171717',
    marginRight: 10,
  },
  listingCount: {
    fontSize: 15,
    color: '#242424',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  seeAllText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123841',
  },
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 22,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  productImageWrap: {
    height: 220,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(40,40,40,0.88)',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  productTextBlock: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#787878',
  },
  fab: {
    position: 'absolute',
    right: 28,
    bottom: 92,
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFD900',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D4B900',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 8,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  homesSafeArea: {
    flex: 1,
    backgroundColor: '#F5F1E8',
  },
  homesContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 140,
  },
  homesTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  homesScreenTitle: {
    marginLeft: 12,
    flex: 1,
    fontSize: 26,
    fontWeight: '800',
    color: '#171717',
  },
  homesTopIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homesIconButton: {
    marginLeft: 16,
  },
  homesAdCard: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#0F2330',
    marginBottom: 16,
    position: 'relative',
  },
  homesAdImage: {
    width: '100%',
    height: 160,
  },
  rentBuyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#D8D0C2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },
  rentBuyTabRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  rentBuyTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  rentBuyTabActive: {
    borderBottomColor: '#0F3A42',
  },
  rentBuyTabText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '600',
  },
  rentBuyTabTextActive: {
    color: '#101010',
    fontWeight: '800',
  },
  exploreTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  exploreTabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  exploreTabItemActive: {
    borderBottomColor: '#0F3A42',
  },
  exploreTabText: {
    color: '#909090',
    fontSize: 14,
    fontWeight: '600',
  },
  exploreTabTextActive: {
    color: '#111111',
    fontWeight: '800',
  },
  findingInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  findingInText: {
    fontSize: 18,
    color: '#777777',
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF1F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cityChipText: {
    fontSize: 18,
    color: '#173A42',
    fontWeight: '800',
    marginRight: 2,
  },
  homesSearchInputWrap: {
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  homesSearchPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
    color: '#8A8A8A',
    flex: 1,
  },
  exploreListingText: {
    marginTop: 12,
    marginLeft: 6,
    fontSize: 15,
    color: '#7E7E7E',
  },
  nearbyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 12,
  },
  nearbyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nearbyCard: {
    width: '48%',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  nearbyImage: {
    width: '100%',
    height: 210,
  },
  nearbyTextWrap: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  nearbyName: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '800',
  },
  nearbyLocation: {
    marginTop: 2,
    fontSize: 16,
    color: '#3C3C3C',
  },
  postPropertyFab: {
    position: 'absolute',
    right: 18,
    bottom: 92,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFD900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    shadowColor: '#D4B900',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 8,
  },
  postPropertyFabText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#151515',
    fontWeight: '800',
  },
  cityPickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    justifyContent: 'flex-end',
  },
  cityPickerSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 16,
    minHeight: '68%',
  },
  citySearchWrap: {
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  citySearchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#8A8A8A',
  },
  popularCityTitle: {
    fontSize: 18,
    color: '#303030',
    fontWeight: '800',
    marginBottom: 12,
  },
  cityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '31.5%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 10,
    minHeight: 128,
  },
  cityCardSelected: {
    borderColor: '#173A42',
    borderWidth: 2,
    backgroundColor: '#F7FBFC',
  },
  cityName: {
    marginTop: 8,
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
  },
  cityPickerFooter: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cityCancelBtn: {
    width: '47.5%',
    height: 64,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#BFBFBF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cityConfirmBtn: {
    width: '47.5%',
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE000',
  },
  cityCancelText: {
    fontSize: 18,
    color: '#173A42',
    fontWeight: '700',
  },
  cityConfirmText: {
    fontSize: 18,
    color: '#151515',
    fontWeight: '800',
  },
  servicesTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 14,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  serviceItem: {
    width: '25%',
    marginBottom: 18,
    alignItems: 'center',
  },
  serviceIconCard: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#242424',
    lineHeight: 16,
  },
  testimonialTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 12,
  },
  testimonialRow: {
    paddingBottom: 14,
  },
  testimonialCard: {
    width: 340,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginRight: 14,
  },
  testimonialHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EDF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  testimonialMetaWrap: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#161616',
  },
  testimonialMeta: {
    fontSize: 14,
    color: '#4E4E4E',
    marginTop: 1,
  },
  testimonialQuote: {
    fontSize: 44,
    color: '#F5D400',
    lineHeight: 36,
  },
  testimonialText: {
    fontSize: 16,
    color: '#242424',
    lineHeight: 26,
  },
  readMoreText: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
    color: '#131313',
  },
  reviewCard: {
    marginTop: 8,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
  },
  reviewText: {
    width: '72%',
    fontSize: 18,
    lineHeight: 30,
    color: '#131313',
    fontWeight: '700',
  },
  reviewBtn: {
    marginTop: 14,
    alignSelf: 'flex-start',
    backgroundColor: '#FFD900',
    borderRadius: 14,
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  reviewBtnText: {
    fontSize: 18,
    color: '#171717',
    fontWeight: '800',
  },
  postSafeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  postHeader: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  postHeaderTitle: {
    fontSize: 34,
    color: '#151515',
    fontWeight: '700',
  },
  postBody: {
    flex: 1,
  },
  postBodyContent: {
    paddingBottom: 120,
  },
  noteBox: {
    backgroundColor: '#DCE8F8',
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#151515',
    lineHeight: 22,
  },
  editTitleWrap: {
    marginTop: 12,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  editTitle: {
    fontSize: 20,
    color: '#3A3A3A',
    fontWeight: '700',
  },
  editTitleUnderline: {
    marginTop: 4,
    width: 80,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#173A42',
  },
  formLabel: {
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: 18,
    fontSize: 20,
    color: '#111111',
    fontWeight: '700',
  },
  required: {
    color: '#D84545',
  },
  formSubLabel: {
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#7A7A7A',
  },
  formInput: {
    marginTop: 10,
    marginHorizontal: 18,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formInputText: {
    fontSize: 16,
    color: '#8A8A8A',
    flex: 1,
  },
  typeRow: {
    marginTop: 10,
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeBtn: {
    width: '48.5%',
    height: 58,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBtnActive: {
    borderColor: '#173A42',
    backgroundColor: '#EEF6F8',
  },
  typeBtnText: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  typeBtnTextActive: {
    color: '#173A42',
    fontWeight: '800',
  },
  postFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  previewBtn: {
    height: 66,
    borderRadius: 18,
    backgroundColor: '#FFE000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBtnDisabled: {
    backgroundColor: '#F0E693',
  },
  previewBtnText: {
    fontSize: 20,
    color: '#1C1C1C',
    fontWeight: '800',
  },
  previewBtnTextDisabled: {
    color: '#A8A8A8',
  },
  locationSafeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  locationContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locationHeaderTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 30,
    fontWeight: '500',
    color: '#595959',
  },
  locationTagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  locationTagChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#173A42',
    borderRadius: 34,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  locationTagText: {
    fontSize: 15,
    color: '#131313',
    fontWeight: '600',
    marginRight: 8,
  },
  locationSearchBtn: {
    marginTop: 4,
    marginBottom: 14,
    width: 150,
    height: 45,
    borderRadius: 18,
    backgroundColor: '#FFE100',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  locationSearchBtnDisabled: {
    backgroundColor: '#F0E693',
  },
  locationSearchBtnText: {
    fontSize: 28,
    color: '#173A42',
    fontWeight: '700',
    marginRight: 12,
  },
  locationSectionTitle: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    fontSize: 15,
    color: '#1B1B1B',
    fontWeight: '800',
    marginBottom: 12,
  },
  recentSearchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recentSearchChip: {
    width: '45.8%',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 30,
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  recentSearchChipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#212121',
    fontWeight: '600',
  },
  popularSectionSpacing: {
    marginTop: 6,
  },
  popularRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  popularName: {
    fontSize: 18,
    color: '#171717',
    fontWeight: '500',
  },
  popularCity: {
    fontSize: 15,
    color: '#4E4E4E',
    marginTop: 2,
  },
  poweredByText: {
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 10,
    color: '#8B8B8B',
    fontWeight: '600',
  },
  resultsSafeArea: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  resultsHeader: {
    height: 72,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  resultsHeaderTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 30,
    color: '#161616',
    fontWeight: '700',
  },
  resultsHeaderIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsIconBtn: {
    marginLeft: 16,
  },
  resultsFilterRow: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsCountText: {
    fontSize: 16,
    color: '#1B1B1B',
    fontWeight: '500',
  },
  resultsActionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsActionCircle: {
    width: 40,
    height: 40,
    borderRadius: 26,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  resultsContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  resultCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 16,
  },
  resultImage: {
    width: '100%',
    height: 200,
  },
  mygatePill: {
    position: 'absolute',
    top: 12,
    left: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.88)',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  mygatePillText: {
    fontSize: 12,
    color: '#101010',
    fontWeight: '700',
  },
  resultBookmark: {
    position: 'absolute',
    right: 16,
    top: 180,
    width: 35,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  resultTitle: {
    flex: 1,
    fontSize: 18,
    color: '#272727',
    fontWeight: '700',
    marginRight: 8,
  },
  resultPrice: {
    fontSize: 15,
    color: '#2E2E2E',
    fontWeight: '700',
  },
  resultMeta: {
    marginTop: 8,
    fontSize: 12,
    color: '#505050',
  },
  resultDivider: {
    marginTop: 10,
    height: 1,
    backgroundColor: '#E4E4E4',
  },
  resultLocationRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLocation: {
    marginLeft: 6,
    fontSize: 12,
    color: '#555555',
    fontWeight: '500',
  },
});
