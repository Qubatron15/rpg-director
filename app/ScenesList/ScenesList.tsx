import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAllScenes, SceneData } from '../store/slices/scenesListSlice';
import ScenesListItem from './ScenesListItem';

const ScenesList: React.FC = () => {
  const scenesList: SceneData[] = useSelector(getAllScenes);

  return (
    <ScrollView>
      <List.Accordion
        title="Uncontrolled Accordion - working?"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={true}>
        {
          scenesList.map(scene => (
            <List.Item
              title={<ScenesListItem sceneData={scene} />}
              key={scene.id}
              left={() => <List.Icon icon="terrain" />}
            />
          ))
        }
      </List.Accordion>
    </ScrollView>
  );
}

export default ScenesList;
