import React from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';
import { ThemeVariables } from '@/config/theme/theme';

const FloatingActionButton = () => {
  const theme = useTheme();

  const s = style(theme);

  return (
    <Pressable onPress={() => Alert.alert('Add new task')} style={s.container}>
      <Text variant="large" appearance="alternative">
        +
      </Text>
    </Pressable>
  );
};

const style = (theme: ThemeVariables) => {
  const styles = StyleSheet.create({
    container: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: theme.MetricsSizes.regular,
      right: theme.MetricsSizes.regular,
    },
  });

  return styles;
};

export default FloatingActionButton;
