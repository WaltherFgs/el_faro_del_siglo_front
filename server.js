const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

// Debugging: List files in current directory and dist
console.log('Current directory:', __dirname);
try {
    console.log('Root contents:', fs.readdirSync(__dirname));
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
        console.log('Dist contents:', fs.readdirSync(distPath));
        const browserPath = path.join(distPath, 'browser');
        if (fs.existsSync(browserPath)) {
            console.log('Browser contents:', fs.readdirSync(browserPath));
        } else {
            console.log('dist/browser does not exist');
        }
    } else {
        console.log('dist folder does not exist');
    }
} catch (err) {
    console.error('Error listing files:', err);
}

app.use(express.static(__dirname + '/dist/browser'));

// Fallback to index.html for SPA
app.use((req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'browser', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Index file not found. Check logs for directory structure.');
    }
});

// Use PORT from environment or default to 3000
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Frontend iniciado.`);
    console.log(`-> Escuchando en el puerto: ${PORT}`);
    console.log(`-> Sirviendo archivos desde: ${path.join(__dirname, '/dist/browser')}`);
});
