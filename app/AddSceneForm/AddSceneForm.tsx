import { Link } from 'expo-router';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

interface AddSceneFormProps { }

const AddSceneForm: FC<AddSceneFormProps> = () => {
  const [formValues, setFormValues] = React.useState({ sceneName: '', sceneDescription: '' });
  const [formDirty, setFormDirty] = React.useState(false);

  function handleChange(fieldName: string, newValue: string) {
    setFormDirty(true);
    setFormValues((prev) => ({ ...prev, [fieldName]: newValue }));
  };


  function submit() {
    console.log(formValues, formDirty);
  }

  return (
    <View style={styles.formContainer}>
      <TextInput label="Name"
        value={formValues.sceneName}
        onChangeText={text => handleChange('sceneName', text)}
        mode="outlined"
      />
      <TextInput label="Description"
        value={formValues.sceneDescription}
        onChangeText={text => handleChange('sceneDescription', text)}
        mode="outlined"
        multiline={true}
      />

      <Button icon="camera"
        mode="contained"
        compact={true}
        style={styles.button}
        disabled={!formDirty}
        onPress={submit}>
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20
  },
  button: {
    margin: '10%',
    width: '80%',
  }
});

export default AddSceneForm;
