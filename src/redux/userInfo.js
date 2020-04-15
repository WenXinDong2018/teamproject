import * as ActionTypes from './ActionTypes';
const initialUserInfo = {loggedin: "false"}
export const UserInfo = (state = initialUserInfo, action) => {
    switch (action.type) {
        case ActionTypes.SET_CONTACT_INFO:
            var contactInfo = action.payload;
            console.log(contactInfo);
        default:
          return state;
      }
};