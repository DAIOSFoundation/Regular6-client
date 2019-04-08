import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable'
import {pender} from 'redux-pender';
import * as api from '../../../libs/logins';
const GlobalStore = require('../../../components/common/GlobalStore');

const GET_USER = 'login/GET_USER';
const CREATE_USER = 'login/CREATE_USER';
const SET_LOGIN = 'login/SET_LOGIN';

export const get_user = createAction(GET_USER, api.getUser);
export const create_user = createAction(CREATE_USER, api.createUser)
export const set_login = createAction(SET_LOGIN)

const initialState = Map({
  "platformId": '',
  "email": '',
  "profile_img": '',
  "login_platform": '',
  "isCheckLogin": false,
  "phone_number": '',
  "accessToken": '',
  "membershipId": '',
  "userId": ''
});

export default handleActions({
  [SET_LOGIN]: (state, action) => {

    const {platformId, email, profile_img, login_platform, phone_number, accessToken} = action.payload

    return state.set('platformId', platformId)
      .set('email', email)
      .set('profile_img', profile_img)
      .set('login_platform', login_platform)
      .set('phone_number', phone_number)
      .set('isCheckLogin', true)
      .set('accessToken', accessToken)
  },
  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      console.log("handleActions : ", action)
      const {platformId, email, profile_img, login_platform, phone_number} = action.payload

      return state.set('platformId', platformId)
        .set('email', email)
        .set('profile_img', profile_img)
        .set('login_platform', login_platform)
        .set('phone_number', phone_number)
        .set('isCheckLogin', true)
    },
    onFailure: (state, action) => {
      console.log("onFailure : ", action.payload)
      return state.set('isCheckLogin', false)
    },
  }),
  ...pender({
    type: CREATE_USER,
    onSuccess:(state,action)=>{
      console.log("handleActions : ", action)
      const {platformId, email, profile_img, login_platform, phone_number, membershipId, userId, accessToken} = action.payload

      return state.set('platformId', platformId)
        .set('email', email)
        .set('profile_img', profile_img)
        .set('login_platform', login_platform)
        .set('phone_number', phone_number)
        .set('accessToken', accessToken)
        .set('isCheckLogin', true)
        .set('membershipId', membershipId)
        .set('userId', userId)

      let keyUserId = "userId"
      let keyMembershipId = "membershipId";

      console.log('action CREATE_USER=>', action.payload)
      GlobalStore.setStoreData(keyUserId, userId);
      GlobalStore.setStoreData(keyMembershipId, membershipId);

      return;
    },
    onFailure:(state,action)=>{
      return state.set('isCheckLogin',false)
    }

  })
}, initialState);
