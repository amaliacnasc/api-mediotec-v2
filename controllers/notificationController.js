const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar notificação
exports.createNotification = async (req, res) => {
    try {
        const notification = await prisma.announcement.create({
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
        const notifications = await prisma.announcement.findMany();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificações de um usuário específico
exports.getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await prisma.announcement.findMany({
            where: {
                userId: req.params.userId // Filtra as notificações por ID do usuário
            }
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificações por tipo
exports.getNotificationsByType = async (req, res) => {
    try {
        const notifications = await prisma.announcement.findMany({
            where: {
                type: req.params.type // Filtra as notificações pelo tipo
            }
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificação pelo ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await prisma.announcement.findUnique({
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
        const updatedNotification = await prisma.announcement.update({
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
        await prisma.announcement.delete({
            where: { announcementId: req.params.announcementId }
        });
        res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificação pelo titulo 
exports.getNotificationByTitle = async (req, res) => {
    try {
        const notification = await prisma.announcement.findMany({
            where: { title: req.params.title }
        });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
