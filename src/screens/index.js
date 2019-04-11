import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import HomeScreen from "./shop/HomeScreen";
import HomeDetailScreen from "./shop/HomeDetailScreen";
import NewsFeedScreen from "./newsfeed/NewsFeedScreen";
import ReservationScreen from "./reservation/ReservationScreen";
import ReservationDetailScreen from "./reservation/ReservationDetailScreen";
import ReservationConfirmScreen from './reservation/ReservationConfirmScreen';
import ReservationCompleteScreen from './reservation/ReservationCompleteScreen';
// import ContactListScreen from './contactlist/ContactListScreen';
import MyPageScreen from './myPage/MyPageScreen';
import MyPageReservationConfirmScreen from './myPage/MyPageReservationConfirmScreen';
import MyPageReservationHistoryScreen from './myPage/MyPageReservationHistoryScreen';
import LoginScreen from './login/LoginScreen';
import LogoutScreen from './login/LogoutScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {AsyncStorage, ActivityIndicator,StyleSheet} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as routerActions from '../../src/store/modules/common/router';
import * as loginActions from "../../src/store/modules/login/loginPage";
import {Spinner} from "native-base";

class Index extends Component {
    componentDidMount() {
        console.log("fdsfdsdsfsd")
        AsyncStorage.getItem('isCheckLogin').then((data) => {
            console.log("token -=============== ; ", data)
            if (data !== null) {
                this.handleSaveToken();
            }else{
                this.handleChangeLoading();
            }
        })
    }
  handleSaveToken = () => {
    const {RouterActions} = this.props;
    let hasToken = {hasToken:true}
    RouterActions.create_token(hasToken);
  }

  handleChangeLoading = () =>{
    const {RouterActions} =this.props;
    let isLoaded = {isLoaded:false}
    RouterActions.change_loading(isLoaded);
  }

  handleCheckLoginInfo = async() => {

    const loginInfoJson = await AsyncStorage.getItem('loginInfo');
    console.log('loginInfoJson====================>', loginInfoJson)

      if (loginInfoJson !== null) {
        const {LoginActions} = this.props;
        LoginActions.set_login(loginInfoJson)
      }

    // AsyncStorage.getItem('loginInfo').then((data) => {
    //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh=> ; ", data)
    //   if (data !== null) {
    //     const {LoginActions} = this.props;
    //     LoginActions.set_login(data)
    //
    //   }
    // })
  }

    render() {
        this.handleCheckLoginInfo();

        const {hasToken, isLoaded} = this.props;
        console.log("indexxxxxxxxxx hasToken : ", hasToken, " isLoaded ; ", isLoaded);
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

        if (isLoaded === true && hasToken === false) {
            return (
                <Spinner color="black" style={styles.spinner}/>
            )
        } else {
            return (
                <Router>
                    <Scene key='root' hideNavBar>
                        <Scene key='tabBar' tabs={true} showLabel={false}>
                            <Scene key='Home' title='Home'
                                   icon={tabBarIcon}
                            >
                                <Scene key='homeScreen' component={HomeScreen} title='레귤러식스'/>
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
                                <Scene key='loginScreen' component={LoginScreen} title='레귤러식스'
                                     initial={!hasToken}/>
                                <Scene key='myPageScreen' component={MyPageScreen} title='마이페이지' initial={hasToken}/>
                                <Scene key='logoutScreen' component={LogoutScreen} title='로그아웃' backTitle=" "
                                       hideTabBar={true}
                                       headerTintColor="#000"/>
                                <Scene key='myPageReservationConfirmScreen' component={MyPageReservationConfirmScreen}
                                       title='예약확인' backTitle=" "
                                       headerTintColor="#000"
                                />
                                <Scene key='myPageReservationHistoryScreen' component={MyPageReservationHistoryScreen}
                                       title='지난예약' backTitle=" "
                                />
                            </Scene>

                        </Scene>
                    </Scene>
                </Router>
            );
        }

    }
}
const styles=StyleSheet.create({
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})

export default connect(
    (state) => ({
        hasToken: state.router.get('hasToken'),
        isLoaded: state.router.get('isLoaded')
    }),
    (dispatch) => ({
        RouterActions: bindActionCreators(routerActions, dispatch),
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(Index)
