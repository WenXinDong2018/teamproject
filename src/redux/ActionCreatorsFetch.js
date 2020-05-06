import * as ActionTypes from "./ActionTypes";
import { auth, firestore } from '../firebase/firebase';
export const fetchUnmatchedRequestsFirebase = () => (dispatch) => {

    dispatch(unmatchedRequestsLoading(true));
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return firestore.collection('requests').where("unmatched", "==", true).where("buyerDate", ">=", now).orderBy('buyerDate').orderBy("priority", "desc").orderBy("createdAt", "desc").limit(500).onSnapshot(
        snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                requests.push({_id, ...data });
            });
            //console.log("unmatched requests:", requests)
            return dispatch(setUnmatchedRequests(requests));
        })
}

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
            //console.log("fetch my requests")
            return firestore.collection('requests').where('buyerId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").onSnapshot(
                snapshot => {
                    let requests = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        requests.push({_id, ...data });
                    });
                    return dispatch(setMyRequests(requests));
                })
        }
        
      });

    
}

export const fetchUserInfo = () => (dispatch) => {
    auth.onAuthStateChanged(function(user) {
        if (!user) {
          return;
        }
        else{
            
           // console.log("fetchUserInfo")
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
                .then(userInfo => {dispatch(setUserInfo(userInfo))})
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
            return firestore.collection('requests').where('driverId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").onSnapshot(
                snapshot => {
                    let requests = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        requests.push({_id, ...data });
                    });
                    return dispatch(setMyDeliveries(requests));
                })
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

    return firestore.collection('updates').orderBy("createdAt", "desc").limit(100).onSnapshot(
       snapshot => {
               let updates = [];
                snapshot.forEach(doc => {
                const data = doc.data()
                const _id = doc.id
                updates.push({_id, ...data });
            });
           // console.log("updates", updates)
            return dispatch(setUpdates(updates))
        })
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
          //  console.log("fetch my notifications")
            return firestore.collection('notifications').where('userId', '==', auth.currentUser.uid).orderBy("createdAt", "desc").onSnapshot(     
            snapshot => {
                    let notifications = [];
                    snapshot.forEach(doc => {
                        const data = doc.data()
                        const _id = doc.id
                        notifications.push({_id, ...data });
                    });
                   // console.log("notifications", notifications);
                    return dispatch(setNotifications(notifications));
                })
                
        }
    })
}

export const setNotifications = (data) => ({
    type: ActionTypes.SET_NOTIFICATIONS,
    payload: { data: data }
})

