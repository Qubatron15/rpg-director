import React, { useEffect, useState } from 'react';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet, Touchable, Pressable } from 'react-native';
import { Checkbox, IconButton, Text, TextInput } from 'react-native-paper';

interface SceneChecklistProps {
    checklistData: SceneChecklistItemData[];
    onItemUpdate: (updatdChecklist: SceneChecklistItemData[]) => void
}

const SceneChecklist: React.FC<SceneChecklistProps> = ({ checklistData, onItemUpdate }: SceneChecklistProps) => {
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
    const [activeItemData, setActiveItemData] = useState<SceneChecklistItemData>({ checked: false, name: '' });

    useEffect(() => {
        if (activeItemData.name && activeItemIndex !== null) {
            const updatdChecklist = [...checklistData];
            updatdChecklist[activeItemIndex] = activeItemData;
            onItemUpdate(updatdChecklist);
        }

        if (activeItemIndex === null) {
            setActiveItemData({ checked: false, name: '' });
            return;
        }

        setActiveItemData({
            checked: checklistData[activeItemIndex].checked,
            name: checklistData[activeItemIndex].name
        });
    }, [activeItemIndex])

    const submitItemChange = (newSelectedIndex: number) => {
        if (activeItemData.name && activeItemIndex !== null) {
            const updatdChecklist = [...checklistData];
            updatdChecklist[activeItemIndex] = activeItemData;
            onItemUpdate(updatdChecklist);
        }

        if (newSelectedIndex === null) {
            setActiveItemData({ checked: false, name: '' });
            return;
        }

        setActiveItemData({
            checked: checklistData[newSelectedIndex].checked,
            name: checklistData[newSelectedIndex].name
        });

        setActiveItemIndex(newSelectedIndex)
    }

    const handleNameChange = (newName: string) => {
        if (!activeItemData) return;

        activeItemData.name = newName;
        setActiveItemData({ ...activeItemData });
    }

    return (
        <View>
            {checklistData.map((itemData: SceneChecklistItemData, index: number) => {
                return (
                    <View style={styles.itemContainer} key={index}>
                        <Checkbox
                            status={itemData.checked ? 'checked' : 'unchecked'}
                            onPress={() => console.log(!itemData.checked)}
                        />

                        {activeItemIndex === index ?
                            <TextInput
                                style={styles.itemName}
                                label="Item name"
                                value={activeItemData.name}
                                onChangeText={handleNameChange}
                                mode="outlined"
                            />
                            :
                            <Pressable onPress={() => submitItemChange(index)} style={styles.itemName}>
                                <Text variant="titleMedium">{itemData.name}</Text>
                            </Pressable>
                        }

                        {activeItemIndex !== index ?
                            <IconButton
                                icon="chevron-up"
                                mode='contained'
                                size={25}
                                onPress={() => console.log('pressed')}
                            />
                            :
                            null
                        }

                        {activeItemIndex !== index ?
                            <IconButton
                                icon="chevron-down"
                                mode='contained'
                                size={25}
                                onPress={() => console.log('pressed')}
                            />
                            :
                            null
                        }

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
    itemName: {
        flexGrow: 1,
        flexShrink: 1,
    }
});

export default SceneChecklist;