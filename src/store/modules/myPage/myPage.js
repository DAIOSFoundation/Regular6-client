import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable'
import {pender} from 'redux-pender';
import * as api from '../../../libs/myPage';

const READ_MYINFO = 'myPage/READ_MYINFO';
const SUBMIT_PIN_NUMBER = 'myPage/SUBMIT_PIN_NUMBER';
const READ_MY_RESERVATION = 'myPageReservationConfirm/READ_MY_RESERVATION';
const CHANGE_PIN_NUMBER = 'myPage/CHANGE_PIN_NUMBER';

export const read_myInfo = createAction(READ_MYINFO, api.readMyInfo);
export const submit_pinNumber = createAction(SUBMIT_PIN_NUMBER, api.submitPinNumber)
export const read_myReservation = createAction(READ_MY_RESERVATION, api.readMyReservation);
export const change_pinNumber =createAction(CHANGE_PIN_NUMBER);

const initialState = Map({
    gradeLevel: '회원',
    chargingAmount: 0,
    remainingAmount: 0,
    usedAmount: 0,

    pinNumber:'',
    visibleMembershipAmountView: false,

    reservationData: [],

});

export default handleActions({
    [CHANGE_PIN_NUMBER]:(state,action)=>{
        return state.set('pinNumber',action.payload)
    },
    ...pender({
        type: READ_MYINFO,
        onSuccess: (state, action) => {
            console.log("handleActions : ", action)
            const {grade_level, charging_amount, remaining_amount, used_amount, pin_number} = action.payload.data
            let visibleMembershipAmountView = false;

            if (pin_number === undefined) {
                visibleMembershipAmountView = false;
            } else {
                visibleMembershipAmountView = true;
            }
            return state.set('gradeLevel', grade_level)
                .set('chargingAmount', charging_amount)
                .set('remainingAmount', remaining_amount)
                .set('usedAmount', used_amount)
                .set('visibleMembershipAmountView', visibleMembershipAmountView)
        },
        onFailure: (state, action) => {
            console.log("onFailure : ", action.payload)
            return state.set('gradeLevel', "b")
        },
    }),
    ...pender({
        type: SUBMIT_PIN_NUMBER,
        onSuccess:(state,action)=>{
            return state.set('visibleMembershipAmountView',true)
        },
        onFailure:(state,action)=>{
            return state.set('visibleMembershipAmountView',false)
        }

    }),
    ...pender({
        type: READ_MY_RESERVATION,
        onSuccess: (state, action) => {
            let arrayData = [];
            arrayData.push(action.payload.data)

            return state.set('reservationData', arrayData)
        }
    })
}, initialState);
