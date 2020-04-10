import { REQUESTS } from '../shared/requests';
import * as ActionTypes from './ActionTypes';

export const Requests = (state = REQUESTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REQEUST_POST:
            var post = action.payload;
            post.date = new Date().toISOString();
            console.log("new request post: ", post);
            return state.concat(post);
        default:
            return state;
            }
};
