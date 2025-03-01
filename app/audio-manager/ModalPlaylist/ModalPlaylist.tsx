import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, List, MD3Colors, Text } from 'react-native-paper';
import PlaylistItem from './PlaylistItem';

const ModalPlaylist: React.FC = () => {
    const [soundsExpanded, setSoundsExpanded] = useState(true);
    const [musicExpanded, setMusicExpanded] = useState(false);

    const handlePressSounds = () => setSoundsExpanded(!soundsExpanded);
    const handlePressMusic = () => setMusicExpanded(!musicExpanded);

    const sounds = ['fart', 'my custom sound', 'other sound', 'alert'];
    const music = [
        'Titanic',
        'Attic',
        'Polio',
        'Titanic',
        'Attic',
        'Polio',
        'Titanic',
        'Attic',
        'Polio',
        'Titanic',
        'Attic',
        'Polio',
        'Titanic',
        'Attic',
        'Polio',
    ]
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
                variant="headlineMedium">Sounds library</Text>
            <ScrollView>
                <List.Section>
                    <List.Accordion
                        title="Sounds"
                        description="Select sound to play independent from music"
                        left={props => <List.Icon {...props} icon="folder" />}
                        expanded={soundsExpanded}
                        onPress={handlePressSounds}>
                        <List.Item title={() => <Button
                            icon="plus"
                            mode="contained"
                            // buttonColor={MD3Colors.primary90}
                            // textColor={MD3Colors.primary0}
                            onPress={() => console.log('Pressed')}>
                            Add new sound
                        </Button>} />
                        {sounds.map(item => (
                            <List.Item title={() => <Button
                                icon="play"
                                mode="contained"
                                buttonColor={MD3Colors.primary90}
                                textColor={MD3Colors.primary0}
                                onPress={() => console.log('Pressed')}>
                                {item}
                            </Button>} />
                        ))}

                        {/* <List.Item title={PlaylistItem} />
                        <List.Item title={PlaylistItem} />
                        <List.Item title={PlaylistItem} /> */}
                    </List.Accordion>
                    <List.Accordion
                        title="Scenes music"
                        description="Select music to play for particular scene (only one at a time)"
                        left={props => <List.Icon {...props} icon="folder" />}
                        expanded={musicExpanded}
                        onPress={handlePressMusic}>
                        <List.Item title={() => <Button
                            icon="plus"
                            mode="contained"
                            disabled={true}
                            onPress={() => console.log('Pressed')}>
                            Add music by editing scene data
                        </Button>} />
                        {music.map(item => (
                            <List.Item title={() => <Button
                                icon="play"
                                mode="contained"
                                buttonColor={MD3Colors.primary90}
                                textColor={MD3Colors.primary0}
                                onPress={() => console.log('Pressed')}>
                                {item}
                            </Button>} />
                        ))}
                    </List.Accordion>
                </List.Section>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    title: {
        width: '100%',
        textAlign: 'center'
    },
    // listItemButton: {
    //     width: '100%',
    //     // textAlign: 'left'
    //     // display: 'flex',
    //     // flexDirection: 'row',
    //     // justifyContent: 'space-between'
    // }
})

export default ModalPlaylist;
