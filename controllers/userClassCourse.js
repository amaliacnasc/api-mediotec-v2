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
  
  // Obter todos os relacionamentos com estrutura simplificada
exports.getAllRelationships = async (req, res) => {
  try {
      const userClassCourses = await prisma.userClassCourse.findMany({
          include: {
              user: true,   // Incluir dados do User
              class: true,  // Incluir dados do Class
              course: true, // Incluir dados do Course
          },
      });

      // Remover campos duplicados do nível superior
      const formattedData = userClassCourses.map((relationship) => ({
          user_class_courseId: relationship.user_class_courseId,
          user: relationship.user,
          class: relationship.class,
          course: relationship.course,
          createdAt: relationship.createdAt,
          updatedAt: relationship.updatedAt,
      }));

      res.status(200).json(formattedData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Obter um relacionamento específico pelo ID com estrutura simplificada
exports.getRelationshipById = async (req, res) => {
  const { id } = req.params;
  try {
      const relationship = await prisma.userClassCourse.findUnique({
          where: { user_class_courseId: id },
          include: {
              user: true,   // Incluir dados do User
              class: true,  // Incluir dados do Class
              course: true, // Incluir dados do Course
          },
      });

      if (!relationship) {
          return res.status(404).json({ message: "Relacionamento não encontrado" });
      }

      // Remover campos duplicados
      const formattedData = {
          user_class_courseId: relationship.user_class_courseId,
          user: relationship.user,
          class: relationship.class,
          course: relationship.course,
          createdAt: relationship.createdAt,
          updatedAt: relationship.updatedAt,
      };

      res.status(200).json(formattedData);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Atualizar um relacionamento pelo ID
exports.updateRelationship = async (req, res) => {
  const { id } = req.params; // ID do relacionamento a ser atualizado
  const updatedData = req.body; // Dados atualizados enviados no corpo da requisição

  try {
      // Verifica se o relacionamento existe
      const existingRelationship = await prisma.userClassCourse.findUnique({
          where: { user_class_courseId: id },
      });

      if (!existingRelationship) {
          return res.status(404).json({ message: "Relacionamento não encontrado" });
      }

      // Atualiza o relacionamento
      const updatedRelationship = await prisma.userClassCourse.update({
          where: { user_class_courseId: id },
          data: updatedData,
      });

      res.status(200).json(updatedRelationship);
  } catch (error) {
      console.error("Erro ao atualizar relacionamento:", error);
      res.status(500).json({ message: error.message });
  }
};