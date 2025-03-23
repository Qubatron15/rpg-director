import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Button, HelperText, TextInput, Text, IconButton, MD3Colors, Menu, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSceneById, SceneData } from '../store/slices/scenesListSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddNewSceneMutation, useUpdateSceneMutation } from '../store/slices/apiSlice';
import { RootState } from '../store/store';
import LoaderIndicator from '../LoaderIndicator';
import * as ImagePicker from 'expo-image-picker';

const AddSceneForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const sceneId = (route.params as { sceneId: string } | undefined)?.sceneId;
  let selectedSceneData: SceneData | undefined;
  if (sceneId) {
    selectedSceneData = useSelector((state: RootState[]) => getSceneById(state, sceneId));
  }

  const [formValues, setFormValues] = useState({
    sceneName: selectedSceneData?.name ?? '',
    sceneDescription: selectedSceneData?.description ?? '',
    sceneSoundtrack: selectedSceneData?.soundtrack ?? ''
  });
  const [formDirty, setFormDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [addImageMenuVisible, setAddImageMenuVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const [requestAddNewScene, addSceneQuery] = useAddNewSceneMutation();
  const [requestUpdateScene, updateSceneQuery] = useUpdateSceneMutation();
  // const [requestAddNewScene, { isLoading }] = selectedSceneData ? useUpdateSceneMutation() : useAddNewSceneMutation();


  useEffect(
    () => setFormValid(!!(formDirty && formValues.sceneName && !addSceneQuery.isLoading && !updateSceneQuery.isLoading)),
    [formDirty, formValues, addSceneQuery, updateSceneQuery]
  );

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Camera access is needed to take photos.");
      }
    })();
  }, []);

  const handleOpenMenu = useCallback(() => {
    setAddImageMenuVisible(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAddImageMenuVisible(false);
  }, []);

  const handleTextChange = useCallback((fieldName: string, newValue: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));
    setFormDirty(true);
  }, []);

  const handleAddImageFromGallery = useCallback(async () => {
    handleCloseMenu();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'livePhotos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  }, []);

  const handleTakePhoto = async () => {
    handleCloseMenu();

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleFormSubmit = useCallback(async () => {
    const formSceneData = {
      id: selectedSceneData?.id,
      name: formValues.sceneName,
      description: formValues.sceneDescription,
      soundtrack: formValues.sceneSoundtrack
    };

    try {
      let result;

      if (selectedSceneData) {
        result = await requestUpdateScene({
          id: selectedSceneData.id,
          name: formSceneData.name,
          description: formSceneData.description,
          soundtrack: formSceneData.soundtrack
        })
      } else {
        result = await requestAddNewScene({
          name: formSceneData.name,
          description: formSceneData.description,
          soundtrack: formSceneData.soundtrack
        }).unwrap();

        // dispatch(addScene(result.data));
      }

      // const { data, error, isLoading } = useGetAllScenesQuery(''); // TODO - add error handling here
      // useEffect(() => { dispatch(initScenesList(data?.data ?? [])); }, [isLoading]);

      setFormValues({
        sceneName: '',
        sceneDescription: '',
        sceneSoundtrack: '',
      });
      setFormDirty(false);
      navigation.goBack();

    } catch (error) {
      console.error("Failed to add scene:", error);
    }
  }, [formValues, dispatch, navigation]);

  return (
    <View style={styles.container}>
      <LoaderIndicator />

      <Surface style={styles.banner} elevation={4}>
        <Image
          style={styles.sceneImage}
          source={{ uri: selectedImage }}></Image>

        <Text
          style={styles.sceneTitle}
          variant="headlineMedium"
          numberOfLines={3}>
          {`${selectedSceneData ? 'Update' : 'Add'} ${formValues.sceneName || 'new'} scene`}
        </Text>
        <Menu

          visible={addImageMenuVisible}
          onDismiss={handleCloseMenu}
          anchor={
            <IconButton
              icon="plus"
              iconColor={MD3Colors.primary50}
              containerColor="rgba(0, 0, 0, 0.6)"
              style={styles.addImageButton}
              size={50}
              onPress={handleOpenMenu}
            />
          }
        >

          <Menu.Item
            onPress={handleAddImageFromGallery}
            leadingIcon="image"
            title="From gallery" />
          <Menu.Item
            onPress={handleTakePhoto}
            leadingIcon="camera"
            title="From camera" />
        </Menu>
      </Surface>

      <View style={styles.form}>
        <TextInput
          label="Name"
          value={formValues.sceneName}
          onChangeText={text => handleTextChange('sceneName', text)}
          mode="outlined"
        />
        <HelperText type="error" visible={formDirty && !formValues.sceneName}>
          Scene name is required
        </HelperText>
        <TextInput
          label="Description"
          value={formValues.sceneDescription}
          onChangeText={text => handleTextChange('sceneDescription', text)}
          mode="outlined"
          multiline={true}
        />
        <TextInput
          label="Soundtrack"
          value={formValues.sceneSoundtrack}
          onChangeText={text => handleTextChange('sceneSoundtrack', text)}
          mode="outlined"
        />
        <Button
          icon="camera"
          mode="contained"
          compact={true}
          style={styles.button}
          disabled={!formValid}
          onPress={handleFormSubmit}
        >
          {selectedSceneData ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // FIXME - not fully working
  },
  form: {
    padding: 20,
  },
  banner: {
    width: '100%',
    height: '20%',
    minHeight: 190,

    position: 'relative',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  addImageButton: {
    margin: 20
  },
  sceneTitle: {
    margin: 20,
    color: MD3Colors.primary100,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    zIndex: 50,
    maxWidth: '60%'
  },
  button: {
    margin: '10%',
    width: '80%',
  },
});

export default AddSceneForm;
