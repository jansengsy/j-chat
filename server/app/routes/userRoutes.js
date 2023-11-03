const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/getUser', auth, userController.getUser);

module.exports = router;
