import React from 'react';
import { TextInput, View } from 'react-native';

import { SafeArea, Text, ScrollView, Button } from '@/components/ui';

interface TodoInterface {
  id: number;
  title: string;
  completed: boolean;
}

const HomeContainer = () => {
  const [todo, setTodo] = React.useState<string>('');
  const todos: TodoInterface[] = [
    {
      id: 1,
      title: 'Todo One',
      completed: false,
    },
  ];

  return (
    <SafeArea padder>
      <Text variant="title-small" style={{ marginBottom: 20 }}>
        Todo Application
      </Text>
      <TextInput
        value={todo}
        placeholder="enter new todo"
        onChangeText={setTodo}
        style={{ height: 40, borderWidth: 1, padding: 10, marginBottom: 16 }}
      />
      <Button>Save</Button>

      <Text style={{ marginTop: 16 * 2 }}>List Todo</Text>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        {todos.map(item => (
          <View style={{ padding: 16, borderWidth: 1, borderColor: 'grey' }}>
            <Text>{item.title}</Text>
            <Text variant="small">
              Status: {item.completed ? 'done' : 'in-progress'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeArea>
  );
};

export default HomeContainer;
