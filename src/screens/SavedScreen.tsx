import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import type { PlaceItem } from '../data/placesData';
import { getSavedPlaces } from '../utils/savedPlacesStorage';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Saved'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BG = require('../assets/madrid_intro_backdrop.png');
const EMPTY_IMAGE = require('../assets/courtyard_route_map.png');

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const isVerySmallScreen = height < 690;

export default function SavedScreen({ navigation }: Props) {
  const [savedPlaces, setSavedPlaces] = useState<PlaceItem[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;

  const animateIn = useCallback(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(18);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  const loadSavedPlaces = useCallback(async () => {
    const data = await getSavedPlaces();
    setSavedPlaces(data);
    animateIn();
  }, [animateIn]);

  useFocusEffect(
    useCallback(() => {
      loadSavedPlaces();
    }, [loadSavedPlaces])
  );

  const emptyTitle = useMemo(() => 'You haven’t saved any courtyards yet.', []);
  const emptyText = useMemo(
    () => 'Explore Madrid’s hidden patios and keep the ones you’d like to visit later.',
    []
  );

  const renderItem = ({ item }: { item: PlaceItem }) => {
    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <View style={styles.cardRight}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {item.title}
          </Text>

          <Text numberOfLines={isVerySmallScreen ? 2 : isSmallScreen ? 3 : 3} style={styles.cardDesc}>
            {item.description}
          </Text>

          <Pressable
            style={styles.openButton}
            onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
          >
            <Text style={styles.openText}>Open</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.headerWrap,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Saved</Text>
          </View>
        </Animated.View>

        {savedPlaces.length === 0 ? (
          <Animated.View
            style={[
              styles.emptyWrap,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              },
            ]}
          >
            <Image source={EMPTY_IMAGE} style={styles.emptyImage} resizeMode="contain" />

            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
            <Text style={styles.emptyText}>{emptyText}</Text>

            <Pressable
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Places')}
            >
              <Text style={styles.exploreButtonText}>Explore Courtyards</Text>
            </Pressable>
          </Animated.View>
        ) : (
          <FlatList
            data={savedPlaces}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          />
        )}
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
    paddingTop: Platform.OS === 'android' ? 60 : 78,
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
  },
  headerWrap: {
    alignItems: 'center',
    marginBottom: isVerySmallScreen ? 16 : isSmallScreen ? 18 : 22,
  },
  header: {
    minHeight: isVerySmallScreen ? 40 : isSmallScreen ? 44 : 46,
    minWidth: isVerySmallScreen ? 180 : isSmallScreen ? 210 : 238,
    paddingHorizontal: isVerySmallScreen ? 18 : isSmallScreen ? 22 : 26,
    borderRadius: 4,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 15 : isSmallScreen ? 16 : 18,
    fontWeight: '700',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isVerySmallScreen ? 14 : isSmallScreen ? 18 : 24,
    paddingBottom: isVerySmallScreen ? 34 : isSmallScreen ? 46 : 60,
    marginTop: 20,
  },
  emptyImage: {
    width: isVerySmallScreen ? width * 0.56 : isSmallScreen ? width * 0.62 : width * 0.66,
    height: isVerySmallScreen ? 170 : isSmallScreen ? 220 : 280,
    marginBottom: isVerySmallScreen ? 12 : isSmallScreen ? 18 : 24,
  },
  emptyTitle: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 13.5 : isSmallScreen ? 15 : 18,
    lineHeight: isVerySmallScreen ? 20 : isSmallScreen ? 22 : 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    color: '#FFF6E8',
    fontSize: isVerySmallScreen ? 12.5 : isSmallScreen ? 14 : 16,
    lineHeight: isVerySmallScreen ? 18 : isSmallScreen ? 21 : 24,
    textAlign: 'center',
    marginBottom: isVerySmallScreen ? 18 : isSmallScreen ? 22 : 28,
    maxWidth: 310,
  },
  exploreButton: {
    minWidth: isVerySmallScreen ? 170 : isSmallScreen ? 188 : 214,
    height: isVerySmallScreen ? 44 : isSmallScreen ? 48 : 54,
    borderRadius: 6,
    backgroundColor: '#D0A01B',
    borderWidth: 1,
    borderColor: '#8D5E05',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  exploreButtonText: {
    color: '#FFF8EE',
    fontSize: isVerySmallScreen ? 14 : isSmallScreen ? 15 : 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: isVerySmallScreen ? 100 : 120,
    paddingTop: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#C9961A',
    minHeight: isVerySmallScreen ? 78 : isSmallScreen ? 84 : 92,
  },
  image: {
    width: isVerySmallScreen ? width * 0.29 : isSmallScreen ? width * 0.31 : width * 0.32,
    height: isVerySmallScreen ? 78 : isSmallScreen ? 84 : 92,
  },
  cardRight: {
    flex: 1,
    paddingHorizontal: isVerySmallScreen ? 7 : isSmallScreen ? 8 : 10,
    paddingTop: isVerySmallScreen ? 5 : isSmallScreen ? 6 : 7,
    paddingBottom: isVerySmallScreen ? 5 : isSmallScreen ? 6 : 7,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#FFF8EA',
    fontSize: isVerySmallScreen ? 11.5 : isSmallScreen ? 12 : 14,
    fontWeight: '700',
  },
  cardDesc: {
    color: '#FFF5DD',
    fontSize: isVerySmallScreen ? 9 : isSmallScreen ? 9.5 : 10.5,
    lineHeight: isVerySmallScreen ? 11.5 : isSmallScreen ? 12 : 14,
    marginTop: 2,
    marginBottom: 4,
  },
  openButton: {
    alignSelf: 'flex-start',
    minWidth: isVerySmallScreen ? 70 : isSmallScreen ? 76 : 86,
    height: isVerySmallScreen ? 26 : isSmallScreen ? 28 : 30,
    borderRadius: 16,
    backgroundColor: '#DCC7AA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  openText: {
    color: '#2F1C14',
    fontSize: isVerySmallScreen ? 10.5 : isSmallScreen ? 11 : 12,
    fontWeight: '600',
  },
});