import { Button, Text } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';
import { Todo } from '@/store/todo';
import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';

interface TodoProps {
  todo: Todo;
  onPressComplete: () => void;
  onPressDelete: () => void;
}

const TodoItem = ({ todo, onPressComplete, onPressDelete }: TodoProps) => {
  const theme = useTheme();
  const s = styles(theme);

  return (
    <View key={todo.id} style={s.container}>
      <View style={s.titleContainer}>
        <Text numberOfLines={2}>{todo.title}</Text>
        <Text variant="small">
          status: {todo.completed ? 'done' : 'in-progress'}
        </Text>
      </View>
      <View>
        <Switch
          thumbColor={todo.completed ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onPressComplete}
          value={todo.completed}
          style={theme.Gutters.regularBMargin}
        />
        <Button status="error" size="small" onPress={onPressDelete}>
          Delete
        </Button>
      </View>
    </View>
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
      paddingRight: theme.MetricsSizes.regular,
    },
  });

export default TodoItem;
