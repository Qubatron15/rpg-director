import { Component } from "react";
import { Menu, Text } from "react-native-paper";
import { connect } from "react-redux";
import { deleteScene, SceneData } from "../store/slices/scenesListSlice";
import SceneTile from "./SceneTile";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

interface ScenesListItemProps {
    deleteScene: (scene: SceneData) => void;
    sceneData: SceneData,
    navigation: any // NavigationProp<ReactNavigation.RootParamList>; // todo - fix this any eventually
}

interface ScenesListItemState {
    menuVisible: boolean
}

class ScenesListItem extends Component<ScenesListItemProps, ScenesListItemState> {
    constructor(props: ScenesListItemProps) {
        super(props);

        this.state = {
            menuVisible: false
        }
    }

    openMenu() {
        this.setState({ menuVisible: true });
    }

    closeMenu() {
        this.setState({ menuVisible: false });
    }

    deleteScene() {
        this.props.deleteScene(this.props.sceneData);
    }

    viewScene() {
        debugger; // the press
        this.setState({menuVisible: false});
        this.props.navigation.navigate('ViewScene/ViewScene', { sceneId: this.props.sceneData.id });
    }

    render() {
        const { sceneData } = this.props;
        const { menuVisible } = this.state

        // TODO - mkake the DELETE option red here
        // TODO - check if this is poossible to add onLongPress to custom component
        return (
            <Menu
                visible={menuVisible}
                onDismiss={this.closeMenu.bind(this)}
                anchor={<Text onPress={this.viewScene.bind(this)} onLongPress={this.openMenu.bind(this)}><SceneTile sceneData={sceneData}/></Text>}
            >

                <Menu.Item onPress={this.viewScene.bind(this)} title="View" />
                <Menu.Item onPress={() => { }} title="Edit" />
                <Menu.Item onPress={this.deleteScene.bind(this)} title="Delete" />
                <Menu.Item onPress={() => { }} title="IDK - move?" />

            </Menu>
        )

    }
}

const mapDispatchToProps = {
    deleteScene,
}


const ScenesListItemFunctionWrapper = (props: Omit<ScenesListItemProps, 'navigation'>) => {
    const navigation = useNavigation();
    return <ScenesListItem {...props} navigation={navigation} />
}

export default connect(null, mapDispatchToProps)(ScenesListItemFunctionWrapper);
