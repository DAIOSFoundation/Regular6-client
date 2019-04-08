import React, {Component} from 'react';
import {ScrollView, Image, Text, StyleSheet} from "react-native";
import {Body, Card, CardItem, Left, List, ListItem, Thumbnail} from "native-base";
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/MaterialCommunityIcons';

class NewsFeed extends Component {
    state = {
        shopNames: [
            {
                'id': '1',
                'name': '레귤러식스',
                'introduction': '레귤러식스는 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            },
            {
                'id': '2',
                'name': '평화옥',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2014/04/26/00/41/dining-room-332207_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/03/11/09/08/cookie-3216243_1280.jpg'
            },
            {
                'id': '3',
                'name': '조선횟집',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/35/st-826687_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg'
            },
            {
                'id': '4',
                'name': '라운지엑스',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2016/08/28/22/02/restaurant-1626983_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-1440105_1280.jpg'
            },
            {
                'id': '5',
                'name': '라운지',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2014/06/23/19/56/breakfast-room-375489_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/08/29/19/03/steak-3640560_1280.jpg'
            },
            {
                'id': '6',
                'name': '평화옥',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            },
        ]
    };

    render() {
        return (
            <ScrollView style={styles.background}>
                {
                    this.state.shopNames.map((item, index) => (
                        <Card transparent key={item.id} style={styles.background}>
                            <List>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail round source={{uri: item.profile}}/>
                                    </Left>
                                    <Body>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.subName}>{item.name}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                            <CardItem>
                                <Body>
                                <Text>
                                    <Text style={styles.introduction}>{item.introduction}</Text>
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                <Image
                                    source={{uri: item.uri}}
                                    style={styles.image}/>
                            </CardItem>
                            <CardItem>
                                <IconFont style={[styles.icon, styles.iconPadding]} name="heart-o"/>
                                <IconFeather style={styles.icon} name="message-outline"/>
                            </CardItem>

                        </Card>
                    ))
                }
            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white'
    },
    name: {
        color: 'black'
    },
    subName: {
        color: 'gray',
        fontSize: 12
    },
    introduction: {
        color: 'black'
    },
    image: {
        height: 200,
        flex: 1
    },
    icon: {
        fontSize: 26
    },
    iconPadding: {
        paddingRight: 15
    }
});

export default NewsFeed;
