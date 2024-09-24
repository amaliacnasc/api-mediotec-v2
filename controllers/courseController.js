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

// buscar todas as disciplinas 
exports.getAllCourses = async(req,res) =>{
    try{
        const courses = await prisma.course.findMany(); 
        res.status(200).json(courses); 
    }catch(error){
        res.status(400).json({error:error.message});
    }
    
}
// Buscar disciplina pelo id 

exports.getCourseById = async(req,res)=>{
    try{
        const course = await prisma.course.findUnique({
            where:{courseId: req.params.id}
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
        const disciplina = await prisma.course.findMany({
            where:{courseName:req.params.courseSName}
        }); 
        if(!disciplina){
            res.status(404).json({message: 'Disciplina não encontrada'});
        }
        res.json(disciplina);
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}

// buscar todas as disciplinas de uma turma 
exports.getCourseByClass = async (req, res) => {
    try {
        // Primeiro, encontra a turma pelo nome
        const turma = await prisma.class.findUnique({
            where: { className: req.params.className },
            include: { courses: true }  // Inclui o relacionamento com as disciplinas
        });

        if (!turma) {
            return res.status(404).json({ message: "Turma não encontrada" });
        }

        // Pega os ids dos cursos associados à turma
        const coursesIds = turma.courses.map(classCourse => classCourse.courseId);

        // Busca as disciplinas (courses) associadas aos ids obtidos
        const courses = await prisma.course.findMany({
            where: {
                courseId: { in: coursesIds }
            }
        });

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar disciplina pelo usuario 
exports.getCoursebyUser = async (req, res) => {
    try {
        // Primeiro, busca o usuário pelo ID
        const user = await prisma.user.findUnique({
            where: { userId: req.params.id },
            include: {
                courses: {
                    include: {
                        course: true  // Inclui os dados dos cursos
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Extrai os cursos relacionados
        const courses = user.courses.map(userCourse => userCourse.course);

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// atualizar disciplina pelo id 

exports.updateCourseById = async(req,res)=>{
    try{
        const course = await prisma.course.findUnique({
            where:{courseId: req.params.id}
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
        const course = await prisma.course.findUnique({
            where:{courseId: req.params.id}
        }); 
        if(!course){
            return res.status(404).json({ message: "Turma não encontrada" });
        }
        res.json({message: `Disciplina ${course.courseName} deletada com sucesso`});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}