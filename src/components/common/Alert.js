import React, {Component} from 'react';
import {Button, Text, View} from "native-base";
import Modal from "react-native-modal";

class Alert extends Component {
    renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>식당에 전화하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
                <Button transparent dark
                        style={styles.buttonCancel}>
                    <Text style={styles.cardSubText}>취소하기</Text>
                </Button>
            </View>
        </View>
    );

    render() {
        return (
            <View>
                <Modal isVisible={this.props.visible}>
                    {this.renderModalContent()}
                </Modal>
            </View>
        )
    }
}

export default Alert;
