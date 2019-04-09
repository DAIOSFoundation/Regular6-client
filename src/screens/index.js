import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import HomeScreen from "./shop/HomeScreen";
import HomeDetailScreen from "./shop/HomeDetailScreen";
import NewsFeedScreen from "./newsfeed/NewsFeedScreen";
import ReservationScreen from "./reservation/ReservationScreen";
import ReservationDetailScreen from "./reservation/ReservationDetailScreen";
import ReservationConfirmScreen from './reservation/ReservationConfirmScreen';
import ReservationCompleteScreen from './reservation/ReservationCompleteScreen';
import ContactListScreen from './contactlist/ContactListScreen';
import MyPageScreen from './myPage/MyPageScreen';
import MyPageReservationConfirmScreen from './myPage/MyPageReservationConfirmScreen';
import MyPageReservationHistoryScreen from './myPage/MyPageReservationHistoryScreen';
import LoginScreen from './login/LoginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {AsyncStorage, ActivityIndicator} from 'react-native';

class Index extends Component {
    state = {
        "uri": "https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg"
    };

    constructor() {
        super();
        this.state = {hasToken: false, isLoaded: false};
    }

    componentDidMount() {
        AsyncStorage.getItem('isCheckLogin').then((token) => {
            console.log("token -=============== ; ", token)
            this.setState({hasToken: token !== null, isLoaded: true})
        })
    }


    render() {
        const tabBarIcon = ({title, focused}) => {
            switch (title) {
                case "Home":
                    return <Icon name="home"
                                 style={focused ? {opacity: 1.0, fontSize: 22, color: "black"} : {
                                     opacity: 0.7,
                                     fontSize: 22
                                 }}/>;
                case "NewsFeed":
                    return <Icon2 name="compass"
                                  style={focused ? {opacity: 1.0, fontSize: 22, color: "black"} : {
                                      opacity: 0.7,
                                      fontSize: 22
                                  }}/>;
                case "Reservation":
                    return <Icon name="calendar-o"
                                 style={focused ? {opacity: 1.0, fontSize: 22, color: "black"} : {
                                     opacity: 0.7,
                                     fontSize: 22
                                 }}/>;
                // case "Contact":
                //     return <Icon name="phone"
                //                  style={focused ? {opacity: 1.0, fontSize: 22, color:"black"} : {opacity: 0.7, fontSize: 22}}/>;
                case "MyPage":
                    return <Icon name="user"
                                 style={focused ? {opacity: 1.0, fontSize: 22, color: "black"} : {
                                     opacity: 0.7,
                                     fontSize: 22
                                 }}/>;
            }

        };
        if (!this.state.isLoaded) {
            return (
                <ActivityIndicator/>
            )
        } else {
            return (
                <Router>
                    <Scene key='root' hideNavBar>
                        <Scene key='tabBar' tabs={true} showLabel={false}>
                            <Scene key='Home' title='Home'
                                   icon={tabBarIcon}
                            >
                                <Scene key='loginScreen' component={LoginScreen} title='레귤러식스'
                                       initial={!this.state.hasToken}/>
                                <Scene key='homeScreen' component={HomeScreen} title='레귤러식스'
                                       initial={this.state.hasToken}/>
                                <Scene key='homeDetailScreen' component={HomeDetailScreen} title='레귤러식스' backTitle=" "
                                       hideTabBar={true}
                                       headerTintColor="#000"
                                    // hideNavBar={true}
                                />
                            </Scene>

                            <Scene key='NewsFeed' title='NewsFeed'
                                   icon={tabBarIcon}>
                                <Scene key='newsFeedScreen' component={NewsFeedScreen} title='뉴스피드'/>
                            </Scene>

                            <Scene key='Reservation' title='Reservation'
                                   icon={tabBarIcon}>
                                <Scene key='reservationScreen' component={ReservationScreen} title='예약하기'/>
                                <Scene key='reservationDetailScreen' component={ReservationDetailScreen} title='예약하기'
                                       backTitle=" "
                                       headerTintColor="#000"
                                       hideTabBar={true}/>
                                <Scene key='reservationConfirmScreen' component={ReservationConfirmScreen} title='예약확인'
                                       backTitle=" "
                                       headerTintColor="#000"
                                       hideTabBar={true}/>
                                <Scene key='reservationCompleteScreen' component={ReservationCompleteScreen}
                                       title='예약완료' backTitle=" "
                                       headerTintColor="#000"
                                />
                            </Scene>

                            {/*<Scene key='Contact' title='Contact'*/}
                            {/*icon={tabBarIcon}>*/}
                            {/*<Scene key='contactListScreen' component={ContactListScreen} title='연락하기'/>*/}
                            {/*</Scene>*/}

                            <Scene key='MyPage' title='MyPage'
                                   icon={tabBarIcon}>
                                <Scene key='myPageScreen' component={MyPageScreen} title='마이페이지'/>
                                <Scene key='myPageReservationConfirmScreen' component={MyPageReservationConfirmScreen}
                                       title='예약확인' backTitle=" "
                                       headerTintColor="#000"
                                />
                                <Scene key='myPageReservationHistoryScreen' component={MyPageReservationHistoryScreen}
                                       title='지난예약' backTitle=" "
                                       headerTintColor="#000"
                                />
                            </Scene>

                        </Scene>
                    </Scene>
                </Router>
            );
        }

    }
}

export default Index;
