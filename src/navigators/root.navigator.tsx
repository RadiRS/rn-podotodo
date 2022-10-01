import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

import { useTheme } from '@/hooks';
import { useAppSelector } from '@/store';
import { selectIsFirstInstall } from '@/store/init';

import { navigationRef } from './utils';
import { RootStackParamList } from './types';
import {
  SplashScreen,
  TodoListScreen,
  WelcomeScreen,
} from '@/features/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const RootNavigator = () => {
  const { NavigationTheme, Layout, Colors, darkMode } = useTheme();
  const backgroundColor = Colors.primary;
  const barStyle =
    Platform.OS === 'android'
      ? 'light-content'
      : darkMode
      ? 'light-content'
      : 'dark-content';

  const isFirstInstall = useAppSelector(selectIsFirstInstall);

  const initialRouteName: keyof RootStackParamList = isFirstInstall
    ? 'Welcome'
    : 'Splash';

  const onReady = () => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <GestureHandlerRootView style={Layout.fill}>
      <NavigationContainer
        ref={navigationRef}
        theme={NavigationTheme}
        onReady={onReady}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={TodoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;
