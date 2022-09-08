import React from 'react';
import { TextInput, View, ActivityIndicator, Switch } from 'react-native';

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/services/modules/todo';

import { SafeArea, Text, ScrollView, Button } from '@/components/ui';

const HomeContainer = () => {
  const [newTodo, setNewTodo] = React.useState<string>('');
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery();

  const onPressSubmit = () => {
    if (!newTodo) {
      return;
    }

    const params = {
      userId: 1,
      title: newTodo,
      completed: false,
    };

    addTodo(params);
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

      {isLoading && <ActivityIndicator />}
      {isError && <Text status="error">{error.error}</Text>}
      {isSuccess && (
        <>
          <Text style={{ marginTop: 16 * 2 }}>List Todo</Text>
          <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
            {data.map(item => (
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
                      updateTodo({ ...item, completed: !item.completed });
                    }}
                    value={item.completed}
                  />
                  <Button
                    status="error"
                    size="small"
                    style={{ marginTop: 12 }}
                    onPress={() => deleteTodo(item.id)}>
                    Delete
                  </Button>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </SafeArea>
  );
};

export default HomeContainer;
