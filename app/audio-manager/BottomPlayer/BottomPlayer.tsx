import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton, MD3Colors, Modal, Portal, Surface, Text } from "react-native-paper";
import ModalPlaylist from "../ModalPlaylist/ModalPlaylist";
import { Audio, Video } from 'expo-av';

const BottomPlayer: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = useCallback(() => setModalVisible(true), []);
    const hideModal = useCallback(() => setModalVisible(false), []);

    const [sound, setSound] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    // Funkcja do odtwarzania dźwięku
    async function playSound() {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  
    // Funkcja do pauzowania dźwięku
    async function pauseSound() {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  
    // Zwolnienie zasobów
    async function unloadSound() {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    }

    return (
        <Surface
            style={styles.container}
            elevation={1}>
            <Text
                variant="headlineMedium"
                style={styles.songTitle}>title</Text>
            <IconButton
                icon="volume-minus"
                mode='contained'
                iconColor={MD3Colors.primary0}
                containerColor={MD3Colors.primary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="volume-plus"
                mode='contained'
                iconColor={MD3Colors.primary0}
                containerColor={MD3Colors.primary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon={isPlaying ? 'pause' : 'play'}
                mode='contained'
                iconColor={MD3Colors.primary100}
                containerColor={MD3Colors.primary60}
                size={50}
                onPress={isPlaying ? pauseSound : playSound}
            />
            <IconButton
                icon="playlist-music"
                mode='contained'
                iconColor={MD3Colors.primary0}
                containerColor={MD3Colors.primary90}
                size={45}
                onPress={showModal}
            />

            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modalContainer}>
                    <ModalPlaylist />
                </Modal>
            </Portal>
        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 4
    },
    songTitle: {
        width: '30%',
    },
    modalContainer: {
        height: '80%',
        backgroundColor: 'white',
        padding: 20,
        margin: 20
    }
});

export default BottomPlayer;