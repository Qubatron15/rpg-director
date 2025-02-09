import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addScene, SceneData } from '../store/slices/scenesListSlice';
import { useNavigation } from '@react-navigation/native';
import { useAddNewSceneMutation } from '../store/slices/apiSlice';

const AddSceneForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formValues, setFormValues] = useState({ sceneName: '', sceneDescription: '' });
  const [formDirty, setFormDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [requestAddNewScene, { isLoading }] = useAddNewSceneMutation();

  useEffect(() => setFormValid(!!(formDirty && formValues.sceneName)), [formDirty, formValues])

  const handleTextChange = useCallback((fieldName: string, newValue: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));
    setFormDirty(true);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    const newScene = {
      id: `${Date.now()}`,
      name: formValues.sceneName,
      description: formValues.sceneDescription
    };

    try {
      // TODO add sort of waiting spinner here
      const result: { data: SceneData } = await requestAddNewScene({
        name: newScene.name,
        description: newScene.description
      }).unwrap();
      dispatch(addScene(result.data));

      setFormValues({
        sceneName: '',
        sceneDescription: '',
      });
      setFormDirty(false);
      navigation.goBack();

    } catch (error) {
      console.error("Failed to add scene:", error);
    }
  }, [formValues, dispatch, navigation]);

  return (
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
      <Button
        icon="camera"
        mode="contained"
        compact={true}
        style={styles.button}
        disabled={!formValid}
        onPress={handleFormSubmit}
      >
        Add
      </Button>
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
