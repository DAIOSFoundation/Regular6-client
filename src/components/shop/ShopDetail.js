import React, {Component} from 'react';
import {Content, Card, CardItem, Button, Text, Body, Left, Right, View} from "native-base";
import {ScrollView, Image, StyleSheet, Linking, TouchableWithoutFeedback, Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
// import Modals from '../../components/common/Modals';
import {connect} from 'react-redux';
import PreventDoubleClick from '../common/PreventDoubleClick';
import {bindActionCreators} from "redux";
import * as shopActions from '../../store/modules/shop/shop';
const TouchableWithoutFeedback2 = PreventDoubleClick(TouchableWithoutFeedback);

class ShopDetail extends Component {
    state = {
        uri: 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
        uri2: 'https://cdn.pixabay.com/photo/2016/08/28/22/02/restaurant-1626983_1280.jpg',
        uri3: 'https://cdn.pixabay.com/photo/2014/04/26/00/41/dining-room-332207_1280.jpg',
    };

    handleToggleModal=(visible)=>{
        const {ShopActions} =this.props;
        ShopActions.toggle_modal(visible)
    }

    render() {
        const {shopNames, shopUri, shopIntroduction, visibleModal} =this.props;
        return (
            <ScrollView>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image source={shopUri} style={styles.image}/>
                        </CardItem>
                        <CardItem style={styles.margin}>
                            <Body>
                            <Text style={styles.margin}>
                                <Text style={styles.textMenuTitle}>{shopNames}</Text>
                            </Text>
                            <Text>
                                <Text style={styles.textMenuSubTitle}>#만남 #모임 #회식</Text>
                            </Text>
                            </Body>
                            <Right>
                                <Icon name="share-alt" style={styles.icon2}/>
                            </Right>
                        </CardItem>

                        <CardItem style={styles.cardItemContainer}>
                            <View style={[styles.viewContainer, styles.iconBorder]}>
                                <Icon name="map-marker" style={[styles.icon, styles.margin]}/>
                                <Text style={styles.textMenuSubTitle}>위치보기</Text>
                            </View>

                            <TouchableWithoutFeedback2 onPress={() => {
                                this.handleToggleModal(true)
                                // this.loadModal()
                                // this.setState({visibleModal:true});
                            }}>
                                <View style={[styles.viewContainer, styles.iconBorder]}>
                                    <Icon name="phone" style={[styles.icon, styles.margin]}/>
                                    <Text style={styles.textMenuSubTitle}>전화하기</Text>
                                </View>
                            </TouchableWithoutFeedback2>

                            <TouchableWithoutFeedback2 onPress={() => {
                                Actions.popTo('homeScreen');
                                Actions.jump('reservationScreen');
                            }}>
                                <View style={styles.viewContainer}>
                                    <Icon name="calendar-o" style={[styles.icon, styles.margin]}/>
                                    <Text style={styles.textMenuSubTitle}>예약하기</Text>
                                </View>
                            </TouchableWithoutFeedback2>
                        </CardItem>


                        <Modal isVisible={visibleModal === true} style={styles.modal}>
                            <View style={styles.modalContent}>
                                <Text>식당에 전화하시겠습니까?</Text>
                                <View style={styles.buttonContainer}>
                                    <Button transparent dark onPress={() => this.handleToggleModal(false) }
                                            style={styles.buttonCancel}>
                                        <Text style={styles.cardSubText}>취소하기</Text>
                                    </Button>
                                    <Button transparent dark
                                            onPress={() => Linking.openURL('tel:010-1234-5678').then(this.handleToggleModal(false))}
                                            style={styles.buttonCall}>
                                        <Text style={styles.cardSubText}>전화하기</Text>
                                    </Button>
                                </View>
                            </View>
                        </Modal>


                        <View style={styles.cardBorder}/>
                        <CardItem>
                            <Text style={styles.margin2}>
                                대표메뉴
                            </Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: this.state.uri2}} style={styles.image}/>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.cardSubText}>{shopIntroduction}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.margin2}>
                                행사사진
                            </Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: this.state.uri3}} style={styles.image}/>
                        </CardItem>
                    </Card>
                </Content>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    margin: {
        marginVertical: 5,
    },
    margin2: {
        marginVertical: 10,
    },
    image: {
        height: 250,
        width: null,
        flex: 1
    },
    textMenuTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textMenuSubTitle: {
        fontSize: 10,
        color: 'gray'
    },
    cardItemContainer: {
        marginHorizontal: 50,
        marginBottom: 20
    },
    viewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: 'gray',
        fontSize: 18
    },
    icon2: {
        color: 'black',
        fontSize: 18
    },
    iconBorder: {
        borderRightColor: 'gray',
        borderRightWidth: 0.2
    },
    cardBorder: {
        borderTopColor: 'gray',
        borderTopWidth: 0.2,
        marginHorizontal: 15,
    },
    cardSubText: {
        fontSize: 12
    },
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

export default connect(
    (state)=>({
        shopNames: state.shop.get('selectedShop'),
        shopUri : state.shop.get('selectedShopUri'),
        shopIntroduction : state.shop.get('selectedShopIntroduction'),
        visibleModal : state.shop.get("visibleModal")

    }),
    (dispatch)=>({
        ShopActions:bindActionCreators(shopActions, dispatch)
    })
) (ShopDetail);
