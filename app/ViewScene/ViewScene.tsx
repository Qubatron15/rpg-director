import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSceneById, SceneData } from "../store/slices/scenesListSlice";

const ViewScene: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const sceneId = (route.params as { sceneId: string }).sceneId;

  const selectedSceneData = useSelector((state: RootState[]) => getSceneById(state, sceneId));

  useEffect(() => {
    if (!selectedSceneData) {
      navigation.navigate("index");
    } else {
      navigation.setOptions({ title: selectedSceneData.name });
    }
  }, [selectedSceneData, navigation]);

  if (!selectedSceneData) return null;

  return (
    <View>
      <Text variant="titleLarge">{selectedSceneData.name}</Text>
      <Text variant="bodyMedium">{selectedSceneData.description}</Text>
    </View>
  );
};

export default ViewScene;
