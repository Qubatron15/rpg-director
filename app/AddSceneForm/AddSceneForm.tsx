import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, HelperText, TextInput, Text, IconButton, MD3Colors, Menu, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addScene, getSceneById, SceneData } from '../store/slices/scenesListSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddNewSceneMutation, useGetAllScenesQuery, useUpdateSceneMutation } from '../store/slices/apiSlice';
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
      console.log('IMAGE IRI: ', result.assets[0].uri);
    }
  }, []);

  const handleTakePhoto = async () => {
    handleCloseMenu();

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Enables built-in cropping
      quality: 1, // Highest quality
    });

    if (!result.canceled) {
      console.log('CAMERA', result.assets[0].uri); // Store the image URI
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
        <Menu
          visible={addImageMenuVisible}
          onDismiss={handleCloseMenu}
          anchor={
            <IconButton
              icon="plus"
              iconColor={MD3Colors.primary50}
              containerColor={MD3Colors.error50}
              style={styles.addImageButton}
              size={50}
              onPress={handleOpenMenu}
            />
          }
        >

          <Menu.Item onPress={handleAddImageFromGallery} title="View" />
          <Menu.Item onPress={handleTakePhoto} title="Edit" />

        </Menu>

        <Text style={styles.sceneTitle}>
          {`${selectedSceneData ? 'Update' : 'Add'} ${formValues.sceneName || 'new'} scene`}
        </Text>
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
    minHeight: 50,
    backgroundColor: 'red',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  addImageButton: {
    // height: '100%'
    // position: 'absolute',
    // right: 20,
    // bottom: 20
  },
  sceneTitle: {
    position: 'absolute',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    bottom: 20,
    left: 20
  },
  button: {
    margin: '10%',
    width: '80%',
  },
});

export default AddSceneForm;
