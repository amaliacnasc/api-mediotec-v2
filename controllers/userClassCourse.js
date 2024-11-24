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
