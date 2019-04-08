import React, {Component} from 'react';
import {Linking, ScrollView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Card, CardItem, Text, Button, View, Item, Form, Input, Picker} from 'native-base';
import {FlatGrid} from "react-native-super-grid";
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Col, Row, Grid} from "react-native-easy-grid";
import Modal from "react-native-modal";
import {connect} from 'react-redux';
import * as reservationDetailActions from '../../store/modules/reservation/reservation';
import {bindActionCreators} from "redux";


class ReservationDetail extends Component {

    handleSelectStore = (storeIndex) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.change_store(storeIndex)
    }

    handleIncrementAdult = () => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.increment_adult()
    }

    handleDecrementAdult = () => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.decrement_adult()
    }

    handleIncrementChild = () => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.increment_child()
    }

    handleDecrementChild = () => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.decrement_child()
    }

    handleInputName = (inputName) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.input_name(inputName)
    }

    handleInputPhone = (inputPhone) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.input_phone(inputPhone)
    }

    handleInputRequests = (inputRequests) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.input_requests(inputRequests)
    }

    handleSelectDay = (day) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.select_day(day.dateString)
    }

    handleToggleModal = (visible) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.toggle_modal(visible)
    }

    handleSelectTime = (timeIndex) => {
        const {ReservationDetailActions} = this.props;
        ReservationDetailActions.change_time(timeIndex)
    }


    render() {
        const {store, storeSelected, adult, child, day, visibleModal, time, timeSelected} = this.props;
        return (
            <ScrollView>
                <Card>
                    <CardItem>
                        <Text>장소 선택</Text>
                    </CardItem>
                    <View style={styles.bottomBorder}/>
                    <CardItem>
                        <FlatGrid
                            itemDimension={100}
                            items={store}
                            renderItem={({item, index}) => (
                                <Button rounded dark onPress={() => this.handleSelectStore(index)}
                                        style={store[index] === storeSelected ? styles.tButtonColor : styles.fButtonColor}>
                                    <Text
                                        style={store[index] === storeSelected ? styles.tButtonTextColor : styles.fButtonTextColor}>{item}</Text>
                                </Button>
                            )}
                        />
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Text>날짜 선택</Text>
                    </CardItem>
                    <View style={styles.bottomBorder}/>
                    <Calendar style={styles.calendar}
                              markedDates={{
                                  [day]: {
                                      selected: true,
                                      disableTouchEvent: true,
                                      selectedDotColor: 'orange',
                                  },
                              }}
                              minDate={Date()}
                              theme={{
                                  todayTextColor: 'black',
                                  arrowColor: "black",

                                  selectedDayBackgroundColor: 'black',
                                  selectedDayTextColor: 'white',
                              }}
                        // Handler which gets executed on day press. Default = undefined
                              onDayPress={(day) => {
                                  this.handleSelectDay(day);
                                  // console.log('selected day', day.dateString)
                                  // console.log('selected day', day)
                              }}
                        // Handler which gets executed on day long press. Default = undefined
                        //       onDayLongPress={(day) => {
                        //           console.log('selected day', day)
                        //       }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                              monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                              onMonthChange={(month) => {
                                  console.log('month changed', month)
                              }}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                              disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                              firstDay={1}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                              onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                              onPressArrowRight={addMonth => addMonth()}
                    />
                </Card>
                <Card>
                    <CardItem>
                        <Text>시간 선택</Text>
                    </CardItem>
                    <View style={styles.bottomBorder}/>
                    <Button style={styles.marginButton} block bordered dark onPress={() => {
                        this.handleToggleModal(visibleModal)
                    }}>
                        <Text style={styles.textMenuSubTitle}>{timeSelected == '' ? '시간을 선택해주세요.' : timeSelected}</Text>
                    </Button>


                </Card>

                <Card>
                    <CardItem>
                        <Text>인원 선택</Text>
                    </CardItem>
                    <View style={styles.bottomBorder}/>
                    <CardItem>
                        <Grid>
                            <Col size={50}>
                                <Row>
                                    <Col size={25}>
                                        <View style={styles.itemViewStart}>
                                            <Text style={styles.font}>어른</Text>
                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewCenter}>
                                            <Icon name="minus-circle" style={styles.icon} onPress={() => {
                                                this.handleDecrementAdult()
                                            }
                                            }/>

                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewEnd}>
                                            <Text style={styles.font}>{adult}</Text>
                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewCenter}>
                                            <Icon name="plus-circle" style={styles.icon} onPress={() => {
                                                this.handleIncrementAdult()
                                            }}/>
                                        </View>
                                    </Col>
                                </Row>
                            </Col>
                            <Col size={50}>
                                <Row>
                                    <Col size={25}>
                                        <View style={styles.itemViewStart}>
                                            <Text style={styles.font}>소아</Text>
                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewCenter}>
                                            <Icon name="minus-circle" style={styles.icon} onPress={() => {
                                                this.handleDecrementChild()
                                            }}/>
                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewEnd}>
                                            <Text style={styles.font}>{child}</Text>
                                        </View>
                                    </Col>
                                    <Col size={25}>
                                        <View style={styles.itemViewCenter}>
                                            <Icon name="plus-circle" style={styles.icon} onPress={() => {
                                                this.handleIncrementChild()
                                            }}/>
                                        </View>
                                    </Col>
                                </Row>
                            </Col>
                        </Grid>
                    </CardItem>
                </Card>
                <Card style={styles.cardMargin}>
                    <CardItem>
                        <Text>예약정보</Text>
                    </CardItem>
                    <View style={styles.bottomBorder}/>
                    <Form>
                        <Item style={styles.item}>
                            <Grid>
                                <Row>
                                    <Col size={30}>
                                        <View style={styles.itemViewStart}>
                                            <Text style={styles.itemText}>예약자</Text>
                                        </View>
                                    </Col>
                                    <Col size={70}>
                                        <Item regular style={styles.itemInput}>
                                            <Input style={styles.font}
                                                   onChangeText={(inputName) => this.handleInputName(inputName)}/>
                                        </Item>
                                    </Col>
                                </Row>
                            </Grid>
                        </Item>
                        <Item style={styles.item}>
                            <Grid>
                                <Row>
                                    <Col size={30}>
                                        <View style={styles.itemViewStart}>
                                            <Text style={styles.itemText}>연락처</Text>
                                        </View>
                                    </Col>
                                    <Col size={70}>
                                        <Item regular style={styles.itemInput}>
                                            <Input style={styles.font}
                                                   onChangeText={(inputPhone) => this.handleInputPhone(inputPhone)}/>
                                        </Item>
                                    </Col>
                                </Row>
                            </Grid>
                        </Item>
                        <Item style={styles.item}>
                            <Grid>
                                <Row>
                                    <Col size={30}>
                                        <View style={styles.itemViewStart}>
                                            <Text style={styles.itemText}>사전 요청</Text>
                                        </View>
                                    </Col>
                                    <Col size={70}>
                                        <Item regular style={styles.itemInput}>
                                            <Input style={styles.font}
                                                   onChangeText={(inputRequests) => this.handleInputRequests(inputRequests)}/>
                                        </Item>
                                    </Col>
                                </Row>
                            </Grid>
                        </Item>
                    </Form>
                </Card>
                <Modal isVisible={visibleModal === true}>
                    <View style={styles.modalContent}>
                        <Text>시간 선택</Text>
                        <View style={styles.bottomBorder}/>
                        <FlatGrid
                            itemDimension={100}
                            items={time}
                            renderItem={({item, index}) => {

                                if (item <= "12:00") {
                                    return <Button onPress={() => this.handleSelectTime(index)} transparent dark
                                                   style={time[index] === timeSelected ? styles.tButtonColor : styles.fButtonColor2}>
                                        <Text
                                            style={time[index] === timeSelected ? styles.tButtonTextColor : styles.fButtonTextColor}>{item}</Text>
                                    </Button>
                                } else if (item >= "12:00") {
                                    return <Button onPress={() => this.handleSelectTime(index)} transparent dark
                                                   style={time[index] === timeSelected ? styles.tButtonColor : styles.fButtonColor2}>
                                        <Text
                                            style={time[index] === timeSelected ? styles.tButtonTextColor : styles.fButtonTextColor}>{item}</Text>
                                    </Button>
                                }

                            }}
                        />
                        <View style={styles.btnModal}>
                            <Button style={styles.btnToggle} dark block
                                    onPress={() => this.handleToggleModal(visibleModal)}
                            >
                                <Text>확인</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    bottomBorder: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginHorizontal: 15,
    },
    calendar: {
        marginTop: 10,
        marginHorizontal: 20,
        borderWidth: 0
    },
    icon: {
        fontSize: 20
    },
    cardMargin: {
        marginBottom: 150,
    },
    item: {
        borderBottomWidth: 0,
        marginVertical: 10
    },
    itemInput: {
        marginRight: 20
    },
    itemViewStart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemViewCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemViewEnd: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    itemText: {
        fontSize: 14
    },
    font: {
        fontSize: 14,
        color: 'black'
    },
    marginButton: {
        marginTop: 10
    },
    tButtonColor: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 100,
    },
    fButtonColor: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        width: 100,
    },
    fButtonColor2: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 100,
    },
    tButtonTextColor: {
        color: 'white'
    },
    fButtonTextColor: {
        color: 'black'
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
    btnToggle: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnModal: {
        alignSelf: 'stretch'
    }
});

export default connect(
    (state) => ({
        store: state.reservation.get('store'),
        storeSelected: state.reservation.get("storeSelected"),
        adult: state.reservation.getIn(['people', 'adult']),
        child: state.reservation.getIn(['people', 'child']),
        name: state.reservation.get('name'),
        phone: state.reservation.get("phone"),
        requests: state.reservation.get('requests'),
        day: state.reservation.get('day'),
        visibleModal: state.reservation.get('visibleModal'),
        time: state.reservation.get('time'),
        timeSelected: state.reservation.get("timeSelected")
    }),
    (dispatch) => ({
        ReservationDetailActions: bindActionCreators(reservationDetailActions, dispatch)
    })
)(ReservationDetail)
