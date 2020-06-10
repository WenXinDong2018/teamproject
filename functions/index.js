//This file handles sending emails to users

const functions = require('firebase-functions');
const sgMail = require("@sendgrid/mail");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// This is a dummny function that helps us to test other functions in 
// this file when run under firebase emulator
// to run firebase emulator, type in Terminal:
// firebase emulator:start
// then, you should see a similar URL like the following for this function printed in Terminal, 
// http://localhost:5001/pony-express-project/us-central1/addMessage
// Go to the browser (Google Chrome), and go to 
// http://localhost:5001/pony-express-project/us-central1/addMessage?text=heya
// This will fire a GET request, and trigger the addMessageFunction, which will
// then trigger sendEmailAfterPostingRequest and sendEmailToDriverAndRequesterAfterOfferToDeliver
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter (e.g. "heya")
  const original = req.query.text;
  // Push the new message into the testing collection in Firebase
  const writeResult = await admin.firestore().collection('testing').add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new requests added to /requests and send email to the user
// IMPORTANT: if you are testing using Firebase Emulator, 
// must change "requests" to "testing"
// since the function listens to changes to the collection that you specify
exports.sendEmailAfterPostingRequest = functions.firestore.document('/requests/{documentId}')
    .onCreate((snap, context) => {
      const original = snap.data().original;
      //API_KEY should be saved to your local environment 
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        //"to" should be user email
        // or your own email if you want to view the email sent
        to: 'help.ponyexpress@gmail.com', 
        //don't change the from email
        from: 'help.ponyexpress@gmail.com',
        subject: 'Your request has been successfully placed',
        text: 'You will receive an email once someone offers to deliver',
        html: '<strong>You will receive an email once someone offers to deliver</strong>',
      };
      sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error)
    })
    
      //adding an emailSent field to the new request and save to database
      return snap.ref.set({emailSent: true}, {merge: true});
    });

// Listens for notifications added to /notifications
// Everything else is the same as sendEmailAfterPostingRequest
exports.sendEmailToDriverAndRequesterAfterOfferToDeliver = functions.firestore.document('/notifications/{documentId}')
.onCreate((snap, context) => {
  const original = snap.data().original;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'help.ponyexpress@gmail.com', //should be user email
    from: 'help.ponyexpress@gmail.com',
    subject: 'Someone offered to deliver your request',
    text: 'Driver Contect Info',
    html: '<strong>Driver Contect Info</strong>',
  };
  sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error)
})


const msg2 = {
    to: 'help.ponyexpress@gmail.com', //should be user email
    from: 'help.ponyexpress@gmail.com',
    subject: 'You offered to deliver Johns request',
    text: 'Address + contact info + shopping list',
    html: '<strong>Address + contact info + shopping list</strong>',
  };
  sgMail.send(msg2).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error)
})
  return snap.ref.set({emailSent: true}, {merge: true});
});
