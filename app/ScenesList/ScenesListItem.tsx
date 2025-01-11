import { Component } from "react";
import { List } from "react-native-paper";
import { connect } from "react-redux";

interface ScenesListItemProps {
    sceneName: string;
    sceneDescription: string;
    id: number;
}

class ScenesListItem extends Component<ScenesListItemProps> {
    render() {
        const { sceneName, sceneDescription, id } = this.props;

        return (
            <List.Item
                title={sceneName}
                key={id}
                left={() => <List.Icon icon="terrain" />}
            />
        )

    }
}

export default connect()(ScenesListItem);
