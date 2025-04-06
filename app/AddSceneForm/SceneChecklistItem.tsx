import React, { useState, useCallback, useEffect } from 'react';
import { Button, HelperText, TextInput, Text, IconButton, MD3Colors, Menu, Surface, Checkbox } from 'react-native-paper';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet } from 'react-native';

interface SceneChecklistItemProps {
    itemData: SceneChecklistItemData;
}

// TODO component to remove
const SceneChecklistItem: React.FC<SceneChecklistItemProps> = ({ itemData }: SceneChecklistItemProps) => {
    return (
        <View style={styles.itemContainer}>
            <Checkbox
                status={itemData.checked ? 'checked' : 'unchecked'}
                onPress={() => console.log(!itemData.checked)}
            />
            <Text>{itemData.name}</Text>
            <IconButton
                icon="chevron-up"
                mode='contained'
                size={25}
                onPress={() => console.log('pressed')}
            />
            <IconButton
                icon="chevron-down"
                mode='contained'
                size={25}
                onPress={() => console.log('pressed')}
            />
            <IconButton
                icon="trash-can"
                mode='contained'
                size={25}
                onPress={() => console.log('pressed')}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default SceneChecklistItem;