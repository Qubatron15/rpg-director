import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import App from './app';
import { initScenesList } from './store/slices/scenesListSlice';
import { useGetAllScenesQuery } from './store/slices/apiSlice';
import { View, StyleSheet } from 'react-native';
import LoaderIndicator from './LoaderIndicator';
import BottomPlayer from './audio-manager/BottomPlayer/BottomPlayer';

const Index = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllScenesQuery(''); // TODO - add error handling here

  useEffect(() => { 
    console.log('INITTTTT');
    dispatch(initScenesList(data?.data ?? []));
  }, [isLoading]);

  return (
    <View style={styles.view}>
      { !isLoading && <LoaderIndicator /> }
      {isLoading ? <ActivityIndicator size="large" animating={true} style={styles.spinner}/> : <App />}
      <BottomPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    verticalAlign: 'middle'
  }
});

export default Index;
