import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
 firebase.initializeApp({
   apiKey: "AIzaSyAEq5HAtsRcxamhvvM8zCOuLb3ABqUeSbQ",
   authDomain: "prueba-firebase-39076.firebaseapp.com",
   databaseURL: "https://prueba-firebase-39076.firebaseio.com",
   projectId: "prueba-firebase-39076",
   storageBucket: "prueba-firebase-39076.appspot.com",
   messagingSenderId: "400648826438"
 });
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
