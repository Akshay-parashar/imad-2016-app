var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
// Registering Static Files
app.use(express.static('img'));
app.use(express.static('css'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function(req,res) {
	 res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});


app.get('/article-two', function(req,res) {
	res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req,res) {
	res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/web', function(req,res) {
	 res.sendFile(path.join(__dirname, 'ui', 'web.html'));
});

//Responses for Stylesheets 

app.get('/ui/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'style.css'));
});

app.get('/ui/css/normalize.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'normalize.css'));
});

//--------------------------------------

// Responses for images
app.get('/img/ico.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'ico.png'));
});

app.get('/ui/img/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'madi.png'));
});

app.get('/ui/img/back.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'back.jpg'));
});

app.get('/ui/img/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'fb.png'));
});

app.get('/ui/img/tw.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'tw.png'));
});

app.get('/ui/img/insta.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'insta.png'));
});

//-----------------------------

//Responses for script files

app.get('/ui/scripts/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/scripts', 'main.js'));
});

//-----------------------------



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
