import React, {Component} from 'react';
import {Body, Card, CardItem} from "native-base";
import {ScrollView, StyleSheet, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import {Actions} from 'react-native-router-flux';

class ReservationList extends Component {
    state = {
        shopNames: [
            {
                'id': '1',
                'name': '레귤러식스',
                'introduction': '로봇 테크 카페',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            },
            {
                'id': '2',
                'name': '평화옥',
                'introduction': '냉면 & 비빔밥',
                'uri': 'https://cdn.pixabay.com/photo/2014/04/26/00/41/dining-room-332207_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/03/11/09/08/cookie-3216243_1280.jpg'
            },
            {
                'id': '3',
                'name': '조선횟집',
                'introduction': '수산물회',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/35/st-826687_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg'
            },
            {
                'id': '4',
                'name': '월향',
                'introduction': '퓨전한식',
                'uri': 'https://cdn.pixabay.com/photo/2016/08/28/22/02/restaurant-1626983_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-1440105_1280.jpg'
            },
            {
                'id': '5',
                'name': '산방돼지',
                'introduction': '육류구이',
                'uri': 'https://cdn.pixabay.com/photo/2014/06/23/19/56/breakfast-room-375489_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/08/29/19/03/steak-3640560_1280.jpg'
            },
            {
                'id': '6',
                'name': '오마카세',
                'introduction': '오마카세',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            }
        ]
    };

    render() {
        return (
            <ScrollView style={styles.background}>
                <FlatGrid
                    items={this.state.shopNames}
                    itemDimension={130}
                    renderItem={({item, index}) => (

                        <Card transparent key={item.id}>
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    Actions.reservationDetailScreen()
                                }
                            >
                                <View>
                                    <CardItem cardBody style={styles.padding}>
                                        <Image
                                            source={{uri: item.uri}}
                                            style={styles.image}/>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <Text style={styles.textTitle}>{item.name}</Text>
                                        <Text style={styles.textSubTitle}>{item.introduction}</Text>
                                        </Body>
                                    </CardItem>
                                </View>
                            </TouchableWithoutFeedback>
                        </Card>


                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white'
    },
    padding: {
        padding: 10
    },
    image: {
        height: 150, width: 150, flex: 1, borderRadius: 10
    },
    textTitle: {
        fontWeight: 'bold',
        color: 'black'
    },
    textSubTitle: {
        color: 'gray',
        fontSize: 10,
        paddingVertical: 5
    },
});
export default ReservationList;
