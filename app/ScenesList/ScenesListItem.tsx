import React, { useCallback, useState } from "react";
import { Menu, ProgressBar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteScene, SceneData } from "../store/slices/scenesListSlice";
import SceneTile from "./SceneTile";
import { useNavigation } from "expo-router";
import { useDeleteSceneMutation } from "../store/slices/apiSlice";
import { Pressable, View } from "react-native";

interface ScenesListItemProps {
    sceneData: SceneData,
}

const ScenesListItem: React.FC<ScenesListItemProps> = ({ sceneData }: ScenesListItemProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [requestDeleteScene, { isLoading, isError }] = useDeleteSceneMutation();

    const [menuVisible, setMenuVisible] = useState(false);

    const handleOpenMenu = useCallback(() => {
        setMenuVisible(true);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setMenuVisible(false);
    }, []);

    const handleViewScene = useCallback(() => {
        setMenuVisible(false);
        navigation.navigate('ViewScene/ViewScene', { sceneId: sceneData.id });
    }, []);

    const handleEditScene = useCallback(() => {
        setMenuVisible(false);
        navigation.navigate('AddSceneForm/AddSceneForm', { sceneId: sceneData.id });
    }, []);

    const handleDeleteScene = useCallback(async () => {
        try {
            await requestDeleteScene(sceneData.id).unwrap();
            dispatch(deleteScene(sceneData)); // TODO - use extrareducers here or sht without running it separately
        } catch (error) {
            console.error("Failed to delete scene:", error);
        }
    }, []);

    return (
        <View>
            <Menu
                visible={menuVisible}
                onDismiss={handleCloseMenu}
                anchor={
                    <Pressable onPress={handleViewScene} onLongPress={handleOpenMenu}>
                        <SceneTile sceneData={sceneData} />
                    </Pressable>
                }
            >

                <Menu.Item onPress={handleViewScene} title="View" />
                <Menu.Item onPress={handleEditScene} title="Edit" />
                <Menu.Item onPress={handleDeleteScene} title="Delete" />
                <Menu.Item onPress={() => { }} title="IDK - move?" />

            </Menu>
        </View>
    )
}

export default ScenesListItem;
