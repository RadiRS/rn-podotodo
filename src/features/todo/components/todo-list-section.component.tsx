import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import EmptyList from '@/assets/images/empty-list';

import { useAppDispatch, useAppSelector } from '@/store';
import {
  deleteTodo,
  selectTodos,
  Todo,
  updateTodo,
} from '@/features/todo/services';

import { useTheme } from '@/hooks';
import { Text } from '@/components/ui';

const { height } = Dimensions.get('screen');
import TodoItem from './todo-item.component';

const TodoListSection = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const { Gutters } = useTheme();
  const { t } = useTranslation();

  const onPressDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onPressComplete = (item: Todo) => {
    dispatch(updateTodo({ ...item, completed: !item.completed }));
  };

  return (
    <FlatList
      data={todos}
      scrollEnabled={!!todos.length}
      keyExtractor={todo => todo.id.toString()}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Animated.View
          testID="empty-todo"
          style={styles.emptyContainer}
          entering={FadeIn}
          exiting={FadeOut}>
          <SvgXml width={250} height={250} xml={EmptyList} />
          <Text style={Gutters.smallBMargin}>{t('wording.emptyState')}</Text>
          <Text variant="small">{t('wording.emptyInstruction')}</Text>
        </Animated.View>
      )}
      renderItem={({ item }) => {
        return (
          <TodoItem
            todo={item}
            onPressComplete={() => onPressComplete(item)}
            onPressDelete={onPressDelete}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 1.5,
  },
});

export default TodoListSection;
