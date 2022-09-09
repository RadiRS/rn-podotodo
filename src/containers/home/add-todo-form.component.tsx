import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';

type Props = {
  onPressSubmit: (todo: string) => void;
};

const AddTodoForm = ({ onPressSubmit }: Props) => {
  const [newTodo, setNewTodo] = React.useState<string>('');
  const theme = useTheme();
  const s = styles(theme);

  const extOnPressSubmit = () => {
    if (!newTodo) {
      return;
    }

    onPressSubmit(newTodo);

    setNewTodo('');
  };

  return (
    <View style={theme.Gutters.regularBMargin}>
      <TextInput
        value={newTodo}
        placeholder="enter new todo"
        onChangeText={setNewTodo}
        style={s.input}
      />
      <Button onPress={extOnPressSubmit}>Save</Button>
    </View>
  );
};

const styles = (theme: ThemeVariables) =>
  StyleSheet.create({
    container: {},
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10,
      marginBottom: theme.MetricsSizes.regular,
    },
  });

export default AddTodoForm;
