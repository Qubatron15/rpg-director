import { Component } from "react";
import { connect } from "react-redux";
import { Text } from 'react-native-paper';
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { SceneData } from "../store/slices/scenesListSlice";

interface ViewSceneProps {
    navigation: any; // todo add the type
    route: any;
    scenesList: SceneData[]
}

class ViewScene extends Component<ViewSceneProps> {
    constructor(props: ViewSceneProps) {
        super(props);
        const currentSceneName = props.scenesList.find(scene => scene.id === props.route.params.sceneId)?.name ?? 'Untitled scene';
        props.navigation.setOptions({ title: currentSceneName });
    }

    render() {
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
});

export default connect(mapStateToProps)(ViewSceneWithNavigation);
