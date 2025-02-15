import { useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, FAB, TouchableRipple } from 'react-native-paper';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';

const App: React.FC = () => {
    const navigation = useNavigation();

    const routes = [
        { key: 'scenesList', title: 'List', focusedIcon: 'view-list' },
        { key: 'sceneMap', title: 'Map', focusedIcon: 'map' },
    ];

    const renderScene = BottomNavigation.SceneMap({
        scenesList: () => <ScenesList />,
        sceneMap: () => <ScenesMap />,
    });

    const [index, setIndex] = useState<number>(0);

    const handleAddScene = useCallback(() => navigation.navigate('AddSceneForm/AddSceneForm', {}), [])

    return (
        <View style={styles.view}>
            <BottomNavigation
                navigationState={{ index: index, routes: routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                renderTouchable={({ key, ...props }) => (<TouchableRipple key={key} {...props} />)} // fix for BottomNavigation issue
            />
            <FAB
                style={styles.addButton}
                icon="plus"
                onPress={handleAddScene}
            />
        </View>
    );
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
