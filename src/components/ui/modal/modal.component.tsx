import React, { ReactNode } from 'react';
import RNModal from 'react-native-modal';
import { SafeAreaView, ViewStyle } from 'react-native';

import styles from './modal.styles';

interface ModalProps {
  isVisible: boolean;
  avoidKeyboard?: boolean;
  onBackButtonPress: () => void;
  onBackdropPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

const Modal = ({
  children,
  isVisible,
  avoidKeyboard = true,
  style,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      useNativeDriver
      isVisible={isVisible}
      style={[styles.modal, style]}
      avoidKeyboard={avoidKeyboard}
      {...props}>
      <SafeAreaView>{children}</SafeAreaView>
    </RNModal>
  );
};

export default Modal;
