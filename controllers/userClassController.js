const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUserClass = async (req, res) => {
    try{
        const userClass = await prisma.userClass.create({
            data:req.body
        });
        res.status(201).json({message:'Usuário cadastrado na turma', userClass});

    }catch(error){
        res.json({message:error.message});
    }
}

exports.getAllUserClass = async(req,res)=>{
    try{
        const users = await prisma.userClass.findMany({
            include: {
                class: true,
                user: true
            }
        })
        res.json(users);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

exports.getAllUserClassByClassId = async(req,res)=>{
    try{
        const users = await prisma.userClass.findMany({
            include: {
                class: false,
                user: true
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

exports.deleteUserClass = async (req, res) => {
    try {
      const { userId, classId } = req.body;  // Desestruturando o corpo da requisição para pegar userId e classId
      const deletedUserClass = await prisma.userClass.delete({
        where: {
          userId_classId: {  // Se for uma chave composta
            userId: userId,
            classId: classId,
          },
        },
      });
  
      res.json({ message: `Usuário removido da turma com sucesso`, deletedUserClass });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };