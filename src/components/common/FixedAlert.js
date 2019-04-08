import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class FixedAlert extends Component {

    render() {
        return (
            <Container>
                <View flex style={styles.viewAlign}>
                    <Icon name={this.props.icon} style={styles.icon}/>
                    <Text style={styles.text}>{this.props.text1}</Text>
                    <Text style={styles.text}>{this.props.text2}</Text>
                </View>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    viewAlign: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon:{
        fontSize:28,
        color:'black'
    },
    text:{
        paddingVertical:3,
        fontSize:25
    }
});

export default FixedAlert;
