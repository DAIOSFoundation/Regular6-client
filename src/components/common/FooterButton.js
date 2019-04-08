import React, {Component} from 'react';
import {Footer, Text, Button, View} from 'native-base'
import {Linking, StyleSheet} from 'react-native'
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import * as reservationActions from '../../store/modules/reservation/reservation';
import {bindActionCreators} from "redux";
import Modal from "react-native-modal";


class FooterButton extends Component {

    goToPage = () => {
        if (this.props.action === "reservationCompleteScreen") {
            const {ReservationActions, loading, error, reservation, storeSelected, name, phone, day, adult, child, timeSelected, requests} = this.props;


            ReservationActions.create_reservation(name + '_' + phone, storeSelected, day, timeSelected, "어른 " + adult + "  소아 " + child, requests, "5c91c24c1580b736cf91e9da")

            Actions.popTo('reservationScreen');
            Actions.reservationCompleteScreen()

            console.log("loading: ", loading);
            console.log("!!!!!!!!!! ", error);

        } else if (this.props.action === "reservationConfirmScreen") {
            Actions.reservationConfirmScreen()
        }
    }


    handleFormCheckModal = (visible) => {
        const {ReservationActions} = this.props;
        ReservationActions.formCheck_modal(visible)
    }
    handleChangeModalText = (text) => {
        const {ReservationActions} = this.props;
        ReservationActions.change_modal_text(text)
    }

    render() {
        const {storeSelected, adult, child, name, phone, day, timeSelected, formVisible, modalText} = this.props;
        const formCheck = (visible) => {
            if (storeSelected === "") {
                this.handleChangeModalText("장소를 선택해주세요.");
                this.handleFormCheckModal(visible)
            } else if (day === "") {
                this.handleChangeModalText("날짜를 선택해주세요.");
                this.handleFormCheckModal(visible)
            } else if (timeSelected === "") {
                this.handleChangeModalText("시간을 선택해주세요.");
                this.handleFormCheckModal(visible)
            } else if (adult === 0 || adult < 0 || child < 0) {
                this.handleChangeModalText("인원을 선택해주세요.");
                this.handleFormCheckModal(visible)
            } else if (name === "") {
                this.handleChangeModalText("에약하실 분의 성함을 입력해주세요.");
                this.handleFormCheckModal(visible)
            } else if (phone === "") {
                this.handleChangeModalText("예약하실 분의 연락처를 입력해주세요.");
                this.handleFormCheckModal(visible)
            } else {
                this.goToPage();
            }
        };

        return (
            <View>
                <Button block dark onPress={() => formCheck(formVisible)}>
                    <Text style={styles.footerButton}>{this.props.buttonTitle}</Text>
                </Button>

                <Modal isVisible={formVisible === true}>
                    <View style={styles.modalContent}>
                        <Text>{modalText}</Text>
                        <View style={styles.bottomBorder}/>
                        <View style={styles.btnModal}>
                            <Button dark transparent block
                                    onPress={() => this.handleFormCheckModal(formVisible)}
                            >
                                <Text style={styles.font}>확인</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomBorder: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginHorizontal: 15,
    },
    modalContent: {
        backgroundColor: "white",
        paddingTop: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        marginBottom: 0,
        paddingBottom: 0
    },
    btnModal: {
        alignSelf: 'stretch'
    },
    font: {
        fontSize: 14,
        color: 'black'
    },
    footerButton: {
        textAlignVertical: 'center',
        alignSelf: "center"
    }
});

export default connect(
    (state) => ({
        storeSelected: state.reservation.get("storeSelected"),
        adult: state.reservation.getIn(['people', 'adult']),
        child: state.reservation.getIn(['people', 'child']),
        name: state.reservation.get('name'),
        phone: state.reservation.get("phone"),
        day: state.reservation.get('day'),
        timeSelected: state.reservation.get("timeSelected"),
        formVisible: state.reservation.get("formVisible"),
        modalText: state.reservation.get("modalText"),
        requests: state.reservation.get("requests"),
        reservation: state.reservation.get("reservation"),
        loading: state.pender.pending['reservation/CREATE_RESERVATION'],
        error: state.pender.failure['reservation/CREATE_RESERVATION']
    }),
    (dispatch) => ({
        ReservationActions: bindActionCreators(reservationActions, dispatch)
    })
)(FooterButton);
