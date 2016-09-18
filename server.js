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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/css/custom.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'custom.css'));
});

// Responses for images
app.get('/ui/img/prto.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'prto.jpg'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/img/jay.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'jay.png'));
});

app.get('/ui/img/angie.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'angie.png'));
});

app.get('/ui/img/nodestradamus.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'nodestradamus.png'));
});

app.get('/ui/img/geo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'geo.png'));
});

app.get('/ui/img/ecma.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'ecma.png'));
});

app.get('/ui/img/json.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'json.png'));
});

app.get('/ui/img/jumbo-bg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'jumbo-bg.jpg'));
});

// End of image responses



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
