import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

const CREATE_TOKEN='router/CREATE_TOKEN';

export const create_token = createAction(CREATE_TOKEN);

const initialState = Map({
    hasToken: false,
    isLoaded: false
});


export default handleActions({
    [CREATE_TOKEN]:(state,action)=>{
        return state.set('hasToken',true)
            .set('isLoaded',true)
    }
}, initialState)

