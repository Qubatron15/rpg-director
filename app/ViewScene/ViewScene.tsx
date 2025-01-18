import { Component } from "react";
import { connect } from "react-redux";
import { Text } from 'react-native-paper';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { getSceneById, SceneData } from "../store/slices/scenesListSlice";

interface ViewSceneProps {
    navigation: any; // todo add the type
    route: any;
    scenesList: SceneData[]
    getSceneById: (id: number) => SceneData | undefined
}

class ViewScene extends Component<ViewSceneProps> {
    constructor(props: ViewSceneProps) {
        super(props);
        const currentSceneName = props.scenesList.find(scene => scene.id === props.route.params.sceneId)?.name ?? 'Untitled scene';
        props.navigation.setOptions({ title: currentSceneName });
    }

    getSceneData() {
        const { route, getSceneById } = this.props;
        const scene = getSceneById(Number(route.params.sceneId)); // Correct usage with both arguments provided
        console.log('+++++', scene);
    }

    render() {
        this.getSceneData();

        return (
            <Text>This is view scene view {this.props.route.params.sceneId}</Text>
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
