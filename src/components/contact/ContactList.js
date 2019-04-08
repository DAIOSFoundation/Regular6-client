import React, {Component} from "react";
import {ScrollView, Text, StyleSheet} from "react-native";
import {Body, Button, Icon, Left, List, ListItem, Thumbnail} from "native-base";

class ContactList extends Component{
    state = {
        shopNames: [
            {
                'id': '1',
                'name': '레귤러식스',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            },
            {
                'id': '2',
                'name': '평화옥',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2014/04/26/00/41/dining-room-332207_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/03/11/09/08/cookie-3216243_1280.jpg'
            },
            {
                'id': '3',
                'name': '조선횟집',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/35/st-826687_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/03/05/23/02/barbecue-1239434_1280.jpg'
            },
            {
                'id': '4',
                'name': '라운지엑스',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2016/08/28/22/02/restaurant-1626983_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2016/06/06/18/29/meat-1440105_1280.jpg'
            },
            {
                'id': '5',
                'name': '라운지',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2014/06/23/19/56/breakfast-room-375489_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2018/08/29/19/03/steak-3640560_1280.jpg'
            },
            {
                'id': '6',
                'name': '평화옥',
                'introduction': '로봇테크카페',
                'uri': 'https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg',
                'profile': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg'
            },
        ]
    };
    render(){
        return(
            <ScrollView style={styles.background}>
                {
                    this.state.shopNames.map((item, index) => (
                        <List key={item.id}>
                            <ListItem avatar style={styles.listItem}>
                                <Left>
                                    <Thumbnail square source={{uri: item.profile}} style={styles.image}/>
                                </Left>
                                <Body>
                                <Text>
                                    <Text style={styles.colorBlack}>{item.name}</Text>
                                    <Text style={styles.colorGray}>  {item.introduction}</Text>
                                </Text>
                                <Button bordered block style={styles.button}>
                                    <Text><Icon style={styles.icon} name="call"/> 전화하기</Text>
                                </Button>
                                </Body>
                            </ListItem>
                        </List>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    background:{
      backgroundColor:'white'
    },
    colorGray: {
        fontSize: 12,
        color: 'gray',
    },
    colorBlack: {
        color: 'black'
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 10
    },
    icon: {
        color: 'gray',
        fontSize: 20
    },
    listItem: {
        height: 100
    },
    call: {
        backgroundColor: 'white'
    },
    button: {
        marginTop: 10,
        borderColor: 'gray',
        width: 250,
        height: 40,
        borderRadius: 20
    }
});
export default ContactList;
