import React from 'react';

import { SafeArea } from '@/components/ui';
import AddTodoForm from './add-todo-form.component';
import HeaderSection from './header-section.component';
import TodoListSection from './todo-list-section.component';

const HomeContainer = () => {
  return (
    <SafeArea padder>
      <HeaderSection />
      <TodoListSection />
      <AddTodoForm />
    </SafeArea>
  );
};

export default HomeContainer;
