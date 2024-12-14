import React, { FC } from 'react';
import { Text } from 'react-native-paper';


interface ScenesMapProps {}

const ScenesMap: FC<ScenesMapProps> = () => (
  <Text>
    ScenesMap Component
  </Text>
);

export default ScenesMap;

export const RenderScenesMap = () => ScenesMap({});
