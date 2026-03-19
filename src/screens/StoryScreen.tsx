import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { ListRenderItem } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { storyData, type StoryCategory, type StoryItem } from '../data/storyData';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Story'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BG = require('../assets/madrid_intro_backdrop.png');

const { height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const isVerySmallScreen = height < 690;

type FilterType = 'all' | StoryCategory;

export default function StoryScreen(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [openedStory, setOpenedStory] = useState<StoryItem | null>(null);

  const listOpacity = useRef(new Animated.Value(0)).current;
  const listTranslate = useRef(new Animated.Value(18)).current;

  const detailOpacity = useRef(new Animated.Value(0)).current;
  const detailTranslate = useRef(new Animated.Value(20)).current;

  const filteredStories = useMemo(() => {
    if (activeFilter === 'all') return storyData;
    return storyData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const resetToFirstPage = () => {
    setActiveFilter('all');
    setOpenedStory(null);
  };

  const runListAnimation = () => {
    listOpacity.setValue(0);
    listTranslate.setValue(18);

    Animated.parallel([
      Animated.timing(listOpacity, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(listTranslate, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const runDetailAnimation = () => {
    detailOpacity.setValue(0);
    detailTranslate.setValue(20);

    Animated.parallel([
      Animated.timing(detailOpacity, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(detailTranslate, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      resetToFirstPage();
      runListAnimation();

      return () => {
        resetToFirstPage();
      };
    }, [])
  );

  useEffect(() => {
    if (!openedStory) {
      runListAnimation();
    }
  }, [activeFilter, openedStory]);

  const handleFilterPress = (filter: FilterType) => {
    setActiveFilter(filter);
    setOpenedStory(null);
  };

  const handleOpenStory = (story: StoryItem) => {
    setOpenedStory(story);
    requestAnimationFrame(() => {
      runDetailAnimation();
    });
  };

  const handleBackToList = () => {
    setOpenedStory(null);
  };

  const renderItem: ListRenderItem<StoryItem> = ({ item, index }) => {
    const opacity = new Animated.Value(0);
    const translateY = new Animated.Value(16);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        delay: Math.min(index, 8) * 45,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        delay: Math.min(index, 8) * 45,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    return (
      <Animated.View
        style={[
          styles.itemAnimatedWrap,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Pressable style={styles.storyCard} onPress={() => handleOpenStory(item)}>
          <View style={styles.storyCardHeader}>
            <Text numberOfLines={2} style={styles.storyCardTitle}>
              {item.title}
            </Text>
          </View>

          <View style={styles.storyCardBody}>
            <Text numberOfLines={isVerySmallScreen ? 5 : 7} style={styles.storyPreview}>
              {item.content}
            </Text>

            <View style={styles.readButton}>
              <Text style={styles.readButtonText}>Read Story</Text>
            </View>
          </View>
        </Pressable>
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
              opacity: listOpacity,
              transform: [{ translateY: listTranslate }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Stories of Madrid</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.filtersWrap,
            {
              opacity: listOpacity,
              transform: [{ translateY: listTranslate }],
            },
          ]}
        >
          <View style={styles.filters}>
            <FilterButton
              label="All"
              active={activeFilter === 'all'}
              onPress={() => handleFilterPress('all')}
            />
            <FilterButton
              label="Legends"
              active={activeFilter === 'legends'}
              onPress={() => handleFilterPress('legends')}
            />
            <FilterButton
              label="Architecture"
              active={activeFilter === 'architecture'}
              onPress={() => handleFilterPress('architecture')}
            />
            <FilterButton
              label="Secret Corners"
              active={activeFilter === 'corners'}
              onPress={() => handleFilterPress('corners')}
            />
            <FilterButton
              label="History"
              active={activeFilter === 'history'}
              onPress={() => handleFilterPress('history')}
            />
          </View>
        </Animated.View>

        {openedStory ? (
          <ScrollView
            contentContainerStyle={styles.detailScrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <Animated.View
              style={[
                styles.detailWrap,
                {
                  opacity: detailOpacity,
                  transform: [{ translateY: detailTranslate }],
                },
              ]}
            >
              <Pressable style={styles.inlineBackButton} onPress={handleBackToList}>
                <Text style={styles.inlineBackText}>← Back to stories</Text>
              </Pressable>

              <View style={styles.articleCard}>
                <View style={styles.articleHeader}>
                  <Text style={styles.articleTitle}>{openedStory.title}</Text>
                </View>

                <View style={styles.articleBody}>
                  <Text style={styles.articleText}>{openedStory.content}</Text>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        ) : (
          <Animated.View
            style={[
              styles.listWrap,
              {
                opacity: listOpacity,
                transform: [{ translateY: listTranslate }],
              },
            ]}
          >
            <FlatList
              data={filteredStories}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          </Animated.View>
        )}
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
}): React.JSX.Element {
  return (
    <Pressable onPress={onPress} style={[styles.filterBtn, active && styles.filterBtnActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20140F',
  },
  overlay: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 76,
  },
  headerWrap: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    minHeight: isVerySmallScreen ? 40 : isSmallScreen ? 42 : 46,
    paddingHorizontal: isVerySmallScreen ? 18 : isSmallScreen ? 20 : 22,
    borderRadius: 6,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: isVerySmallScreen ? 15 : isSmallScreen ? 17 : 18,
    fontWeight: '700',
    color: '#2B1A14',
  },
  filtersWrap: {
    marginTop: isVerySmallScreen ? 14 : 18,
    alignItems: 'center',
    paddingHorizontal: isVerySmallScreen ? 10 : 12,
  },
  filters: {
    width: '100%',
    maxWidth: 380,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filterBtn: {
    backgroundColor: '#BCA184',
    borderRadius: 18,
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 16,
    paddingVertical: isVerySmallScreen ? 7 : isSmallScreen ? 8 : 9,
    marginHorizontal: 4,
    marginBottom: 8,
    minWidth: isVerySmallScreen ? 84 : 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnActive: {
    backgroundColor: '#D777C3',
  },
  filterText: {
    color: '#2A1914',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 12 : 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listWrap: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
    paddingTop: 20,
    paddingBottom: isVerySmallScreen ? 120 : 180,
  },
  itemAnimatedWrap: {
    width: '100%',
  },
  storyCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E8DFD6',
    marginBottom: isVerySmallScreen ? 12 : 14,
  },
  storyCardHeader: {
    backgroundColor: '#56305A',
    paddingVertical: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  storyCardTitle: {
    color: '#FFF8EF',
    fontSize: isVerySmallScreen ? 15 : isSmallScreen ? 16 : 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  storyCardBody: {
    backgroundColor: '#F0E7DE',
    paddingHorizontal: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    paddingVertical: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
  },
  storyPreview: {
    color: '#241610',
    fontSize: isVerySmallScreen ? 12 : isSmallScreen ? 13 : 14,
    lineHeight: isVerySmallScreen ? 18 : isSmallScreen ? 19 : 21,
  },
  readButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#D8CABB',
    borderRadius: 18,
    paddingHorizontal: isVerySmallScreen ? 14 : 16,
    paddingVertical: isVerySmallScreen ? 7 : 8,
  },
  readButtonText: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 11 : 12,
    fontWeight: '700',
  },
  detailScrollContent: {
    paddingHorizontal: isVerySmallScreen ? 12 : isSmallScreen ? 14 : 18,
    paddingTop: 20,
    paddingBottom: isVerySmallScreen ? 120 : 180,
  },
  detailWrap: {
    width: '100%',
  },
  inlineBackButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#D8CABB',
    borderRadius: 18,
    paddingHorizontal: isVerySmallScreen ? 12 : 14,
    paddingVertical: isVerySmallScreen ? 7 : 8,
    marginBottom: 12,
  },
  inlineBackText: {
    color: '#2B1A14',
    fontSize: isVerySmallScreen ? 11 : isSmallScreen ? 12 : 13,
    fontWeight: '700',
  },
  articleCard: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E8DFD6',
  },
  articleHeader: {
    backgroundColor: '#56305A',
    paddingVertical: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  articleTitle: {
    color: '#FFF8EF',
    fontSize: isVerySmallScreen ? 16 : isSmallScreen ? 17 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  articleBody: {
    backgroundColor: '#F0E7DE',
    paddingHorizontal: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
    paddingVertical: isVerySmallScreen ? 10 : isSmallScreen ? 12 : 14,
  },
  articleText: {
    color: '#241610',
    fontSize: isVerySmallScreen ? 13 : isSmallScreen ? 14 : 15,
    lineHeight: isVerySmallScreen ? 19 : isSmallScreen ? 21 : 23,
  },
});