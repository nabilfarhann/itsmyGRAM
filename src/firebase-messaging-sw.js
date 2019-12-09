// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
  apiKey: "AIzaSyBkkFFNJUm1VIKL_eM9W0Ckbe-H9WF2RBY",
  authDomain: "photolib-27e7e.firebaseapp.com",
  databaseURL: "https://photolib-27e7e.firebaseio.com",
  projectId: "photolib-27e7e",
  storageBucket: "photolib-27e7e.appspot.com",
  messagingSenderId: "173087680831"
};
firebase.initializeApp(config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();