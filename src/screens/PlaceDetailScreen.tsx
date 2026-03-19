import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
  Share,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { placesData } from '../data/placesData';
import {
  savePlace,
  isPlaceSaved,
  removeSavedPlace,
} from '../utils/savedPlacesStorage';

const BG = require('../assets/madrid_intro_backdrop.png');
const SHARE_ICON = require('../assets/share_place_icon.png');
const SAVE_ICON = require('../assets/save_place_icon.png');
const SAVE_ICON_ACTIVE = require('../assets/save_place_icon_active.png');

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const isVerySmallScreen = height < 690;

export default function PlaceDetailScreen({ route, navigation }: Props) {
  const [showMap, setShowMap] = useState(false);
  const [saved, setSaved] = useState(false);

  const place = useMemo(
    () => placesData.find((item) => item.id === route.params.placeId),
    [route.params.placeId]
  );

  useEffect(() => {
    const loadState = async () => {
      if (!place) return;
      const current = await isPlaceSaved(place.id);
      setSaved(current);
    };

    loadState();
  }, [place]);

  if (!place) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Place not found.</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.title}\n${place.address}\nCoordinates: ${place.latitude}, ${place.longitude}`,
      });
    } catch {}
  };

  const handleToggleSave = async () => {
    if (saved) {
      await removeSavedPlace(place.id);
      setSaved(false);
      return;
    }

    await savePlace(place);
    setSaved(true);
  };

  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </Pressable>

          <View style={styles.titleBox}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              Courtyard Explorer
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.placeTitle}>{place.title}</Text>
          </View>

          <View style={styles.cardBody}>
            <Image source={place.image} style={styles.placeImage} resizeMode="cover" />

            <Text style={styles.description}>{place.description}</Text>

            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Address:</Text> {place.address}
            </Text>

            <Text style={styles.metaText}>
              <Text style={styles.metaLabel}>Coordinates:</Text> {place.latitude}, {place.longitude}
            </Text>

            {showMap ? (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                    }}
                    title={place.title}
                    description={place.address}
                  />
                </MapView>
              </View>
            ) : null}

            <View style={styles.actionsRow}>
              <Pressable style={styles.iconButton} onPress={handleShare}>
                <Image source={SHARE_ICON} style={styles.actionIcon} resizeMode="contain" />
              </Pressable>

              <Pressable style={styles.mapButton} onPress={() => setShowMap(prev => !prev)}>
                <Text style={styles.mapButtonText}>{showMap ? 'Hide Map' : 'Open Map'}</Text>
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
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20140F',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 36 : 58,
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 16 : 22,
    paddingBottom: isVerySmallScreen ? 120 : isSmallScreen ? 138 : 150,
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: '#20140F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isVerySmallScreen ? 14 : isSmallScreen ? 18 : 22,
  },
  backButton: {
    width: isVerySmallScreen ? 44 : isSmallScreen ? 50 : 56,
    height: isVerySmallScreen ? 40 : isSmallScreen ? 46 : 50,
    borderRadius: 4,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: isVerySmallScreen ? 8 : 10,
  },
  backText: {
    color: '#241610',
    fontSize: isVerySmallScreen ? 24 : isSmallScreen ? 27 : 30,
    lineHeight: isVerySmallScreen ? 24 : isSmallScreen ? 27 : 30,
    marginTop: -2,
  },
  titleBox: {
    flex: 1,
    minHeight: isVerySmallScreen ? 40 : isSmallScreen ? 46 : 50,
    backgroundColor: '#D8CABB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmallScreen ? 10 : 14,
  },
  headerTitle: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 14 : isSmallScreen ? 16 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#C9961A',
  },
  cardTop: {
    backgroundColor: '#7B5A00',
    paddingVertical: isVerySmallScreen ? 12 : isSmallScreen ? 15 : 18,
    paddingHorizontal: isVerySmallScreen ? 12 : 16,
    alignItems: 'center',
  },
  placeTitle: {
    color: '#FFF8EA',
    fontSize: isVerySmallScreen ? 17 : isSmallScreen ? 19 : 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardBody: {
    paddingHorizontal: isVerySmallScreen ? 10 : isSmallScreen ? 14 : 16,
    paddingTop: isVerySmallScreen ? 10 : 12,
    paddingBottom: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 10,
  },
  placeImage: {
    width: isVerySmallScreen ? Math.min(width * 0.48, 150) : isSmallScreen ? 176 : 180,
    height: isVerySmallScreen ? 94 : isSmallScreen ? 116 : 118,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: isVerySmallScreen ? 10 : 14,
  },
  description: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 13 : 14,
    lineHeight: isVerySmallScreen ? 16 : isSmallScreen ? 19 : 21,
    marginBottom: isVerySmallScreen ? 8 : 10,
  },
  metaText: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 13 : 14,
    lineHeight: isVerySmallScreen ? 16 : 20,
    marginBottom: 3,
  },
  metaLabel: {
    fontWeight: '700',
  },
  mapContainer: {
    marginTop: isVerySmallScreen ? 12 : 16,
    width: '100%',
    height: isVerySmallScreen ? 170 : isSmallScreen ? 210 : 240,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  actionsRow: {
    marginTop: isVerySmallScreen ? 12 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: isVerySmallScreen ? 34 : 40,
    height: isVerySmallScreen ? 34 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: isVerySmallScreen ? 15 : 18,
    height: isVerySmallScreen ? 15 : 18,
  },
  mapButton: {
    minWidth: isVerySmallScreen ? 104 : isSmallScreen ? 118 : 128,
    height: isVerySmallScreen ? 34 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmallScreen ? 14 : 20,
    marginHorizontal: isVerySmallScreen ? 8 : 10,
  },
  mapButtonText: {
    color: '#2F1C14',
    fontSize: isVerySmallScreen ? 12 : isSmallScreen ? 13 : 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});