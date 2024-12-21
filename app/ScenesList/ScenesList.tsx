import React, { FC } from 'react';
import { View } from 'react-native';
import { List, Text } from 'react-native-paper';

interface ScenesListProps { }

const ScenesList: FC<ScenesListProps> = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Accordion
        title="Uncontrolled Accordion - working?"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </View>
  );
}

export default ScenesList;

export const RenderScenesList = () => ScenesList({});