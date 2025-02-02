import React from 'react';
import { PaperProvider, Text } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './app';
import { useGetAllScenesQuery } from './store/slices/apiSlice';
import { View } from 'react-native';

const Index = () => {
  const { data, error, isLoading } = useGetAllScenesQuery('');
  console.log('-0--------', data, error, isLoading);

  // TODO - Add a loading spinner when the app starts
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <Text>LOADING...</Text> : <App />}
    </View>
  );
};

export default Index;
