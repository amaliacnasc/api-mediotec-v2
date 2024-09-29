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

// pegar todos os conceitos de uma turma 
exports.getConceitoByClass = async(req,res)=>{
    try{
        
        const conceitos = await prisma.conceito.findMany({
            where:{classId : req.params.classId }
        })
        res.status(200).json(conceitos); 
    }catch(error){
        error = error.message
    }
}


// Pegar todos os conceitos de um usuário
exports.getConceitoByUser = async (req, res) => {
    try {
        const conceitos = await prisma.conceito.findMany({
            where: { userId: req.params.userId },
        });

        if (conceitos.length === 0) {
            return res.status(404).json({ message: 'Conceitos não encontrados' });
        }

        res.status(200).json(conceitos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// pegar conceito pelo id 
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