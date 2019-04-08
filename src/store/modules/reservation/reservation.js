import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';
import * as api from '../../../libs/reservations';

const CHANGE_STORE = 'reservation/CHANGE_STORE';
const INCREMENT_ADULT = 'reservation/INCREMENT_ADULT';
const DECREMENT_ADULT = 'reservation/DECREMENT_ADULT';
const INCREMENT_CHILD = 'reservation/INCREMENT_CHILD';
const DECREMENT_CHILD = 'reservation/DECREMENT_CHILD';
const INPUT_NAME = 'reservation/INPUT_NAME';
const INPUT_PHONE = 'reservation/INPUT_PHONE';
const INPUT_REQUESTS = 'reservation/INPUT_REQUESTS';
const SELECT_DAY = 'reservation/SELECT_DAY';
const TOGGLE_MODAL = 'reservation/TOGGLE_MODAL';
const CHANGE_TIME = 'reservation/CHANGE_TIME';
const FORM_CHECK_MODAL = 'reservation/FORM_CHECK_MODAL';
const CHANGE_MODAL_TEXT = 'reservation/CHANGE_MODAL_TEXT';
const CREATE_RESERVATION = 'reservation/CREATE_RESERVATION';

export const change_store = createAction(CHANGE_STORE);
export const increment_adult = createAction(INCREMENT_ADULT);
export const decrement_adult = createAction(DECREMENT_ADULT);
export const increment_child = createAction(INCREMENT_CHILD);
export const decrement_child = createAction(DECREMENT_CHILD);
export const input_name = createAction(INPUT_NAME);
export const input_phone = createAction(INPUT_PHONE);
export const input_requests = createAction(INPUT_REQUESTS);
export const select_day = createAction(SELECT_DAY);
export const toggle_modal = createAction(TOGGLE_MODAL);
export const change_time = createAction(CHANGE_TIME);
export const formCheck_modal = createAction(FORM_CHECK_MODAL);
export const change_modal_text = createAction(CHANGE_MODAL_TEXT);
export const create_reservation = createAction(CREATE_RESERVATION, api.createReservation)

const initialState = Map({
    store: ["월향", "평화옥", "산방돼지", "조선횟집", "앨코브", "라운지엑스"],
    storeCheck: [false, false, false, false, false, false],
    storeSelected: '',
    day: '',
    people: Map({
        adult: 1,
        child: 0
    }),
    name: '',
    phone: '',
    requests: '없음',
    visibleModal: false,
    time: ["11:30", "12:00", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"],
    timeCheck: [false, false, false, false, false, false, false, false],
    timeSelected: '',
    formVisible: false,
    modalText: '',
    reservation: false
});

export default handleActions({
    [CHANGE_STORE]: (state, action) => {
        let index = action.payload;
        let array = [];
        for (let i = 0; i < index; i++) {
            array[i] = false;
        }
        array[index] = !(state.get('storeCheck')[index]);

        for (let j = index + 1; j < state.get('storeCheck').length; j++) {
            array[j] = false;
        }
        return state.set('storeSelected', state.get('store')[index])
    },
    [INCREMENT_ADULT]: (state, action) => {
        return state.setIn(['people', 'adult'], state.getIn(['people', 'adult']) + 1);
    },
    [DECREMENT_ADULT]: (state, action) => {
        return state.setIn(['people', 'adult'], state.getIn(['people', 'adult']) - 1);
    },
    [INCREMENT_CHILD]: (state, action) => {
        return state.setIn(['people', 'child'], state.getIn(['people', 'child']) + 1)
    },
    [DECREMENT_CHILD]: (state, action) => {
        return state.setIn(['people', 'child'], state.getIn(['people', 'child']) - 1)
    },
    [INPUT_NAME]: (state, action) => {
        return state.set('name', action.payload)
    },
    [INPUT_PHONE]: (state, action) => {
        return state.set('phone', action.payload)
    },
    [INPUT_REQUESTS]: (state, action) => {
        return state.set('requests', action.payload)
    },
    [SELECT_DAY]: (state, action) => {
        return state.set('day', action.payload)
    },
    [TOGGLE_MODAL]: (state, action) => {
        return state.set('visibleModal', !action.payload)
    },
    [CHANGE_TIME]: (state, action) => {
        let index = action.payload;
        let array = [];
        for (let i = 0; i < index; i++) {
            array[i] = false;
        }
        array[index] = !(state.get('timeCheck')[index]);

        for (let j = index + 1; j < state.get('timeCheck').length; j++) {
            array[j] = false;
        }
        return state.set('timeSelected', state.get('time')[index])
    },
    [FORM_CHECK_MODAL]: (state, action) => {
        return state.set('formVisible', !action.payload)
    },
    [CHANGE_MODAL_TEXT]: (state, action) => {
        return state.set("modalText", action.payload)
    },

    ...pender({
        type: CREATE_RESERVATION,
        onSuccess: (state, action) => {
            const {value} = action.payload;
            console.log("value : ",value);
            console.log("success : ", action);
            return state.set('reservation', true)
        },
        onFailure: (state, action) => {
            console.log("failure : ", action);
            return state.set('reservation', false)
        }

    })
}, initialState);
