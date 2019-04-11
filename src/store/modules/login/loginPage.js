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
  "userId": '',
  "name": ''
});

export default handleActions({
  [SET_LOGIN]: (state, action) => {

    const {platformId, email, profile_img, login_platform, phone_number, accessToken, name} = action.payload

    console.log('gggggggggggggggggggggggggggggg=>', action.payload)
    return state.set('platformId', platformId)
      .set('email', email)
      .set('profile_img', profile_img)
      .set('login_platform', login_platform)
      .set('phone_number', phone_number)
      // .set('isCheckLogin', true)
      .set('accessToken', accessToken)
      .set('name', name)
  },
  ...pender({
    type: GET_USER,
    onSuccess: (state, action) => {
      console.log("handleActions : ", action)
      const {platformId, email, profile_img, login_platform, phone_number, name} = action.payload

      return state.set('platformId', platformId)
        .set('email', email)
        .set('profile_img', profile_img)
        .set('login_platform', login_platform)
        .set('phone_number', phone_number)
        // .set('isCheckLogin', true)
        .set('name', name)
    },
    onFailure: (state, action) => {
      console.log("onFailure : ", action.payload)
      return state.set('isCheckLogin', false)
    },
  }),
  ...pender({
    type: CREATE_USER,
    onSuccess:(state,action)=>{
      const {platformId, email, profile_img, login_platform, phone_number, membershipId, userId, accessToken, name} = action.payload.data

      return state.set('platformId', platformId)
        .set('email', email)
        .set('profile_img', profile_img ==="" ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png': profile_img)
        .set('login_platform', login_platform)
        .set('phone_number', phone_number)
        .set('accessToken', accessToken)
        // .set('isCheckLogin', true)
        .set('membershipId', membershipId)
        .set('userId', userId)
        .set('name', name)

    },
    onFailure:(state,action)=>{
      return state.set('isCheckLogin',false)
    }

  })
}, initialState);
