import { Component } from "react";
import { connect } from "react-redux";
import { Text } from 'react-native-paper';

interface ViewSceneProps {
    
}

class ViewScene extends Component<ViewSceneProps> {
    render() {
        return (
            <Text>This is view scene view</Text>
        )
    }
}

export default connect()(ViewScene);
