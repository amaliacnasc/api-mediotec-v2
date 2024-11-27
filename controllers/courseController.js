const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




// criar disciplina 
exports.createCourse = async(req,res)=>{
    try{
        const course = await prisma.course.create({
            data:req.body
        });
        res.status(201).json({message:'Disciplina criada com sucesso', course});

    }catch(error){
        res.json({message:error.message});
    }
}

// Buscar todas as disciplinas com userId e classId associados, separados por tipo de usuário
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany({
            include: {
                userClassCourses: {
                    include: {
                        user: {
                            select: {
                                userId: true,
                                role: true,
                            },
                        },
                        class: {
                            select: {
                                classId: true,
                            },
                        },
                    },
                },
            },
        });

        // Formatar o retorno para separar os usuários por tipo
        const formattedCourses = courses.map(course => {
            const teachers = [];
            const students = [];

            course.userClassCourses.forEach(assoc => {
                const { userId, role } = assoc.user;
                const { classId } = assoc.class;

                if (role === "TEACHER") {
                    teachers.push({ userId, classId });
                } else if (role === "STUDENT") {
                    students.push({ userId, classId });
                }
            });

            return {
                courseId: course.courseId,
                courseName: course.courseName,
                description: course.description,
                workload: course.workload,
                createdAt: course.createdAt,
                updatedAt: course.updatedAt,
                associations: {
                    teachers,
                    students,
                },
            };
        });

        res.json(formattedCourses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Buscar disciplina pelo id 

exports.getCourseById = async(req,res)=>{
    try{
        const course = await prisma.course.findUnique({
            where:{courseId: req.params.courseId}
        })
        if(!course){
            res.status(404).json({message:'Disciplina não encontrada'} )
        }; 
            res.status(200).json(course); 
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}

// Buscar disciplina pelo nome
// fazer tratamento de string to lower pra ele aceitar maiusculo e minusculo
exports.getCourseByName = async(req,res)=>{
    try{
        const disciplina = await prisma.course.findUnique({
            where:{courseName:req.params.courseName}
        }); 
        if(!disciplina){
            res.status(404).json({message: 'Disciplina não encontrada'});
        }
        res.json(disciplina);
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}

// atualizar disciplina pelo id 

exports.updateCourseById = async(req,res)=>{
    try{
        const course = await prisma.course.update({
            where:{courseId: req.params.courseId}, 
            data: req.body,
        }); 
        if(!course){
            return res.status(404).json({ message: "Disciplina não encontrada" });
        }
        res.json(course);
    }catch(error){
        res.status(500).json({message:error.message}); 
    }
}

//deletar disciplina pelo id 
exports.deleteCourseById = async(req,res)=>{
    try{
        const course = await prisma.course.delete({
            where:{courseId: req.params.courseId}
        }); 
        if(!course){
            return res.status(404).json({ message: "Turma não encontrada" });
        }
        res.json({message: `Disciplina ${course.courseName} deletada com sucesso`});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// Buscar disciplina que tenha ambos usuarios e turmas matriculadas
exports.getCoursesWithUsersAndClasses = async (req, res) => {
    try {
      const cursos = await prisma.course.findMany({
        where: {
          userClassCourses: {
            some: {
              userId: {
                not: null, // Verifica que existe pelo menos um usuário associado
              },
              classId: {
                not: null, // Verifica que existe pelo menos uma turma associada
              },
            },
          },
        },
        include: {
          userClassCourses: {
            include: {
              user: true,  // Inclui os dados dos usuários
              class: true, // Inclui os dados das turmas
            },
          },
        },
      });
  
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  