import * as ActionTypes from './ActionTypes';

export const Notifications = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_NOTIFICATIONS:
            var payload = action.payload;
            return payload.data;
        case ActionTypes.ADD_NOTIFICATION:
            var payload = action.payload;
            return [ payload.data,...state];
        case ActionTypes.MARK_AS_READ:
            var notificationId = action.payload.notificationId;
            return state.map((notification) => {
                if (notification._id !== notificationId){ return notification; }
                else{
                    notification.unread = false;
                    return notification;
                }
            })
        default:
            return state;
        }
};
