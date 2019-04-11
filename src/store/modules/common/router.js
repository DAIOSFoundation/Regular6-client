import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

const CREATE_TOKEN = 'router/CREATE_TOKEN';
const CHANGE_LOADING = 'router/CHANGE_LOADING';
const CLEAR_TOKEN = 'router/CLEAR_TOKEN';

export const create_token = createAction(CREATE_TOKEN);
export const change_loading = createAction(CHANGE_LOADING);
export const clear_token = createAction(CLEAR_TOKEN);

const initialState = Map({
  hasToken: false,
  isLoaded: true
});


export default handleActions({
  [CREATE_TOKEN]: (state, action) => {
    const {hasToken} = action.payload
    return state.set('hasToken', hasToken)
  },
  [CHANGE_LOADING]: (state, action) => {
    const {isLoaded} = action.payload
    return state.set('isLoaded', isLoaded)
  },
  [CLEAR_TOKEN]: (state, action) => {
    const {hasToken, isLoaded} = action.payload
    return state.set('hasToken', hasToken),
      state.set('isLoaded', isLoaded)
  }

}, initialState)

