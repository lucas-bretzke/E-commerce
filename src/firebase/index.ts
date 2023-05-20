import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBUbXJycisKlvyX4dzroIzgyH0YejSGX-o",
    authDomain: "web-jira-portal-bretzke.firebaseapp.com",
    projectId: "web-jira-portal-bretzke",
    storageBucket: "web-jira-portal-bretzke.appspot.com",
    messagingSenderId: "411292274031",
    appId: "1:411292274031:web:573fa5b70ad1e432e62c9a",
    measurementId: "G-2T6FVR6C97"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const Auth = getAuth(app)

export { Auth }