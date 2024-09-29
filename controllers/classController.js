const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// buscar todas as turmas de um ano 


//criar turma 
// GET
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
// GET
exports.getAllClasses = async(req,res)=>{
    try{
        const turmas = await prisma.class.findMany();
        res.status(200).json(turmas)
    }catch(error){
        res.status(500).json({message:error.message}); 
    }
}

// Buscar turma pelo id 
// GET
exports.getClassById = async(req,res)=>{
    try{
        const turma = await prisma.class.findUnique({
            where:{classId: req.params.id}
        })
        res.status(200).json(turma);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// atualizar turma pelo id
// PUT
exports.updateClassById = async(req,res)=>{
    try{
        const turma = await prisma.class.update({
            where:{classId: req.params.id}, 
            data: req.body,
        }); 
        
        if(!turma){
            res.status(404).json({message: 'Turma não encontrada'}); 
        }
        res.json(turma);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}; 
// Deletar turma pelo Id
// DELETE 
exports.deleteClassById = async(req,res)=>{
    try{
       const turma = await prisma.class.findUnique({
            where:{classId:req.params.id}
        });
        if(!turma){
            res.status(404).json({message: 'Turma não encontrada'}); 
        }
        res.json({message: `Turma${turma.name} deletada com sucesso`})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

// Buscar todas as turmas de um ano 
exports.getClassesByYear = async (req, res) => {
    try {
        // Convertendo o ano para um número inteiro
        const year = parseInt(req.params.year);

        // Verifica se o ano é um número válido
        if (isNaN(year)) {
            return res.status(400).json({ message: 'Year must be a valid number.' });
        }


        const turmas = await prisma.class.findMany({
            where: { year: year }
        });

        if (turmas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma turma foi encontrada neste ano.' });
        }
        res.status(200).json(turmas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
