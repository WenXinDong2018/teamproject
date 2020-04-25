import * as ActionTypes from "./ActionTypes";
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import firebase from "firebase"
export const fetchUnmatchedRequestsFirebase = () => (dispatch) => {

    dispatch(unmatchedRequestsLoading(true));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return firestore.collection('requests').where("unmatched", "==", true).where("buyerDate", ">=", now).orderBy('buyerDate', 'desc').orderBy("priority", "desc").orderBy("createdAt", "desc").limit(500).get()
        .then(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                requests.push({_id, ...data });
            });
            console.log("unmatched requests:", requests)
            return requests;
        })
        .then(requests => dispatch(setUnmatchedRequests(requests)))
        .catch(error => console.log(error));
}

//fetch nearby stores

// export const fetchNearByStores = () => (dispatch) => {


//     return firestore.collection('requests').where("unmatched", "==", true).orderBy("priority", "desc").orderBy("createdAt", "desc").limit(500).get()
//         .then(snapshot => {
//             let requests = [];
//             snapshot.forEach(doc => {
//                 const data = doc.data()
//                 const _id = doc.id
//                 requests.push({_id, ...data });
//             });
//             console.log("unmatched requests:", requests)
//             return stores;
//         })
//         .then(stores => dispatch(setNearByStores(stores)))
//         .catch(error => console.log(error));
// }


// export const setNearByStores = (data) => ({
//     type: ActionTypes.SET_NEARBY_STORES,
//     payload: { data: data }
// })


export const unmatchedRequestsLoading = () => ({
    type: ActionTypes.UNMATCHED_REQUESTS_LOADING
});

export const setUnmatchedRequests = (data) => ({
    type: ActionTypes.SET_UNMATCHED_REQUESTS,
    payload: { data: data }
})


export const fetchMyRequests = () => (dispatch) => {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
          return;
        }
        else{
            dispatch(myRequestsLoading(true));
            console.log("fetch my requests")
            return firestore.collection('requests').where('buyerId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").get()
                .then(snapshot => {
                    let requests = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        requests.push({_id, ...data });
                    });
                    return requests;
                })
                .then(requests => dispatch(setMyRequests(requests)))
                .catch(error => console.log(error));
        }
        
      });

    
}

export const fetchUserInfo = () => (dispatch) => {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
          return;
        }
        else{
            
            console.log("fetchUserInfo")
            return firestore.collection('userInfo').where('userId', '==', auth.currentUser.uid).get()
                .then(snapshot => {
                    let requests = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        requests.push(data);
                    });
                    return requests[0];
                })
                .then(userInfo => {console.log("userInfo", userInfo); dispatch(setUserInfo(userInfo))})
                .catch(error => console.log(error));
        }
        
      });

    
}
export const setUserInfo = (data) => ({
    type: ActionTypes.SET_CONTACT_INFO,
    payload: data
})

export const setMyRequests = (data) => ({
    type: ActionTypes.SET_MY_REQUESTS,
    payload: { data: data }
})
export const myRequestsLoading = () => ({
    type: ActionTypes.MY_REQUESTS_LOADING
});

export const fetchMyDeliveries = () => (dispatch) => {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
          return;
        }
        else{
            dispatch(myDeliveriesLoading(true));
            console.log("fetch my deliveries")
            return firestore.collection('requests').where('driverId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").get()
                .then(snapshot => {
                    let requests = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        requests.push({_id, ...data });
                    });
                    return requests;
                })
                .then(requests => dispatch(setMyDeliveries(requests)))
                .catch(error => console.log(error));
        }
    })
   
}

export const setMyDeliveries = (data) => ({
    type: ActionTypes.SET_MY_DELIVERIES,
    payload: { data: data }
})


export const myDeliveriesLoading = () => ({
    type: ActionTypes.MY_DELIVERIES_LOADING
});

export const fetchUpdates = () => (dispatch) => {
    // dispatch(myDeliveriesLoading(true));
    console.log("fetch updates")
    return firestore.collection('updates').orderBy("createdAt", "desc").limit(100).get()
        .then(snapshot => {
            let updates = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                updates.push({_id, ...data });
            });
            console.log("updates", updates)
            return updates;
        })
        .then(updates => dispatch(setUpdates(updates)))
        .catch(error => console.log(error));
}

export const setUpdates = (data) => ({
    type: ActionTypes.SET_UPDATES,
    payload: { data: data }
})


export const fetchNotifications = () => (dispatch) => {
    // dispatch(myNotificationsLoading(true));
    auth.onAuthStateChanged(function(user) {
        if (!user) {
          return;
        }
        else{
            console.log("fetch my notifications")
            return firestore.collection('notifications').where('userId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").get()        
            .then(snapshot => {
                    let notifications = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        notifications.push({_id, ...data });
                    });
                    console.log("notifications", notifications);
                    return notifications;
                })
                .then(notifications => dispatch(setNotifications(notifications)))
                .catch(error => console.log(error));
        }
    })
    // dispatch(myDeliveriesLoading(true));
}

export const setNotifications = (data) => ({
    type: ActionTypes.SET_NOTIFICATIONS,
    payload: { data: data }
})

