const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





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

exports.getAllClasses = async (req, res) => {
  try {
      const classes = await prisma.class.findMany({
          include: {
              userClassCourses: {
                  include: {
                      user: {
                          select: {
                              userId: true,
                              role: true,
                              userName: true,
                          },
                      },
                  },
              },
          },
      });

      // Formatar o retorno para separar os usuários por tipo
      const formattedClasses = classes.map((classItem) => {
          const teachers = [];
          const students = [];

          classItem.userClassCourses.forEach((assoc) => {
              const { userId, role, userName } = assoc.user;

              if (role === "TEACHER") {
                  teachers.push({ userId, userName });
              } else if (role === "STUDENT") {
                  students.push({ userId, userName });
              }
          });

          return {
              classId: classItem.classId,
              className: classItem.className,
              year: classItem.year,
              createdAt: classItem.createdAt,
              updatedAt: classItem.updatedAt,
              associations: {
                  teachers,
                  students,
              },
          };
      });

      res.status(200).json(formattedClasses);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Buscar turma pelo id 
// GET
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
//  busca turma pelo nome 
exports.getClassByName = async(req,res)=>{
    try{
        const turma = await prisma.class.findUnique({
            where:{className: req.params.className}
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
            where:{classId: req.params.classId}, 
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
       const turma = await prisma.class.delete({
            where:{classId:req.params.classId}
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

// Busca todas as disciplinas de uma turma 

exports.getAllCoursesOfClassId = async (req, res) => {
    try {
      const disciplinas = await prisma.userClassCourse.findMany({
        where: { classId: req.params.classId },
        include: {
          course: true, // Inclui todas as informações do curso relacionado
        },
      });
      res.status(200).json(disciplinas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // busca todas as turmas de um usuario (professor)
  exports.getAllClassesOfUserId = async (req, res) => {
    try {
      const turmas = await prisma.userClassCourse.findMany({
        where: { userId: req.params.userId },
        include: {
          class: true, // Inclui todas as informações da turma relacionada
        },
      });
      res.status(200).json(turmas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Buscar todas as turmas que não tem disciplinas cadastradas 
  exports.getClassesWithoutCourses = async (req, res) => {
    try {
      const turmasSemDisciplinas = await prisma.class.findMany({
        where: {
          userClassCourses: {
            none: {}, // Retorna apenas as turmas que não têm registros na tabela UserClassCourse
          },
        },
      });
      res.status(200).json(turmasSemDisciplinas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  