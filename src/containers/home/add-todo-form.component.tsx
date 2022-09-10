import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import { Button, Input } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';

type Props = {
  onPressSubmit: (todo: string) => void;
  isVisible: boolean;
};

const AddTodoForm = ({ onPressSubmit, isVisible }: Props) => {
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

  const renderContent = () => (
    <View style={s.formContainer}>
      <Input
        value={newTodo}
        placeholder="Enter new todo"
        onChangeText={setNewTodo}
      />
      <Button onPress={extOnPressSubmit}>Save</Button>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={isVisible}>
      {renderContent()}
    </Modal>
  );
};

const styles = (theme: ThemeVariables) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: theme.MetricsSizes.regular,
    },
    formContainer: {
      flex: 1,
      paddingTop: theme.MetricsSizes.large,
      paddingBottom: theme.MetricsSizes.large,
      padding: theme.MetricsSizes.regular,
      backgroundColor: theme.Colors.alternative,
      // alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default AddTodoForm;
