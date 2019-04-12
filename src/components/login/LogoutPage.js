import React, {Component} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {List, ListItem, Text, Container, Content} from 'native-base'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Actions} from "react-native-router-flux";
import * as routerActions from "../../store/modules/common/router";
const GlobalStore = require('../common/GlobalStore');

let loginKey = "isCheckLogin"
let loginInfo = "loginInfo"

class LogoutPage extends Component {

  logoutSession = () => {
    // let value = "false"
    // GlobalStore.setStoreData(loginKey, value)


    AsyncStorage.removeItem('isCheckLogin').then(() => {
      // Actions.popTo('homeScreen');
      this.handleClearToken();
      // this.handleChangeLoading();
      Actions.replace('loginScreen');
      // Actions.popTo('loginScreen')
      // Actions.loginScreen();
    })

  };

  handleClearToken = () => {
    const {RouterActions} = this.props;
    let data = {hasToken:false, isLoaded:true}
    RouterActions.clear_token(data);
  }

  initialize = async () => {
    const state = await AsyncStorage.getItem(loginKey);
    const info = await AsyncStorage.getItem(loginInfo);

    console.log('loginState=>', state)
    console.log('loginInfo=>', info)

  };

  componentDidMount() {
    this.initialize()
  }

  render() {
    // const {storeSelected, name, phone, day, adult, child, timeSelected, requests} = this.props;
    return (
      <Container>
        <Content>
        <List>
          <ListItem>
            <Grid>
              <Row>
                <Col size={30}>
                  <TouchableOpacity onPress={() => this.logoutSession()}>
                    <Text style={styles.title}>로그아웃</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </ListItem>
        </List>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    alignSelf: 'stretch',
    color: "black"
  },
  content: {
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  item: {
    color: "white",
    backgroundColor: 'white'
  }

});

export default connect(
  (state)=>({
    hasToken:state.router.get('hasToken'),
    isLoaded:state.router.get('isLoaded')
  }),
  (dispatch)=>({
    RouterActions:bindActionCreators(routerActions,dispatch)
  })
)(LogoutPage)
// export default LogoutPage;
