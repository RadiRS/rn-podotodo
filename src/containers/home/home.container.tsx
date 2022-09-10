import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { SafeArea } from '@/components/ui';
import AddButton from './floating-action-button.component';

import { addTodo, deleteTodo, selectTodos, updateTodo } from '@/store/todo';
import { useAppDispatch, useAppSelector } from '@/store';
import TodoItem from './todo-item.component';
import AddTodoForm from './add-todo-form.component';
import HeaderSection from './header-section.component';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const [isFormVisible, setFormVisible] = useState(false);

  const onPressSubmit = (newTodo: string) => {
    setFormVisible(false);
    dispatch(addTodo(newTodo));
  };

  return (
    <SafeArea padder>
      <HeaderSection />
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
      <AddButton onPress={() => setFormVisible(true)} />
      <AddTodoForm
        isVisible={isFormVisible}
        onPressSubmit={onPressSubmit}
        setFormVisible={setFormVisible}
      />
    </SafeArea>
  );
};

export default HomeContainer;
