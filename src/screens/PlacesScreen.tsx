import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { placesData, type PlaceCategory, type PlaceItem } from '../data/placesData';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Places'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BG = require('../assets/madrid_intro_backdrop.png');

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const cardImageWidth = isSmallScreen ? width * 0.36 : width * 0.38;
const cardHeight = isSmallScreen ? 104 : 120;

export default function PlacesScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<'all' | PlaceCategory>('all');
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslateY = useRef(new Animated.Value(18)).current;

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return placesData;
    return placesData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const runListAnimation = () => {
    listOpacity.setValue(0);
    listTranslateY.setValue(18);

    Animated.parallel([
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(listTranslateY, {
        toValue: 0,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    runListAnimation();
  }, []);

  React.useEffect(() => {
    runListAnimation();
  }, [activeFilter]);

  const renderCard: ListRenderItem<PlaceItem> = ({ item, index }) => {
    const itemDelay = Math.min(index, 8) * 50;

    return (
      <AnimatedCard delay={itemDelay}>
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <View style={styles.cardRight}>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text numberOfLines={3} style={styles.cardDesc}>
              {item.description}
            </Text>

            <Pressable
              style={styles.openButton}
              onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
            >
              <Text style={styles.openText}>Open</Text>
            </Pressable>
          </View>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Courtyard Explorer</Text>
        </View>

        <View style={styles.filtersWrap}>
          <View style={styles.filters}>
            <FilterButton
              label="All"
              active={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
            />
            <FilterButton
              label="Royal Courtyards"
              active={activeFilter === 'royal'}
              onPress={() => setActiveFilter('royal')}
            />
            <FilterButton
              label="Historic Patios"
              active={activeFilter === 'historic'}
              onPress={() => setActiveFilter('historic')}
            />
            <FilterButton
              label="Hidden Passages"
              active={activeFilter === 'passage'}
              onPress={() => setActiveFilter('passage')}
            />
            <FilterButton
              label="Quiet Corners"
              active={activeFilter === 'quiet'}
              onPress={() => setActiveFilter('quiet')}
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.listAnimatedWrap,
            {
              opacity: listOpacity,
              transform: [{ translateY: listTranslateY }],
            },
          ]}
        >
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.filterBtn, active && styles.filterActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

function AnimatedCard({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 320,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY, scale]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A160F',
  },
  overlay: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 54 : 78,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    backgroundColor: '#D9C3A6',
    paddingHorizontal: isSmallScreen ? 18 : 20,
    paddingVertical: isSmallScreen ? 8 : 9,
    borderRadius: 6,
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '700',
    color: '#3A2316',
    textAlign: 'center',
  },
  filtersWrap: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  filters: {
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filterBtn: {
    backgroundColor: '#BCA792',
    paddingHorizontal: isSmallScreen ? 13 : 14,
    paddingVertical: isSmallScreen ? 7 : 8,
    borderRadius: 18,
    marginHorizontal: 4,
    marginBottom: 8,
    minHeight: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActive: {
    backgroundColor: '#C87BB5',
  },
  filterText: {
    fontSize: isSmallScreen ? 12 : 13,
    color: '#3A2316',
    fontWeight: '500',
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listAnimatedWrap: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: isSmallScreen ? 14 : 16,
    paddingTop: 30,
    paddingBottom: 200,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#C69214',
    minHeight: cardHeight,
  },
  image: {
    width: cardImageWidth,
    height: cardHeight,
  },
  cardRight: {
    flex: 1,
    backgroundColor: '#C69214',
    paddingHorizontal: isSmallScreen ? 9 : 10,
    paddingTop: isSmallScreen ? 8 : 10,
    paddingBottom: isSmallScreen ? 8 : 10,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: isSmallScreen ? 11 : 12,
    lineHeight: isSmallScreen ? 14 : 16,
    color: '#FFF5DD',
    marginTop: 5,
    paddingRight: 2,
  },
  openButton: {
    marginTop: 8,
    backgroundColor: '#E9D6B5',
    paddingVertical: isSmallScreen ? 6 : 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    minWidth: 78,
  },
  openText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A2316',
  },
});