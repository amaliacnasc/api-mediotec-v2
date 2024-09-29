const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um usuario  -> authController

// Buscar todos os usuários 
// GET
exports.getAllUsers = async(req,res)=>{
    try{
        const users = await prisma.user.findMany()
        res.json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
// Buscar usuário pelo id
// GET 
exports.getUserById = async(req,res)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{userId: req.params.id}
        }); 
        if(!user){
            res.status(404).json({message:'Usuário não encontrado'} )
        }
        res.json(user);
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}
// Buscar usuário pelo nome 
// GET
exports.getUserByName = async(req,res)=>{
    try{
        const user = await prisma.user.findMany({
            where:{name:req.params.name}
        }); 
        if(!user){
            res.status(404).json({message: 'Usuário não encontrado'});
        }
        res.json(user);
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}

// Buscar usuário pelo tipo 
exports.getUsersByType = async(req,res)=>{
    try{
        const users = await prisma.user.findMany({
            where:{role: req.params.role}
        })
        if (users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário com esse tipo foi encontrado ' });
        }
        res.json(users);
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}

// Atualizar usuario pela id 
// PUT
exports.updateUserById = async(req,res)=>{
    try{
        const user = await prisma.user.update({
            where:{userId: req.params.id}, 
            data: req.body,
        }); 
        
        if(!user){
            res.status(404).json({message: 'Usuário não encontrado'}); 
        }
        res.json(user);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}; 

// Deletar usuario pelo Id
// DELETE 
exports.deleteUserById = async(req,res)=>{
    try{
       const user = await prisma.user.findUnique({
            where:{userId:req.params.id}
        });
        if(!user){
            res.status(404).json({message: 'Usuário não encontrado'}); 
        }
        res.json({message: `Usuário ${user.name} deletado com sucesso`})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}