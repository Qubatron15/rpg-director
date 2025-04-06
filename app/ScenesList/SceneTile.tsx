import React, { Component } from "react";
import { SceneData } from "../store/slices/scenesListSlice";
import { connect } from "react-redux";
import { Chip, MD3Colors, Surface, Text } from "react-native-paper";
import { StyleSheet, View, Image } from 'react-native';


interface SceneTileProps {
    sceneData: SceneData
    viewMode: 'list' | 'tiles'
}

const SceneTile: React.FC<SceneTileProps> = ({ sceneData, viewMode }: SceneTileProps) => {
    return (
        <Surface
            style={
                {
                    ...styles.tile,
                    aspectRatio: viewMode === 'list' ? undefined : '1 / 1'
                }
            }
            elevation={4}>
            <Image
                style={styles.sceneImage}
                source={{ uri: sceneData.image }}></Image>
            <Text
                style={
                    {
                        ...styles.tileText,
                        padding: viewMode === 'list' ? 20 : 5
                    }
                }
                variant={viewMode === 'list' ? 'headlineMedium' : 'headlineSmall'}
                numberOfLines={1}>{sceneData.name}</Text>
        </Surface>
    )
}

const styles = StyleSheet.create({
    tile: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    sceneImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    tileText: {
        color: MD3Colors.primary100,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        bottom: 0,
    }
});

export default SceneTile;