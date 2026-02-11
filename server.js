const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

/**
 * CONFIGURACIÓN PROFESIONAL PARA ANGULAR (SPA)
 */

const PORT = process.env.PORT || 3000;
// Directorio donde Angular genera los archivos (verificado en dist/browser)
const DIST_FOLDER = path.join(process.cwd(), 'dist/browser');

// 1. Servir archivos estáticos con caché (opcional pero recomendado)
app.use(express.static(DIST_FOLDER, {
    maxAge: '1y',
    etag: true
}));

// 2. Logs básicos para monitoreo en producción
console.log('--- Server Started ---');
console.log(`Port: ${PORT}`);
console.log(`Serving from: ${DIST_FOLDER}`);

// 3. SPA Fallback: Todas las peticiones que no sean archivos estáticos
// se redirigen al index.html para que el router de Angular las maneje.
app.get('*', (req, res) => {
    const indexPath = path.join(DIST_FOLDER, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Build error: index.html not found. Make sure "npm run build" was successful.');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production server is up at http://0.0.0.0:${PORT}`);
});
