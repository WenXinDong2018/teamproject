import * as ActionTypes from './ActionTypes';

export const Notifications = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_NOTIFICATIONS:
            return action.payload.data;
        default:
            return state;
        }
};
