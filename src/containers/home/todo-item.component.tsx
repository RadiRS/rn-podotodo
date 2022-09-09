import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { Button, Text } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';
import { Todo } from '@/store/todo';

interface TodoProps {
  todo: Todo;
  onPressComplete: () => void;
  onPressDelete: () => void;
}

const TodoItem = ({ todo, onPressComplete, onPressDelete }: TodoProps) => {
  const theme = useTheme();
  const s = styles(theme);

  return (
    <TouchableOpacity
      key={todo.id}
      style={s.container}
      onPress={onPressComplete}
      activeOpacity={0.9}>
      <View style={s.titleContainer}>
        <BouncyCheckbox
          disableBuiltInState
          size={25}
          bounceEffect={0}
          isChecked={todo.completed}
          fillColor={theme.Colors.primary}
          innerIconStyle={s.checkbox}
          onPress={onPressComplete}
        />
        <Text
          numberOfLines={2}
          status={todo.completed ? 'disabled' : 'basic'}
          style={[s.titleText, todo.completed && s.lineThrough]}>
          {todo.title}
        </Text>
      </View>
      <View>
        <Button status="error" size="small" onPress={onPressDelete}>
          Delete
        </Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: ThemeVariables) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.MetricsSizes.regular,
      borderWidth: 1,
      borderColor: 'grey',
      marginBottom: theme.MetricsSizes.regular,
      backgroundColor: theme.Colors.secondary,
      borderRadius: theme.MetricsSizes.small,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginEnd: theme.MetricsSizes.regular,
    },
    titleText: {
      flex: 1,
    },
    lineThrough: {
      textDecorationLine: 'line-through',
    },
    checkbox: {
      borderWidth: 2,
    },
  });

export default TodoItem;
