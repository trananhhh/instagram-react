import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import firebase from 'firebase/compat';

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyD0O8KvqfUBb3Pb-GOWHzh567fuc3IzhiE',
    authDomain: 'instagram-clone-reactjs-64047.firebaseapp.com',
    projectId: 'instagram-clone-reactjs-64047',
    storageBucket: 'instagram-clone-reactjs-64047.appspot.com',
    messagingSenderId: '474239512820',
    appId: '1:474239512820:web:a7902898f0e503c0f52ea1',
    measurementId: 'G-4RLJ9ZTQKS',
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };
