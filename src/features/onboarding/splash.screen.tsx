import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { navigateAndSimpleReset } from '@/navigators';
import { SafeArea } from '@/components/ui';

const SplashScreen = () => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setTimeout(() => {
      navigateAndSimpleReset('Main');
    }, 200);
  };

  return (
    <SafeArea testID="welcome">
      <StatusBar hidden />
    </SafeArea>
  );
};

export default SplashScreen;
