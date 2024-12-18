const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



// buscar todos os usuarios
// GET
exports.getAllUsers= async(req,res)=>{
    try{
        const usuarios = await prisma.user.findMany();
        res.status(200).json(usuarios)
    }catch(error){
        res.status(500).json({message:error.message}); 
    }
}

// Buscar usuário pelo id
// GET
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;  
        
     
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

   
        const usuario = await prisma.user.findUnique({
            where: { userId: userId }
        });

   
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Buscar usuario pelo nome 
//GET
exports.getUserByName = async(req,res)=>{
    try{
        const usuario = await prisma.user.findUnique({
            where:{userName: req.params.userName}
        })
        res.status(200).json(usuario);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
//buscar usuario pelo email 
exports.getUserByEmail = async(req,res)=>{
    try{
        const usuario = await prisma.user.findUnique({
            where:{email: req.params.email}
        })
        res.status(200).json(usuario);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
//buscar usuario pelo tipo 
exports.getUserByType= async(req,res)=>{
    try{
        const usuario = await prisma.user.findMany({
            where:{role: req.params.role}
        })
        res.status(200).json(usuario);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
// buscar todos os usuarios cadastrados em uma turma 
exports.getAllUsersOfClass = async (req, res) => {
    try {
      const usuarios = await prisma.userClassCourse.findMany({
        where: { classId: req.params.classId },
        include: {
          user: true, // Inclui todas as informações do usuário relacionado
        },
      });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// buscar todos os usuarios de uma disciplina
exports.getAllUsersOfCourse = async (req, res) => {
    try {
      const usuarios = await prisma.userClassCourse.findMany({
        where: { courseId: req.params.courseId },
        include: {
          user: true, // Inclui todas as informações do usuário relacionado
        },
      });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// atualizar usuario pelo id
// PUT
exports.updateUserById = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;

        const usuario = await prisma.user.update({
            where: { userId: req.params.userId },
            data: updateData,
        });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar usuario pelo Id
// DELETE 
exports.deleteUserById = async(req,res)=>{
    try{
       const usuario = await prisma.user.delete({
            where:{userId:req.params.userId}
        });
        if(!usuario){
            res.status(404).json({message: 'Turma não encontrada'}); 
        }
        res.json({message: `Usuario deletado com sucesso`})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}


// Buscar todas as disciplinas de um aluno
exports.getAllCoursesOfStudent = async (req, res) => {
    try {
        const { userId } = req.params;

        const courses = await prisma.userClassCourse.findMany({
            where: { userId },
            include: {
                course: true, // Inclui informações do curso
            },
        });

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar conceitos de uma disciplina para um aluno
exports.getConceptsByCourseAndStudent = async (req, res) => {
    try {
        const { userId, courseId } = req.params;

        const concepts = await prisma.conceito.findMany({
            where: {
                userClassCourse: {
                    userId,
                    courseId,
                },
            },
            include: {
                userClassCourse: {
                    include: {
                        user: true,
                        course: true,
                    },
                },
            },
        });

        res.status(200).json(concepts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar conceito de uma unidade
exports.updateConcept = async (req, res) => {
    try {
        const { conceitoId } = req.params;
        const { conceito, result } = req.body;

        const updatedConcept = await prisma.conceito.update({
            where: { conceitoId },
            data: {
                conceito,
                result,
            },
        });

        res.status(200).json(updatedConcept);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

