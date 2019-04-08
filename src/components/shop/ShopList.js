import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
    Card,
    CardItem,
    Text,
    Body,
    Right
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from 'react-native-router-flux';
import PreventDoubleClick from '../common/PreventDoubleClick';
import {connect} from 'react-redux';
import * as shopActions from '../../store/modules/shop/shop';
import {bindActionCreators} from "redux";

const TouchableWithoutFeedback2 = PreventDoubleClick(TouchableWithoutFeedback);

class ShopList extends Component {

    handleSelectShop = (shopName,index) => {
        const {ShopActions} = this.props;
        console.log("index : ", index)
        console.log("shop name : ", shopName);
        ShopActions.select_shop({shopName, index});

        Actions.homeDetailScreen()
    }

    render() {
        const {shopNames} = this.props;

        return (
            <ScrollView style={styles.scrollViewContainer}>
                {
                    shopNames.map((item, index) => (
                        <Card transparent key={item.id} style={styles.cardContainer}>
                            <TouchableWithoutFeedback2
                                onPress={() => this.handleSelectShop(item.name, index)}
                            >
                                <View>
                                    <CardItem cardBody>
                                        <Image
                                            source={item.uri}
                                            style={{height: 200, flex: 1, borderRadius: 10, margin: 15}}/>
                                    </CardItem>
                                    <CardItem style={styles.cardItem}>
                                        <Body>
                                        <Text>
                                            <Text>{item.name}</Text>
                                        </Text>
                                        </Body>
                                        <Right>
                                            <Icon name="share-alt" style={styles.icon}/>
                                        </Right>
                                    </CardItem>
                                    <CardItem style={styles.cardItem}>
                                        <Body>
                                        <Text>
                                            <Text style={{color: "gray", fontSize: 12}}>{item.introduction}</Text>
                                        </Text>
                                        </Body>
                                    </CardItem>
                                </View>
                            </TouchableWithoutFeedback2>
                        </Card>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: "white"
    },
    cardContainer: {
        paddingBottom: 10
    },
    cardItem: {
        marginBottom: 0,
        paddingBottom: 0
    },
    icon: {
        color: 'black',
        fontSize: 15
    }
});

export default connect(
    (state) => ({
        shopNames: state.shop.get('shopNames')
    }),
    (dispatch) => ({
        ShopActions: bindActionCreators(shopActions, dispatch)
    })
)(ShopList);
