import { useNavigation } from 'expo-router';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, SegmentedButtons, Text } from 'react-native-paper';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';
import BottomPlayer from './audio-manager/BottomPlayer/BottomPlayer';

const App: React.FC = () => {
    const navigation = useNavigation();

    const [selectedView, setSelectedView] = React.useState('list');

    const handleAddScene = useCallback(() => navigation.navigate('AddSceneForm/AddSceneForm', {}), [])

    return (
        <View style={styles.view}>
            <View style={styles.selectViewContainer}>
                <Text variant="titleSmall">Select view:</Text>
                <SegmentedButtons
                    style={styles.segmentedButtons}
                    value={selectedView}
                    onValueChange={setSelectedView}
                    density='regular'
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
            <BottomPlayer />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
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
