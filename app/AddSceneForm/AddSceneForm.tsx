import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface AddSceneFormProps {}

interface AddSceneFormState {
  formValues: {
    sceneName: string;
    sceneDescription: string;
  };
  formDirty: boolean;
}

class AddSceneForm extends Component<AddSceneFormProps, AddSceneFormState> {
  constructor(props: AddSceneFormProps) {
    super(props);
    this.state = {
      formValues: {
        sceneName: '',
        sceneDescription: ''
      },
      formDirty: false
    };
  }

  handleChange = (fieldName: string, newValue: string) => {
    this.setState(prevState => ({
      formDirty: true,
      formValues: {
        ...prevState.formValues,
        [fieldName]: newValue
      }
    }));
  };

  submit = () => {
    console.log(this.state.formValues, this.state.formDirty);
  };

  render() {
    const { formValues, formDirty } = this.state;

    return (
      <View style={styles.formContainer}>
        <TextInput
          label="Name"
          value={formValues.sceneName}
          onChangeText={text => this.handleChange('sceneName', text)}
          mode="outlined"
        />
        <TextInput
          label="Description"
          value={formValues.sceneDescription}
          onChangeText={text => this.handleChange('sceneDescription', text)}
          mode="outlined"
          multiline={true}
        />
        <Button
          icon="camera"
          mode="contained"
          compact={true}
          style={styles.button}
          disabled={!formDirty}
          onPress={this.submit}
        >
          Add
        </Button>
      </View>
    );
  }
}

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
