const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// buscar todas as turmas de um ano 
// atualizar turma pelo id
// deletar turma pelo id 

//criar turma 
exports.createClass = async(req,res)=>{
    try{
        const turma = await prisma.class.create({
            data:req.body
        }); 
        res.status(200).json(turma); 
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// buscar todas as turmas
exports.getAllClasses = async(req,res)=>{
    try{
        const turmas = await prisma.class.findMany();
        res.status(200).json(turmas)
    }catch(error){
        res.status(500).json({message:error.message}); 
    }
}

// Buscar turma pelo id 

exports.getClassById = async(req,res)=>{
    try{
        const turma = await prisma.class.findUnique({
            where:{classId: req.params.classId}
        })
        res.status(200).json(turma);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// atualizar turma pelo id
exports.updateClassById = async(req,res)=>{
    try{
        const user = await prisma.class.update({
            where:{classId: req.params.id}, 
            data: req.body,
        }); 
        
        if(!user){
            res.status(404).json({message: 'Turma não encontrada'}); 
        }
        res.json(user);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}; 
