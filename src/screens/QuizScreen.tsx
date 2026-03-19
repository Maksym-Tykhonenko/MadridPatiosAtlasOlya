import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  Share,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { quizData, type QuizQuestion } from '../data/quizData';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Quiz'>,
  NativeStackScreenProps<RootStackParamList>
>;

const BG = require('../assets/madrid_intro_backdrop.png');
const INTRO_IMAGE = require('../assets/quiz_intro_cover.png');
const SHARE_ICON = require('../assets/share_place_icon.png');

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;

type Stage = 'intro' | 'question' | 'levelResult' | 'allComplete';

export default function QuizScreen(): React.JSX.Element {
  const [stage, setStage] = useState<Stage>('intro');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [questionIndexInLevel, setQuestionIndexInLevel] = useState(0);
  const [correctCountInLevel, setCorrectCountInLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslate = useRef(new Animated.Value(0)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const resultTranslate = useRef(new Animated.Value(18)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslate = useRef(new Animated.Value(24)).current;

  const totalLevels = useMemo(() => Math.max(...quizData.map(item => item.level)), []);

  const levelQuestions = useMemo(
    () => quizData.filter(item => item.level === currentLevel),
    [currentLevel]
  );

  const currentQuestion: QuizQuestion | undefined = levelQuestions[questionIndexInLevel];
  const totalQuestionsInLevel = levelQuestions.length;
  const progressLabel = `${Math.min(questionIndexInLevel + 1, totalQuestionsInLevel)}/${totalQuestionsInLevel}`;
  const levelPassed = correctCountInLevel === totalQuestionsInLevel;

  const animateContent = () => {
    contentOpacity.setValue(0);
    contentTranslate.setValue(20);

    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslate, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateResult = () => {
    resultOpacity.setValue(0);
    resultTranslate.setValue(18);
    buttonsOpacity.setValue(0);
    buttonsTranslate.setValue(24);

    Animated.parallel([
      Animated.timing(resultOpacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(resultTranslate, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 260,
        delay: 110,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(buttonsTranslate, {
        toValue: 0,
        duration: 260,
        delay: 110,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (stage === 'intro' || stage === 'question') {
      animateContent();
    }
    if (stage === 'levelResult' || stage === 'allComplete') {
      animateResult();
    }
  }, [stage, currentLevel, questionIndexInLevel]);

  useFocusEffect(
    React.useCallback(() => {
      setStage('intro');
      setCurrentLevel(unlockedLevel);
      setQuestionIndexInLevel(0);
      setCorrectCountInLevel(0);
      setSelectedAnswer(null);

      return () => {
        setStage('intro');
        setCurrentLevel(unlockedLevel);
        setQuestionIndexInLevel(0);
        setCorrectCountInLevel(0);
        setSelectedAnswer(null);
      };
    }, [unlockedLevel])
  );

  const startQuiz = () => {
    setStage('question');
    setCurrentLevel(unlockedLevel);
    setQuestionIndexInLevel(0);
    setCorrectCountInLevel(0);
    setSelectedAnswer(null);
  };

  const restartCurrentLevel = () => {
    setStage('question');
    setQuestionIndexInLevel(0);
    setCorrectCountInLevel(0);
    setSelectedAnswer(null);
  };

  const restartAll = () => {
    setStage('intro');
    setCurrentLevel(1);
    setUnlockedLevel(1);
    setQuestionIndexInLevel(0);
    setCorrectCountInLevel(0);
    setSelectedAnswer(null);
  };

  const goToNextLevel = () => {
    const next = currentLevel + 1;

    if (next > totalLevels) {
      setStage('allComplete');
      return;
    }

    setUnlockedLevel(next);
    setCurrentLevel(next);
    setQuestionIndexInLevel(0);
    setCorrectCountInLevel(0);
    setSelectedAnswer(null);
    setStage('question');
  };

  const handleAnswerPress = (option: string) => {
    if (!currentQuestion || selectedAnswer) return;

    setSelectedAnswer(option);

    const isCorrect = option === currentQuestion.correctAnswer;

    setTimeout(() => {
      const nextCorrect = isCorrect ? correctCountInLevel + 1 : correctCountInLevel;
      const isLastQuestion = questionIndexInLevel === totalQuestionsInLevel - 1;

      setCorrectCountInLevel(nextCorrect);

      if (isLastQuestion) {
        setSelectedAnswer(null);

        if (nextCorrect === totalQuestionsInLevel && currentLevel < totalLevels) {
          setUnlockedLevel(prev => Math.max(prev, currentLevel + 1));
        }

        if (currentLevel === totalLevels && nextCorrect === totalQuestionsInLevel) {
          setStage('allComplete');
          return;
        }

        setStage('levelResult');
        return;
      }

      setQuestionIndexInLevel(prev => prev + 1);
      setSelectedAnswer(null);
    }, 620);
  };

  const handleShare = async () => {
    const message =
      stage === 'allComplete'
        ? `I completed all ${totalLevels} levels of the Madrid Street Quiz.`
        : `I finished Level ${currentLevel} with ${correctCountInLevel}/${totalQuestionsInLevel} correct answers.`;

    try {
      await Share.share({ message });
    } catch {}
  };

  const renderOption = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrect = option === currentQuestion?.correctAnswer;
    const showCorrect = !!selectedAnswer && isCorrect;
    const showWrong = !!selectedAnswer && isSelected && !isCorrect;

    return (
      <Pressable
        key={option}
        style={[
          styles.optionButton,
          showCorrect && styles.optionCorrect,
          showWrong && styles.optionWrong,
        ]}
        onPress={() => handleAnswerPress(option)}
        disabled={!!selectedAnswer}
      >
        <Text
          style={[
            styles.optionText,
            (showCorrect || showWrong) && styles.optionTextSelected,
          ]}
        >
          {option}
        </Text>
      </Pressable>
    );
  };

  const resultTitle =
    stage === 'allComplete'
      ? 'Quiz Complete'
      : levelPassed
      ? 'Level Complete'
      : 'Try Again';

  const resultTextTop =
    stage === 'allComplete'
      ? `You completed all ${totalLevels} levels of the Madrid Street Quiz and finished the full challenge successfully.`
      : levelPassed
      ? `Nice work! You successfully recognized the streets and corners of Madrid in this round. The city hides many beautiful places behind its historic facades, and every step through its streets reveals something new.`
      : `Madrid can be tricky. Many streets look similar, and the city loves to hide its secrets in quiet corners and narrow passages.`;

  const resultTextBottom =
    stage === 'allComplete'
      ? `You can start over and challenge yourself again whenever you want.`
      : levelPassed
      ? `Get ready for the next challenge and see how well you really know Madrid.`
      : `Take another look and try again — the next time you might recognize the right street.`;

  return (
    <ImageBackground source={BG} style={styles.container} resizeMode="cover">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.contentWrap,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslate }],
            },
          ]}
        >
          <View style={styles.headerRow}>
            <View style={styles.titleBox}>
              <Text style={styles.headerTitle}>Madrid Street Quiz</Text>
            </View>
          </View>

          {stage === 'intro' ? (
            <View style={styles.centerContent}>
              <Image source={INTRO_IMAGE} style={styles.introImage} resizeMode="cover" />

              <Text style={styles.introTitle}>
                {unlockedLevel > 1
                  ? `How Well Do You Know Madrid? Next start: Level ${unlockedLevel}`
                  : 'How Well Do You Know Madrid?'}
              </Text>

              <Pressable style={styles.primaryButton} onPress={startQuiz}>
                <Text style={styles.primaryButtonText}>
                  {unlockedLevel > 1 ? `Continue from Level ${unlockedLevel}` : 'Start the Quiz'}
                </Text>
              </Pressable>
            </View>
          ) : null}

          {stage === 'question' && currentQuestion ? (
            <View style={styles.questionWrap}>
              <View style={styles.infoRow}>
                <Pressable style={styles.smallBackBox} onPress={() => setStage('intro')}>
                  <Text style={styles.smallBackText}>←</Text>
                </Pressable>

                <View style={styles.smallTitleBox}>
                  <Text numberOfLines={1} style={styles.smallTitleText}>
                    Madrid Street Quiz
                  </Text>
                </View>
              </View>

              <View style={styles.questionContent}>
                <Text style={styles.levelLabel}>{`Level ${currentLevel}`}</Text>
                <Text style={styles.progressLabel}>{progressLabel}</Text>

                <Image
                  source={currentQuestion.image}
                  style={styles.questionImage}
                  resizeMode="cover"
                />

                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                <View style={styles.optionsWrap}>{currentQuestion.options.map(renderOption)}</View>
              </View>
            </View>
          ) : null}
        </Animated.View>

        {stage === 'levelResult' || stage === 'allComplete' ? (
          <View style={styles.resultOverlay}>
            <Animated.View
              style={[
                styles.resultCardWrap,
                {
                  opacity: resultOpacity,
                  transform: [{ translateY: resultTranslate }],
                },
              ]}
            >
              <View
                style={[
                  styles.resultHeader,
                  stage === 'allComplete' || levelPassed
                    ? styles.resultHeaderSuccess
                    : styles.resultHeaderFailed,
                ]}
              >
                <Text style={styles.resultHeaderText}>{resultTitle}</Text>
              </View>

              <View style={styles.resultBody}>
                <Text style={styles.resultText}>{resultTextTop}</Text>
                <Text style={styles.resultText}>{resultTextBottom}</Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                styles.resultActions,
                {
                  opacity: buttonsOpacity,
                  transform: [{ translateY: buttonsTranslate }],
                },
              ]}
            >
              <Pressable style={styles.circleButton} onPress={handleShare}>
                <Image source={SHARE_ICON} style={styles.shareIcon} resizeMode="contain" />
              </Pressable>

              <Pressable
                style={styles.middleButton}
                onPress={
                  stage === 'allComplete'
                    ? restartAll
                    : levelPassed
                    ? goToNextLevel
                    : restartCurrentLevel
                }
              >
                <Text style={styles.middleButtonText}>
                  {stage === 'allComplete'
                    ? 'Play Again'
                    : levelPassed
                    ? 'Next Level'
                    : 'Try Again'}
                </Text>
              </Pressable>

              <Pressable style={styles.circleButton} onPress={restartAll}>
                <Text style={styles.circleButtonText}>⌂</Text>
              </Pressable>
            </Animated.View>
          </View>
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
    paddingTop: Platform.OS === 'android' ? 50 : 76,
    paddingHorizontal: isSmallScreen ? 14 : 18,
    paddingBottom: 140,
  },
  contentWrap: {
    flex: 1,
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: isSmallScreen ? 16 : 18,
  },
  titleBox: {
    minHeight: isSmallScreen ? 38 : 42,
    paddingHorizontal: isSmallScreen ? 16 : 18,
    borderRadius: 4,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#2B1A14',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '700',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: isSmallScreen ? 54 : 66,
    paddingTop: 20,
  },
  introImage: {
    width: isSmallScreen ? 220 : 250,
    height: isSmallScreen ? 300 : 340,
    borderRadius: 8,
    marginBottom: 18,
  },
  introTitle: {
    color: '#FFF4E3',
    fontSize: isSmallScreen ? 12 : 13,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  primaryButton: {
    minWidth: isSmallScreen ? 138 : 156,
    height: isSmallScreen ? 34 : 36,
    borderRadius: 4,
    backgroundColor: '#D0A01B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: '#FFF7EA',
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  questionWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isSmallScreen ? 16 : 18,
  },
  smallBackBox: {
    width: isSmallScreen ? 34 : 36,
    height: isSmallScreen ? 30 : 32,
    borderRadius: 2,
    backgroundColor: '#D8CABB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  smallBackText: {
    color: '#2B1A14',
    fontSize: isSmallScreen ? 18 : 20,
    lineHeight: isSmallScreen ? 18 : 20,
  },
  smallTitleBox: {
    minHeight: isSmallScreen ? 30 : 32,
    borderRadius: 2,
    backgroundColor: '#D8CABB',
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTitleText: {
    color: '#2B1A14',
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '700',
  },
  questionContent: {
    width: '100%',
    alignItems: 'center',
  },
  levelLabel: {
    color: '#EADBC8',
    fontSize: isSmallScreen ? 12 : 13,
    marginBottom: 4,
  },
  progressLabel: {
    color: '#C9B8A1',
    fontSize: isSmallScreen ? 11 : 12,
    marginBottom: 12,
  },
  questionImage: {
    width: isSmallScreen ? 210 : 240,
    height: isSmallScreen ? 128 : 148,
    borderRadius: 4,
    marginBottom: 14,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 13 : 14,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  optionsWrap: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#B8860B',
    paddingVertical: isSmallScreen ? 9 : 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  optionCorrect: {
    backgroundColor: '#A8C0B0',
  },
  optionWrong: {
    backgroundColor: '#9A4B49',
  },
  optionText: {
    color: '#1F120C',
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 12, 9, 0.68)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isSmallScreen ? 20 : 26,
  },
  resultCardWrap: {
    width: isSmallScreen ? width * 0.78 : width * 0.8,
    maxWidth: 330,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F1E8E0',
  },
  resultHeader: {
    minHeight: isSmallScreen ? 60 : 66,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  resultHeaderSuccess: {
    backgroundColor: '#3F6828',
  },
  resultHeaderFailed: {
    backgroundColor: '#6F382F',
  },
  resultHeaderText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultBody: {
    backgroundColor: '#F1E8E0',
    paddingHorizontal: isSmallScreen ? 18 : 22,
    paddingTop: isSmallScreen ? 20 : 24,
    paddingBottom: isSmallScreen ? 22 : 24,
  },
  resultText: {
    color: '#20140F',
    fontSize: isSmallScreen ? 11.5 : 12.5,
    lineHeight: isSmallScreen ? 17 : 19,
    textAlign: 'center',
    marginBottom: 12,
  },
  resultActions: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    width: isSmallScreen ? 34 : 36,
    height: isSmallScreen ? 34 : 36,
    borderRadius: 18,
    backgroundColor: '#A4B88B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButton: {
    minWidth: isSmallScreen ? 112 : 122,
    height: isSmallScreen ? 34 : 36,
    borderRadius: 18,
    backgroundColor: '#A4B88B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
  middleButtonText: {
    color: '#2A1914',
    fontSize: isSmallScreen ? 11.5 : 12.5,
    fontWeight: '500',
  },
  circleButtonText: {
    color: '#2A1914',
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '700',
  },
  shareIcon: {
    width: isSmallScreen ? 15 : 16,
    height: isSmallScreen ? 15 : 16,
  },
});