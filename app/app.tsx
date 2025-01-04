import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class App extends Component<any, { count: number }> {
    constructor(props: any) {
        super(props);

        this.state = {
            count: 0,
        };
    }

    incrementCount = () => {
        this.setState((prevState: any) => ({
            count: prevState.count + 1,
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Count: {this.state.count}</Text>
                <Button title="Increment" onPress={this.incrementCount} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default App;
