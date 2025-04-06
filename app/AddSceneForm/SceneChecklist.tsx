import React, { useState, useCallback, useEffect } from 'react';
import SceneChecklistItem from './SceneChecklistItem';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet } from 'react-native';
import { Checkbox, IconButton, List, Text, TextInput } from 'react-native-paper';

interface SceneChecklistProps {
    checklistData: SceneChecklistItemData[]
}

const SceneChecklist: React.FC<SceneChecklistProps> = ({ checklistData }: SceneChecklistProps) => {
    return (
        <View>
            {checklistData.map(itemData => {
                return (
                    <View style={styles.itemContainer}>
                        <Checkbox
                            status={itemData.checked ? 'checked' : 'unchecked'}
                            onPress={() => console.log(!itemData.checked)}
                        />

                        <TextInput
                            style={styles.textInput}
                            label="Item name"
                            value={itemData.name}
                            onChangeText={text => console.log(text)}
                            mode="outlined"
                        />

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
            })}
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
    },
    textInput: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

export default SceneChecklist;