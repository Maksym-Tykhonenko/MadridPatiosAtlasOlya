export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  PlaceDetail: {
    placeId: string;
  };
  QuizResult: {
    score: number;
    total: number;
  };
};

export type MainTabParamList = {
  Places: undefined;
  Map: undefined;
  Story: undefined;
  Quiz: undefined;
  Random: undefined;
  Saved: undefined;
};