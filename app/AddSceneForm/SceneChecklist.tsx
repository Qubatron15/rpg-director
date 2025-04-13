import React, { useCallback, useEffect, useState } from 'react';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet, Touchable, Pressable } from 'react-native';
import { Checkbox, Divider, IconButton, Surface, Text, TextInput } from 'react-native-paper';

interface SceneChecklistProps {
    checklistData: SceneChecklistItemData[];
    onItemUpdate: (updatdChecklist: SceneChecklistItemData[]) => void
}

const SceneChecklist: React.FC<SceneChecklistProps> = ({ checklistData, onItemUpdate }: SceneChecklistProps) => {
    const [formDirty, setFormDirty] = useState<boolean>(false);
    const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
    const [activeItemData, setActiveItemData] = useState<SceneChecklistItemData>({ checked: false, name: '' });
    const [newItemData, setNewItemData] = useState<SceneChecklistItemData>({ checked: false, name: '' });

    const submitItemChange = (newSelectedIndex: number) => {
        if (formDirty) {
            const updatdChecklist = [...checklistData];
            updatdChecklist[activeItemIndex!] = activeItemData;
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

    const handleNameChange = useCallback((newName: string) => {
        setFormDirty(true);

        activeItemData.name = newName;
        setActiveItemData({ ...activeItemData });
    }, []);

    const handleCheckboxChange = (index: number) => {
        setFormDirty(true);

        const updatdChecklist = [...checklistData];
        const updatedItem = { ...checklistData[index] }
        updatedItem.checked = !updatedItem.checked
        updatdChecklist[index] = updatedItem;
        onItemUpdate(updatdChecklist);
    }

    const handleDeleteItem = (index: number) => {
        const updatdChecklist = [...checklistData];
        updatdChecklist.splice(index, 1);
        onItemUpdate(updatdChecklist);
        setFormDirty(true);
    }

    const handleAddNewItem = () => {
        const updatdChecklist = [...checklistData];
        updatdChecklist.push(newItemData);
        setNewItemData({name: '', checked: false})
        onItemUpdate(updatdChecklist);
        setFormDirty(true);
    }

    return (
        <View>
            {/* EXISTING ITEMS LIST */}
            {checklistData.map((itemData: SceneChecklistItemData, index: number) => {
                return (
                    <Surface elevation={1} style={styles.itemContainer} key={index}>
                        <Checkbox
                            status={itemData.checked ? 'checked' : 'unchecked'}
                            onPress={() => handleCheckboxChange(index)}
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

                        {/* {activeItemIndex !== index ?
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
                        } */}

                        <IconButton
                            icon="trash-can"
                            mode='contained'
                            size={25}
                            onPress={() => handleDeleteItem(index)}
                        />
                    </Surface>
                )
            })}

            {/* ADD NEW ITEM INPUT */}
            <View style={styles.itemContainer}>
                <Checkbox
                    status={newItemData.checked ? 'checked' : 'unchecked'}
                    onPress={() => setNewItemData({ ...newItemData, checked: !newItemData.checked })}
                />

                <TextInput
                    style={styles.itemName}
                    label="Add new item"
                    value={newItemData.name}
                    onChangeText={(value) => setNewItemData({ ...newItemData, name: value })}
                    mode="outlined"
                />

                <IconButton
                    icon="plus"
                    mode='contained'
                    size={25}
                    disabled={!newItemData.name}
                    onPress={handleAddNewItem}
                />
            </View>
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
        marginTop: 10,
        // paddingBottom: 8
    },
    itemName: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: 8
    }
});

export default SceneChecklist;