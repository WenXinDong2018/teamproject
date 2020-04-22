import * as ActionTypes from './ActionTypes';

export const Notifications = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_NOTIFICATIONS:
            var payload = action.payload;
            return payload.data;
        default:
            return state;
        }
};
