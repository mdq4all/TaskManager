
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, 
         collection, 
         addDoc,
         getDocs,
         deleteDoc,
         onSnapshot,
         doc,
         getDoc,
         updateDoc
     } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDXA7icXGOpzjzJOOmUZbytvsJYks6sA8",
  authDomain: "js-testing-b8096.firebaseapp.com",
  projectId: "js-testing-b8096",
  storageBucket: "js-testing-b8096.appspot.com",
  messagingSenderId: "482409674565",
  appId: "1:482409674565:web:5812cadbf4e87ae3e2f02c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => 
    addDoc(collection(db, 'tasks'), {title, description});

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);
