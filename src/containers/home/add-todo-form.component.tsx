import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Input, Modal } from '@/components/ui';
import { ThemeVariables } from '@/config/theme/theme';
import { useTheme } from '@/hooks';
import { useAppDispatch } from '@/store';
import { addTodo } from '@/store/todo';

import AddButton from './floating-action-button.component';

const AddTodoForm = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState(false);

  const theme = useTheme();
  const s = styles(theme);

  const dispatch = useAppDispatch();

  const onPressSubmit = () => {
    if (!newTodo) {
      return;
    }

    setFormVisible(false);
    dispatch(addTodo(newTodo));

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
      <Button disabled={!newTodo} onPress={onPressSubmit}>
        Save
      </Button>
    </View>
  );

  return (
    <>
      <AddButton onPress={() => setFormVisible(true)} />
      <Modal
        variant="bottom"
        swipeDirection="down"
        onBackButtonPress={() => setFormVisible(false)}
        onSwipeComplete={() => setFormVisible(false)}
        isVisible={isFormVisible}>
        {renderContent()}
      </Modal>
    </>
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
