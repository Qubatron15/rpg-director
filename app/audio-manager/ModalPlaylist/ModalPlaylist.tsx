import React, { useCallback, useState } from 'react';
import { List } from 'react-native-paper';

const ModalPlaylist: React.FC = () => {
    const [soundsExpanded, setSoundsExpanded] = useState(true);
    const [musicExpanded, setMusicExpanded] = useState(false);

    const handlePressSounds = () => setSoundsExpanded(!soundsExpanded);
    const handlePressMusic = () => setMusicExpanded(!musicExpanded);

    return (
        <List.Section>
            <List.Accordion
                title="Sounds"
                description="Select sound to play independent from music"
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={soundsExpanded}
                onPress={handlePressSounds}>
                <List.Item title="fart" />
                <List.Item title="bark" />
                <List.Item title="alert" />
            </List.Accordion>
            <List.Accordion
                title="Scenes music"
                description="Select music to play for particular scene (only one at a time)"
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={musicExpanded}
                onPress={handlePressMusic}>
                <List.Item title="Attic" />
                <List.Item title="Titanic" />
                <List.Item title="Polio" />
            </List.Accordion>
        </List.Section>
    )
}

export default ModalPlaylist;
