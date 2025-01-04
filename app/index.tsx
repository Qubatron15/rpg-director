import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './app';

export default function Index() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}
