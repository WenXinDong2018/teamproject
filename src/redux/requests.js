import { REQUESTS } from '../shared/requests';
import * as ActionTypes from './ActionTypes';

export const Requests = (state = REQUESTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REQEUST_POST:
            var post = action.payload;
            post.createdAt = new Date().toISOString();
            console.log("new request post: ", post);
            return state.concat(post);
        case ActionTypes.REQUEST_DELIVERY:
            var payload = action.payload;
            payload.post.createdAt = new Date().toISOString();
            payload.post.matched = true;
            payload.post.accepted = 0;
            console.log("new request delivery: ", payload);
            //in the backend, set driver of curr requestPost to payload.deliveryPost.driver
            //in the backend, send notifications to both users. ({name} requested you to deliver!) (You requested {name} to deliver!)
            //add requestPost to curr user's list of requests
            //add requestPost to deliveryPost's list of requests. 

        default:
            return state;
            }
};
