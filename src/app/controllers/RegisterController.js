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

class RegisterController {

  index(req, res) {
    res.render('dangky');
  }



  check(req, res, next) {
    const inputusername = req.body.username;
    const inputpassword = req.body.password;
    const inputpassword1 = req.body.password1;
    const q = query(accountRef, where("username", "==", inputusername));
    async function checkregister() {
      if (inputpassword == inputpassword1 && inputusername && inputpassword) {
        const accounts = await getDocs(q);
        let accountExists = false;
        accounts.forEach((account) => {
          const exacc = account.get('username');
          if (exacc === inputusername) {
            accountExists = true;
          }
        });

        if (accountExists) {
          res.render('dangky', { note: 'Tài khoản đã tồn tại' });
        } else {
          addDoc(accountRef, {
            username: req.body.username,
            password: req.body.password,
            role: 'user',
          })
            .then(() => {
              console.log('Thêm thành công!');
              res.render('dangky', { note: 'Đăng ký thành công' });
            })
            .catch((error) => {
              console.error('Lỗi khi thêm dữ liệu:', error);
              res.render('dangky', { note: 'Lỗi khi thêm dữ liệu' });
            });
        }
      }
      else { res.render('dangky', { note: 'lỗi khi tạo tài khoản' }); }
    }
    checkregister();
  }
}


module.exports = new RegisterController;