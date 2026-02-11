const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/browser'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/browser/index.html'));
});

// Use PORT from environment or default to 3000
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Servidor Frontend corriendo en puerto ${PORT}`);
});
