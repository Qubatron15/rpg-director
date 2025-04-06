import React, { useState } from 'react';
import { SceneChecklistItemData } from '../store/slices/scenesListSlice';
import { View, StyleSheet } from 'react-native';
import { Checkbox, IconButton, Text, TextInput } from 'react-native-paper';

interface SceneChecklistProps {
    checklistData: SceneChecklistItemData[]
}

const SceneChecklist: React.FC<SceneChecklistProps> = ({ checklistData }: SceneChecklistProps) => {
    const [activeItem, setActiveItem] = useState<number | null>(null);

    return (
        <View>
            {checklistData.map((itemData: SceneChecklistItemData, index: number) => {
                return (
                    <View style={styles.itemContainer} key={index}>
                        <Checkbox
                            status={itemData.checked ? 'checked' : 'unchecked'}
                            onPress={() => console.log(!itemData.checked)}
                        />

                        {activeItem === index ?
                            <TextInput
                                style={styles.itemName}
                                label="Item name"
                                value={itemData.name}
                                onChangeText={text => console.log(text)}
                                mode="outlined"
                            />
                            :
                            <Text
                                variant="titleMedium"
                                style={styles.itemName}>{itemData.name}</Text>
                        }

                        {activeItem !== index ?
                            <IconButton
                                icon="chevron-up"
                                mode='contained'
                                size={25}
                                onPress={() => console.log('pressed')}
                            />
                            :
                            null
                        }

                        {activeItem !== index ?
                            <IconButton
                                icon="chevron-down"
                                mode='contained'
                                size={25}
                                onPress={() => console.log('pressed')}
                            />
                            :
                            null
                        }

                        {activeItem === index ?
                            <IconButton
                                icon="content-save-outline"
                                mode='contained'
                                size={25}
                                onPress={() => setActiveItem(index)}
                            />
                            :
                            <IconButton
                                icon="pencil"
                                mode='contained'
                                size={25}
                                onPress={() => setActiveItem(index)}
                            />
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