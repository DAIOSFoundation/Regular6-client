// import React, {Component} from 'react';
// import {Footer, Text, Button, View} from 'native-base'
// import {Linking, StyleSheet} from 'react-native'
// import {Actions} from "react-native-router-flux";
// import {connect} from 'react-redux';
// import * as loginActions from '../../store/modules/login/loginPage';
// import {bindActionCreators} from "redux";
// import Modal from "react-native-modal";
//
//
// class LoginButton extends Component {
//
//   goToPage = () => {
//     if (this.props.action === "loginCompleteScreen") {
//       const {LoginActions, loading, error, platformId, email, profile_img, login_platform, isCheckLogin, phone_number, accessToken} = this.props;
//
//
//       LoginActions.create_user(LoginActions, loading, error, platformId, email, profile_img, login_platform, isCheckLogin, phone_number, accessToken)
//
//       Actions.popTo('MyPage');
//       Actions.jump('MyPage')
//
//       console.log("loading: ", loading);
//       console.log("!!!!!!!!!! ", error);
//
//     }
//   }
//
//   render() {
//     this.goToPage();
//   }
// }
//
// export default connect(
//   (state) => ({
//     platformId: state.login.get("platformId"),
//     email: state.login.get('email'),
//     profile_img: state.login.get("profile_img"),
//     login_platform: state.login.get('login_platform'),
//     isCheckLogin: state.login.get("isCheckLogin"),
//     phone_number: state.login.get("phone_number"),
//     accessToken: state.login.get("accessToken"),
//   }),
//   (dispatch) => ({
//     LoginActions: bindActionCreators(loginActions, dispatch)
//   })
// )(LoginButton);
