import { REQUESTS } from '../shared/requests';
import * as ActionTypes from './ActionTypes';


export const Requests = (state = {unmatched: [], myrequests:[], mydeliveries : []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REQEUST_POST:
            var payload = action.payload;
            console.log("new request post: ", payload.data);
            return {...state, unmatched: [payload.data,...state.unmatched]};
        
        case ActionTypes.REMOVE_ORDER_FROM_STATE:
            var payload = action.payload;
            console.log("remove order from state");
            return {...state, unmatched: state.unmatched.filter((post) => post._id !== payload.data.id), mydeliveries: [...state.mydeliveries, payload.data]}

        case ActionTypes.FILTER_REQUESTS:
            var payload = action.payload;
            console.log(payload.miles, payload.typeErrand, payload.store, payload.date);

        case ActionTypes.SET_UNMATCHED_REQUESTS:
            var payload = action.payload;
            return {...state, unmatched: payload.data};
        
        case ActionTypes.SET_MY_DELIVERIES:
            var payload = action.payload;
            return {...state, mydeliveries: payload.data};  
              
        case ActionTypes.SET_MY_REQUESTS:
            var payload = action.payload;
            return {...state, myrequests: payload.data};  
        default:
            return state;
    }
};
