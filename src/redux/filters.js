import * as ActionTypes from './ActionTypes';
let now = new Date();
now.setHours(0, 0, 0, 0);
const initialState = {
    store: null, 
    typeErrand: null, 
    date: now, 
    miles: 50,
}

//Filters is in charge of the filters on the home page
export const Filters = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_FILTERS:
            var payload = action.payload;
            return payload.data;
        default:
            return state;
    }
};
