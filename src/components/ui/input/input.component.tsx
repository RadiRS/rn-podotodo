import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { ThemeVariables } from '@/config/theme/theme';
import { Text } from '@/components/ui';
import { useTheme } from '@/hooks';

interface InputProps extends TextInputProps {
  error?: string;
  label?: string;
}

const Input = ({ label, error, style, ...props }: InputProps) => {
  const themes = useTheme();
  const extStyles = styles(themes);

  return (
    <View style={extStyles.container}>
      {label && <Text style={extStyles.labelText}>Enter new todo</Text>}
      <TextInput
        style={[extStyles.input, style]}
        placeholderTextColor={themes.Colors.hint}
        {...props}
      />
      {error && (
        <Text status="error" style={extStyles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = (themes: ThemeVariables) =>
  StyleSheet.create({
    container: {},
    input: {
      borderRadius: themes.MetricsSizes.small,
      borderWidth: 1,
      borderColor: themes.Colors.primary,
      fontSize: themes.FontSize.regular,
      color: themes.Colors.text,
      textShadowColor: 'blue',
      padding: 14,
    },
    errorText: {
      marginTop: themes.MetricsSizes.tiny,
    },
    labelText: {
      marginBottom: themes.MetricsSizes.tiny,
    },
  });

export default Input;
