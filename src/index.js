import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAAfBZWUumw-qhllzVhSapaCrKBonoQy4c",
    authDomain: "bootcamp-flashcards.firebaseapp.com",
    databaseURL: "https://bootcamp-flashcards-default-rtdb.firebaseio.com",
    projectId: "bootcamp-flashcards",
    storageBucket: "bootcamp-flashcards.appspot.com",
    messagingSenderId: "255677325107",
    appId: "1:255677325107:web:f14fc4e90d5be05995a846"
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
    firebase: firebaseReducer
});
  
const store = createStore(rootReducer);

const rrfConfig = {
    userProfile: 'users'
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>, 
    document.getElementById('root')
);