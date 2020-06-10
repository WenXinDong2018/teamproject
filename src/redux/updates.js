import * as ActionTypes from './ActionTypes';

export const Updates = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.SET_UPDATES:            
            return action.payload.data;
        default:
            return state;
    }
};
