const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// registrar relacionamento 
exports.createRelationship = async(req,res)=>{
    try{
        const userClassCourse = await prisma.userClassCourse.create({
            data:req.body
        });
        res.status(200).json(userClassCourse);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getUserRelations = async (req, res) => {
    try {
      const userId = req.params.userId;
  
    
      const userClassCourse = await prisma.userClassCourse.findMany({
        where: {
          userId: userId, // Filtra pela relação do usuário
        },
        include: {
          class: true, // Se houver uma relação com 'class'
          course: true, // Se houver uma relação com 'course'
        },
      });
  
      if (!userClassCourse || userClassCourse.length === 0) {
        return res.status(404).json({ message: 'Nenhuma relação encontrada para esse usuário.' });
      }
  
      // Retorna as relações encontradas
      res.status(200).json(userClassCourse);
    } catch (error) {
      console.error('Erro ao buscar relações do usuário:', error);
      res.status(500).json({ message: error.message });
    }
  };
  