import React, {Component} from 'react';
import {Linking, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Button, Text, View} from "native-base";

class Modals extends Component {
    state = {
        visibleModal: this.props.visible
    };
    renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>식당에 전화하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
                <Button transparent dark onPress={() => this.setState({visibleModal: false})}
                        style={styles.buttonCancel}>
                    <Text style={styles.cardSubText}>취소하기</Text>
                </Button>
                <Button transparent dark
                        onPress={() => Linking.openURL('tel:010-1234-5678').then(this.setState({visibleModal: null}))}
                        style={styles.buttonCall}>
                    <Text style={styles.cardSubText}>전화하기</Text>
                </Button>
            </View>
        </View>
    );

    render() {
        return (
                <Modal  isVisible={this.props.visible} style={styles.modal}>
                    {this.renderModalContent()}
                    {console.log("state",this.state.visibleModal)}
                </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        paddingHorizontal: 30
    },
    modalContent: {
        backgroundColor: "white",
        paddingTop: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    buttonCancel: {
        marginHorizontal: 25,
        marginBottom: 5,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonCall: {
        marginHorizontal: 25,
        marginBottom: 5,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        width: '100%',
        marginTop: 15,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
export default Modals;
