const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Handle file upload
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileData = {
      filename: req.file.originalname,
      filepath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      userId: req.user.id // assuming user is logged in via Google OAuth
    };

    const uploadedFile = await prisma.file.create({
      data: fileData
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: uploadedFile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch uploaded files for the user
exports.getFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: req.user.id }
    });

    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch files' });
  }
};