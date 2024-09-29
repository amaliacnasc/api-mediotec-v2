const express = require("express");
const router = express.Router(); 
const conceito = require('../controllers/conceitoController'); 
const { Conceitos } = require("@prisma/client");


router.post('/', conceito.createConceito ); 
router.get('/conceitos', conceito.getAllConceitos); 
router.get('/conceito/:conceitoId', conceito.getConceitoById);
router.get('/conceitos/:turma', conceito.getConceitoByClass);
router.get('/conceitos/user/:userId', conceito.getConceitoByUser);
router.put('/conceito/update/:conceitoId', conceito.updateConceitoById); 
router.delete('/conceito/delete/:conceitoId', conceito.deleteConceitoById);

module.exports = router;