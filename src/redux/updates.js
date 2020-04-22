import * as ActionTypes from './ActionTypes';

export const Updates = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_UPDATES:
            var payload = action.payload;
            
            return payload.data;
        case ActionTypes.ADD_UPDATE:
            var payload = action.payload;
            return [payload.data, ...state];
        default:
            return state;
    }
};
