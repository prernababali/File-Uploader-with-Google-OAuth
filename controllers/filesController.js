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


// Delete a file by filename
exports.deleteFile = async (req, res) => {
  try {
    const filename = req.params.filename;

    // Find the file record
    const file = await prisma.file.findFirst({
      where: { filename, userId: req.user.id },
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete file from disk
    const fs = require('fs');
    const filePath = path.resolve(__dirname, '../public', file.path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete record from DB
    await prisma.file.delete({ where: { id: file.id } });

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
 