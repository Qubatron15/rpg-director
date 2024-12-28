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

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

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

  function toggleModal() {
    setModalVisible(currentValue => !currentValue);
  }

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={styles.view}>
      <List.Accordion
        title="Uncontrolled Accordion - working?"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={true}>
        {
          scenesList.map(scene => <List.Item title={scene.name} key={scene.id} left={() => <List.Icon icon="terrain" />} />)
        }
      </List.Accordion>

      <Link href="/AddSceneForm/AddSceneForm">
        <IconButton
          style={styles.addButton}
          icon="plus"
          iconColor={MD3Colors.primary0}
          size={40}
          // onPress={toggleModal}
          mode="contained"
        />
      </Link>

      <Portal>
        <Modal visible={modalVisible} onDismiss={toggleModal} contentContainerStyle={containerStyle}>
          <AddSceneForm />
          {/* <Text>hahahah</Text> */}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    height: '100%',
    padding: 40
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  modalContainer: {
    padding: 20,
  }
});

export default ScenesList;

export const RenderScenesList = () => ScenesList({});