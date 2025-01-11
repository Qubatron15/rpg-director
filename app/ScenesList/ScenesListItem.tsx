import { Component } from "react";
import { Divider, List, Menu, Text } from "react-native-paper";
import { connect } from "react-redux";
import { SceneData } from "../store/slices/scenesListSlice";
import { View } from "react-native";
import SceneTile from "./SceneTile";

interface ScenesListItemProps {
    sceneData: SceneData
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
        // anchor={<Text onLongPress={this.openMenu.bind(this)}>{name}{id}</Text>}
    }


    render() {
        const { sceneData } = this.props;
        const { menuVisible } = this.state

        return (
            <Menu
                visible={menuVisible}
                onDismiss={this.closeMenu.bind(this)}
                anchor={<Text onLongPress={this.openMenu.bind(this)}><SceneTile sceneData={sceneData}/></Text>}
                
            >

                <Menu.Item onPress={() => { }} title="Item 1" />
                <Menu.Item onPress={() => { }} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => { }} title="Item 3" />

            </Menu>
        )

    }
}

export default connect()(ScenesListItem);
