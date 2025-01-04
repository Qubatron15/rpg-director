import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { SceneData } from '../store/slices/scenesListSlice';

interface ScenesListProps {
  scenesList: SceneData[];
}

class ScenesList extends Component<ScenesListProps> {
  render() {
    const { scenesList } = this.props;

    return (
      <View>
        <List.Accordion
          title="Uncontrolled Accordion - working?"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={true}>
          {
            scenesList.map(scene => (
              <List.Item 
                title={scene.name} 
                key={scene.id} 
                left={() => <List.Icon icon="terrain" />} 
              />
            ))
          }
        </List.Accordion>
      </View>
    );
  }
}

// Map state to props using connect
const mapStateToProps = (state: any) => ({
  scenesList: state.scenesList,
});

// Connect the component to Redux
export default connect(mapStateToProps)(ScenesList);