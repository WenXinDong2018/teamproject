import { REQUESTS } from '../shared/requests';
import * as ActionTypes from './ActionTypes';

export const Requests = (state = REQUESTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REQEUST_POST:
            var post = action.payload;
            post.createdAt = new Date().toISOString();
            console.log("new request post: ", post);
            return state.concat(post);
        case ActionTypes.OFFER_TO_DELIVER:
            var payload = action.payload;
            console.log(payload.requestId, payload.date, payload.phone);
            //in the backend, modify currPost(search with requestId)
            //set driverDate = date, driverPhone = phone
            //add a new notification to both requestpost.buyerID - (Your request has been offered delivery!), (You have offered {name} delivery!) 
        case ActionTypes.FILTER_REQUESTS:
            var payload = action.payload;
            console.log(payload.miles, payload.typeErrand, payload.store, payload.date);
            //post request to server, get new list of requests based on current filters. 

        default:
            return state;
            }
};
