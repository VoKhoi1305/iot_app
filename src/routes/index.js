
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, where,onSnapshot,orderBy,limit} = require('firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyCL16RRuc7ZGW_NSoTGGTih9W6D1_OOi2E",
    authDomain: "iot-chale.firebaseapp.com",
    projectId: "iot-chale",
    storageBucket: "iot-chale.appspot.com",
    messagingSenderId: "287483640732",
    appId: "1:287483640732:web:790450abf9ae3bc4506659",
    measurementId: "G-HQPMEGH366"
  };

  const firebaseapp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseapp);
  const accountRef = collection(db, "account");
  const environmentRef = collection(db, "environment");

  const LoginRouter = require('./login');
  const RegisterRouter = require('./register');
function route(app){
    
    app.get('/',(req ,res) =>{
      res.render('home');
    });
    app.use('/login', LoginRouter);
    app.use('/register',RegisterRouter);
    
}

module.exports = route;