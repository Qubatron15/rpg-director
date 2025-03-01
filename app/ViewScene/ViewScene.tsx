import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSceneById } from "../store/slices/scenesListSlice";
import LoaderIndicator from "../LoaderIndicator";
import BottomPlayer from "../audio-manager/BottomPlayer/BottomPlayer";

const ViewScene: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const sceneId = (route.params as { sceneId: string }).sceneId;

  const selectedSceneData = useSelector((state: RootState[]) => getSceneById(state, sceneId));

  useEffect(() => {
    if (!selectedSceneData) {
      navigation.navigate("index"); // TODO - here we can consider fetching only one scene from DB if it's missing
    } else {
      navigation.setOptions({ title: selectedSceneData.name });
    }
  }, [selectedSceneData, navigation]);

  if (!selectedSceneData) return null;

  return (
    <View style={styles.container}>
      <LoaderIndicator />
      <View>
        <Text variant="titleLarge">{selectedSceneData.name}</Text>
        <Text variant="bodyMedium">{selectedSceneData.description}</Text>
      </View>
      <BottomPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

export default ViewScene;
