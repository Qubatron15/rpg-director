import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, List, MD3Colors, Text } from 'react-native-paper';
import PlaylistItem from './PlaylistItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { pauseAudio, playAudio, stopAudio } from '@/app/store/slices/audioSlice';
import * as audioService from '../audio-service';
import { getAllScenes, SceneData } from '@/app/store/slices/scenesListSlice';

interface PlaylistItem {
    sceneId: string;
    name: string;
    uri: string;
}

const ModalPlaylist: React.FC = () => {
    // TODO - here to use a dedicated selector which returns only some fields
    const scenesList: SceneData[] = useSelector(getAllScenes);
    const music: PlaylistItem[] = scenesList
        .map(scene => ({
            sceneId: scene.id,
            name: scene.name,
            uri: scene.soundtrack ?? ''
        }))
        .filter(item => item.uri);

    const dispatch = useDispatch();
    const { isPlaying, soundUri } = useSelector((state: RootState) => state.audio);

    const [musicExpanded, setMusicExpanded] = useState(true);

    const handlePressMusic = () => setMusicExpanded(!musicExpanded);

    const handlePlay = async (uri: string) => {
        const resumePlay = uri === soundUri;
        dispatch(playAudio(uri));
        await audioService.playSound(uri, resumePlay);
    };

    const handlePause = useCallback(async () => {
        dispatch(pauseAudio());
        await audioService.pauseSound();
    }, []);

    const handleStop = useCallback(async () => {
        dispatch(stopAudio());
        await audioService.stopSound();
    }, []);

    return (
        <View style={styles.container}>
            <Text
                style={styles.title}
                variant="headlineMedium">Sounds library</Text>
            <ScrollView>
                <List.Section>
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
                        {music.map(item => {
                            const isItemPlaying = isPlaying && soundUri === item.uri;

                            return (<List.Item
                                key={item.sceneId}
                                title={() => <Button
                                    icon={isItemPlaying ? 'pause' : 'play'}
                                    mode="contained"
                                    buttonColor={MD3Colors.primary90}
                                    textColor={MD3Colors.primary0}
                                    onPress={() => isItemPlaying ? handlePause() : handlePlay(item.uri)}>
                                    {item.name}
                                </Button>} />
                            )
                        })}
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
