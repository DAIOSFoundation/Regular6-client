import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

const CREATE_TOKEN='router/CREATE_TOKEN';
const CHANGE_LOADING = 'router/CHANGE_LOADING';

export const create_token = createAction(CREATE_TOKEN);
export const change_loading = createAction(CHANGE_LOADING);

const initialState = Map({
    hasToken: false,
    isLoaded: true
});


export default handleActions({
    [CREATE_TOKEN]:(state,action)=>{
        return state.set('hasToken',true)
    },
    [CHANGE_LOADING]:(state,action)=>{
        return state.set('isLoaded',false)
    }
}, initialState)

