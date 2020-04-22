import * as ActionTypes from './ActionTypes';
const initialState = {
    unmatched: [], 
    myrequests:[], 
    mydeliveries : [], 
    isUnmatchedRequestsLoading: false,
    isMyRequestsLoading: false,
    isMyDeliveriesLoading: false
}

export const Requests = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.UNMATCHED_REQUESTS_LOADING:
            return {...state, isUnmatchedRequestsLoading: true, unmatched: []};
        case ActionTypes.MY_REQUESTS_LOADING:
            return {...state, isMyRequestsLoading: true, myrequests: []};
        case ActionTypes.MY_DELIVERIES_LOADING:
            return {...state, isMyDeliveriesLoading: true, mydeliveries: []};
        case ActionTypes.ADD_REQEUST_POST:
            var payload = action.payload;
            console.log("new request post: ", payload.data);
            return {...state, unmatched: [payload.data,...state.unmatched]};
        case ActionTypes.REMOVE_ORDER_FROM_STATE:
            var payload = action.payload;
            console.log("remove order from state");
            return {...state, unmatched: state.unmatched.filter((post) => post._id !== payload.data._id), mydeliveries: [...state.mydeliveries, payload.data]}

        case ActionTypes.UPDATE_MY_REQUEST_ORDER:
            var payload = action.payload;

            return {...state, myrequests: state.myrequests.map((post) => {
                if (post._id !== payload.data._id){ return post; }
                else{
                    return payload.data;
                }})
        }

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
