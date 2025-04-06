import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, IconButton, SegmentedButtons, Text } from 'react-native-paper';
import ScenesList from './ScenesList/ScenesList';
import ScenesMap from './ScenesMap/ScenesMap';
import BottomPlayer from './audio-manager/BottomPlayer/BottomPlayer';
import { useGetAllScenesQuery, useLazyGetAllScenesQuery } from './store/slices/apiSlice';
import { initScenesList } from './store/slices/scenesListSlice';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [refreshScenesList, { data, error, isLoading }] = useLazyGetAllScenesQuery();

    const [selectedView, setSelectedView] = React.useState('list');

    useEffect(() => {
        dispatch(initScenesList(data?.data ?? []));
    }, [isLoading, data, error]);

    const handleAddScene = useCallback(() => navigation.navigate('AddSceneForm/AddSceneForm', {}), [])

    return (
        <View style={styles.view}>
            <View style={styles.selectViewContainer}>
                <IconButton
                    icon="refresh"
                    mode='outlined'
                    size={25}
                    onPress={() => refreshScenesList('')}
                />
                <View style={styles.selectViewContainer}>
                    <Text variant="labelLarge">Select view {isLoading}:</Text>
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
            </View>
            {selectedView === 'map' ? <ScenesMap /> : <ScenesList viewMode={selectedView as any} />}
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
        justifyContent: 'space-between',
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
