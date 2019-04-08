import axios from 'axios';

export const readMyInfo = () => {
    return axios.get('http://13.125.251.45:3000/v1/memberships/5c9b0e04f5e2ee40540aac85')
};

export const submitPinNumber = (pinNumber) => {
    return axios.put("http://13.125.251.45:3000/v1/memberships/5c9b0e04f5e2ee40540aac85",
        {
            "pin_number":pinNumber
        }
    )
}

export const readMyReservation = () => {
    return axios.get("http://13.125.251.45:3000/v1/users/5c91c24c1580b736cf91e9da/reservations")
}
