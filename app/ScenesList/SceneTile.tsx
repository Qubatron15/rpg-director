import React, { Component } from "react";
import { SceneData } from "../store/slices/scenesListSlice";
import { connect } from "react-redux";
import { Chip, MD3Colors, Surface, Text } from "react-native-paper";
import { StyleSheet, View, Image } from 'react-native';


interface SceneTileProps {
    sceneData: SceneData
}

const SceneTile: React.FC<SceneTileProps> = ({ sceneData }: SceneTileProps) => {
    return (
        <Surface
            style={styles.tile}
            elevation={4}>
            <Image
                style={styles.sceneImage}
                source={{ uri: sceneData.image }}></Image>
            <Text
                style={styles.tileText}
                variant="headlineMedium"
                numberOfLines={1}>{sceneData.name}</Text>
        </Surface>
    )
}

const styles = StyleSheet.create({
    tile: {
        width: '100%',
    },
    sceneImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    tileText: {
        padding: 20,
        color: MD3Colors.primary100,
        backgroundColor: 'rgba(0, 0, 0, .6)',
    }
});

export default SceneTile;