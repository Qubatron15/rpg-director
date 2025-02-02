import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './app';
import { useGetAllScenesQuery } from './store/slices/apiSlice';

const Index = () => {
  const { data, error, isLoading } = useGetAllScenesQuery('');
  console.log('-0--------', data, error, isLoading);

  // TODO - Add a loading spinner when the app starts
  return (
    <App />
  );
};

export default Index;
