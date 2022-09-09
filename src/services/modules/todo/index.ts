import { api } from '@/services/api';
import { getTodos, addTodo, updateTodo, deleteTodo } from './todo.service';

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: getTodos(builder),
    addTodo: addTodo(builder),
    updateTodo: updateTodo(builder),
    deleteTodo: deleteTodo(builder),
    // addTodo: builder.mutation({
    //   query: todo => ({
    //     url: '/todos',
    //     method: 'POST',
    //     body: todo,
    //   }),
    // }),
  }),

  overrideExisting: true,
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
