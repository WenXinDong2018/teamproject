import * as ActionTypes from "./ActionTypes";
import { baseUrl } from '../shared/baseUrl';
export const addComment = (dishId, rating, author, comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const addDeliveryPost = (userID, date, store, typeErrand)=>({
    type: ActionTypes.ADD_DELIVERY_POST,
    payload: {
        userID: userID,
        date: date,
        store: store,
        typeErrand: typeErrand
    }
});

export const addRequestPost = (userID, date, store, typeErrand, shoppingList )=>({
    type: ActionTypes.ADD_REQEUST_POST,
    payload: {
        userID: userID,
        date: date,
        store: store,
        typeErrand: typeErrand,
        shoppingList: shoppingList,
    }
});


// export const fetchDishes = (dispatch)=>{
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + "dishes").then(response =>response.json()).then(dishes => dispatch(addDishes(dishes)))
// }
    