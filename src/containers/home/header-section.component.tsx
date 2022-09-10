import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { changeTheme, selectThemes } from '@/store/theme';
import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useAppDispatch, useAppSelector } from '@/store';

const HeaderSection = () => {
  const dispatch = useAppDispatch();
  const themes = useTheme();
  const extStyle = styles(themes);
  const currentTheme = useAppSelector(selectThemes);

  const toggleTheme = () => {
    dispatch(changeTheme({ darkMode: !currentTheme.darkMode }));
  };

  return (
    <View style={extStyle.container}>
      <Text status="primary" variant="title-regular">
        PodoTodo
      </Text>
      <Pressable onPress={toggleTheme}>
        <Text variant="small">Change Theme</Text>
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
      paddingVertical: themes.MetricsSizes.regular,
    },
  });

export default HeaderSection;
