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
      <View style={s.bullet} />
      <Input
        value={newTodo}
        placeholder="Enter new todo"
        onChangeText={setNewTodo}
        style={theme.Gutters.regularBMargin}
      />
      <Button onPress={extOnPressSubmit}>Save</Button>
    </View>
  );

  return (
    <Modal
      variant="bottom"
      swipeDirection="down"
      onBackButtonPress={() => setFormVisible(false)}
      onSwipeComplete={() => setFormVisible(false)}
      isVisible={isVisible}>
      {renderContent()}
    </Modal>
  );
};

const styles = (themes: ThemeVariables) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: themes.MetricsSizes.regular,
    },
    formContainer: {
      borderTopLeftRadius: themes.MetricsSizes.regular,
      borderTopRightRadius: themes.MetricsSizes.regular,
      paddingBottom: themes.MetricsSizes.large,
      padding: themes.MetricsSizes.regular,
      backgroundColor: themes.Colors.background,
    },
    bullet: {
      width: 30,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: themes.Colors.hint,
      alignSelf: 'center',
      marginBottom: themes.MetricsSizes.large,
    },
  });

export default AddTodoForm;
