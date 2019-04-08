import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,

} from 'react-native';
import {Button, Spinner} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as myPageReservationHistoryActions from '../../store/modules/myPage/myPage';
import NothingToShow from '../../components/common/FixedAlert';

class MyPageReservationHistory extends Component {

    initialize = async () => {
        const {MyPageReservationHistoryActions} = this.props;
        try {
            await MyPageReservationHistoryActions.read_myReservation()
        } catch (e) {

            console.log("myPageReservationConfirm error : ", e)
        }

    }

    componentDidMount() {
        this.initialize()
    }

    shouldComponentUpdate(nextProps, nextState) {
        // return false 하면 업데이트를 안함
        return this.props.reservationData !== nextProps.reservationData
    }

    render() {
        const {reservationData, loading} = this.props;
        if (loading === undefined || loading === false) return <Spinner color="black" style={styles.spinner}/>;
        console.log("reservationData : ",reservationData[0]);
        if (reservationData[0].length!==0) {
            return (
                <ScrollView>
                    {
                        reservationData[0].map((item, index) => (
                                <View style={styles.cardContainer} key={index}>
                                    <View style={styles.card}>
                                        <Text style={styles.reservationTitle}>{item.user_name}</Text>

                                        <View style={styles.cardContent}>
                                            <View style={styles.cardLeft}>
                                                <Text style={styles.cardLeftLabel}>장소</Text>
                                                <Text style={styles.reservationLabel}>{item.place}</Text>
                                            </View>

                                            <View style={styles.cardRight}>
                                                <Text style={styles.cardLeftLabel}>날짜</Text>
                                                <Text style={styles.reservationLabel}>{item.date}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardContent}>
                                            <View style={styles.cardLeft}>
                                                <Text style={styles.cardLeftLabel}>시간</Text>
                                                <Text style={styles.reservationLabel}>{item.time}</Text>
                                            </View>

                                            <View style={styles.cardRight}>
                                                <Text style={styles.cardLeftLabel}>인원</Text>
                                                <Text style={styles.reservationLabel}>{item.number}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardFooter}>
                                            <View style={styles.cardLeft}>
                                                <Text style={styles.cardLeftReqLabel}>요청사항</Text>
                                                <Text style={styles.reservationLabel}>{item.request}</Text>
                                            </View>
                                        </View>


                                        <View style={styles.cardFooterButton}>
                                            <Button bordered block style={styles.reservationEditBtn}>
                                                <Text style={styles.reservationEditText}>예약수정</Text>
                                            </Button>

                                            <Button bordered block style={styles.reservationCancelBtn}>
                                                <Text style={styles.reservationCancelText}>예약취소</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            )
                        )
                    }
                </ScrollView>
            )
        }else{
            return(
                <NothingToShow  icon="alert-circle-outline" text1="지난 예약이" text2="없습니다."/>
            )
        }
    }
}

const styles = StyleSheet.create({
    /******** card **************/
    cardContainer: {
        backgroundColor: "#d8d8d8",
    },
    card: {
        // marginVertical: 8,
        // flexBasis: '47%',
        // marginHorizontal: 16,
        paddingHorizontal: 16,
        marginTop: 10,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: "#ffffff",
        // borderTopWidth: 1,
        // borderTopColor: "#d8d8d8",
        // borderBottomWidth: 1,
        // borderBottomColor: "#d8d8d8",
    },
    cardContent: {
        // marginHorizontal: 16,
        // marginTop: 10,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: "#ffffff",
        // borderTopWidth: 1,
        // borderTopColor: "#d8d8d8",
        borderBottomWidth: 1,
        borderBottomColor: "#d8d8d8",
        flexDirection: 'row',
    },
    cardFooter: {
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        // justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        // paddingBottom: 25,
        // paddingHorizontal: 16,
        // borderBottomLeftRadius: 1,
        // borderBottomRightRadius: 1,
    },
    cardFooterButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    cardLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 8,
        // backgroundColor: 'green'
    },
    cardRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        paddingLeft: 16,
        // paddingRight: 24,
        // backgroundColor: 'red',
    },
    cardLeftLabel: {
        marginRight: 38,
        color:'rgba(32, 33, 35, 0.6)'

    },
    cardLeftReqLabel: {
        marginRight: 14,
        color:'rgba(32, 33, 35, 0.6)'

    },
    reservationEditBtn: {
        backgroundColor: "#ffffff",
        // borderColor: 'black',
        width: 80,
        height: 40,
        borderRadius: 20,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        marginRight: 8,
    },
    reservationCancelBtn: {
        backgroundColor: "#ffffff",
        // borderColor: 'black',
        width: 80,
        height: 40,
        borderRadius: 20,
        borderColor: '#d8d8d8',
        borderWidth: 1,
    },

    reservationEditText: {
        textAlign: 'center',
        fontSize: 14,
        color: "#000000",
    },
    reservationCancelText: {
        textAlign: 'center',
        fontSize: 14,
        color: "#000000",
    },

    /******** reservation bar ******************/
    reservationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    reservationSection: {
        // justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    reservationLabel: {
        color: '#202123'
    },
    reservationTitle: {
        fontSize: 16,
        marginLeft: 8,
        color: "#000000",
        fontWeight: '600',
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});
export default connect(
    (state) => ({
        reservationData: state.myPage.get('reservationData'),
        loading: state.pender.pending['myPageReservationConfirm/READ_MY_RESERVATION']
    }),
    (dispatch) => ({
        MyPageReservationHistoryActions: bindActionCreators(myPageReservationHistoryActions, dispatch)
    })
)(MyPageReservationHistory);
