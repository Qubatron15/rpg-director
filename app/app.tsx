import { useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, FAB, SegmentedButtons, TouchableRipple, Text } from 'react-native-paper';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';

const App: React.FC = () => {
    const navigation = useNavigation();

    // const routes = [
    // { key: 'scenesList', title: 'List', focusedIcon: 'view-list' },
    // { key: 'sceneMap', title: 'Map', focusedIcon: 'map' },
    // ];

    // const renderScene = BottomNavigation.SceneMap({
    //     scenesList: () => <ScenesList />,
    //     sceneMap: () => <ScenesMap />,
    // });

    // const [index, setIndex] = useState<number>(0);

    const [selectedView, setSelectedView] = React.useState('list');

    const handleAddScene = useCallback(() => navigation.navigate('AddSceneForm/AddSceneForm', {}), [])

    // TODO - consider changing bottomnavigation to segmented buttons
    return (
        <View style={styles.view}>
            {/* <BottomNavigation
                navigationState={{ index: index, routes: routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                renderTouchable={({ key, ...props }) => (<TouchableRipple key={key} {...props} />)} // fix for BottomNavigation issue
            /> */}
            <View style={styles.selectViewContainer}>
                <Text variant="titleSmall">Select view:</Text>
                <SegmentedButtons
                    style={styles.segmentedButtons}
                    value={selectedView}
                    onValueChange={setSelectedView}
                    density='small'
                    buttons={[
                        {
                            style: styles.segmentedButtonSingle,
                            value: 'list',
                            icon: 'view-list',
                        },
                        {
                            style: styles.segmentedButtonSingle,
                            value: 'tiles',
                            icon: 'view-grid',
                        },
                        {
                            style: styles.segmentedButtonSingle,
                            value: 'map',
                            icon: 'map',
                        }
                    ]}
                />
            </View>
            {selectedView === 'map' ? <ScenesMap /> : <ScenesList />}
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
    selectViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
    },
    segmentedButtons: {
        marginLeft: 4,
        width: 160
    },
    segmentedButtonSingle: {
        minWidth: 'auto'
    },
    addButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
});

export default App;
