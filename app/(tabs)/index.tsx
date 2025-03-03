import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

interface CategoryOption {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

interface ListingItem {
  id: string;
  image: any;
  isFavorite: boolean;
  location: string;
  region: string;
  rating: number;
  nights: string;
  dateRange: string;
  price: string;
  guestFavorite: boolean;
}

const categoryOptions: CategoryOption[] = [
  { id: 'desert', name: 'Desert', icon: 'terrain' },
  { id: 'cabins', name: 'Cabins', icon: 'home' },
  { id: 'beachfront', name: 'Beachfront', icon: 'beach-access' },
  { id: 'treehouses', name: 'Treehouses', icon: 'park' },
  { id: 'lake', name: 'Lake', icon: 'water' },
];

const listingData: ListingItem[] = [
  {
    id: '1',
    image: require('@/assets/images/react-logo.png'), // Using an existing image as placeholder
    isFavorite: true,
    location: 'Yucca Valley, California',
    region: 'Near Mojave Desert',
    rating: 4.96,
    nights: '5 nights',
    dateRange: 'Jul 14 – 19',
    price: '$1,187',
    guestFavorite: true,
  },
  {
    id: '2',
    image: require('@/assets/images/splash-icon.png'), // Adding a second listing with a different image
    isFavorite: false,
    location: 'Joshua Tree, California',
    region: 'Desert views',
    rating: 4.92,
    nights: '4 nights',
    dateRange: 'Aug 10 – 14',
    price: '$945',
    guestFavorite: false,
  },
  {
    id: '3',
    image: require('@/assets/images/react-logo.png'),
    isFavorite: false,
    location: 'Palm Springs, California',
    region: 'Mountain view',
    rating: 4.85,
    nights: '7 nights',
    dateRange: 'Sep 5 – 12',
    price: '$1,450',
    guestFavorite: true,
  }
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [showTotalPrice, setShowTotalPrice] = useState(true);

  const CategoryItem = ({ item }: { item: CategoryOption }) => {
    // Custom icon components to better match Airbnb UI with emoji
    const renderIcon = () => {
      switch(item.id) {
        case 'desert':
          return (
            <View style={styles.customIcon}>
              <Text style={styles.emojiIcon}>🏜️</Text>
            </View>
          );
        case 'cabins':
          return (
            <View style={styles.customIcon}>
              <Text style={styles.emojiIcon}>🏠</Text>
            </View>
          );
        case 'beachfront':
          return (
            <View style={styles.customIcon}>
              <Text style={styles.emojiIcon}>🏖️</Text>
            </View>
          );
        case 'treehouses':
          return (
            <View style={styles.customIcon}>
              <Text style={styles.emojiIcon}>🌲</Text>
            </View>
          );
        case 'lake':
          return (
            <View style={styles.customIcon}>
              <Text style={styles.emojiIcon}>🌊</Text>
            </View>
          );
        default:
          return <MaterialIcons name={item.icon} size={24} color="#000" />;
      }
    };

    return (
      <View style={styles.categoryItem}>
        {renderIcon()}
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    );
  };

  // Create a house-like image with shapes
  const HouseImage = ({ style, color = '#80d8f7', isSecond = false, isThird = false }: 
    { style?: any, color?: string, isSecond?: boolean, isThird?: boolean }) => {
    
    if (isThird) {
      return (
        <View style={[styles.houseImageContainer, style, { backgroundColor: '#62B1F6' }]}>
          <View style={styles.houseImageContent}>
            <View style={styles.modernHouse}>
              <View style={styles.modernRoof} />
              <View style={styles.modernStructure}>
                <View style={styles.modernWindow} />
                <View style={[styles.modernWindow, {right: 10, top: 40, width: 40}]} />
                <View style={styles.modernDoor} />
              </View>
              <View style={styles.modernPool}>
                <View style={styles.water} />
              </View>
              <View style={styles.palmTree}>
                <View style={styles.trunk} />
                <View style={styles.leaves} />
              </View>
            </View>
          </View>
        </View>
      );
    }
    
    return (
      <View style={[styles.houseImageContainer, style, { backgroundColor: color }]}>
        {isSecond ? (
          // Second house design with arcs and grid
          <View style={styles.houseImageContent}>
            <View style={styles.gridContainer}>
              {/* Horizontal lines */}
              <View style={[styles.gridLine, { width: '100%', height: 1, top: '25%' }]} />
              <View style={[styles.gridLine, { width: '100%', height: 1, top: '50%' }]} />
              <View style={[styles.gridLine, { width: '100%', height: 1, top: '75%' }]} />
              
              {/* Vertical lines */}
              <View style={[styles.gridLine, { width: 1, height: '100%', left: '25%' }]} />
              <View style={[styles.gridLine, { width: 1, height: '100%', left: '50%' }]} />
              <View style={[styles.gridLine, { width: 1, height: '100%', left: '75%' }]} />
              
              <View style={styles.circlePattern}>
                <View style={[styles.arc, { top: '20%', width: '80%', height: 100 }]} />
                <View style={[styles.arc, { top: '35%', width: '60%', height: 80 }]} />
                <View style={[styles.arc, { top: '45%', width: '40%', height: 60 }]} />
              </View>
            </View>
          </View>
        ) : (
          // First house design - a cabin
          <View style={styles.houseImageContent}>
            <View style={styles.cabin}>
              <View style={styles.roof} />
              <View style={styles.house}>
                <View style={styles.door} />
                <View style={styles.window} />
                <View style={[styles.window, { right: '55%' }]} />
              </View>
              <View style={styles.porch} />
              <View style={styles.surroundings}>
                <View style={styles.tree} />
                <View style={[styles.tree, { right: -30, height: 40 }]} />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const ListingCard = ({ item }: { item: ListingItem }) => (
    <View style={styles.listingCard}>
      <View style={styles.imageContainer}>
        {/* Use custom house component instead of Image */}
        <HouseImage 
          style={styles.listingImage}
          isSecond={item.id === '2'}
          isThird={item.id === '3'}
          color={item.id === '1' ? '#80d8f7' : '#7FDBFF'}
        />
        {item.guestFavorite && (
          <View style={styles.guestFavoriteTag}>
            <Text style={styles.guestFavoriteText}>Guest favorite</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons 
            name={item.isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={item.isFavorite ? "#FF385C" : "#fff"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.listingDetails}>
        <View style={styles.locationRow}>
          <ThemedText type="defaultSemiBold">{item.location}</ThemedText>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#000" />
            <ThemedText>{item.rating}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.regionText}>{item.region}</ThemedText>
        <ThemedText>{item.nights} · {item.dateRange}</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.priceText}>{item.price} total before taxes</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000" />
          <View style={styles.searchTextContainer}>
            <Text style={styles.searchTitle}>Where to?</Text>
            <Text style={styles.searchSubtitle}>Anywhere · Any week · Add guests</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#000" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <FlatList
            data={categoryOptions}
            renderItem={({ item }) => <CategoryItem item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryList}
            contentContainerStyle={styles.categoryListContent}
          />
        </View>

        {/* Price Display Toggle */}
        <View style={styles.priceToggleContainer}>
          <View style={styles.priceToggleTextContainer}>
            <Text style={styles.priceToggleText}>Display total price</Text>
            <Text style={styles.priceToggleSubtext}>Includes all fees, before taxes</Text>
          </View>
          <TouchableOpacity 
            style={[styles.toggleButton, showTotalPrice && styles.toggleButtonActive]}
            onPress={() => setShowTotalPrice(!showTotalPrice)}
          >
            <View style={[styles.toggleKnob, showTotalPrice && styles.toggleKnobActive]} />
          </TouchableOpacity>
        </View>

        {/* Listings */}
        {listingData.map(item => (
          <ListingCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchSubtitle: {
    fontSize: 12,
    color: '#717171',
  },
  filterButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryList: {
    paddingVertical: 16,
  },
  categoryListContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  customIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  emojiIcon: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 8,
  },
  priceToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
  },
  priceToggleTextContainer: {
    flex: 1,
  },
  priceToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceToggleSubtext: {
    fontSize: 14,
    color: '#717171',
    marginTop: 4,
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#000',
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  listingCard: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 260,
    backgroundColor: '#f3f3f3',
    position: 'relative',
  },
  listingImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#80d8f7', // Light blue background for React logo to stand out
  },
  guestFavoriteTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  guestFavoriteText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'transparent',
  },
  listingDetails: {
    marginTop: 8,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  regionText: {
    color: '#717171',
    marginTop: 2,
  },
  priceText: {
    marginTop: 6,
  },
  houseImageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  houseImageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cabin: {
    width: '80%',
    height: '60%',
    alignItems: 'center',
    position: 'relative',
  },
  roof: {
    width: '100%',
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    marginBottom: -1,
  },
  house: {
    width: '80%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 4,
    position: 'relative',
  },
  door: {
    position: 'absolute',
    bottom: 0,
    left: '40%',
    width: '20%',
    height: '60%',
    backgroundColor: '#553300',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  window: {
    position: 'absolute',
    top: '20%',
    right: '20%',
    width: '15%',
    height: '25%',
    backgroundColor: '#ffdb99',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d4ae6a',
  },
  porch: {
    width: '100%',
    height: 10,
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 2,
  },
  surroundings: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tree: {
    position: 'absolute',
    bottom: -10,
    left: -40,
    width: 20,
    height: 60,
    backgroundColor: '#216e39',
    borderRadius: 20,
  },
  gridContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  circlePattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  arc: {
    position: 'absolute',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    alignSelf: 'center',
  },
  modernHouse: {
    width: '80%',
    height: '70%',
    position: 'relative',
  },
  modernRoof: {
    width: '70%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  modernStructure: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginTop: 5,
    position: 'relative',
  },
  modernWindow: {
    position: 'absolute',
    top: 20,
    right: 60,
    width: 30,
    height: 30,
    backgroundColor: '#62B1F6',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modernDoor: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: 30,
    height: 40,
    backgroundColor: '#333',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  modernPool: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    width: 80,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  water: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    backgroundColor: '#39c9fe',
    borderRadius: 20,
  },
  palmTree: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    height: 90,
    width: 40,
    alignItems: 'center',
  },
  trunk: {
    width: 8,
    height: 40,
    backgroundColor: '#A57164',
    position: 'absolute',
    bottom: 0,
  },
  leaves: {
    width: 40,
    height: 40,
    backgroundColor: '#2D9D43',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
  },
});
