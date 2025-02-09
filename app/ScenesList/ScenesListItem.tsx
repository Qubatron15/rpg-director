import React, { useCallback, useState } from "react";
import { Menu, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteScene, SceneData } from "../store/slices/scenesListSlice";
import SceneTile from "./SceneTile";
import { useNavigation } from "expo-router";
import { useDeleteSceneMutation } from "../store/slices/apiSlice";

interface ScenesListItemProps {
    sceneData: SceneData,
}

const ScenesListItem: React.FC<ScenesListItemProps> = ({ sceneData }: ScenesListItemProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [requestDeleteScene, { isLoading }] = useDeleteSceneMutation();

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

    const handleDeleteScene = useCallback(async () => {
        try {
            // TODO - add a spinner here
            await requestDeleteScene(sceneData.id).unwrap();
            dispatch(deleteScene(sceneData));
        } catch (error) {
            console.error("Failed to delete scene:", error);
        }
    }, []);

    return (
        <Menu
            visible={menuVisible}
            onDismiss={handleCloseMenu}
            anchor={<Text onPress={handleViewScene} onLongPress={handleOpenMenu}><SceneTile sceneData={sceneData} /></Text>}
        >

            <Menu.Item onPress={handleViewScene} title="View" />
            <Menu.Item onPress={() => { }} title="Edit" />
            <Menu.Item onPress={handleDeleteScene} title="Delete" />
            <Menu.Item onPress={() => { }} title="IDK - move?" />

        </Menu>
    )
}

export default ScenesListItem;