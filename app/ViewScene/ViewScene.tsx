import { Component } from "react";
import { connect } from "react-redux";
import { Text } from 'react-native-paper';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { getSceneById, SceneData } from "../store/slices/scenesListSlice";
import { View } from "react-native";

interface ViewSceneState {
    selectedSceneData: SceneData;
}

interface ViewSceneProps {
    navigation: any; // todo add the type
    route: any;
    scenesList: SceneData[]
    getSceneById: (id: string) => SceneData | undefined
}

class ViewScene extends Component<ViewSceneProps, ViewSceneState> {
    constructor(props: ViewSceneProps) {
        super(props);
        const { navigation } = props;
        const currentScene = this.getSceneData();
        debugger; // the scerne

        if (!currentScene) navigation.goBack(); // TODO - i think this is not working -_-

        navigation.setOptions({ title: currentScene!.name });

        this.state = { selectedSceneData: currentScene! };
    }

    getSceneData(): SceneData | undefined {
        const { route, getSceneById } = this.props;
        return getSceneById(route.params.sceneId);
    }

    render() {
        this.getSceneData();

        return (
            <View>
                <Text variant="titleLarge">{this.state.selectedSceneData.name}</Text>
                <Text variant="bodyMedium">{this.state.selectedSceneData.description}</Text>
            </View>
        )
    }
}

const ViewSceneWithNavigation = (props: Omit<ViewSceneProps, 'navigation'>) => {
    const navigation = useNavigation();
    const route = useRoute();
    return <ViewScene {...props} navigation={navigation} route={route} />
}

const mapStateToProps = (state: any) => ({ // todo - add type for store here
    scenesList: state.scenesList,
    getSceneById: (id: string) => getSceneById(state, id), // Create a wrapper function
});

export default connect(mapStateToProps)(ViewSceneWithNavigation);
