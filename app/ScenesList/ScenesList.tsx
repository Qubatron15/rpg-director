import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, List, MD3Colors, Modal, Portal, Text } from 'react-native-paper';
import AddSceneForm from '../AddSceneForm/AddSceneForm';
import { Link } from 'expo-router';
import { SceneData } from '../store/slices/scenesListSlice';
import { useSelector } from 'react-redux';

interface ScenesListProps { }

const ScenesList: FC<ScenesListProps> = () => {
  const scenesList: SceneData[] = useSelector((state: any) => state.scenesList);

  // const [scenesList, setScenesList] = React.useState<SceneData[]>([
  //   {
  //     id: 3,
  //     name: 'Titanic'
  //   }
  // ]);

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