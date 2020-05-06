import * as ActionTypes from './ActionTypes';

const initialUserInfo = {
    name: null,
    phone: null,
    address1: null,
    address2: null,
    city:null,
    zipcode:null,
}

export const UserInfo = (state = initialUserInfo, action) => {
    switch (action.type) {
        case ActionTypes.SET_CONTACT_INFO:
            var payload = action.payload;
           // console.log("setUserInfo", payload);
            return payload;        
        default:
          return state;
      }
};