import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addScene } from '../store/slices/scenesListSlice';
import { useNavigation } from '@react-navigation/native';

const AddSceneForm: React.FC = () => {
  const dispatch = useDispatch(); // Use the dispatch hook to get the dispatch function
  const navigation = useNavigation();
  
  const [formValues, setFormValues] = useState({
    sceneName: '',
    sceneDescription: '',
  });

  const [formDirty, setFormDirty] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => setFormValid(!!(formDirty && formValues.sceneName)), [formDirty, formValues])

  const handleChange = useCallback((fieldName: string, newValue: string) => {
    setFormValues(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));
    setFormDirty(true);
  }, []);

  const submit = useCallback(() => {
    const { sceneName } = formValues;
    const newScene = {
      id: Date.now(),
      name: sceneName,
    };

    // Dispatch the action directly
    dispatch(addScene(newScene));

    setFormValues({
      sceneName: '',
      sceneDescription: '',
    });
    setFormDirty(false);
    navigation.goBack();
  }, [formValues, dispatch, navigation]);

  return (
    <View style={styles.formContainer}>
      <TextInput
        label="Name"
        value={formValues.sceneName}
        onChangeText={text => handleChange('sceneName', text)}
        mode="outlined"
      />
      <HelperText type="error" visible={formDirty && !formValues.sceneName}>
        Scene name is required
      </HelperText>
      <TextInput
        label="Description"
        value={formValues.sceneDescription}
        onChangeText={text => handleChange('sceneDescription', text)}
        mode="outlined"
        multiline={true}
      />
      <Button
        icon="camera"
        mode="contained"
        compact={true}
        style={styles.button}
        disabled={!formValid}
        onPress={submit}
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
