const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app1 = express();
const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, orderBy, limit } = require('firebase/firestore');
const route = require('./routes');
const session = require('express-session');
const { getDatabase, ref, onValue } = require('firebase/database');
app1.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// cau hinh path  
app1.use(express.static(path.join(__dirname, 'public')));

// Cấu hình handlebars
app1.engine('handlebars', engine());
app1.set('view engine', 'handlebars');
app1.set('views', path.join(__dirname, 'resources/views/'));
// Sử dụng body-parser 
app1.use(bodyParser.urlencoded({ extended: true }));
app1.use(bodyParser.json());
app1.use(express.static(path.join(__dirname, 'public')));
// firebase config
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

const database = getDatabase(firebaseapp);
const db = getFirestore(firebaseapp);
const accountRef = collection(db, "account");


route(app1)


const PORT = process.env.PORT || 3000;
app1.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
