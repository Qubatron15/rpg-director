// import { Link } from "expo-router";
// import { Text, View, StyleSheet } from "react-native";

import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
// import MapScreen from './map';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';

export default function Index() {
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <Text>Edit app/index.tsx to edit this screen.</Text>
  //     <Link href="/map" style={styles.button}>
  //       go to map
  //     </Link>
  //   </View>
  // );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'sceneList', title: 'List', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'sceneMap', title: 'Map', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    sceneList: ScenesList,
    sceneMap: ScenesMap,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#fff',
//   },
//   button: {
//     fontSize: 20,
//     textDecorationLine: 'underline',
//     color: '#fff',
//   },
// });
