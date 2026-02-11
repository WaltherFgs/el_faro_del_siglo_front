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

// Determine correct static path
let staticPath = path.join(__dirname, 'dist', 'browser');
// Check if index.html is in dist/browser or dist/browser/browser (Angular 17+ nuance)
if (!fs.existsSync(path.join(staticPath, 'index.html')) && fs.existsSync(path.join(staticPath, 'browser', 'index.html'))) {
    staticPath = path.join(staticPath, 'browser');
}

console.log(`Resolved static path: ${staticPath}`);
if (fs.existsSync(staticPath)) {
    console.log(`Static path contents:`, fs.readdirSync(staticPath));
} else {
    console.error(`ERROR: Static path ${staticPath} does not exist!`);
}

app.use(express.static(staticPath));

// Fallback to index.html for SPA
app.use((req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`Index file not found at ${indexPath}. Directory: ${fs.readdirSync(staticPath)}`);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Frontend iniciado.`);
    console.log(`-> Escuchando en el puerto: ${PORT}`);
    console.log(`-> Sirviendo archivos desde: ${staticPath}`);
});
