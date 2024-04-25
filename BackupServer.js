// server.js
const express = require('express');
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
const port = 3002;

// Adjust paths based on the operating system
const isMacOS = os.platform() === 'darwin';
const isWindows = os.platform() === 'win32';

const directoryPath = isMacOS ? '/Users/dhameem/Desktop/Backup_Connect' : isWindows ? 'C:\\DataStore\\Backup_Connect' : null;

// Ensure the directory exists
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
  console.log(`Directory created: ${directoryPath}`);
} else {
  console.log(`Directory already exists: ${directoryPath}`);
}

const dbFile = isMacOS ? 'db.json' : isWindows ? 'C:\\DataStore\\db.json' : null;
const backupDir = isMacOS ? '/Users/dhameem/Desktop/Backup_Connect' : isWindows ? 'C:\\DataStore\\Backup_Connect' : null;

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const getBackupFileName = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `backup-${timestamp}.json`;
};

app.post('/backup', (req, res) => {
  const backupPath = path.join(backupDir, getBackupFileName());

  try {
    if (isMacOS) {
      execSync(`cp ${dbFile} ${backupPath}`);
    } else if (isWindows) {
      execSync(`copy ${dbFile} ${backupPath}`);
    } else {
      console.error('Unsupported operating system for backup');
      res.status(500).send('Unsupported operating system for backup');
      return;
    }

    console.log(`Backup created: ${backupPath}`);
    res.status(200).send('Backup created successfully');
  } catch (error) {
    console.error('Error creating backup:', error.message);
    res.status(500).send('Error creating backup');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
