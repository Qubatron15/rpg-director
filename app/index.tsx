import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './app';

class Index extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PaperProvider>
    );
  }
}

export default Index;
