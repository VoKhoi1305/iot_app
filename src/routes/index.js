
const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, orderBy, limit } = require('firebase/firestore');
const firebaseConfig = {
  apiKey: "AIzaSyCL16RRuc7ZGW_NSoTGGTih9W6D1_OOi2E",
  authDomain: "iot-chale.firebaseapp.com",
  projectId: "iot-chale",
  databaseURL: "https://iot-chale-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "iot-chale.appspot.com",
  messagingSenderId: "287483640732",
  appId: "1:287483640732:web:790450abf9ae3bc4506659",
  measurementId: "G-HQPMEGH366"
};

let firebaseapp;
if (!getApps().length) {
  firebaseapp = initializeApp(firebaseConfig);
} else {
  firabaseapp = getApps()[0];
}
const db = getFirestore(firebaseapp);
const accountRef = collection(db, "account");
const environmentRef = collection(db, "environment");

const LoginRouter = require('./login');
const RegisterRouter = require('./register');
const FileRouter = require('./file')
function route(app1) {

  app1.get('/', (req, res) => {
    res.render('home');
  });
  app1.use('/login', LoginRouter);
  app1.use('/register', RegisterRouter);
  app1.use('/file', FileRouter)
}

module.exports = route;