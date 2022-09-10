import React from 'react';
import { FlatList } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store';
import { deleteTodo, selectTodos, updateTodo } from '@/store/todo';

import TodoItem from './todo-item.component';

const TodoListSection = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  return (
    <FlatList
      data={todos}
      keyExtractor={todo => todo.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <TodoItem
            todo={item}
            onPressComplete={() =>
              dispatch(updateTodo({ ...item, completed: !item.completed }))
            }
            onPressDelete={() => {
              dispatch(deleteTodo(item.id));
            }}
          />
        );
      }}
    />
  );
};

export default TodoListSection;
