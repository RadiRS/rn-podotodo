import { api } from '@/services/api';
import { getTodos, addTodo, updateTodo, deleteTodo } from './todo.service';

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: getTodos(builder),
    addTodo: addTodo(builder),
    updateTodo: updateTodo(builder),
    deleteTodo: deleteTodo(builder),
  }),

  overrideExisting: true,
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;

export { default as todoReducer } from './todo.slice';
export * from './todo.slice';
export * from './types';
