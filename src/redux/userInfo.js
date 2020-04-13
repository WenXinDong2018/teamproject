import * as ActionTypes from './ActionTypes';

export const UserInfo = (state = USERINFO, action) => {
    switch (action.type) {
        case ActionTypes.SET_CONTACT_INFO:
            var contactInfo = action.payload;
            console.log("Comment: ", contactInfo);
            return state.concat(comment);
        default:
          return state;
      }
};