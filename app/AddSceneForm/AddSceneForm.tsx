import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

interface AddSceneFormProps { }

const AddSceneForm: FC<AddSceneFormProps> = () => {
  const [name, setText] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <View>
      <TextInput label="Name"
        value={name}
        onChangeText={text => setText(text)}
        mode="outlined"
      />
      <TextInput label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        mode="outlined"
        multiline={true}
      />
      <View style={styles.buttonsContainer}>
        <Button icon="camera"
        mode="contained"
        compact={true}
        style={styles.button}
          onPress={() => console.log('Pressed')}>
          Add
        </Button>
        <Button icon="camera"
        mode="contained"
        compact={true}
        style={styles.button}
          onPress={() => console.log('Pressed')}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    width: '50%',
    // display: 'flex'
  }
});

export default AddSceneForm;
