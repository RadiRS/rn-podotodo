import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';

interface FloatingActionButtonProps {
  onPress: () => void;
}

const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <Text variant="large" status="control">
        +
      </Text>
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: MetricsSizes.regular,
      right: MetricsSizes.regular,
    },
  });

  return styles;
};

export default FloatingActionButton;
