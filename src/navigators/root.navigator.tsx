import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useTheme } from '@/hooks';

import { navigationRef } from './utils';
import { RootStackParamList } from './types';
import { SplashScreen, TodoListScreen } from '@/features/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const RootNavigator = () => {
  const { NavigationTheme, Layout, Colors } = useTheme();
  const barStyle = 'light-content';
  const backgroundColor = Colors.primary;

  return (
    <GestureHandlerRootView style={Layout.fill}>
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Main" component={TodoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootNavigator;
