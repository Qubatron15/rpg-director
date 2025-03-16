import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton, MD3Colors, Modal, Portal, Surface, Text } from "react-native-paper";
import ModalPlaylist from "../ModalPlaylist/ModalPlaylist";
import { Audio, Video } from 'expo-av';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { pauseAudio, playAudio, stopAudio } from "@/app/store/slices/audioSlice";
import * as audioService from "../audio-service";

const BottomPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { isPlaying, soundUri } = useSelector((state: RootState) => state.audio);

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = useCallback(() => setModalVisible(true), []);
  const hideModal = useCallback(() => setModalVisible(false), []);

  const handlePlay = async () => {
    dispatch(playAudio(soundUri));
    await audioService.playSound(soundUri, true);
  };

  const handlePause = async () => {
    dispatch(pauseAudio());
    await audioService.pauseSound();
  };

  const handleStop = async () => {
    dispatch(stopAudio());
    await audioService.stopSound();
  };

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
        onPress={isPlaying ? handlePause : handlePlay}
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