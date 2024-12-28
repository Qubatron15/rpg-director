import * as React from 'react';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { RenderScenesList } from './ScenesList/ScenesList';
import { RenderScenesMap } from './ScenesMap/ScenesMap';

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
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}
