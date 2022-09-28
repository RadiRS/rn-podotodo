import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, Input, Modal } from '@/components/ui';
import { useTheme } from '@/hooks';
import { useAppDispatch } from '@/store';
import { addTodo } from '@/features/todo/services';

import AddButton from './floating-action-button.component';

const AddTodoForm = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState(false);
  const { t } = useTranslation();
  const { Gutters } = useTheme();
  const styles = useStyles();
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
    <View style={styles.formContainer}>
      <View style={styles.bullet} />
      <Input
        value={newTodo}
        placeholder={t('placeholders.enterTask')}
        onChangeText={setNewTodo}
        style={Gutters.regularBMargin}
      />
      <Button disabled={!newTodo} onPress={onPressSubmit}>
        {t('actions.save')}
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

const useStyles = () => {
  const { MetricsSizes, Colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: MetricsSizes.regular,
    },
    formContainer: {
      borderTopLeftRadius: MetricsSizes.regular,
      borderTopRightRadius: MetricsSizes.regular,
      paddingBottom: MetricsSizes.large,
      padding: MetricsSizes.regular,
      backgroundColor: Colors.background,
    },
    bullet: {
      width: 30,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: Colors.hint,
      alignSelf: 'center',
      marginBottom: MetricsSizes.large,
    },
  });
};

export default AddTodoForm;
