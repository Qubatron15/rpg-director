import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Chip, Divider, FAB, MD3Colors, Surface, Text } from "react-native-paper";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSceneById, SceneChecklistItemData } from "../store/slices/scenesListSlice";
import LoaderIndicator from "../LoaderIndicator";
import BottomPlayer from "../audio-manager/BottomPlayer/BottomPlayer";
import { useUpdateSceneMutation } from "../store/slices/apiSlice";

const ViewScene: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const sceneId = (route.params as { sceneId: string }).sceneId;
  const selectedSceneData = useSelector((state: RootState) => getSceneById(state, sceneId));
  const [sceneChecklist, setSceneChecklist] = useState<SceneChecklistItemData[]>([])
  const [checklistChanged, setChecklistChanged] = useState<boolean>(false);
  const checklistChangedRef = useRef(checklistChanged);
  const [requestUpdateScene, updateSceneQuery] = useUpdateSceneMutation();


  useEffect(() => {
    if (!selectedSceneData) {
      navigation.navigate("index"); // TODO - here we can consider fetching only one scene from DB if it's missing
    } else {
      navigation.setOptions({ title: selectedSceneData.name });
      setSceneChecklist([...(selectedSceneData.checklist?.map(item => ({ name: item.name, checked: item.checked })) ?? [])])
    }
  }, [selectedSceneData, navigation]);

  /**
   * Update scene items list (if changed) when leaving the screen.
   */
  useFocusEffect(
    useCallback(() => {
      // Screen is focused
      return () => {
        // Screen is unfocused
        if (!selectedSceneData || !checklistChanged) return;

        try {
          requestUpdateScene({
            ...selectedSceneData,
            checklist: sceneChecklist
          });
        } catch (error) {
          console.error("Failed to update scene checklist:", error);
        }
      };
    }, [checklistChanged])
  );

  const handleItemSelectionChange = (index: number) => {
    setChecklistChanged(true);
    const updatdChecklist = [...sceneChecklist];
    updatdChecklist[index].checked = !sceneChecklist[index].checked
    setSceneChecklist(updatdChecklist);
  }

  const handleEditScene = () => {
    navigation.navigate('AddSceneForm/AddSceneForm', { sceneId: selectedSceneData.id });
  }

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

          <Divider style={{ marginTop: 15, marginBottom: 15 }} />

          {sceneChecklist.length ? <Text variant="headlineSmall">Checklist</Text> : null}
          <View style={styles.chipsContainer}>
            {sceneChecklist.map((itemData: SceneChecklistItemData, index: number) => {
              return (
                <Chip
                  key={index}
                  style={styles.itemChip}
                  selected={itemData.checked}
                  showSelectedOverlay={true}
                  showSelectedCheck={true}
                  onPress={() => handleItemSelectionChange(index)}>
                  {itemData.name}
                </Chip>
              )
            })}
          </View>
        </View>
      </ScrollView>
      <FAB
        style={styles.editSceneButton}
        icon="pencil"
        onPress={handleEditScene}
      />
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
    color: MD3Colors.primary100,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    padding: 20,
    width: '100%',
    zIndex: 50,
  },
  sceneDataContainer: {
    padding: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 10,
    marginBottom: 10
  },
  itemChip: {
    maxWidth: '100%'
  },
  editSceneButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
});

export default ViewScene;
