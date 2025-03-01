import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, IconButton, MD3Colors, Text } from 'react-native-paper';

const PlaylistItem: React.FC = () => {
    return (
        <View style={styles.container}>
            <Icon
                source="volume-high"
                size={20}></Icon>
            <Text>
                Item Name
            </Text>
            <IconButton
                icon="play"
                mode='contained'
                iconColor={MD3Colors.tertiary0}
                containerColor={MD3Colors.tertiary90}
                style={styles.iconButton}
                size={30}
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        margin: 0
    }
});

export default PlaylistItem;