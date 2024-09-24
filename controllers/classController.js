const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//criar turma 
// buscar turma pelo id
// buscar todas as turmas
// buscar todas as turmas de um ano 
// atualizar turma pelo id
// deletar turma pelo id 

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