const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/browser'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/browser/index.html'));
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
