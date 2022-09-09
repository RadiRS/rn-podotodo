import React from 'react';
import { TextInput, View, Switch } from 'react-native';

import { SafeArea, Text, ScrollView, Button } from '@/components/ui';
import AddButton from './floating-action-button.component';

import { addTodo, deleteTodo, selectTodos, toggleComplete } from '@/store/todo';
import { useAppDispatch, useAppSelector } from '@/store';

const HomeContainer = () => {
  const dispatch = useAppDispatch();
  const [newTodo, setNewTodo] = React.useState<string>('');
  const todos = useAppSelector(selectTodos);

  const onPressSubmit = () => {
    if (!newTodo) {
      return;
    }

    dispatch(addTodo(newTodo));
    setNewTodo('');
  };

  return (
    <SafeArea padder>
      <Text variant="title-small" style={{ marginBottom: 20 }}>
        Todo Application
      </Text>
      <TextInput
        value={newTodo}
        placeholder="enter new todo"
        onChangeText={setNewTodo}
        style={{ height: 40, borderWidth: 1, padding: 10, marginBottom: 16 }}
      />
      <Button style={{ marginBottom: 16 }} onPress={onPressSubmit}>
        Save
      </Button>

      <Text style={{ marginTop: 16 * 2 }}>List Todo</Text>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        {todos.map(item => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderWidth: 1,
              borderColor: 'grey',
              marginBottom: 16,
            }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text numberOfLines={2}>{item.title}</Text>
              <Text variant="small">
                status: {item.completed ? 'done' : 'in-progress'}
              </Text>
            </View>
            <View>
              <Switch
                thumbColor={item.completed ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  dispatch(toggleComplete(item.id));
                }}
                value={item.completed}
              />
              <Button
                status="error"
                size="small"
                style={{ marginTop: 12 }}
                onPress={() => dispatch(deleteTodo(item.id))}>
                Delete
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
      <AddButton />
    </SafeArea>
  );
};

export default HomeContainer;
