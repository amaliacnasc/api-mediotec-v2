const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUserCourse = async (req, res) => {
    try{
        const userCourse = await prisma.userCourse.create({
            data:req.body
        });
        res.status(201).json({message:'Usuário cadastrado na turma', userCourse});

    }catch(error){
        res.json({message:error.message});
    }
}

exports.getAllUserCourse = async(req,res)=>{
    try{
        const users = await prisma.userCourse.findMany({
            include: {
                course: true,
                user: true
            }
        })
        res.json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

exports.getAllUserCourseByCourseId = async(req,res)=>{
    try{
        const users = await prisma.userCourse.findMany({
            include: {
                course: false,
                user: true
            },
            where: {
                courseId: req.params.courseId
            }
        })
        res.json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

exports.deleteUserCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.body;  // Desestruturando o corpo da requisição para pegar userId e courseId
      const deletedUserCourse = await prisma.userCourse.delete({
        where: {
          userId_courseId: {  // Se for uma chave composta
            userId: userId,
            courseId: courseId,
          },
        },
      });
  
      res.json({ message: `Usuário removido da turma com sucesso`, deletedUserCourse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };