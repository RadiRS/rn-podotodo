import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Modal } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';

type Props = {
  onPressSubmit: (todo: string) => void;
  setFormVisible: (visible: boolean) => void;
  isVisible: boolean;
};

const AddTodoForm = ({ onPressSubmit, setFormVisible, isVisible }: Props) => {
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
      // animationType="slide"
      // presentationStyle="formSheet"
      onBackButtonPress={() => setFormVisible(false)}
      onBackdropPress={() => setFormVisible(false)}
      isVisible={isVisible}>
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
      paddingTop: theme.MetricsSizes.large,
      paddingBottom: theme.MetricsSizes.large,
      padding: theme.MetricsSizes.regular,
      backgroundColor: theme.Colors.alternative,
      // alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default AddTodoForm;
