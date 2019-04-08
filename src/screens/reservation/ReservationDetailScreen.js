import React, {Component} from 'react';
import {Container} from 'native-base';
import ReservationDetail from '../../components/reservation/ReservationDetail';
import FooterButton from '../../components/common/FooterButton';

class ReservationDetailScreen extends Component {
    render() {
        return (
            <Container>
                <ReservationDetail/>
                <FooterButton action="reservationConfirmScreen" buttonTitle="예약진행"/>
            </Container>
        );
    }
}
export default ReservationDetailScreen;
