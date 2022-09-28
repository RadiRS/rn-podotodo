import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';

import { useAppDispatch } from '@/store';
import { changeTheme } from '@/store/theme';

import { AppImage } from '@/assets';
import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useTheme();
  const styles = useStyles();

  const toggleTheme = () => {
    dispatch(changeTheme({ darkMode: !darkMode }));
  };

  return (
    <View style={styles.container}>
      <Text status="primary" variant="title-regular">
        My Tasks
      </Text>
      <Pressable onPress={toggleTheme} style={styles.press}>
        <Image source={AppImage.icon.brightness} style={styles.img} />
      </Pressable>
    </View>
  );
};

const useStyles = () => {
  const { MetricsSizes, Colors, darkMode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: MetricsSizes.regular,
    },
    press: {
      padding: MetricsSizes.small,
    },
    img: {
      width: 20,
      height: 20,
      tintColor: darkMode ? Colors.primary : Colors.dark,
    },
  });

  return styles;
};

export default HeaderSection;
