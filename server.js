const express = require('express');
const path = require('path');
const app = express();

app.arguments(express.static(__dirname + '/dist/angular10-dynamic-reactive-forms'));
app.get('/*', (res, req) => {
    res.sendFile(path.join(__dirname + '/dist/angular10-dynamic-reactive-forms/index.html'));
})

app.listen(port.env.PORT || 8080);