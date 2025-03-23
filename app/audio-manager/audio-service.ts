import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

let soundObject: Sound | null = null;

export const playSound = async (uri: string, resumePlay: boolean) => {
  if (!uri) return;

  if (!resumePlay) {
    if (soundObject) await soundObject.unloadAsync();
    const { sound } = await Audio.Sound.createAsync({ uri });
    soundObject = sound;
  }

  if (!soundObject) return;

  await soundObject.playAsync();
};

export const pauseSound = async () => {
  if (!soundObject) return;

  await soundObject.pauseAsync();
};

export const stopSound = async () => {
  if (!soundObject) return;

  await soundObject.unloadAsync();
  soundObject = null;
};
