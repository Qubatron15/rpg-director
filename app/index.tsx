import * as React from 'react';
import { BottomNavigation, IconButton, MD3Colors, PaperProvider } from 'react-native-paper';
import { RenderScenesList } from './ScenesList/ScenesList';
import { RenderScenesMap } from './ScenesMap/ScenesMap';
import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { store } from './store/store';
import { Provider } from 'react-redux';
// import { useAppDispatch, useAppSelector } from './store/hooks'

export default function Index() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'scenesList', title: 'List', focusedIcon: 'view-list' },
    { key: 'sceneMap', title: 'Map', focusedIcon: 'map' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    scenesList: RenderScenesList,
    sceneMap: RenderScenesMap,
  });

  return (
    <PaperProvider>
      <Provider store={store}>
        <View style={styles.view}>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
          <Link href="/AddSceneForm/AddSceneForm"
            style={styles.addButton}>
            <IconButton
              icon="plus"
              iconColor={MD3Colors.primary0}
              size={40}
              mode="contained"
            />
          </Link>
        </View>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
});