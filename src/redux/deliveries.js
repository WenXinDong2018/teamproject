import { DELIVERIES } from '../shared/deliveries';
import * as ActionTypes from './ActionTypes';

export const Deliveries = (state = DELIVERIES, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DELIVERY_POST:
            var post = action.payload;
            post.createdAt = new Date().toISOString();
            console.log("new delivery post: ", post);
            //in the backend, add a new notification to current user. (you have successfully posted a shoppong trip!)
            //in the backend, add curr delivery post to current user's list of deliveries.
            return state.concat(post);

        case ActionTypes.OFFER_TO_DELIVER:
            var requestpost = action.payload;
            requestpost.deliveryOfferedAt = new Date().toISOString();
            console.log("new delivery offer: ", requestpost);
            //requestpost.ID, requestpost.buyerID
            //in the backend, modify currPost(search with requestpost.ID) 's driver to curr user.  
            //in the backend, modify currPost's matched to true
            //in the backend, add curr post to driver's list of deliveries.
            //add a new notification to both requestpost.buyerID - (Your request has been offered delivery!), (You have offered {name} delivery!) 
        default:
            return state;
            }
};

