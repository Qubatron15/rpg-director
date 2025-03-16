import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addScene, getSceneById, SceneData } from '../store/slices/scenesListSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddNewSceneMutation, useGetAllScenesQuery, useUpdateSceneMutation } from '../store/slices/apiSlice';
import { RootState } from '../store/store';
import LoaderIndicator from '../LoaderIndicator';

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

  const [requestAddNewScene, addSceneQuery] = useAddNewSceneMutation();
  const [requestUpdateScene, updateSceneQuery] = useUpdateSceneMutation();
  // const [requestAddNewScene, { isLoading }] = selectedSceneData ? useUpdateSceneMutation() : useAddNewSceneMutation();


  useEffect(
    () => setFormValid(!!(formDirty && formValues.sceneName && !addSceneQuery.isLoading && !updateSceneQuery.isLoading)),
    [formDirty, formValues, addSceneQuery, updateSceneQuery]
  );

  const handleTextChange = useCallback((fieldName: string, newValue: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));
    setFormDirty(true);
  }, []);

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
    <View>
      <LoaderIndicator />

      <View style={styles.formContainer}>
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
  formContainer: {
    padding: 20,
  },
  button: {
    margin: '10%',
    width: '80%',
  },
});

export default AddSceneForm;
