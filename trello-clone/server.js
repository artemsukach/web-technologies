const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
// const Router = require('./Router.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

// app.use(bodyParser.json());
// app.use('/user', Router);

app.listen(PORT, function () {
  console.log('Сервер запущено на порту:', PORT);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT);
