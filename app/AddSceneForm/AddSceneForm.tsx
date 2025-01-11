import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { addScene } from '../store/slices/scenesListSlice';
import { useNavigation } from '@react-navigation/native';

interface AddSceneFormProps {
  addScene: (scene: { id: number; name: string }) => void;
  navigation: any;
}

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

  private handleChange(fieldName: string, newValue: string) {
    this.setState(prevState => ({
      formDirty: true,
      formValues: {
        ...prevState.formValues,
        [fieldName]: newValue
      }
    }));
  };

  private submit() {
    const { sceneName, sceneDescription } = this.state.formValues;
    const newScene = {
      id: Date.now(),
      name: sceneName
    };

    this.props.addScene(newScene);

    this.setState({
      formValues: {
        sceneName: '',
        sceneDescription: ''
      },
      formDirty: false
    });

    // todo - change it so the BACK button is not available
    // this.props.navigation.navigate('index');
    this.props.navigation.goBack();
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
          onPress={this.submit.bind(this)}
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

const mapDispatchToProps = {
  addScene
};

const AddSceneFormWithNavigation = (props: any) => {
  const navigation = useNavigation();
  return <AddSceneForm {...props} navigation={navigation} />;
};

export default connect(null, mapDispatchToProps)(AddSceneFormWithNavigation);
