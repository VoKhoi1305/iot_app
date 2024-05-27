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
  const session = require('express-session');

 
 // const LoginRouter = require('./login');
 

class LoginController{

    index(req,res){
        res.render('dangnhap');
    }
    check(req, res){
            const inputusername = req.body.username;
            const inputpassword = req.body.password;
         
            const q = query(accountRef,where("username", "==",inputusername),where("password","==",inputpassword));
            async function checklogin(){
            const accounts = await getDocs(q);
            accounts.forEach(account =>{
             const exacc =account.get('username');
             const expass = account.get('password');
             const role = account.get('role');
                if(exacc == inputusername && expass == inputpassword)
                {   
                    if(role == 'user')
                        {
                            req.session.username = 'user';
                            res.redirect('login/user');
                        }
                    else if( role =='admin')
                        {
                            req.session.username = 'admin'
                            res.redirect('login/admin')
                        }
                }
           });
           res.render('dangnhap', {note: 'sai tai khoan hoac mat khau'});
        }   
           checklogin();
    }

    renderuser(req, res) {
        res.render('map', { title: 'Map' });
    }
    
    async getFirebaseData(req, res) {
        try {
            const snapshot = await getDocs(environmentRef);
            const data = snapshot.docs.map(doc => doc.data());
            res.json(data); 
        } 
        catch (error) {
            console.error('Error getting Firebase data:', error);
            res.status(500).json({ error: 'Error getting Firebase data' });
        }
    }



    renderadmin(req, res) {
        res.render('data');
    }

    async submitSmellyBin(req, res) {
        const selectedBinId = req.body.trashBin;
        console.log(selectedBinId)
        res.redirect('/login/user');
    }

}


module.exports = new LoginController;