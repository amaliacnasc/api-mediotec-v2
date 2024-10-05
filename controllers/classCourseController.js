
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createClassCourse = async (req, res) => {
    try{
        const classCourse = await prisma.classCourse.create({
            data:req.body
        });
        res.status(201).json({message:'Disciplina atribuída a turma', classCourse});

    }catch(error){
        res.json({message:error.message});
    }
}

// pegar todas as disciplinas que estão atribuídas a turmas 
exports.getAllClassCourse = async(req,res)=>{
    try{
        const classCourse = await prisma.classCourse.findMany({
            include: {
                class: true,
                course: true
            }
        })
        res.json(classCourse);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

// pegar todas as disciplinas de uma turma específica 
exports.getAllclassCourseById = async(req,res)=>{
    try{
        const users = await prisma.classCourse.findMany({
            include: {
                class: false,
                course: true
            },
            where: {
                classId: req.params.classId
            }
        })
        res.json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

// Deletar registro na tabela classCourse
exports.deleteclassCourse = async (req, res) => {
    try {
      const { courseId, classId } = req.body;  // Desestruturando o corpo da requisição para pegar userId e classId
      const deletedclassCourse= await prisma.classCourse.delete({
        where: {
          courseId_classId: {  // Se for uma chave composta
            courseId: courseId,
            classId: classId,
          },
        },
      });
  
      res.json({ message: `Removido com sucesso`, deletedclassCourse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };