import * as ActionTypes from "./ActionTypes";
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase';
import { fetchMyDeliveries, fetchMyRequests, fetchUserInfo, setUserInfo, fetchNotifications} from "./ActionCreatorsFetch"


//add request to firebase "requests" collection
export const postRequestFirebase = (post, shoppingList) => (dispatch) => {
    if (!auth.currentUser) {
        //  console.log('No user logged in!');
        return;
    }
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
        .catch(error => {
            alert('Your request could not be posted\nError: ' + error.message);
        })
}

//set a particular request to be "matched"
export const updateOfferDelivery = (updates, requestId) => (dispatch) => {
    if (!auth.currentUser) {
      //  console.log('No user logged in!');
      return;
    }
    firestore.collection("requests").doc(requestId).set({
        ...updates,
        unmatched: false,
    }, {merge:true})
    .catch(function(error) {
        console.error("Error offering delivery: ", error);
    });

}

//update a particular notification to be "read" instead of "unread"
export const updateNotification= (notificationId) => (dispatch) => {
    //console.log("mark notification as read");
    if (!auth.currentUser) {
        //console.log('No user logged in!');
        return;
    }
    firestore.collection("notifications").doc(notificationId).set({
        unread: false,
    }, {merge:true})
    .catch(function(error) {
        console.error("Error offering delivery: ", error);
    });

}

//called when a requester sends a thank you note
//thank you note stored to "requests" collection
export const sendThankYouNote = (note, orderId) => (dispatch) => {
    if (!auth.currentUser) {
        //console.log('No user logged in!');
        return;
    }
    firestore.collection("requests").doc(orderId).set({
        thankyounote: note,
    }, {merge:true})
    .catch(function(error) {
        console.error("Error sending thankyou note: ", error);
    });

}

//add user info to the "userInfo" collection in Firebase
export const postUserInfo = (userInfo) => (dispatch) => {
    if (!auth.currentUser) {
        //console.log('No user logged in!');
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
                       console.log("No such document!");
                    }
                });
        })
        .catch(error => {
            alert('Your update could not be posted\nError: ' + error.message);
        })
}

//add an update to the "updates" collection
//here update refers to the real time updates you see on the sidebar
export const postUpdate = (update) => (dispatch) => {

    if (!auth.currentUser) {
       // console.log('No user logged in!');
        return;
    }
    const newupdate = {
        ...update,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
    }

    return firestore.collection('updates').add(newupdate)
        .catch(error => {
       //     console.log('Post update ', error.message);
            alert('Your update could not be posted\nError: ' + error.message);
        })
}

//add a notification to the "notifications" collection in firebae
export const postNotification = (notification) => (dispatch) => {

    if (!auth.currentUser) {
        //console.log('No user logged in!');
        return;
    }
    const newnotification = {
        ...notification,
        unread: true,
        createdAt: firebasestore.FieldValue.serverTimestamp(),
    }

    return firestore.collection('notifications').add(newnotification)
        .catch(error => {
            alert('Your notification could not be posted\nError: ' + error.message);
        })
}


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
        //console.log("sign-out successful");
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    localStorage.removeItem('user');
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

export const facebookLogin = () => (dispatch) => {
    auth.setPersistence(fireauth.Auth.Persistence.LOCAL).then(() => {

        var provider = new fireauth.FacebookAuthProvider();

        auth.signInWithPopup(provider)
            .then((result) => {
                var token = result.credential.accessToken;

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
               // console.log("here, error facebook", error.message)
                dispatch(loginError(error.message));
            });

    }).catch((error) => {
       // console.log("here, error facebook 2", error.message)
        dispatch(loginError(error.message));
    });

    
}
