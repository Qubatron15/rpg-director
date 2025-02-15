import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import App from './app';
import { initScenesList } from './store/slices/scenesListSlice';
import { useGetAllScenesQuery } from './store/slices/apiSlice';
import { View, StyleSheet } from 'react-native';

const Index = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllScenesQuery(''); // TODO - add error handling here

  useEffect(() => { dispatch(initScenesList(data?.data ?? [])); }, [isLoading]);

  return (
    <View style={styles.view}>
      {isLoading ? <ActivityIndicator size="large" animating={true} style={styles.spinner}/> : <App />}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  spinner: {
    flex: 1,
    verticalAlign: 'middle'
  }
});

export default Index;
