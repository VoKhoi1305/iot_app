var express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');
const requireLogin = require('../app/middleware/requirelogin');


router.get('/user',requireLogin,loginController.renderuser);
router.get('/admin',requireLogin,loginController.renderadmin);
router.get('/getFirebaseData', loginController.getFirebaseData);
router.get('/',loginController.index);
router.post('/',loginController.check);


module.exports = router;