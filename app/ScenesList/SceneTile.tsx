import { Component } from "react";
import { SceneData } from "../store/slices/scenesListSlice";
import { connect } from "react-redux";
import { Chip, Text } from "react-native-paper";
import { StyleSheet } from 'react-native';


interface SceneTimeProps {
    sceneData: SceneData
}

// TODO - this component should contain tile with graphic for every scene
class SceneTile extends Component<SceneTimeProps> {
    render() {
        const { name, id } = this.props.sceneData;

        return (
            <Text>{name},{id}</Text>
        )
    }
}

const styles = StyleSheet.create({
    tile: {
        width: '100%'
    }
});

export default connect()(SceneTile)