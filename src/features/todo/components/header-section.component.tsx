import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store';
import { changeTheme } from '@/store/theme';

import { AppImage } from '@/assets';
import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const animationProgress = useRef(
    new Animated.Value(darkMode ? 0 : 0.5),
  ).current;

  const toggleTheme = () => {
    toggleAnimation();
    dispatch(changeTheme({ darkMode: !darkMode }));
  };

  const toggleAnimation = () => {
    Animated.timing(animationProgress, {
      toValue: darkMode ? 0.5 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text status="primary" variant="title-regular">
        {t('todoTitle')}
      </Text>
      <Pressable onPress={toggleTheme} style={styles.press}>
        <LottieView
          source={AppImage.lottie.lightDark}
          progress={animationProgress}
          style={styles.img}
        />
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const { MetricsSizes } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: MetricsSizes.regular,
    },
    press: {
      padding: MetricsSizes.small,
    },
    img: {
      right: -3,
      width: 40,
      height: 40,
    },
  });

  return styles;
};

export default HeaderSection;
