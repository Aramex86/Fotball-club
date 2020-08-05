  import firebase from 'firebase/app';
  import 'firebase/app';
  import 'firebase/database';
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyDvVIi2EQjhe5gVfo6_NVhWs2GLB6bKZlM",
    authDomain: "mcity-9a9e9.firebaseapp.com",
    databaseURL: "https://mcity-9a9e9.firebaseio.com",
    projectId: "mcity-9a9e9",
    storageBucket: "mcity-9a9e9.appspot.com",
    messagingSenderId: "721789334406",
    appId: "1:721789334406:web:33649d381d1ba135d23207",
    measurementId: "G-DNZYEPZESE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();


const dataBase = firebase.database();
const dataBaseMatches = dataBase.ref('matches');
const dataPromotion = dataBase.ref('promotions');

export {
  firebase,
  dataBaseMatches,
  dataPromotion
}