import { Component } from 'react';
import { PaperProvider } from 'react-native-paper';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './app';

class Index extends Component {
  render() {
    // TODO - here to add the loading spinner when the app starts
    return (
        <App />
    );
  }
}

export default Index;
