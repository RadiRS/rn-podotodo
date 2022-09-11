import { View, StyleSheet, Pressable, Image, ImageStyle } from 'react-native';
import React from 'react';

import { changeTheme, selectThemes } from '@/store/theme';
import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useAppDispatch, useAppSelector } from '@/store';
import { AppImage } from '@/assets';

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const themes = useTheme();
  const extStyle = styles(themes);
  const currentTheme = useAppSelector(selectThemes);

  const toggleTheme = () => {
    dispatch(changeTheme({ darkMode: !currentTheme.darkMode }));
  };

  const colorStyle: ImageStyle = {
    tintColor: !currentTheme.darkMode ? themes.Colors.dark : 'orange',
  };

  return (
    <View style={extStyle.container}>
      <Text status="primary" variant="title-regular">
        PodoTodo
      </Text>
      <Pressable onPress={toggleTheme} style={extStyle.press}>
        <Image
          source={AppImage.icon.brightness}
          style={[extStyle.img, colorStyle]}
        />
        {/* <Text variant="small">Change Theme</Text> */}
      </Pressable>
    </View>
  );
};

const styles = (themes: ThemeVariables) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: themes.MetricsSizes.regular,
    },
    press: {
      padding: themes.MetricsSizes.small,
    },
    img: {
      width: 20,
      height: 20,
    },
  });

export default HeaderSection;
