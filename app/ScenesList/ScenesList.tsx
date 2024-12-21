import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, List, MD3Colors, Text } from 'react-native-paper';

interface ScenesListProps { }

interface SceneData {
  id: number;
  name: string;
}

const ScenesList: FC<ScenesListProps> = () => {
  // const [expanded, setExpanded] = React.useState(true);

  // const handlePress = () => setExpanded(!expanded);

  const [scenesList, setScenesList] = React.useState<SceneData[]>([]);
  // setscenesList(
  //   [
  //     {
  //       id: 1,
  //       name: 'Attic'
  //     },
  //     {
  //       id: 2,
  //       name: 'Polio'
  //     },
  //     {
  //       id: 3,
  //       name: 'Titanic'
  //     }
  //   ]
  // );

  function addScene() {
    console.log('ADDED');
    setScenesList((currentScenes: SceneData[]) => {
      const newScene: SceneData = {
        id: new Date().getTime(),
        name: new Date().toISOString(),
      }

      return [...currentScenes, newScene];
    });
  }

  return (
    <View style={styles.view}>
      <List.Accordion
        title="Uncontrolled Accordion - working?"
        left={props => <List.Icon {...props} icon="folder" />}>
        {/* <List.Item title="First item" /> */}
        {/* <List.Item title="Second item" /> */}
        {
          scenesList.map(scene => <List.Item title={scene.name} key={scene.id} />)
        }
      </List.Accordion>

      {/* <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion> */}

      <IconButton
        style={styles.addButton}
        icon="camera"
        iconColor={MD3Colors.primary0}
        size={40}
        onPress={addScene}
        mode="contained"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    height: '100%'
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});

export default ScenesList;

export const RenderScenesList = () => ScenesList({});