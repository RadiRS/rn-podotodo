import React from 'react';
import { FlatList } from 'react-native';

import { SafeArea, Text } from '@/components/ui';
import AddButton from './floating-action-button.component';

import { addTodo, deleteTodo, selectTodos, updateTodo } from '@/store/todo';
import { useAppDispatch, useAppSelector } from '@/store';
import TodoItem from './todo-item.component';
import AddTodoForm from './add-todo-form.component';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const onPressSubmit = (newTodo: string) => {
    dispatch(addTodo(newTodo));
  };

  return (
    <SafeArea padder>
      <Text variant="title-small">PodoTodo</Text>

      <AddTodoForm onPressSubmit={onPressSubmit} />

      <Text>Todo List</Text>
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
      <AddButton />
    </SafeArea>
  );
};

export default HomeContainer;
