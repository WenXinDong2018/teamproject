import * as ActionTypes from "./ActionTypes";
import { baseUrl } from '../shared/baseUrl';

export const addDeliveryPost = (post)=>({
    type: ActionTypes.ADD_DELIVERY_POST,
    payload: {
        userID: post.userID,
        date: post.date,
        store: post.store,
        typeErrand: post.typeErrand
    }
});

export const addRequestPost = (post, shoppingList )=>({
    type: ActionTypes.ADD_REQEUST_POST,
    payload: {
        userID: post.userID,
        date: post.date,
        store: post.store,
        typeErrand: post.typeErrand,
        shoppingList: shoppingList,

    }
});

export const requestDelivery = (requestInfo, deliveryPost, shoppingList) => ({
    type: ActionTypes.REQUEST_DELIVERY,
    payload: {
        post:{
            userID: requestInfo.userID,
            date: requestInfo.date,
            store: requestInfo.store,
            typeErrand: requestInfo.typeErrand,
            shoppingList: shoppingList,
        },
        deliveryPost: deliveryPost,
    }
});

export const offerToDeliver = (requestPost) => ({
    type: ActionTypes.OFFER_TO_DELIVER,
    payload: {
        requestPost: requestPost
    }


});

// export const fetchDishes = (dispatch)=>{
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + "dishes").then(response =>response.json()).then(dishes => dispatch(addDishes(dishes)))
// }
    