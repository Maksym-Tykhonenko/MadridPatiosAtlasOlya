import React, { useEffect, useState, useRef } from 'react';
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
  Animated,
  Easing,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
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
  BottomTabScreenProps<MainTabParamList, 'Random'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BG = require('../assets/madrid_intro_backdrop.png');
const INTRO_IMAGE = require('../assets/random_courtyard_gate.png');
const SHARE_ICON = require('../assets/share_place_icon.png');
const SAVE_ICON = require('../assets/save_place_icon.png');
const SAVE_ICON_ACTIVE = require('../assets/save_place_icon_active.png');

const { height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const isVerySmallScreen = height < 690;

type ScreenStage = 'intro' | 'result';

export default function RandomScreen(): React.JSX.Element {
  const tabBarHeight = useBottomTabBarHeight();

  const [stage, setStage] = useState<ScreenStage>('intro');
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [saved, setSaved] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    translateAnim.setValue(18);
    buttonAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 260,
        delay: 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetToFirstPage = () => {
    setStage('intro');
    setSelectedPlace(null);
    setSaved(false);
    setShowMap(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      resetToFirstPage();
      return () => {
        resetToFirstPage();
      };
    }, [])
  );

  useEffect(() => {
    animateIn();
  }, [stage, selectedPlace]);

  useEffect(() => {
    const loadSavedState = async () => {
      if (!selectedPlace) return;
      const current = await isPlaceSaved(selectedPlace.id);
      setSaved(current);
    };

    loadSavedState();
  }, [selectedPlace]);

  const handleReveal = async () => {
    const index = Math.floor(Math.random() * placesData.length);
    const place = placesData[index];

    setSelectedPlace(place);
    setShowMap(false);
    setStage('result');

    const current = await isPlaceSaved(place.id);
    setSaved(current);
  };

  const handleBackToIntro = () => {
    resetToFirstPage();
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

  const bottomSafeSpace = tabBarHeight + 60 + (isVerySmallScreen ? 14 : isSmallScreen ? 18 : 22);

  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        {stage === 'intro' ? (
          <Animated.View
            style={[
              styles.introWrap,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              },
            ]}
          >
            <View style={styles.headerCenter}>
              <View style={styles.titleBox}>
                <Text style={styles.headerTitle}>Surprise Courtyard</Text>
              </View>
            </View>

            <View
              style={[
                styles.introCenter,
                {
                  paddingBottom: bottomSafeSpace,
                },
              ]}
            >
              <Image source={INTRO_IMAGE} style={styles.introImage} resizeMode="contain" />

              <Text style={styles.introText}>Discover a Hidden Courtyard</Text>

              <Animated.View style={{ opacity: buttonAnim }}>
                <Pressable style={styles.primaryButton} onPress={handleReveal}>
                  <Text style={styles.primaryButtonText}>Reveal a Courtyard</Text>
                </Pressable>
              </Animated.View>
            </View>
          </Animated.View>
        ) : null}

        {stage === 'result' && selectedPlace ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingBottom: bottomSafeSpace,
              },
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              }}
            >
              <View style={styles.headerRow}>
                <View style={styles.titleBoxRow}>
                  <Text numberOfLines={1} style={styles.headerTitle}>
                    Surprise Courtyard
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.placeTitle}>{selectedPlace.title}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Image
                    source={selectedPlace.image}
                    style={styles.placeImage}
                    resizeMode="cover"
                  />

                  <Text style={styles.description}>{selectedPlace.description}</Text>

                  <Text style={styles.metaText}>
                    <Text style={styles.metaLabel}>Address:</Text> {selectedPlace.address}
                  </Text>

                  <Text style={styles.metaText}>
                    <Text style={styles.metaLabel}>Coordinates:</Text> {selectedPlace.latitude},{' '}
                    {selectedPlace.longitude}
                  </Text>

                  {showMap ? (
                    <View style={styles.mapContainer}>
                      <MapView
                        style={styles.map}
                        initialRegion={{
                          latitude: selectedPlace.latitude,
                          longitude: selectedPlace.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: selectedPlace.latitude,
                            longitude: selectedPlace.longitude,
                          }}
                          title={selectedPlace.title}
                          description={selectedPlace.address}
                        />
                      </MapView>
                    </View>
                  ) : null}

                  <View style={styles.actionsRow}>
                    <Pressable style={styles.iconButton} onPress={handleShare}>
                      <Image source={SHARE_ICON} style={styles.actionIcon} resizeMode="contain" />
                    </Pressable>

                    <Pressable
                      style={styles.mapButton}
                      onPress={() => setShowMap(prev => !prev)}
                    >
                      <Text style={styles.mapButtonText}>
                        {showMap ? 'Hide Map' : 'Open Map'}
                      </Text>
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

              <Animated.View
                style={[
                  styles.bottomButtonWrap,
                  {
                    opacity: buttonAnim,
                    transform: [
                      {
                        translateY: buttonAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [14, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Pressable style={styles.secondaryButton} onPress={handleReveal}>
                  <Text style={styles.secondaryButtonText}>Try Again</Text>
                </Pressable>

                <Pressable style={styles.backIntroButton} onPress={handleBackToIntro}>
                  <Text style={styles.backIntroButtonText}>Back</Text>
                </Pressable>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20140F',
  },
  overlay: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 42 : 58,
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
  },
  introWrap: {
    flex: 1,
  },
  headerCenter: {
    alignItems: 'center',
    marginTop: isVerySmallScreen ? 6 : isSmallScreen ? 8 : 14,
  },
  headerRow: {
    alignItems: 'center',
    marginTop: isVerySmallScreen ? 2 : isSmallScreen ? 4 : 8,
    marginBottom: isVerySmallScreen ? 12 : isSmallScreen ? 16 : 20,
  },
  titleBox: {
    minHeight: isVerySmallScreen ? 40 : isSmallScreen ? 42 : 44,
    paddingHorizontal: isVerySmallScreen ? 16 : isSmallScreen ? 18 : 22,
    borderRadius: 4,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBoxRow: {
    minHeight: isVerySmallScreen ? 40 : isSmallScreen ? 44 : 50,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
  },
  headerTitle: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 14 : isSmallScreen ? 15 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  introCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isVerySmallScreen ? 6 : isSmallScreen ? 10 : 20,
  },
  introImage: {
    width: isVerySmallScreen ? 210 : isSmallScreen ? 240 : 310,
    height: isVerySmallScreen ? 210 : isSmallScreen ? 240 : 320,
    marginBottom: isVerySmallScreen ? 14 : isSmallScreen ? 18 : 24,
  },
  introText: {
    color: '#F5E6D4',
    fontSize: isVerySmallScreen ? 14 : isSmallScreen ? 16 : 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: isVerySmallScreen ? 16 : isSmallScreen ? 20 : 26,
    paddingHorizontal: 20,
  },
  primaryButton: {
    minWidth: isVerySmallScreen ? 156 : isSmallScreen ? 170 : 194,
    height: isVerySmallScreen ? 44 : isSmallScreen ? 48 : 54,
    borderRadius: 6,
    backgroundColor: '#D0A01B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#8D5E05',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFF8EE',
    fontSize: isVerySmallScreen ? 14 : isSmallScreen ? 15 : 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 0,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#C9961A',
  },
  cardTop: {
    backgroundColor: '#7B5A00',
    paddingVertical: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 16,
    alignItems: 'center',
  },
  placeTitle: {
    color: '#FFF8EA',
    fontSize: isVerySmallScreen ? 16 : isSmallScreen ? 18 : 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardBody: {
    paddingHorizontal: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 16,
    paddingTop: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    paddingBottom: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
  },
  placeImage: {
    width: isVerySmallScreen ? 132 : isSmallScreen ? 150 : 180,
    height: isVerySmallScreen ? 88 : isSmallScreen ? 98 : 118,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
  },
  description: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 12 : 14,
    lineHeight: isVerySmallScreen ? 16 : isSmallScreen ? 18 : 21,
    marginBottom: 10,
  },
  metaText: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 12 : 14,
    lineHeight: isVerySmallScreen ? 16 : isSmallScreen ? 18 : 20,
    marginBottom: 4,
  },
  metaLabel: {
    fontWeight: '700',
  },
  mapContainer: {
    marginTop: 14,
    width: '100%',
    height: isVerySmallScreen ? 150 : isSmallScreen ? 180 : 220,
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
    marginTop: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: isVerySmallScreen ? 34 : isSmallScreen ? 36 : 40,
    height: isVerySmallScreen ? 34 : isSmallScreen ? 36 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: isVerySmallScreen ? 15 : isSmallScreen ? 16 : 18,
    height: isVerySmallScreen ? 15 : isSmallScreen ? 16 : 18,
  },
  mapButton: {
    minWidth: isVerySmallScreen ? 100 : isSmallScreen ? 114 : 128,
    height: isVerySmallScreen ? 34 : isSmallScreen ? 36 : 40,
    borderRadius: 20,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmallScreen ? 14 : 18,
    marginHorizontal: isVerySmallScreen ? 8 : 10,
  },
  mapButtonText: {
    color: '#2F1C14',
    fontSize: isVerySmallScreen ? 11.5 : isSmallScreen ? 12.5 : 14,
    fontWeight: '600',
  },
  bottomButtonWrap: {
    alignItems: 'center',
    marginTop: isVerySmallScreen ? 12 : isSmallScreen ? 16 : 18,
  },
  secondaryButton: {
    minWidth: isVerySmallScreen ? 156 : isSmallScreen ? 170 : 194,
    height: isVerySmallScreen ? 44 : isSmallScreen ? 48 : 54,
    borderRadius: 6,
    backgroundColor: '#D0A01B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: '#8D5E05',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#FFF8EE',
    fontSize: isVerySmallScreen ? 15 : isSmallScreen ? 16 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  backIntroButton: {
    marginTop: 10,
    minWidth: isVerySmallScreen ? 108 : isSmallScreen ? 120 : 132,
    height: isVerySmallScreen ? 38 : isSmallScreen ? 42 : 46,
    borderRadius: 6,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  backIntroButtonText: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 13 : isSmallScreen ? 14 : 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});