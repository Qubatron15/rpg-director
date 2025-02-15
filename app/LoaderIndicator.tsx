import { ProgressBar } from "react-native-paper";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { selectIsGlobalLoading } from "./store/slices/apiSlice";

const LoaderIndicator: React.FC = () => {
    const isLoading = useSelector(selectIsGlobalLoading);

    return (
        <View style={styles.container}>
            { isLoading && <ProgressBar indeterminate={true} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 100,
        width: '100%',
    }
});

export default LoaderIndicator;
