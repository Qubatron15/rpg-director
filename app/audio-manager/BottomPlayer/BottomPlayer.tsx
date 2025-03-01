import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton, MD3Colors, Modal, Portal, Surface, Text } from "react-native-paper";

const BottomPlayer: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = useCallback(() => setModalVisible(true), []);
    const hideModal = useCallback(() => setModalVisible(false), []);

    return (
        <Surface
            style={styles.container}
            elevation={1}>
            <Text
                variant="headlineMedium"
                style={styles.songTitle}>title</Text>
            <IconButton
                icon="volume-minus"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="volume-plus"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={35}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="pause"
                mode='contained'
                iconColor={MD3Colors.primary0}
                containerColor={MD3Colors.primary90}
                size={50}
                onPress={() => console.log('Pressed')}
            />
            <IconButton
                icon="playlist-music"
                mode='contained'
                iconColor={MD3Colors.neutralVariant30}
                containerColor={MD3Colors.secondary90}
                size={45}
                onPress={showModal}
            />

            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modalContainer}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        </Surface>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingHorizontal: 4
    },
    songTitle: {
        width: '30%',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20
    }
});

export default BottomPlayer;