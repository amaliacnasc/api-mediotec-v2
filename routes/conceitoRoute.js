const express = require("express");
const router = express.Router(); 
const conceito = require('../controllers/conceitoController'); 
const { Conceitos } = require("@prisma/client");


router.post('/', conceito.createConceito ); 
router.get('/conceitos', conceito.getAllConceitos); 
router.get('/conceito/:conceitoId', conceito.getConceitoById);
router.get('/conceitos/:courseId', conceito.getAllConceitosOfCourseId); // busca todos os conceitos de uma disciplina 
router.get('/user/:userId', conceito.getAllConceitosOfUserId); // busca todos os conceitos de um usuario 
router.get('/conceitos/:classId/:unidade', conceito.getConceitosByClassAndUnidade);
router.put('/conceito/update/:conceitoId', conceito.updateConceitoById); 
router.delete('/conceito/delete/:conceitoId', conceito.deleteConceitoById);

module.exports = router;