import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {pender} from 'redux-pender';

const SELECT_SHOP = 'shop/SELECT_SHOP';
const TOGGLE_MODAL = 'shopDetail/TOGGLE_MODAL';

export const select_shop =createAction(SELECT_SHOP);
export const toggle_modal=createAction(TOGGLE_MODAL);

const initialState = Map({
        shopNames: [
            {
                'id': '0',
                'name': '월향',
                'introduction': '월향은 다양한 지역 막걸리와 신선한 농수산물 식재료를 바탕으로 한 한식 브랜드입니다.',
                'uri': require('Regular6/src/asset/wolhyang.jpg')
            },
            {
                'id': '1',
                'name': '조선횟집',
                'introduction': '조선횟집은 사시사철 우리 생선을 우리 방식으로 만나 볼 수 있는 한국식 숙성 횟집 브랜드입니다.',
                'uri': require('Regular6/src/asset/chosun.jpg')
            },
            {
                'id': '2',
                'name': '평화옥',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': require('Regular6/src/asset/pyeonghwaok.jpg')
            },
            {
                'id': '3',
                'name': '산방돼지',
                'introduction': '산방돼지 395.2는 프리미엄 돼지구이 전문점으로, 제주도 산방산 해발 395.2m에서 길러진 제주 돼지의 맛을 느낄 수 있습니다.',
                'uri': require('Regular6/src/asset/pyeonghwaok.jpg')
            },
            {
                'id': '4',
                'name': '라운지엑스',
                'introduction': '라운지엑스는 커피의 아날로그와 로봇테크의 디지털이 조화를 이루는 IT 카페입니다.',
                'uri': require('Regular6/src/asset/pyeonghwaok.jpg')
            },
            {
                'id': '5',
                'name': '앨코브',
                'introduction': '평화옥은 강남 N타워 B2에 위치한 복합공간으로, 외식문화를 선도하는 공간입니다',
                'uri': require('Regular6/src/asset/pyeonghwaok.jpg')
            },
        ],

    selectedShop:'',
    selectedShopUri:'',
    selectedShopIntroduction:'',
    visibleModal:false

    }
);

export default handleActions({
    [SELECT_SHOP]:(state,action)=>{
        let index = action.payload.index;
        console.log("111 ; ",state.get("shopNames")[index]['introduction'])
        return state.set('selectedShop',action.payload.shopName)
            .set('selectedShopUri',state.get('shopNames')[index]['uri'])
            .set('selectedShopIntroduction',state.get('shopNames')[index]['introduction'])
    },
    [TOGGLE_MODAL]:(state,action)=>{
        console.log('visibleModal : ',action.payload)
        return state.set('visibleModal',action.payload)
    }
},initialState);
