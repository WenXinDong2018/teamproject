import * as ActionTypes from "./ActionTypes";
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import { fetchMyDeliveries, fetchMyRequests, fetchUserInfo, setUserInfo, fetchNotifications} from "./ActionCreatorsFetch"


export const postRequestFirebase = (post, shoppingList) => (dispatch) => {

    const newrequest = {
        ...post,
        buyerId:  auth.currentUser.uid,
        shoppingList: shoppingList,
        numItems: shoppingList.length,
        unmatched: true,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
        updatedAt: firebasestore.FieldValue.serverTimestamp()
    }

    return firestore.collection('requests').add(newrequest)
        .then(docRef => {
            firestore.collection('requests').doc(docRef.id).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let requestPost = { _id, ...data };
                        dispatch(addRequestPost(requestPost))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
        })
        .catch(error => {
            console.log('Post request ', error.message);
            alert('Your request could not be posted\nError: ' + error.message);
        })
}


export const updateOfferDelivery = (updates, requestId) => (dispatch) => {
    console.log("updateOfferDelivery");
    if (!auth.currentUser) {
        console.log('No user logged in!');
    }
    firestore.collection("requests").doc(requestId).set({
        ...updates,
        unmatched: false,
    }, {merge:true}).then(function() {

        firestore.collection('requests').doc(requestId).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let requestPost = { _id, ...data };
                        dispatch(removeOrderFromState(requestPost))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
    })
    .catch(function(error) {
        console.error("Error offering delivery: ", error);
    });

}

export const sendThankYouNote = (note, orderId) => (dispatch) => {
    console.log("sendThankYouNote", orderId);
    if (!auth.currentUser) {
        console.log('No user logged in!');
    }
    firestore.collection("requests").doc(orderId).set({
        thankyounote: note,
    }, {merge:true}).then(function() {

        firestore.collection('requests').doc(orderId).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let requestPost = { _id, ...data };
                        dispatch(updateMyRequestOrder(requestPost))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
    })
    .catch(function(error) {
        console.error("Error sending thankyou note: ", error);
    });

}



export const postUserInfo = (userInfo) => (dispatch) => {
    console.log("postUserInfo");
    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    const newUserInfo = {
        ...userInfo,
        userId: auth.currentUser.uid,
    }

    return firestore.collection('userInfo').add(newUserInfo)
        .then(docRef => {
            firestore.collection('userInfo').doc(docRef.id).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let userInfo = data;
                        dispatch(setUserInfo(userInfo))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
        })
        .catch(error => {
            console.log('Post userInfo ', error.message);
            alert('Your update could not be posted\nError: ' + error.message);
        })
}

export const postUpdate = (update) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    const newupdate = {
        ...update,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
    }

    return firestore.collection('updates').add(newupdate)
        .then(docRef => {
            firestore.collection('updates').doc(docRef.id).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let update = { _id, ...data };
                        dispatch(addUpdate(update))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
        })
        .catch(error => {
            console.log('Post update ', error.message);
            alert('Your update could not be posted\nError: ' + error.message);
        })
}


export const postNotification = (notification) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }
    const newnotification = {
        ...notification,
        unread: true,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
    }

    return firestore.collection('notifications').add(newnotification)
        .then(docRef => {
            firestore.collection('notifications').doc(docRef.id).get()
                .then(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        const _id = doc.id;
                        let update = { _id, ...data };
                        dispatch(addNotification(update))
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                });
        })
        .catch(error => {
            console.log('Post notification ', error.message);
            alert('Your notification could not be posted\nError: ' + error.message);
        })
}



export const addRequestPost = (data) => ({
    type: ActionTypes.ADD_REQEUST_POST,
    payload: {
        data: data,
    }
});

export const updateMyRequestOrder = (data) => ({
    type: ActionTypes.UPDATE_MY_REQUEST_ORDER,
    payload: {
        data: data,
    }
});

export const addNotification = (data) => ({
    type: ActionTypes.ADD_NOTIFICATION,
    payload: {
        data: data,
    }
});

export const addUpdate = (data) => ({
    type: ActionTypes.ADD_UPDATE,
    payload: {
        data: data,
    }
});

export const removeOrderFromState = (data) => ({
    type: ActionTypes.REMOVE_ORDER_FROM_STATE,
    payload: {
        data: data,
    }
});

export const setFilters = (filters) => ({
    type: ActionTypes.SET_FILTERS,
    payload: {
       data: filters
    }
})



export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}

export const receiveLogin = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}


export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}


export const googleLogin = () => (dispatch) => {
    auth.setPersistence(fireauth.Auth.Persistence.LOCAL).then(() => {

        const provider = new fireauth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                localStorage.setItem('user', JSON.stringify(user));
                // Dispatch the success action
                dispatch(fetchMyRequests());
                dispatch(fetchNotifications());
                dispatch(fetchMyDeliveries());
                dispatch(fetchUserInfo());
                dispatch(receiveLogin(user));
            })
            .catch((error) => {
                dispatch(loginError(error.message));
            });

    })

    
}
