const express = require("express");
const router = express.Router(); 
const auth = require('../controllers/authController')
const bcrypt = require('bcryptjs'); // Exemplo de importação
//const authMiddleware = require("../middleware/authMiddleware");

router.post('/register', auth.register); 
router.post('/login', auth.login); 

module.exports = router;
