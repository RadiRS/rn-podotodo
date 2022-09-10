import React from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store';
import { deleteTodo, selectTodos, Todo, updateTodo } from '@/store/todo';

import TodoItem from './todo-item.component';
import { AppImage } from '@/assets';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const TodoListSection = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

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
      keyExtractor={todo => todo.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Animated.View
          style={styles.emptyContainer}
          entering={FadeIn}
          exiting={FadeOut}>
          <Image
            source={AppImage.illustration.taskCompleted}
            style={styles.img}
          />
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
  },
  img: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});

export default TodoListSection;
