const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = path.join(process.cwd(), 'dist/browser');

// Servir archivos estáticos desde /dist/browser
app.use(express.static(DIST_FOLDER));

// Manejar todas las demás rutas y devolver index.html (para Angular Routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
    console.log(`Serving files from ${DIST_FOLDER}`);
});
