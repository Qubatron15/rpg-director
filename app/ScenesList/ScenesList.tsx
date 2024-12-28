import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, List, MD3Colors, Modal, Portal, Text } from 'react-native-paper';
import AddSceneForm from '../AddSceneForm/AddSceneForm';
import { Link } from 'expo-router';

interface ScenesListProps { }

interface SceneData {
  id: number;
  name: string;
}

const ScenesList: FC<ScenesListProps> = () => {
  const [scenesList, setScenesList] = React.useState<SceneData[]>([
    {
      id: 1,
      name: 'Attic'
    },
    {
      id: 2,
      name: 'Polio'
    },
    {
      id: 3,
      name: 'Titanic'
    }
  ]);

  return (
    <View>
      <List.Accordion
        title="Uncontrolled Accordion - working?"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={true}>
        {
          scenesList.map(scene => <List.Item title={scene.name} key={scene.id} left={() => <List.Icon icon="terrain" />} />)
        }
      </List.Accordion>
    </View>
  );
}

export default ScenesList;

export const RenderScenesList = () => ScenesList({});