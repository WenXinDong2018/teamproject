import { DELIVERIES } from '../shared/deliveries';
import * as ActionTypes from './ActionTypes';

export const Deliveries = (state = DELIVERIES, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DELIVERY_POST:
            var post = action.payload;
            post.date = new Date().toISOString();
            console.log("new delivery post: ", post);
            return state.concat(post);
        default:
            return state;
            }
};

