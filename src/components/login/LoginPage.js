const FBSDK = require('react-native-fbsdk');
const GlobalStore = require('../common/GlobalStore');

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';
import RNKakaoLogins from 'react-native-kakao-logins';
import NativeButton from 'apsl-react-native-button';
import {bindActionCreators} from "redux";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";
import * as loginActions from "../../store/modules/login/loginPage";
import * as routerActions from '../../store/modules/common/router';

const {LoginButton, ShareDialog, AccessToken, GraphRequest, GraphRequestManager, LoginManager} = FBSDK;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://www.facebook.com/',
        };

        this.state = {
            shareLinkContent: shareLinkContent,
            facebookId: "",
            accessToken: "",
            isKakaoLogging: false,
            token: 'token has not fetched',
        };
        if (!RNKakaoLogins) {
            console.log('Not Linked');
        }
    }

    handleSetLogin = (login) => {
        const {LoginActions} = this.props;
        LoginActions.set_login(login)
    }
    handleSendServer = async (login) => {
        const {LoginActions} = this.props;
        await LoginActions.create_user(login)
    }

    handleSaveToken = () => {
        const {RouterActions} = this.props;
        RouterActions.create_token();
    }

    // 카카오 로그인 시작.
    kakaoLogin() {
        console.log('   kakaoLogin   ');

        RNKakaoLogins.login((err, result) => {
            if (err) {
                console.log("result->", err)
                // Alert.alert('error', err);
                return;
            }
            console.log("result->", result)
            this.getProfile(result.token.toString())
        });
    }

    facebookLogin() {
        console.log('   facebookLogin   ');

        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {

                            let accessToken = data.accessToken
                            console.log('accessToken=> ', accessToken.toString())

                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                    // Alert.alert('Error fetching data: ' + error.toString());
                                } else {
                                    console.log(result)

                                    let key = "isCheckLogin"
                                    let value = "true"
                                    GlobalStore.setStoreData(key, value)

                                    let data = {}

                                    data.platformId = result.id;
                                    data.email = result.email;
                                    data.profile_img = result.picture.data.url;
                                    data.login_platform = "facebook";
                                    data.isCheckLogin = true;
                                    data.accessToken = accessToken.toString();
                                    data.name = result.name;

                                    if (result.picture.data.url == null) data.profile_img = ''
                                    if (result.name == null) data.name = ''

                                    console.log('data=>', data);
                                    // this.handleSetLogin(data);

                                    Actions.popTo('MyPage');
                                    Actions.jump('MyPage')


                                }
                            }

                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: accessToken,
                                    parameters: {
                                        fields: {
                                            string: 'email,name,first_name,middle_name,last_name, cover,picture.type(large)'
                                        }
                                    }
                                },
                                responseInfoCallback
                            );

                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start()


                        })
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    kakaoLogout() {
        console.log('   kakaoLogout   ');
        let key = "isCheckLogin"
        let value = "false"
        GlobalStore.setStoreData(key, value)
        RNKakaoLogins.logout((err, result) => {
            if (err) {
                console.log("err->", err)
                // Alert.alert('error', err);
                return;
            }
            console.log("result->", result)
        });
    }

    // 로그인 후 내 프로필 가져오기.
    getProfile(accessToken) {
        console.log('getKakaoProfile');
        // let key = "isKakaoLogin"
        // GlobalStore.getStoreData(key)

        RNKakaoLogins.getProfile((err, result) => {
                if (err) {
                    console.log("result->", err)
                    // Alert.alert('error', err);
                    return;
                }
                console.log("result->", result)

                let key = "isCheckLogin"
                let value = "true"

                this.saveItem(key, value)
                this.handleSaveToken()

                let data = {}
                data.platformId = result.id;
                data.email = '';
                // data.email = result.email != undefined ? result.email:result.email, '';
                data.profile_img = result.profile_image_path;
                data.login_platform = "kakaotalk";
                data.isCheckLogin = true;
                data.accessToken = accessToken;
                data.name = result.nickname;

                if (result.profile_image_path == null) data.profile_img = ''
                if (result.nickname == null) data.name = ''

                console.log('data=>', data);
                this.handleSetLogin(data);
                // this.handleSendServer(data);


            }
        )
        Actions.homeScreen();
    }

    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }




    render() {
        const {hasToken, isLoaded} = this.props;
        console.log('hasToken ; ', hasToken);
        console.log("isLoaded : ", isLoaded);
        return (
            <View style={styles.container}>

                {/*kakaotalk login*/}
                <View style={styles.header}>
                    <Text>Regular Six Logo</Text>
                </View>
                <View style={styles.content}>
                    <NativeButton
                        onPress={() => this.kakaoLogin()}
                        activeOpacity={0.5}
                        style={styles.btnKakaoLogin}
                        textStyle={styles.txtKakaoLogin}
                    >카카오톡으로 시작하기</NativeButton>
                    {/*<NativeButton*/}
                    {/*onPress={() => this.kakaoLogout()}*/}
                    {/*activeOpacity={0.5}*/}
                    {/*style={styles.btnKakaoLogin}*/}
                    {/*textStyle={styles.txtNaverLogin}*/}
                    {/*>Logout</NativeButton>*/}
                    {/*<NativeButton*/}
                    {/*isLoading={this.state.isKakaoLogging}*/}
                    {/*onPress={() => this.getProfile()}*/}
                    {/*activeOpacity={0.5}*/}
                    {/*style={styles.btnKakaoLogin}*/}
                    {/*textStyle={styles.txtNaverLogin}*/}
                    {/*>getProfile</NativeButton>*/}


                    {/*facebook login*/}
                    <NativeButton
                        onPress={() => this.facebookLogin()}
                        activeOpacity={0.5}
                        style={styles.btnFacebookLogin}
                        textStyle={styles.txtFacebookLogin}
                    >페이스북으로 시작하기</NativeButton>

                    <LoginButton
                        logInWithReadPermissions={["public_profile"]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    console.log('result=>', result)

                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
        flex: 1,
        flexDirection: 'column',
        marginTop: Platform.OS === 'ios' ? 0 : 24,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    // kakao
    header: {
        flex: 8.8,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 87.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    btnKakaoLogin: {
        height: 48,
        width: 240,
        alignSelf: 'center',
        backgroundColor: '#fae100',
        borderRadius: 0,
        borderWidth: 0,
    },
    btnFacebookLogin: {
        height: 48,
        width: 240,
        alignSelf: 'center',
        backgroundColor: '#2d4485',
        borderRadius: 0,
        borderWidth: 0,
    },
    txtKakaoLogin: {
        fontSize: 16,
        color: '#202123',
    },
    txtFacebookLogin: {
        fontSize: 16,
        color: '#ffffff',
    },
    txtNaverLogin: {
        fontSize: 16,
        color: '#ffffff',
    },


});

export default connect(
    (state) => ({
        platformId: state.login.get("platformId"),
        email: state.login.get('email'),
        profile_img: state.login.get("profile_img"),
        login_platform: state.login.get('login_platform'),
        isCheckLogin: state.login.get("isCheckLogin"),
        phone_number: state.login.get("phone_number"),
        accessToken: state.login.get("accessToken"),

        hasToken: state.router.get('hasToken'),
        isLoaded: state.router.get('isLoaded')
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch),
        RouterActions: bindActionCreators(routerActions, dispatch)
    })
)(LoginPage);
