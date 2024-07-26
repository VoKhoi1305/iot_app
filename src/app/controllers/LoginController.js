const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, where, onSnapshot, orderBy, limit } = require('firebase/firestore');
const session = require('express-session');
const { getDatabase, ref, get, child, onValue, update } = require('firebase/database');
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
const realtimedatabase = getDatabase(firebaseapp)

class LoginController {

    index(req, res) {
        res.render('dangnhap');
    }
    check(req, res) {
        const inputusername = req.body.username;
        const inputpassword = req.body.password;

        const q = query(accountRef, where("username", "==", inputusername), where("password", "==", inputpassword));
        async function checklogin() {
            const accounts = await getDocs(q);
            accounts.forEach(account => {
                const exacc = account.get('username');
                const expass = account.get('password');
                const role = account.get('role');
                if (exacc == inputusername && expass == inputpassword) {
                    if (role == 'user') {
                        req.session.username = 'user';
                        res.redirect('login/user');
                    }
                    else if (role == 'admin') {
                        req.session.username = 'admin'
                        res.redirect('login/admin')
                    }
                }
            });
            res.render('dangnhap', { note: 'sai tai khoan hoac mat khau' });
        }
        checklogin();
    }

    renderuser(req, res) {
        res.render('map', { title: 'Map' });
    }


    async getFirebaseData(req, res) {
        const dbRef = ref(realtimedatabase);
        try {
            const snapshot = await get(child(dbRef, 'trash'));
            if (snapshot.exists()) {
                let data = snapshot.val();

                const formatValues = (obj) => {
                    if (Array.isArray(obj)) {
                        return obj.map(item => formatValues(item));
                    } else if (typeof obj === 'object' && obj !== null) {
                        for (let key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                if (typeof obj[key] === 'number') {
                                    if (key === 'lat' || key === 'lng') {
                                        obj[key] = (obj[key] / 1000000).toFixed(6);
                                    } else {
                                        obj[key] = (obj[key] / 100).toFixed(2);
                                    }
                                } else if (typeof obj[key] === 'object') {
                                    formatValues(obj[key]);
                                }
                            }
                        }
                    }
                    return obj;
                };

                data = formatValues(data);

                res.json(data);
            } else {
                res.status(404).json({ error: 'No data available' });
            }
        } catch (error) {
            console.error('Error getting Firebase data:', error);
            res.status(500).json({ error: 'Error getting Firebase data' });
        }
    };



    renderadmin(req, res) {
        res.render('data');
    }

    async submitSmellyBin(req, res) {
        const selectedBinId = req.body.trashBin;
        console.log(selectedBinId)
        res.redirect('/login/user');
    }

    async updateLights(req, res) {
        const { binId, light } = req.body;
        const updates = {};
        updates[`trash/${binId}/light`] = light;

        try {
            await update(ref(realtimedatabase), updates);
            res.json({ success: true, message: 'Light control data updated successfully' });
        } catch (error) {
            console.error('Error updating light control data:', error);
            res.status(500).json({ error: 'Error updating light control data' });
        }
    }

}


module.exports = new LoginController;