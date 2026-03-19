import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';

import PlacesScreen from '../screens/PlacesScreen';
import MapScreen from '../screens/MapScreen';
import StoryScreen from '../screens/StoryScreen';
import QuizScreen from '../screens/QuizScreen';
import RandomScreen from '../screens/RandomScreen';
import SavedScreen from '../screens/SavedScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const isAndroid = Platform.OS === 'android';

const ICONS = {
  Places: require('../assets/tab_places.png'),
  Map: require('../assets/tab_map.png'),
  Story: require('../assets/tab_story.png'),
  Quiz: require('../assets/tab_quiz.png'),
  Random: require('../assets/tab_random.png'),
  Saved: require('../assets/tab_saved.png'),
} as const;

const LABELS: Record<keyof MainTabParamList, string> = {
  Places: 'Places',
  Map: 'Map',
  Story: 'Story',
  Quiz: 'Quiz',
  Random: 'Random',
  Saved: 'Saved',
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View pointerEvents="box-none" style={styles.tabBarOuter}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const routeName = route.name as keyof MainTabParamList;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <Image
                  source={ICONS[routeName]}
                  style={[styles.icon, isFocused && styles.iconActive]}
                  resizeMode="contain"
                />
              </View>

              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {LABELS[routeName]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Places"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Places" component={PlacesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Story" component={StoryScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Random" component={RandomScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isAndroid ? 50 : 20,
    alignItems: 'center',
  },
  tabBar: {
    width: isAndroid ? width - 44 : width - 34,
    minHeight: isAndroid
      ? isSmallScreen
        ? 64
        : 72
      : isSmallScreen
      ? 74
      : 82,
    borderRadius: 30,
    backgroundColor: 'rgba(36, 16, 12, 0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isSmallScreen ? 10 : 12,
    paddingVertical: isAndroid
      ? isSmallScreen
        ? 6
        : 8
      : isSmallScreen
      ? 8
      : 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: isSmallScreen ? 34 : 38,
    height: isSmallScreen ? 34 : 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isAndroid ? 2 : 4,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: '#5B3A07',
    borderColor: '#E1B33A',
    shadowColor: '#E1B33A',
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  icon: {
    width: isSmallScreen ? 18 : 20,
    height: isSmallScreen ? 18 : 20,
    tintColor: '#D8CABB',
    opacity: 0.92,
  },
  iconActive: {
    tintColor: '#FFD66B',
    opacity: 1,
  },
  tabLabel: {
    fontSize: isSmallScreen ? 10 : 11,
    fontWeight: '500',
    color: '#D8CABB',
    opacity: 0.9,
  },
  tabLabelActive: {
    color: '#FFD66B',
    fontWeight: '700',
  },
});