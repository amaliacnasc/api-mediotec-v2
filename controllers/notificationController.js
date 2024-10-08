
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar notificação
exports.createNotification = async (req, res) => {
    try {
        const notification = await prisma.announcements.create({
            data: req.body
        });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar todas as notificações
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await prisma.announcements.findMany();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificação pelo ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await prisma.announcements.findUnique({
            where: { announcementId: req.params.announcementId }
        });
        if (!notification) {
            return res.status(404).json({ message: 'Notificação não encontrada' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar notificação pelo ID
exports.updateNotificationById = async (req, res) => {
    try {
        const updatedNotification = await prisma.announcements.update({
            where: { announcementId: req.params.announcementId },
            data: req.body
        });
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar notificação pelo ID
exports.deleteNotificationById = async (req, res) => {
    try {
        await prisma.announcements.delete({
            where: { announcementId: req.params.announcementId }
        });
        res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificação pelo titulo 
// GET 
exports.getNotificationByTitle = async(req,res)=>{
    try{
        const notification =  await prisma.announcements.findMany({
            where:{title: req.params.title}
        }); 
        res.json(notification);
    }catch(error){
    res.status(500).json({ message: error.message });
    }
}

