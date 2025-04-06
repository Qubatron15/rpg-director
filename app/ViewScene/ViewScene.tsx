import React, { useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { MD3Colors, Surface, Text } from "react-native-paper";
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

  const selectedSceneData = useSelector((state: RootState) => getSceneById(state, sceneId));

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
      <ScrollView>
        <LoaderIndicator />

        <Surface style={styles.banner} elevation={4}>
          <Image
            style={styles.sceneImage}
            source={{ uri: selectedSceneData.image }}></Image>

          <Text
            style={styles.sceneTitle}
            variant="headlineMedium"
            numberOfLines={1}>
            {selectedSceneData.name}
          </Text>
        </Surface>

        <View style={styles.sceneDataContainer}>
          <Text variant="bodyLarge">{selectedSceneData.description}</Text>
        </View>
      </ScrollView>
      <BottomPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  banner: {
    width: '100%',
    height: '20%',
    minHeight: 190,

    position: 'relative',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sceneTitle: {
    margin: 20,
    color: MD3Colors.primary100,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    padding: 10,
    zIndex: 50,
    maxWidth: '60%'
  },
  sceneDataContainer: {
    padding: 20,
    // height: '100%'
  }
});

export default ViewScene;
