import React, { FC } from 'react';
import { Text } from 'react-native-paper';

interface ScenesListProps {}

const ScenesList: FC<ScenesListProps> = () => (
  <Text>
    ScenesList Component updated
  </Text>
);

export default ScenesList;

export const RenderScenesList = () => ScenesList({});