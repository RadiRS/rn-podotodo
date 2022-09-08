import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { Todo } from './types';

export const getTodos = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<Todo[], void>({
    query: () => '/todos',
    providesTags: ['Todos'],
    transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
  });

export const addTodo = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<Todo, { title: string; userId: number; completed: boolean }>(
    {
      query: todo => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    },
  );

export const updateTodo = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<Todo, Todo>({
    query: (todo: Todo) => ({
      url: `/todos/${todo.id}`,
      method: 'PATCH',
      body: todo,
    }),
    invalidatesTags: ['Todos'],
  });

export const deleteTodo = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<Todo, number>({
    query: id => ({
      url: `/todos/${id}`,
      method: 'DELETE',
      body: id,
    }),
    invalidatesTags: ['Todos'],
  });
