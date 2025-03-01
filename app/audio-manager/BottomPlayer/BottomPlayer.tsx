import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, MD3Colors, Surface, Text } from "react-native-paper";

const BottomPlayer: React.FC = () => {
    return (
        <Surface
            style={styles.container}
            elevation={1}>
            <Text
                variant="headlineMedium"
                style={styles.songTitle}>title</Text>
            <IconButton
                icon="volume-minus"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="volume-plus"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="pause"
                mode='contained'
                iconColor={MD3Colors.primary0}
                containerColor={MD3Colors.primary90}
                size={50}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="playlist-music"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={45}
                onPress={() => console.log('Pressed')}
            />
        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 4
    },
    songTitle: {
        width: '30%',
    }
});

export default BottomPlayer;