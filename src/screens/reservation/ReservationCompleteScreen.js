import React, {Component} from 'react';
// import ReservationComplete from '../../components/reservation/ReservationComplete';
import ReservationComplete from '../../components/common/FixedAlert';

class ReservationCompleteScreen extends Component{

    render() {
        return (
            <ReservationComplete icon="check" text1="예약이" text2="완료되었습니다."/>
        );
    }

}
export default ReservationCompleteScreen;
