import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootNavigator } from '@/navigators';
import { persistor, store } from './store';
import './config/translations';
import { SplashContainer } from '@/containers';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashContainer />} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

// Render Storybook
// export { default } from '../storybook';
