import { Link } from 'expo-router';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, IconButton, MD3Colors } from 'react-native-paper';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';
import { BaseRoute } from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';

interface AppComponentProps {}

interface AppComponent {
    index: number;
    routes: BaseRoute[];
}

class App extends Component<AppComponentProps, AppComponent> {
    private renderScene = BottomNavigation.SceneMap({
        scenesList: () => <ScenesList />,
        sceneMap: () => <ScenesMap />,
    });

    constructor(props: any) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'scenesList', title: 'List', focusedIcon: 'view-list' },
                { key: 'sceneMap', title: 'Map', focusedIcon: 'map' },
            ]
        };
    }

    private setIndex(newIndex: number) {
        this.setState({ index: newIndex });
    }


    render() {
        return (
            <View style={styles.view}>
                <BottomNavigation
                    navigationState={{ index: this.state.index, routes: this.state.routes }}
                    onIndexChange={this.setIndex.bind(this)}
                    renderScene={this.renderScene}
                />
                <Link href="/AddSceneForm/AddSceneForm"
                    style={styles.addButton}>
                    <IconButton
                        icon="plus"
                        iconColor={MD3Colors.primary0}
                        size={40}
                        mode="contained"
                    />
                </Link>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'relative',
        height: '100%',
    },
    addButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
});

export default App;
