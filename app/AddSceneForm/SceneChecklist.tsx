import React, { useCallback, useEffect, useState } from 'react';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet, Touchable, Pressable } from 'react-native';
import { Checkbox, Chip, Divider, IconButton, MD3Colors, Surface, Text, TextInput } from 'react-native-paper';

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
        // the "V" button in the chip
        if (newSelectedIndex == activeItemIndex) {
            const updatdChecklist = [...checklistData];
            updatdChecklist[activeItemIndex!] = activeItemData;
            onItemUpdate(updatdChecklist);

            setActiveItemData({
                checked: checklistData[newSelectedIndex].checked,
                name: checklistData[newSelectedIndex].name
            });
            setActiveItemIndex(null);
            return;
        }

        // selecting other chip than the current
        if (formDirty) {
            const updatdChecklist = [...checklistData];
            updatdChecklist[activeItemIndex!] = activeItemData;
            onItemUpdate(updatdChecklist);
        }

        // selecting chip when nothing is current
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

    const handleItemSelectionChange = (index: number) => {
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
        setNewItemData({ name: '', checked: false })
        onItemUpdate(updatdChecklist);
        setFormDirty(true);
    }

    return (
        <View>
            <Text variant="headlineSmall">Checklist</Text>

            {/* EXISTING ITEMS LIST */}
            <View style={styles.chipsContainer}>
                {checklistData.map((itemData: SceneChecklistItemData, index: number) => {
                    if (activeItemIndex === index) return (
                        <View style={styles.editItemChip} key={index}>
                            <TextInput
                                style={styles.editItemInput}
                                label="Update item name"
                                value={activeItemData.name}
                                onChangeText={handleNameChange}
                                mode="outlined"
                            />
                            <IconButton
                                onPress={() => submitItemChange(activeItemIndex)}
                                icon="check"
                                size={25}
                            />
                        </View>
                    );
                    return (
                        <Chip
                            key={index}
                            style={styles.itemChip}
                            selected={itemData.checked}
                            showSelectedOverlay={true}
                            showSelectedCheck={true}
                            onLongPress={() => submitItemChange(index)}
                            onPress={() => handleItemSelectionChange(index)}
                            onClose={() => handleDeleteItem(index)}>
                            {itemData.name}
                        </Chip>
                    )
                })}
            </View>

            {/* ADD NEW ITEM INPUT */}
            {activeItemIndex === null ?
                <View style={{
                    ...styles.editItemChip,
                    backgroundColor: MD3Colors.primary90
                }}>
                    <TextInput
                        style={styles.editItemInput}
                        label="Add new item"
                        value={newItemData.name}
                        onChangeText={(value) => setNewItemData({ ...newItemData, name: value })}
                        mode="outlined"
                    />
                    <IconButton
                        icon="plus"
                        size={25}
                        disabled={!newItemData.name}
                        onPress={handleAddNewItem}
                    />
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        marginTop: 10,
        marginBottom: 10
    },
    itemChip: {
        maxWidth: '100%'
    },
    editItemChip: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 8,
        padding: 8,
        backgroundColor: MD3Colors.primary90
    },
    editItemInput: {
        flexGrow: 1
    }
});

export default SceneChecklist;