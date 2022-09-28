import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';

import { navigateAndSimpleReset } from '@/navigators';
import { SafeArea } from '@/components/ui';

const SplashContainer = () => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        RNBootSplash.hide({ fade: true });
        resolve(true);
      }, 200),
    );

    navigateAndSimpleReset('Main');
  };

  return (
    <SafeArea testID="welcome">
      <StatusBar hidden />
    </SafeArea>
  );
};

export default SplashContainer;
