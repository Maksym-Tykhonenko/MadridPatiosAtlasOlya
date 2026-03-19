import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Platform,
  Share,
  Animated,
  Easing,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { placesData, type PlaceItem } from '../data/placesData';
import {
  savePlace,
  isPlaceSaved,
  removeSavedPlace,
} from '../utils/savedPlacesStorage';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Map'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SHARE_ICON = require('../assets/share_place_icon.png');
const SAVE_ICON = require('../assets/save_place_icon.png');
const SAVE_ICON_ACTIVE = require('../assets/save_place_icon_active.png');

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;

const INITIAL_REGION: Region = {
  latitude: 40.4168,
  longitude: -3.7038,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export default function MapScreen({}: Props) {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [saved, setSaved] = useState(false);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.96)).current;
  const cardTranslateY = useRef(new Animated.Value(18)).current;

  const markers = useMemo(() => placesData, []);

  const animateCardIn = () => {
    overlayOpacity.setValue(0);
    cardOpacity.setValue(0);
    cardScale.setValue(0.96);
    cardTranslateY.setValue(18);

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeCard = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 160,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 160,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 0.96,
        duration: 160,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 12,
        duration: 160,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setSelectedPlace(null);
      }
    });
  };

  const handleMarkerPress = async (place: PlaceItem) => {
    setSelectedPlace(place);

    const currentSaved = await isPlaceSaved(place.id);
    setSaved(currentSaved);

    const nextRegion: Region = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 500);
    requestAnimationFrame(() => {
      animateCardIn();
    });
  };

  const handleZoom = (factor: number) => {
    const nextRegion: Region = {
      ...region,
      latitudeDelta: Math.max(0.002, Math.min(0.2, region.latitudeDelta * factor)),
      longitudeDelta: Math.max(0.002, Math.min(0.2, region.longitudeDelta * factor)),
    };

    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 250);
  };

  const handleRecenter = () => {
    if (selectedPlace) {
      const nextRegion: Region = {
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(nextRegion);
      mapRef.current?.animateToRegion(nextRegion, 400);
      return;
    }

    setRegion(INITIAL_REGION);
    mapRef.current?.animateToRegion(INITIAL_REGION, 400);
  };

  const handleShare = async () => {
    if (!selectedPlace) return;

    try {
      await Share.share({
        message: `${selectedPlace.title}\n${selectedPlace.address}\nCoordinates: ${selectedPlace.latitude}, ${selectedPlace.longitude}`,
      });
    } catch {}
  };

  const handleToggleSave = async () => {
    if (!selectedPlace) return;

    if (saved) {
      await removeSavedPlace(selectedPlace.id);
      setSaved(false);
      return;
    }

    await savePlace(selectedPlace);
    setSaved(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={(nextRegion) => setRegion(nextRegion)}
      >
        {markers.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.title}
            description={place.address}
            pinColor="#D66BBC"
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>

      <View style={styles.headerWrap}>
        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>Interactive Map</Text>
        </View>
      </View>

      <View style={styles.controlsWrap}>
        <Pressable style={styles.controlButton} onPress={() => handleZoom(0.65)}>
          <Text style={styles.controlText}>+</Text>
        </Pressable>

        <Pressable style={styles.controlButton} onPress={() => handleZoom(1.5)}>
          <Text style={styles.controlText}>−</Text>
        </Pressable>

        <Pressable style={styles.controlButton} onPress={handleRecenter}>
          <Text style={styles.controlText}>◎</Text>
        </Pressable>
      </View>

      {selectedPlace ? (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.modalOverlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <Pressable style={styles.backdropTap} onPress={closeCard} />

          <Animated.View
            style={[
              styles.cardWrap,
              {
                opacity: cardOpacity,
                transform: [{ translateY: cardTranslateY }, { scale: cardScale }],
              },
            ]}
          >
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text numberOfLines={2} style={styles.placeTitle}>
                  {selectedPlace.title}
                </Text>
              </View>

              <View style={styles.cardBody}>
                <Image source={selectedPlace.image} style={styles.placeImage} resizeMode="cover" />

                <Text numberOfLines={isSmallScreen ? 7 : 10} style={styles.description}>
                  {selectedPlace.description}
                </Text>

                <Text numberOfLines={2} style={styles.metaText}>
                  <Text style={styles.metaLabel}>Address:</Text> {selectedPlace.address}
                </Text>

                <Text style={styles.metaText}>
                  <Text style={styles.metaLabel}>Coordinates:</Text> {selectedPlace.latitude},{' '}
                  {selectedPlace.longitude}
                </Text>

                <View style={styles.actionsRow}>
                  <Pressable style={styles.iconButton} onPress={handleShare}>
                    <Image source={SHARE_ICON} style={styles.actionIcon} resizeMode="contain" />
                  </Pressable>

                  <Pressable style={styles.exitButton} onPress={closeCard}>
                    <Text style={styles.exitText}>Exit</Text>
                  </Pressable>

                  <Pressable style={styles.iconButton} onPress={handleToggleSave}>
                    <Image
                      source={saved ? SAVE_ICON_ACTIVE : SAVE_ICON}
                      style={styles.actionIcon}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20140F',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerWrap: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 76,
    left: 14,
    right: 14,
    alignItems: 'center',
  },
  titleBox: {
    minWidth: isSmallScreen ? 220 : 250,
    minHeight: isSmallScreen ? 46 : 50,
    backgroundColor: '#D8CABB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: '#2B1A14',
    fontSize: isSmallScreen ? 15 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  controlsWrap: {
    position: 'absolute',
    right: 12,
    top: isSmallScreen ? '38%' : '42%',
    alignItems: 'center',
  },
  controlButton: {
    width: isSmallScreen ? 40 : 44,
    height: isSmallScreen ? 40 : 44,
    borderRadius: 22,
    backgroundColor: 'rgba(216, 202, 187, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  controlText: {
    color: '#241610',
    fontSize: isSmallScreen ? 20 : 22,
    fontWeight: '700',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 12, 8, 0.35)',
  },
  cardWrap: {
    width: '100%',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#C9961A',
    maxWidth: 420,
    maxHeight: isSmallScreen ? height * 0.56 : height * 0.62,
  },
  cardTop: {
    backgroundColor: '#7B5A00',
    paddingVertical: isSmallScreen ? 12 : 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  placeTitle: {
    color: '#FFF8EA',
    fontSize: isSmallScreen ? 17 : 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardBody: {
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingTop: isSmallScreen ? 8 : 10,
    paddingBottom: isSmallScreen ? 10 : 12,
  },
  placeImage: {
    width: isSmallScreen ? 132 : 150,
    height: isSmallScreen ? 88 : 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#FFF6E8',
    fontSize: isSmallScreen ? 11 : 13,
    lineHeight: isSmallScreen ? 15 : 19,
    marginBottom: 8,
  },
  metaText: {
    color: '#FFF6E8',
    fontSize: isSmallScreen ? 11 : 13,
    lineHeight: isSmallScreen ? 15 : 18,
    marginBottom: 2,
  },
  metaLabel: {
    fontWeight: '700',
  },
  actionsRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconButton: {
    width: isSmallScreen ? 36 : 40,
    height: isSmallScreen ? 36 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: isSmallScreen ? 16 : 18,
    height: isSmallScreen ? 16 : 18,
  },
  exitButton: {
    minWidth: isSmallScreen ? 92 : 110,
    height: isSmallScreen ? 36 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isSmallScreen ? 16 : 20,
  },
  exitText: {
    color: '#2F1C14',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
  },
});