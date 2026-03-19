import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const BG_IMAGE = require('../assets/splash_bg.png');
const CENTER_IMAGE = require('../assets/splash_center.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;
const loaderSize = isSmallScreen ? Math.min(width * 0.34, 120) : Math.min(width * 0.38, 150);
const imageSize = isSmallScreen ? Math.min(width * 0.44, 180) : Math.min(width * 0.5, 220);

export default function SplashScreen({ navigation }: Props) {
  const [showWeb, setShowWeb] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.88)).current;
  const imageTranslateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    //const firstTimer = setTimeout(() => {
    //  setShowWeb(false);
    //  setShowImage(true);
    //}, 3000);
//
    //const secondTimer = setTimeout(() => {
    //  navigation.replace('Onboarding');
    //}, 6000);
//
    //return () => {
    //  clearTimeout(firstTimer);
    //  clearTimeout(secondTimer);
    //};
  }, [navigation]);

  useEffect(() => {
    if (!showImage) return;

    imageOpacity.setValue(0);
    imageScale.setValue(0.88);
    imageTranslateY.setValue(18);

    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateY, {
        toValue: 0,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [showImage, imageOpacity, imageScale, imageTranslateY]);

  const spinnerHtml = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: transparent;
            }

            body {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .wrap {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: transparent;
            }

            .ring {
              width: 72px;
              height: 72px;
              border: 3px solid rgba(247, 197, 159, 0.18);
              border-top: 3px solid rgb(247, 197, 159);
              border-right: 3px solid rgb(247, 197, 159);
              border-radius: 18px;
              animation: spin 1.1s linear infinite;
              box-shadow: 0 0 14px rgba(247, 197, 159, 0.18);
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg) scale(0.96);
              }
              50% {
                transform: rotate(180deg) scale(1);
              }
              100% {
                transform: rotate(360deg) scale(0.96);
              }
            }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="ring"></div>
          </div>
        </body>
      </html>
    `,
    []
  );

  return (
    <ImageBackground source={BG_IMAGE} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.centerWrap}>
          {showWeb ? (
            <View style={[styles.webviewWrap, { width: loaderSize, height: loaderSize }]}>
              <WebView
                originWhitelist={['*']}
                source={{ html: spinnerHtml }}
                style={styles.webview}
                scrollEnabled={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                javaScriptEnabled={false}
                domStorageEnabled={false}
                startInLoadingState={false}
                setSupportMultipleWindows={false}
                automaticallyAdjustContentInsets={false}
              />
            </View>
          ) : null}

          {showImage ? (
            <Animated.View
              style={[
                styles.imageWrap,
                {
                  width: imageSize,
                  height: imageSize,
                  opacity: imageOpacity,
                  transform: [{ scale: imageScale }, { translateY: imageTranslateY }],
                },
              ]}
            >
              <Image source={CENTER_IMAGE} style={styles.centerImage} resizeMode="contain" />
            </Animated.View>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E120D',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isSmallScreen ? 20 : 24,
  },
  centerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: isSmallScreen ? 140 : 170,
    minHeight: isSmallScreen ? 140 : 170,
  },
  webviewWrap: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerImage: {
    width: '100%',
    height: '100%',
  },
});