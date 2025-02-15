import { Component } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { SceneData } from '../store/slices/scenesListSlice';
import ScenesListItem from './ScenesListItem';

interface ScenesListProps {
  scenesList: SceneData[];
}

class ScenesList extends Component<ScenesListProps> {
  render() {
    const { scenesList } = this.props;

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
}

const mapStateToProps = (state: any) => ({ // todo - add type for store here
  scenesList: state.scenesList,
});

export default connect(mapStateToProps)(ScenesList);
