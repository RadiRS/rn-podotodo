import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { navigateAndSimpleReset } from '@/navigators';
import { useAppDispatch } from '@/store';
import { setFirstInstall } from '@/store/init';

import { AppImage } from '@/assets';
import { useTheme } from '@/hooks';
import { Button, Text } from '@/components/ui';

const WelcomeScreen = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { t } = useTranslation();
  const { Gutters } = useTheme();

  const onPressGetStarted = () => {
    dispatch(setFirstInstall(false));
    navigateAndSimpleReset('Main');
  };

  return (
    <View style={styles.container} testID="welcome">
      <View style={styles.content}>
        <LottieView
          autoPlay
          loop
          source={AppImage.lottie.welcome}
          style={styles.lottie}
        />
        <Text variant="title-regular" style={Gutters.regularBMargin}>
          Welcome to{' '}
          <Text variant="title-regular" status="primary">
            Podo
          </Text>
          Todo
        </Text>
        <Text style={styles.subtitle}>{t('welcomeSubtitle')}</Text>
      </View>

      <Button style={styles.btn} onPress={onPressGetStarted}>
        {t('actions.getStarted').toUpperCase()}
      </Button>
    </View>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: MetricsSizes.regular,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '100%',
      alignItems: 'center',
      marginBottom: MetricsSizes.large * 2,
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: 25,
    },
    lottie: {
      width: 200,
      height: 200,
      marginBottom: MetricsSizes.large,
    },
    btn: {
      width: '80%',
    },
  });
};

export default WelcomeScreen;
