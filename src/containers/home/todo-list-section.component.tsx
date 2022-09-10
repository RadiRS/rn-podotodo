import React from 'react';
import { FlatList } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store';
import { deleteTodo, selectTodos, Todo, updateTodo } from '@/store/todo';

import TodoItem from './todo-item.component';

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
      keyExtractor={todo => todo.id}
      showsVerticalScrollIndicator={false}
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

export default TodoListSection;
