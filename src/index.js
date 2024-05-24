const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, where,onSnapshot,orderBy,limit} = require('firebase/firestore');
const { timeStamp } = require('console');
const route = require('./routes');
const session = require('express-session');
 app.use(session({
   secret: 'secret_key',
   resave: false,
   saveUninitialized: true
 }));

// cau hinh path  
app.use(express.static(path.join(__dirname,'public')));
  
// Cấu hình handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');   
app.set('views',path.join(__dirname,'resources/views/'));
// Sử dụng body-parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// firebase config
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

  route(app)

  
// const queryenvi = query(environmentRef,limit(1))
// const environments = onSnapshot(queryenvi, (snapshot)=>{
//   snapshot.docChanges().forEach((change) => {
//     if(change.type === 'added'){
//       const newdata = change.doc.get('temp')
//       console.log(newdata);
//     }
//   })
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
