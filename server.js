const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = path.join(process.cwd(), 'dist/browser');

console.log('--- DEPLOYMENT DEBUG ---');
console.log('Current directory:', process.cwd());
console.log('Expected dist folder:', DIST_FOLDER);

if (fs.existsSync(DIST_FOLDER)) {
    console.log('✅ DIST_FOLDER found.');
    const files = fs.readdirSync(DIST_FOLDER);
    console.log(`Contents (${files.length} items):`, files.slice(0, 10), files.length > 10 ? '...' : '');
} else {
    console.log('❌ DIST_FOLDER NOT FOUND!');
    const rootFiles = fs.readdirSync(process.cwd());
    console.log('Current directory contents:', rootFiles);

    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
        console.log('✅ dist folder found but maybe browser subfolder is missing.');
        console.log('dist folder contents:', fs.readdirSync(distPath));
    }
}
console.log('-----------------------');

// Servir archivos estáticos
app.use(express.static(DIST_FOLDER));

// SPA fallback
app.get('*', (req, res) => {
    const indexPath = path.join(DIST_FOLDER, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`Error: index.html not found in ${DIST_FOLDER}. Check server logs.`);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
