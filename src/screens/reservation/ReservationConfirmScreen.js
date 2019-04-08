import React, {Component} from 'react';
import {Container} from 'native-base';
import ReservationConfirm from '../../components/reservation/ReservationConfirm';
import FooterButton from  '../../components/common/FooterButton';

class ReservationConfirmScreen extends Component {
    render() {
        return (
            <Container>
                <ReservationConfirm/>
                <FooterButton action="reservationCompleteScreen" buttonTitle="예약완료"/>
            </Container>
        )
    }
}

export default ReservationConfirmScreen;
