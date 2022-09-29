import React from 'react';

import { SafeArea } from '@/components/ui';
import AddTodoForm from '../components/add-todo-form.component';
import HeaderSection from '../components/header-section.component';
import TodoListSection from '../components/todo-list-section.component';

const TodoListScreen = () => {
  return (
    <SafeArea>
      <HeaderSection />
      <TodoListSection />
      <AddTodoForm />
    </SafeArea>
  );
};

export default TodoListScreen;
