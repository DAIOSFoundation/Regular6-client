import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from "react-native";
import {Button, CardItem, Icon, Spinner, Input} from "native-base";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import QRCode from 'react-native-qrcode-svg';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as myPageActions from '../../store/modules/myPage/myPage';
import * as loginActions from "../../store/modules/login/loginPage";

const GlobalStore = require('../common/GlobalStore');

class MyPage extends Component {
  state = {
    text: 'http://facebook.github.io/react-native/',
    isModalVisible: false,
  };

  _toggleModal = () =>
    this.setState({isModalVisible: !this.state.isModalVisible});

  handleSubmitPinNumer = () => {
    const {MyPageActions, pinNumber} = this.props;
    console.log("submitPinNumber : ", pinNumber);
    MyPageActions.submit_pinNumber(pinNumber)
  };

  handleChangePinNumber = (pinNumber) => {
    const {MyPageActions} = this.props;
    console.log("change pinNUmber : ", pinNumber);
    MyPageActions.change_pinNumber(pinNumber);
  };

  handleSendServer = (login) => {
    const {LoginActions} = this.props;
    LoginActions.create_user(login)
  }

  initialize = async () => {
    const {LoginActions, MyPageActions, platformId, email, profile_img, login_platform, accessToken, name} = this.props;
    try {

      const loginInfoJson = await AsyncStorage.getItem('loginInfo');
      let loginInfo = JSON.parse(loginInfoJson);
      console.log('2222222222222222====================>', loginInfo)
      // let data = {}
      // data.platformId = platformId;
      // data.email = email;
      // data.profile_img = profile_img;
      // data.login_platform = login_platform;
      // data.accessToken = accessToken;
      // data.name = name;
      // console.log('data=>', data);

      // AsyncStorage.getItem('isCheckLogin').then((token) => {
      //   console.log('loginState222222222222222222=>', token)
      //   if (token !== "true") {
      //     Actions.popTo('homeScreen');
      //     Actions.loginScreen();
      //   }
      // })

      let userInfo = await LoginActions.create_user(loginInfo);
      let user = userInfo.data;
      let userId = user.userId;
      let membershipId = user.membershipId;

      console.log('userInfo=>', userInfo.data);
      console.log('membershipId=>', membershipId);
      // let keyUserId = "userId"
      // let keyMembershipId = "membershipId";
      // GlobalStore.setStoreData(keyUserId, userId);
      // GlobalStore.setStoreData(keyMembershipId, membershipId);
      //
      // var test = await AsyncStorage.getItem("test");
      // var test3 = await AsyncStorage.getItem("userId");
      // var test2 = await AsyncStorage.getItem("membershipId");
      //
      // console.log('GlobalStore=>', test)
      // console.log('GlobalStore=>', test2)
      // console.log('GlobalStore=>', test3)

      await MyPageActions.read_myInfo(membershipId)
    } catch (e) {

      console.log("mypage error : ", e)
    }
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    const {gradeLevel, chargingAmount, remainingAmount, usedAmount, pinNumber, visibleMembershipAmountView, loading, profile_img, platformId, name} = this.props;

    if (loading) return <Spinner color="black" style={styles.spinner}/>;

    if (visibleMembershipAmountView) {

      console.log('name=========================:>', name);
      return (
        <ScrollView style={styles.container}>

          <View>
            <View style={styles.viewSetting}>
              <Icon2 style={styles.setting} name="settings" style={[styles.icon, styles.margin]}
                     onPress={() => Actions.logoutScreen()}/>
            </View>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Image style={styles.avatar}
                       source={{uri: profile_img}}/>
                <Text style={styles.name}>
                  {name}
                </Text>

              </View>

              <CardItem style={styles.cardItemContainer}>
                <View style={[styles.viewContainer, styles.iconBorder]}>
                  <Icon2 name="card-membership" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>포인트</Text>
                  <Text style={styles.textMenuSubTitle}>{remainingAmount}</Text>
                </View>

                <View style={[styles.viewContainer, styles.iconBorder]}>
                  <Icon2 name="star" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>등급</Text>
                  <Text style={styles.textMenuSubTitle}>{gradeLevel}</Text>
                </View>

                <View style={styles.viewContainer}>
                  <Icon2 name="assignment-ind" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>방문내역</Text>
                  <Text style={styles.textMenuSubTitle}>12회</Text>
                </View>
              </CardItem>
            </View>

            {/*ㅇㅖ약내역*/}
            <View style={styles.card}>
              <Text style={styles.reservationTitle}>예약 내역</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => Actions.myPageReservationConfirmScreen()}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}>예약 확인 </Text>
                </TouchableOpacity>
                <Text> | </Text>
                <TouchableOpacity onPress={() => Actions.myPageReservationHistoryScreen()}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}> 지난 예약</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*멤버십*/}
            <Text style={styles.membershipTitle}>멤버십</Text>


            {/*금액 뷰*/}
            <View style={styles.membershipAmount}>
              <View style={styles.amountContent}>
                <View style={styles.cardFooter}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}>충전 금액 </Text>
                  <Text
                    style={[styles.reservationLabel, styles.textMenuSubTitle2]}>{chargingAmount}원</Text>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}>사용 금액 </Text>
                  <Text
                    style={[styles.reservationLabel, styles.textMenuSubTitle2]}>{usedAmount}원</Text>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}>남은 금액 </Text>
                  <Text
                    style={[styles.reservationLabel, styles.textMenuSubTitle2]}>{remainingAmount}원</Text>
                </View>
              </View>
              <View style={styles.amountContent}>
                <Button bordered block style={styles.qrcodeButton} onPress={this._toggleModal}>
                  <Text style={styles.qrcodeText}>QR 코드</Text>
                </Button>
              </View>
            </View>


          </View>

          <Modal style={styles.modalView} isVisible={this.state.isModalVisible}>
            {/*<View style={{ flex: 1 }}>*/}


            <TouchableOpacity onPress={this._toggleModal}>
              <Text style={styles.cancelBtn}>X</Text>
            </TouchableOpacity>

            <View style={styles.qrcodeView}>
              <QRCode
                value="http://awesome.link.qr"
                logoSize={500}
                // logoBackgroundColor='transparent'
              />
              <Text>QRCODE</Text>
            </View>


            {/*</View>*/}
          </Modal>

        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.viewSetting}>
              <Icon2 style={styles.setting} name="settings" style={[styles.icon, styles.margin]}
                     onPress={() => Actions.logoutScreen()}/>
            </View>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Image style={styles.avatar}
                       source={{uri: profile_img}}/>
                <Text style={styles.name}>
                  {name}
                </Text>

              </View>

              <CardItem style={styles.cardItemContainer}>
                <View style={[styles.viewContainer, styles.iconBorder]}>
                  <Icon2 name="card-membership" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>포인트</Text>
                  <Text style={styles.textMenuSubTitle}>{remainingAmount}</Text>
                </View>

                <View style={[styles.viewContainer, styles.iconBorder]}>
                  <Icon2 name="star" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>등급</Text>
                  <Text style={styles.textMenuSubTitle}>{gradeLevel}</Text>
                </View>

                <View style={styles.viewContainer}>
                  <Icon2 name="assignment-ind" style={[styles.icon, styles.margin]}/>
                  <Text style={styles.textMenuSubTitle}>방문내역</Text>
                  <Text style={styles.textMenuSubTitle}>12회</Text>
                </View>
              </CardItem>
            </View>

            {/*ㅇㅖ약내역*/}
            <View style={styles.card}>
              <Text style={styles.reservationTitle}>예약 내역</Text>
              <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => Actions.myPageReservationConfirmScreen()}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}>예약 확인 </Text>
                </TouchableOpacity>
                <Text> | </Text>
                <TouchableOpacity onPress={() => Actions.myPageReservationHistoryScreen()}>
                  <Text style={[styles.reservationLabel, styles.textMenuSubTitle]}> 지난 예약</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*멤버십*/}
            <Text style={styles.membershipTitle}>멤버십</Text>

            {/*pin 입력*/}
            <View style={styles.membershipCard}>
              <View style={styles.pinDetail}>
                <View style={styles.pinContent}>
                  <View style={styles.inputContainer}>
                    <Input style={styles.inputs}
                           onChangeText={(pinNumber) => this.handleChangePinNumber(pinNumber)}
                           placeholder="N자리의 PIN 번호를 입력해주세요."
                           underlineColorAndroid='transparent'/>
                  </View>
                </View>

                <View style={styles.pinContent}>
                  <Button bordered block style={styles.membershipButton} onPress={() =>
                    this.handleSubmitPinNumer()}>
                    <Text> 입력 </Text>
                  </Button>
                </View>
              </View>
            </View>

          </View>

          <Modal style={styles.modalView} isVisible={this.state.isModalVisible}>
            {/*<View style={{ flex: 1 }}>*/}
            <TouchableOpacity onPress={this._toggleModal}>
              <Text style={styles.cancelBtn}>X</Text>
            </TouchableOpacity>

            <View style={styles.qrcodeView}>
              <QRCode
                value="http://awesome.link.qr"
                logoSize={500}
                // logoBackgroundColor='transparent'
              />
              <Text>QRCODE</Text>
            </View>
            {/*</View>*/}
          </Modal>

        </ScrollView>

      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: "#ffffff",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent: {
    margin: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 12,
    color: 'rgba(32, 33, 35, 0.6)'
  },
  count: {
    fontSize: 12,
    color: 'rgba(32, 33, 35, 0.6)'
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    // padding:30,
    // marginTop:40
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: "#ffffff",
  },
  description: {
    fontSize: 12,
    color: "#d8d8d8",
    marginTop: 10,
    textAlign: 'center'
  },
  btn: {
    color: "gray"
  },
  /******** card **************/
  card: {
    // marginVertical: 8,
    // flexBasis: '47%',
    marginHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 37,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#d8d8d8",
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
  },
  cardContent: {
    // paddingVertical: 12.5,
    // paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: 12.5,
    // paddingBottom: 25,
    // paddingHorizontal: 16,
    // borderBottomLeftRadius: 1,
    // borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 100,
    width: null,
  },
  /******** reservation bar ******************/
  reservationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  reservationSection: {
    // justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  reservationLabel: {
    marginLeft: 8,
    // alignSelf: 'flex-end',
    // justifyContent: 'center',
  },
  reservationTitle: {
    fontSize: 16,
    marginLeft: 8,
    color: "#000000",
    fontWeight: '600',
  },

  /***************** 멤버십 ******************/
  membershipCard: {
    marginHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 37,
    paddingLeft: 16,
    // display: "none",
  },
  membershipTitle: {
    fontSize: 16,
    marginLeft: 8,
    color: "#000000",
    fontWeight: '600',
    paddingTop: 16,
    paddingLeft: 16,
  },
  membershipButton: {
    // marginTop: 10,
    borderColor: 'gray',
    width: 64,
    height: 40,
    borderRadius: 6
  },
  /******** pin ********/
  inputContainer: {
    borderColor: '#d8d8d8',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    width: 256,
    height: 40,
    // marginTop:10,
    marginBottom: 11,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 16,
    color: "black",
    fontWeight: '600',
    // height:45,
    // borderBottomColor: '#d8d8d8',
    // flex:1,
  },
  pinDetail: {
    // alignSelf: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: "#FFFFFF"
  },
  pinContent: {
    margin: 12,
    alignItems: 'center'
  },

  /******* membershipAmount *******/
  membershipAmount: {
    marginLeft: 16,
    marginRight: 150,
    // backgroundColor: "#000000",
    flexDirection: 'row',
  },
  amountContent: {
    // alignSelf: 'center',
    // alignItems: 'center',

    // position: 'absolute',
    // backgroundColor: "#FFFFFF"
  },
  qrcodeButton: {
    marginLeft: 150,
    backgroundColor: "#000000",
    // borderColor: 'black',
    width: 80,
    height: 40,
    borderRadius: 20,
  },
  qrcodeText: {
    textAlign: 'center',
    fontSize: 14,
    color: "#d8d8d8",
    fontWeight: '600',
  },


  // qrcode modal
  modalView: {
    // alignItems: 'center',
    // justifyContent: 'center'
    // backgroundColor: '#d8d8d8',
  },
  qrcodeView: {
    // backgroundColor: '#000000',
    // height: 200,
    // width: 200,
    // flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: 120,
    marginBottom: 250,
  },
  cancelView: {
    flex: 1,
    height: 50,
    width: 50,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // paddingRight: 24,
    backgroundColor: 'red',
  },
  cancelBtn: {
    textAlign: 'right',
    fontSize: 14,
    color: "#ffffff",
    paddingRight: 50,
    marginBottom: 150,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },


  cardItemContainer: {
    marginHorizontal: 50,
    marginBottom: 20
  },
  viewContainer: {
    paddingTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'black',
    fontSize: 24
  },
  iconBorder: {
    borderRightColor: 'gray',
    borderRightWidth: 0.2
  },
  margin: {
    marginBottom: 12,
  },
  textMenuSubTitle: {
    fontSize: 12,
    color: 'rgba(32,33,35,0.6)'
  },
  textMenuSubTitle2: {
    fontSize: 12,
    color: '#202123'
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewSetting: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 18,
    paddingTop: 30,
  },
  setting: {
    width: 16,
    height: 16,
  }

});
export default connect(
  (state) => (
    {
      gradeLevel: state.myPage.get('gradeLevel'),
      chargingAmount: state.myPage.get('chargingAmount'),
      remainingAmount: state.myPage.get('remainingAmount'),
      usedAmount: state.myPage.get('usedAmount'),
      pinNumber: state.myPage.get('pinNumber'),
      visibleMembershipAmountView: state.myPage.get('visibleMembershipAmountView'),
      loading: state.pender.pending['myPage/READ_MYINFO'],
      error: state.pender.failure['myPage/READ_MYINFO'],

      platformId: state.login.get("platformId"),
      email: state.login.get('email'),
      profile_img: state.login.get("profile_img"),
      login_platform: state.login.get('login_platform'),
      isCheckLogin: state.login.get("isCheckLogin"),
      phone_number: state.login.get("phone_number"),
      accessToken: state.login.get("accessToken"),
      name: state.login.get("name"),
      userId: state.login.get("userId"),
      membershipId: state.login.get("membershipId"),
    }),
  (dispatch) => ({
    MyPageActions: bindActionCreators(myPageActions, dispatch),
    LoginActions: bindActionCreators(loginActions, dispatch)
  })
)(MyPage);
