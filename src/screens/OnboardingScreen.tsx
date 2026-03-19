import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const BG_IMAGE = require('../assets/madrid_intro_backdrop.png');
const PUERTA_SHADOW_SCENE = require('../assets/puerta_shadow_scene.png');
const COURTYARD_ROUTE_MAP = require('../assets/courtyard_route_map.png');
const CALLE_GLOW_PASSAGE = require('../assets/calle_glow_passage.png');
const CITY_SYMBOL_SET = require('../assets/city_symbol_set.png');
const EVENING_ARCHWAY_FRAME = require('../assets/evening_archway_frame.png');

const { width, height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const isSmallScreen = height < 750;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

type OnboardingItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  image: any;
};

export default function OnboardingScreen({ navigation }: Props) {
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(24)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.94)).current;

  const slides = useMemo<OnboardingItem[]>(
    () => [
      {
        id: 'courtyard-entry',
        title: 'Hidden Courtyards of Madrid',
        subtitle: 'Quiet spaces behind the facades',
        description:
          'Step past the busy streets and notice the smaller details: inner patios, old passageways, soft evening light, and corners that keep the city’s slower rhythm.',
        buttonLabel: 'Open the First Stop',
        image: PUERTA_SHADOW_SCENE,
      },
      {
        id: 'route-memory',
        title: 'Paths with a Story',
        subtitle: 'Routes shaped by memory and stone',
        description:
          'Wander through intimate streets, modest arches, and calm corners where architecture, local stories, and everyday city life quietly meet.',
        buttonLabel: 'See Hidden Routes',
        image: COURTYARD_ROUTE_MAP,
      },
      {
        id: 'street-observer',
        title: 'Recognize the Character of the City',
        subtitle: 'Observe, compare, and remember',
        description:
          'Train your eye to notice street details, building silhouettes, and familiar compositions that make Madrid feel distinctive without rushing through it.',
        buttonLabel: 'Explore the Challenge',
        image: CALLE_GLOW_PASSAGE,
      },
      {
        id: 'personal-walk',
        title: 'Build a Personal Walk',
        subtitle: 'Save places that match your mood',
        description:
          'Collect patios, facades, gateways, and favorite corners into your own route so every future walk feels more personal and thoughtfully chosen.',
        buttonLabel: 'Create My Route',
        image: CITY_SYMBOL_SET,
      },
      {
        id: 'city-atmosphere',
        title: 'A Softer Side of Madrid',
        subtitle: 'Warm lights, stone passages, evening calm',
        description:
          'See a quieter atmosphere of the city through hidden viewpoints and elegant historic corners that many visitors pass without noticing.',
        buttonLabel: 'Begin the Journey',
        image: EVENING_ARCHWAY_FRAME,
      },
    ],
    []
  );

  useEffect(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(24);
    imageScaleAnim.setValue(0.94);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 460,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, fadeAnim, translateAnim, imageScaleAnim]);

  const onNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
      return;
    }

    navigation.replace('MainTabs');
  };

  const onClose = () => {
   navigation.replace('MainTabs');
  };

  const renderItem: ListRenderItem<OnboardingItem> = ({ item, index }) => {
    const isActive = index === currentIndex;

    return (
      <View style={styles.slide}>
        <Animated.View
          style={[
            styles.contentWrap,
            isActive && {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            },
          ]}
        >
          <View style={styles.topArea}>
            <Animated.View
              style={[
                styles.heroImageWrap,
                isActive && {
                  transform: [{ scale: imageScaleAnim }],
                },
              ]}
            >
              <Image source={item.image} style={styles.heroImage} resizeMode="contain" />
            </Animated.View>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>

            <View style={styles.descriptionCard}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>

          <Pressable style={styles.mainButton} onPress={onNext}>
            <Text style={styles.mainButtonText}>{item.buttonLabel}</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>

        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={false}
          extraData={currentIndex}
        />

        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const isActive = index === currentIndex;
            return <View key={index} style={[styles.dot, isActive && styles.activeDot]} />;
          })}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A160F',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 10, 7, 0.12)',
  },
  closeButton: {
    position: 'absolute',
    top: isAndroid ? 82 : 62,
    left: 18,
    width: isSmallScreen ? 40 : 42,
    height: isSmallScreen ? 40 : 42,
    borderRadius: 21,
    backgroundColor: '#D59B1B',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  closeButtonText: {
    color: '#FFF7E7',
    fontSize: isSmallScreen ? 24 : 26,
    lineHeight: isSmallScreen ? 24 : 26,
    fontWeight: '300',
    marginTop: -2,
  },
  slide: {
    width,
    minHeight: height,
    paddingHorizontal: isSmallScreen ? 16 : 18,
  },
  contentWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: isSmallScreen ? 92 : 96,
    paddingBottom: isSmallScreen ? 118 : 120,
  },
  topArea: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isSmallScreen ? 12 : 18,
    marginTop: isSmallScreen ? 8 : 0,
  },
  heroImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: isSmallScreen ? width * 0.8 : width * 0.86,
    height: isSmallScreen ? height * 0.37 : height * 0.48,
    maxHeight: isSmallScreen ? 320 : 440,
  },
  textBlock: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 2 : 0,
  },
  title: {
    color: '#F8E6C9',
    fontSize: isSmallScreen ? 18 : 20,
    lineHeight: isSmallScreen ? 22 : 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: isSmallScreen ? 6 : 10,
  },
  subtitle: {
    marginTop: 6,
    color: '#D8BE97',
    fontSize: isSmallScreen ? 13 : 14,
    lineHeight: isSmallScreen ? 17 : 18,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: isSmallScreen ? 10 : 18,
  },
  descriptionCard: {
    width: '100%',
    marginTop: isSmallScreen ? 10 : 14,
    backgroundColor: 'rgba(38, 20, 14, 0.88)',
    borderRadius: 6,
    paddingHorizontal: isSmallScreen ? 14 : 16,
    paddingVertical: isSmallScreen ? 12 : 14,
  },
  description: {
    color: '#F2E5D3',
    fontSize: isSmallScreen ? 13 : 14,
    lineHeight: isSmallScreen ? 18 : 20,
    textAlign: 'center',
  },
  mainButton: {
    minWidth: isSmallScreen ? 144 : 132,
    height: isSmallScreen ? 36 : 32,
    marginTop: isSmallScreen ? 20 : 28,
    marginBottom: isAndroid ? 30 : 0,
    paddingHorizontal: 18,
    borderRadius: 4,
    backgroundColor: '#D9A321',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonText: {
    color: '#FFF8E8',
    fontSize: isSmallScreen ? 13 : 13,
    fontWeight: '700',
  },
  pagination: {
    position: 'absolute',
    bottom: isSmallScreen ? 28 : 44,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 238, 214, 0.35)',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 18,
    borderRadius: 5,
    backgroundColor: '#D9A321',
  },
});