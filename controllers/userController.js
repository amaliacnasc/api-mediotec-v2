const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um usuario 
//POST
exports.createUser = async (req, res) => {
    try {
      // Cria o usuário
      const newUser = await prisma.user.create({
        data: req.body
      });
  
      // Verifica se a turma existe
      const classExists = await prisma.class.findUnique({
        where: { classId: "2334f08f-8981-47bb-9084-0b27186f9ae6" },
      });
  
      if (!classExists) {
        throw new Error('Turma não encontrada');
      }
     
      // Relaciona o usuário com a turma
      await prisma.userClass.create({
        data: {
          userId: newUser.userId,
          classId: classExists.classId,
        },
      });
  
      // Se o usuário for PROFESSOR, exige courseId
     /* if (newUser.role === 'TEACHER') {
        if (!courseId) {
          throw new Error('CourseId é obrigatório para professores.');
        }
  
        // Verifica se o curso existe
        const courseExists = await prisma.course.findUnique({
          where: { courseId: courseId },
        });
  
        if (!courseExists) {
          throw new Error('Curso não encontrado');
        }
  
        // Relaciona o professor ao curso
        await prisma.userCourse.create({
          data: {
            userId: newUser.userId,
            courseId: courseId,
          },
        });
      }
  */
      return newUser;
    } catch (error) {
      console.error('Erro ao criar o usuário e associá-lo à turma e curso:', error);
      throw error;
    }
  }
  
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