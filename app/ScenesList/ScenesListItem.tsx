import { Component } from "react";
import { Divider, List, Menu, Text } from "react-native-paper";
import { connect } from "react-redux";
import { SceneData } from "../store/slices/scenesListSlice";
import { View } from "react-native";

interface ScenesListItemProps {
    name: string;
    description: string;
    id: number;
}

interface ScenesListItemState {
    sceneData: SceneData,
    menuVisible: boolean
}

class ScenesListItem extends Component<ScenesListItemProps, ScenesListItemState> {
    constructor(props: ScenesListItemProps) {
        super(props);

        this.state = {
            sceneData: {
                ...props
            },
            menuVisible: false
        }
    }

    openMenu() {
        this.setState({ menuVisible: true });
    }

    closeMenu() {
        this.setState({ menuVisible: false });
    }


    render() {
        const { name, description, id } = this.props;
        const { menuVisible } = this.state

        return (
            <Menu
                visible={menuVisible}
                onDismiss={this.closeMenu.bind(this)}
                anchor={<Text onLongPress={this.openMenu.bind(this)}>{name}{id}</Text>}
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
