import { ScrollView, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAllScenes, SceneData } from '../store/slices/scenesListSlice';
import ScenesListItem from './ScenesListItem';

interface ScenesListProps {
  viewMode: 'list' | 'tiles'
}

const ScenesList: React.FC<ScenesListProps> = ({ viewMode }: ScenesListProps) => {
  const scenesList: SceneData[] = useSelector(getAllScenes);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.scenesListContainer}>
        {
          scenesList.map(scene => (
              <ScenesListItem sceneData={scene} viewMode={viewMode} key={scene.id} />
          ))
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxWidth: '100%'
  },
  scenesListContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
  }
});

export default ScenesList;
