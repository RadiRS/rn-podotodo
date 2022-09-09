import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { navigateAndSimpleReset } from '@/navigators/utils';
import { useTheme } from '@/hooks';
import { ThemeVariables } from '@/config/theme/theme';

const SplashContainer = () => {
  const themes = useTheme();
  const s = styles(themes);

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        RNBootSplash.hide({ fade: true });
        resolve(true);
      }, 1000),
    );

    navigateAndSimpleReset('Main');
  };

  useEffect(() => {
    init();
  });

  return (
    <View testID="welcome" style={s.container}>
      {Platform.OS === 'ios' && <StatusBar animated barStyle="light-content" />}
    </View>
  );
};

const styles = (themes: ThemeVariables) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themes.Colors.splashBackground,
    },
  });

export default SplashContainer;
