import { Component } from "react";
import { connect } from "react-redux";
import { Text } from 'react-native-paper';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { getSceneById, SceneData } from "../store/slices/scenesListSlice";

interface ViewSceneState {
    selectedSceneData: SceneData;
}

interface ViewSceneProps {
    navigation: any; // todo add the type
    route: any;
    scenesList: SceneData[]
    getSceneById: (id: number) => SceneData | undefined
}

class ViewScene extends Component<ViewSceneProps, ViewSceneState> {
    constructor(props: ViewSceneProps) {
        super(props);
        const { navigation } = props;
        const currentScene = this.getSceneData();

        if (!currentScene) navigation.goBack();

        navigation.setOptions({ title: currentScene!.name });

        this.state = { selectedSceneData: currentScene! };
    }

    getSceneData(): SceneData | undefined {
        const { route, getSceneById } = this.props;
        return getSceneById(Number(route.params.sceneId));
    }

    render() {
        this.getSceneData();

        return (
            <Text>
                <h1>{this.state.selectedSceneData.name}</h1>
                <p>{this.state.selectedSceneData.description}</p>
            </Text>
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
    getSceneById: (id: number) => getSceneById(state, id), // Create a wrapper function
});

export default connect(mapStateToProps)(ViewSceneWithNavigation);
