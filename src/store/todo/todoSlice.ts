import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { RootState } from '@/store';
// import data from '../../../data/db.json';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  timestamp: string;
}

//! Dummy todo
// const initTodos = data.todos.map(todo => ({
//   ...todo,
//   id: todo.id.toString(),
//   timestamp: new Date().toISOString(),
// }));

interface InitialStateTodo {
  todos: Todo[];
}

const initialState: InitialStateTodo = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo = {
        id: nanoid(),
        title: action.payload,
        timestamp: new Date().toISOString(),
        completed: false,
      };

      state.todos.push(todo);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const newTodos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...action.payload };
        }

        return todo;
      });

      state.todos = newTodos;
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      state.todos = newTodos;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todos = state.todos.filter(todo => todo.id !== action.payload);

      state.todos = todos;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, updateTodo } =
  todoSlice.actions;

export const selectTodos = (state: RootState) =>
  state.todo.todos
    .slice()
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

export const selectTodo = (state: RootState, todoId: string) =>
  state.todo.todos.filter(todo => todo.id === todoId);

export default todoSlice.reducer;
