import { config } from './config';
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(config);

export const auth = firebase.auth();
// console.log("currentUser",auth.currentUser)
export const fireauth = firebase.auth;

auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          //console.log("displayName", displayName);
          //console.log("currentuser", firebase.auth().currentUser.displayName);
        } else {
          // User is signed out.
          // ...
        }
      });
   
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);
export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;