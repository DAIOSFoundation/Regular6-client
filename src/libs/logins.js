import axios from 'axios';

export const getUser = (id) => {
  return axios.get("http://13.125.251.45:3000/v1/users/"+id)
}

export const createUser = (data) => {
  console.log('login data=>', data)
  return axios.post("http://13.125.251.45:3000/v1/users",
    data
    // {
    //   "platformId": platformId,
    //   "email": email,
    //   "profile_img": profile_img,
    //   "login_platform": login_platform,
    //   "phone_number": phone_number,
    // }
  )
};