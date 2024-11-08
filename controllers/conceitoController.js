const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




// criar um conceito
exports.createConceito = async(req,res)=>{
    try{
        conceito = await prisma.conceito.create({
            data:req.body
        });
        res.status(200).json(conceito);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// Buscar todos os conceitos 
exports.getAllConceitos = async (req, res) => {
    try {
        const conceitos = await prisma.conceito.findMany();
        res.status(200).json(conceitos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// pegar conceito pelo id 
exports.getConceitoById = async(req,res)=>{
    try{
        const conceito = await prisma.conceito.findUnique({
            where:{conceitoId: req.params.conceitoId}
        });
        if(!conceito){
            res.status(404).json({message: 'Conceito não encontrado'}); 
        }
        res.json(conceito);
    }catch(error){
        res.status(500).json({error:error.message});
    }
    
}


// atualizar conceito pelo id
exports.updateConceitoById = async(req,res)=>{
    try{
        const conceito = await prisma.conceito.update({
            where:{conceitoId: req.params.conceitoId},
            data: req.body
        });
        if(!conceito){
            res.status(404).json({message: 'Conceito não encontrado'}); 
        }
        res.json(conceito);
    }catch(error){
        res.status(500).json({error:error.message});
    }
    
}

// pegar todos os conceitos de uma Disciplina 
exports.getAllConceitosOfCourseId = async (req, res) => {
    try {
      const conceitos = await prisma.conceito.findMany({
        where: {
          userClassCourse: {
            courseId: req.params.courseId, 
          },
        },
        include: {
          userClassCourse: true,
        },
      });
      res.status(200).json(conceitos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Pegar todos os conceitos de um usuário
exports.getAllConceitosOfUserId = async (req, res) => {
    try {
      const conceitos = await prisma.conceito.findMany({
        where: {
          userClassCourse: {
            userId: req.params.userId, // Filtra pelos conceitos relacionados ao usuário
          },
        },
        include: {
          userClassCourse: true, // Inclui as informações da relação com a turma e o curso, se necessário
        },
      });
      res.status(200).json(conceitos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Pega todos os conceitos por turma e unidade 
exports.getConceitosByClassAndUnidade = async (req, res) => {
    try {
      const conceitos = await prisma.conceito.findMany({
        where: {
          userClassCourse: {
            classId: req.params.classId, // Filtra pela turma
          },
          unidade: req.params.unidade, // Filtra pela unidade
        },
        include: {
          userClassCourse: true, // Inclui informações da relação com a turma e o curso, se necessário
        },
      });
      res.status(200).json(conceitos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// deletar conceito pelo id 
exports.deleteConceitoById = async(req,res)=>{
    try{
        const conceito = await prisma.conceito.delete({
            where:{conceitoId: req.params.conceitoId}
        });
        if(!conceito){
            res.status(404).json({message: 'Conceito não encontrado'}); 
        }
        res.json(conceito);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}