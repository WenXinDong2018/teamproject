import * as ActionTypes from "./ActionTypes";


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

export const filterRequests = (filters) => ({
    type: ActionTypes.FILTER_REQUESTS,
    payload:{
        miles: filters.miles,
        typeErrand: filters.typeErrand,
        store: filters.store,
        date: filters.date,
    }
})

export const offerToDeliver = (requestId, date, phone) => ({
    type: ActionTypes.OFFER_TO_DELIVER,
    payload: {
        requestId: requestId,
        driverDate: date,
        driverPhone: phone,
    }
});



// export const fetchDishes = (dispatch)=>{
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + "dishes").then(response =>response.json()).then(dishes => dispatch(addDishes(dishes)))
// }
    