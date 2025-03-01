import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAllScenes, SceneData } from '../store/slices/scenesListSlice';
import ScenesListItem from './ScenesListItem';

// TODO - possibly component to remove
const ScenesList: React.FC = () => {
  const scenesList: SceneData[] = useSelector(getAllScenes);

  return (
    <ScrollView>
      {
        scenesList.map(scene => (
          <List.Item
            title={<ScenesListItem sceneData={scene} />}
            key={scene.id}
            left={() => <List.Icon icon="terrain" />}
          />
        ))
      }
    </ScrollView>
  );
}

export default ScenesList;
