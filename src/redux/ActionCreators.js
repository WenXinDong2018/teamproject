import * as ActionTypes from "./ActionTypes";
import serverURL from "./serverURL";

export function fetchUnmatchedRequests() {
    console.log("fetch unmatched requests")
    return function(dispatch) {
      return fetch(serverURL + "requests/getunmatched")
            .then(response => response.json())
            .then(data => {console.log(data);  dispatch(setUnmatchedRequests(data));});
    };
}

export function fetchMyRequests() {
    console.log("fetch my requests")
    const newrequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            buyerId: "5e9a331614490393d688a78f", //hard-coding for now
        })
    }

    return function(dispatch) {
      return fetch(serverURL + "requests/getmyrequests", newrequest)
            .then(response => response.json())
            .then(data => {console.log("myrequests", data);  dispatch(setMyRequests(data));});
    };
  }

  export function fetchMyDeliveries() {
    console.log("fetch my deliveries")
    const newrequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            driverId: "5e9a331614490393d688a78f", //hard-coding for now
        })
    }

    return function(dispatch) {
      return fetch(serverURL + "requests/getmydeliveries", newrequest)
            .then(response => response.json())
            .then(data => {console.log("my deliveries",data);  dispatch(setMyDeliveries(data));});
    };
  }



export function postRequest(post, shoppingList) {

    const newrequest = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            buyerName: "WenXin",
            typeErrand: post.typeErrand,
            buyerId: "5e9a331614490393d688a78f", //hard-coding for now
            buyerDate: post.date,
            store: post.store,
            shoppingList: shoppingList,
            numItems: shoppingList.length,
            priority: post.priority,
            venmo: post.venmo, 
            cash: post.cash,
            note: post.note
        })
    }

    return function(dispatch) {
      return fetch(serverURL + "requests", newrequest)
            .then(response => response.json())
            .then(data => {console.log("data",data);  dispatch(addRequestPost(data));});
    };
  }

export const addRequestPost = (data )=>({
    type: ActionTypes.ADD_REQEUST_POST,
    payload: {
        data: data,
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

export const setUnmatchedRequests = (data) => ({
    type: ActionTypes.SET_UNMATCHED_REQUESTS,
    payload : {data: data}
})


export const setMyDeliveries = (data) => ({
    type: ActionTypes.SET_MY_DELIVERIES,
    payload : {data: data}
})

export const setMyRequests = (data) => ({
    type: ActionTypes.SET_MY_REQUESTS,
    payload : {data: data}
})



// export const fetchDishes = (dispatch)=>{
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + "dishes").then(response =>response.json()).then(dishes => dispatch(addDishes(dishes)))
// }
    