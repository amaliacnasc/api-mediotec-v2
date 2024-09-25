
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar notificação
exports.createNotification = async (req, res) => {
    try {
        const notification = await prisma.notification.create({
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
        const notifications = await prisma.notification.findMany();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar notificação pelo ID
exports.getNotificationById = async (req, res) => {
    try {
        const notification = await prisma.notification.findUnique({
            where: { notificationId: req.params.id }
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
        const updatedNotification = await prisma.notification.update({
            where: { notificationId: req.params.id },
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
        await prisma.notification.delete({
            where: { notificationId: req.params.id }
        });
        res.status(200).json({ message: 'Notificação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Buscar todas as notificações de uma turma 
// Buscar notificação pelo titulo 
