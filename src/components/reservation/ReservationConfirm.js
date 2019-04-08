import React, {Component} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import {List, ListItem, Text} from 'native-base'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as reservationActions from "../../store/modules/reservation/reservation";

class ReservationConfirm extends Component {
    render() {
        const {storeSelected, name, phone, day, adult, child, timeSelected, requests} = this.props;
        return (
            <ScrollView>
                <List>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>예약명</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>{name}_{phone}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>장소</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>{storeSelected}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>날짜</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>{day}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>시간</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>{timeSelected}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>인원</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>어른 {adult} 소아 {child}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid>
                            <Row>
                                <Col size={30}>
                                    <Text style={styles.title}>사전요청</Text>
                                </Col>
                                <Col size={70}>
                                    <Text style={styles.content}>{requests}</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                </List>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'left',
        alignSelf: 'stretch',
        color: "gray"
    },
    content: {
        textAlign: 'left',
        alignSelf: 'stretch'
    }

});

export default connect(
    (state) => ({
        storeSelected: state.reservation.get("storeSelected"),
        adult: state.reservation.getIn(['people', 'adult']),
        child: state.reservation.getIn(['people', 'child']),
        name: state.reservation.get('name'),
        phone: state.reservation.get("phone"),
        requests: state.reservation.get('requests'),
        day: state.reservation.get('day'),
        timeSelected: state.reservation.get("timeSelected")
    }),
    (dispatch) => ({
        ReservationActions: bindActionCreators(reservationActions, dispatch)
    })
)(ReservationConfirm)
