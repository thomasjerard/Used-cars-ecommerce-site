import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDPPDksoceICbeWnClRgc5qdgm6IXAOSRI",
  authDomain: "clone-d23e2.firebaseapp.com",
  projectId: "clone-d23e2",
  storageBucket: "clone-d23e2.appspot.com",
  messagingSenderId: "1097555910711",
  appId: "1:1097555910711:web:31e3dbbf4a9dc263089fb2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
//firebase realtime database
const database = firebase.database();

export { firestore, auth, storage, database};
