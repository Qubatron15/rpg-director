import React, { useEffect } from 'react';
import { ActivityIndicator, PaperProvider, Text } from 'react-native-paper';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import App from './app';
import { initScenesList } from './store/slices/scenesListSlice';
import { useGetAllScenesQuery } from './store/slices/apiSlice';
import { View } from 'react-native';

const Index = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllScenesQuery('');
  console.log('-0--------', data, error, isLoading);

  useEffect(() => { dispatch(initScenesList(data?.data ?? [])); }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <ActivityIndicator size="large" animating={true} /> : <App />}
    </View>
  );
};

export default Index;
