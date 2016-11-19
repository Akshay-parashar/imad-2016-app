//Todo: Remove redundant code !!!

// Libraries used
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyparser = require('body-parser');
var session = require('express-session');

var congif = {
  user: 'akshay-parashar',
  database: 'akshay-parashar',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(session({
  secret: 'someRandomValue',
  cookie: { maxAge: 1000* 60 * 60 * 24 * 30 }
}));


//-------------------------

// Registering Static Files
app.use(express.static('img'));
app.use(express.static('css'));

//---------------------------

//General Files
function createTemplate(data){
    var heading = data.title;
    var date = data.date;
    var content = data.content;
    var blogtemp =  `<div class="post"> 
                        <h3 class="post_heading"><a href='/article/${heading}'>${heading}</a></h3>
                        <span class="post_date" id="bg_date">${date.toDateString()}</span><span class="post_comments"># Comments</span>
                        <p></p>
                        <a href="#" class="read">Read more</a>
                        <hr>
                  </div>` ;
      return blogtemp;
}

function createArticleTemplate(article) {
  var heading = article.title;
  var date = article.date;
  var author = article.author_id;
  var content = article.content;
  var arttemp = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Article Template</title>
    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="/ui/css/normalize.css" rel="stylesheet"/>
    <link href="/ui/css/style.css" rel="stylesheet"/>
    <link rel="icon" href="/img/ico.png">

</head>
<body>
  <div class="wrap">
    <header class="main-header">
                <div class="containerr clearfix">
                    <h1 class="name"><a href="#">Personal Blog</a></h1>
                    <ul class="main-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#login_pg" id="login">Login</a></li>
                        <li><a href="#signup_pg" id="sign_up">Sign Up</a></li>
                        <li><a href="#logout" id="logout">Logout</a></li>
                    </ul>
                </div>
            </header><!--main-header-->

            <div class="banner">
                <div class="banner_bg_art"></div>
                <div class="banner_content">
                    <h1 class="headline">${heading}</h1>
                    
                </div>
            </div>


        <div class="name_art_wrap containerr" >
          <div class="name_art_cont">
            <p>${heading}</p>
            <p>${date}</p>
            <p>${author}</p>
            <p>${content}</p>
          </div>

          <hr>

          <h2>Comments </h2>

          <div class="comment_form" id="comment_form">
          </div>

          <div id="comments">
          </div>

        </div>    


  </div>

  <footer class="main-footer">
        <span>&copy; Akshay Parashar | 2016. Thanks For Stopping By.</span>
    </footer>
    <script type="text/javascript" src="/ui/scripts/jquery.js"></script><!-- Jquery -->
   
    <script type="text/javascript" src="/ui/scripts/article.js"></script><!--article JS -->
</body>
</html>`;
  return arttemp;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});

app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.html'));
});


var counter = 0;
app.get('/counter',function(req,res){
  counter = counter + 1;
  res.send(counter.toString());
});


 //make a connection pool
 var pool = new Pool(congif);
 var allpost = '';
 var i;
app.get('/fetch_blog_posts', function(req,res){
   
    //make a select query 
    pool.query('SELECT * FROM article order by date DESC', function(err,result){
      if (err) {
          res.status(500).send(err.toString());
      }
      else{
        allpost = '';
        //res.send(JSON.stringify(result));
        //We will be recieving multiple articles from the database
        for(i=0; i < result.rowCount; i++){
          allpost = allpost + createTemplate(result.rows[i]);
        }
        //allpost = [allpost,result.rowCount.toString()].join('$');
        res.send(allpost);
      }
    });
});

//To recieve full article with particular content from database

app.get('/article/:articleName', function(req,res){ 

  pool.query("Select * from article where title = $1", [req.params.articleName] ,function(err,result){
     if(err){
          res.status(500).send(err.toString());
         // console.log("Error situation in db most probab in query")
        }
      else {
        if(result.rows.length == 0){
            res.status(404).send("Article Not Found");
          }
          else{
            articleData = result.rows[0];
            console.log(articleData);
            res.send(createArticleTemplate(articleData));
          }
      }
  });
});





function hash(input,salt){
  var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
  return ['pbkdf2',1000,salt,hashed.toString('hex')].join('$');
}

var salted = 'some random string';

//Enpoint for just testing hash
app.get('/hash/:input',function(req,res){
  var hashedString = hash(req.params.input,salted);
  res.send(hashedString);
});

app.post('/create_user',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var salt = crypto.randomBytes(128).toString('hex');
  var dbstring = hash(password,salt);
  pool.query('INSERT INTO users (username,password) VALUES ($1,$2)',[username,dbstring],function(err,result){
       if (err) {
          res.status(500).send(err.toString());
      }
      else {
        res.send('User created successfully! :' + username);
      }
  });
});

app.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  pool.query('Select * from users where username = $1',[username],function(err,result){
       if (err) {
          res.status(500).send(err.toString());
      }
      else {
          if(result.rows.length == 0){
            res.status(403).send('username is invalid');     
          }
          else{
            //Username matched now match the password
            var dbstring = result.rows[0].password;
            var salt = dbstring.split('$')[2];
            var hashpass = hash(password,salt); //Hash based on the currently submitted password
            if(hashpass == dbstring){
              //Setting up Session 
              req.session.auth = {userId: result.rows[0].id };
              res.send("Credentials Correct,Logged in as: " + username);
            }
            else{
              res.status(403).send('username/password are invalid');     
            }
          }
      }
  });
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
      //res.send("You are logged in: " + req.session.auth.userId.toString());
      res.send('Account_User');
    }
    else{
      res.send('Guest');
    }
});

app.get('/logout',function(req,res){
  delete req.session.auth;
  res.send('Logged Out!!');
});
//------------------------------------

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

app.get('/ui/img/aboutme.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'aboutme.jpg'));
});

app.get('/ui/img/contactus.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'contactus.jpg'));
});

app.get('/ui/img/letter.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'letter.jpg'));
});

//-----------------------------

//Responses for script files

app.get('/ui/scripts/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/scripts', 'main.js'));
});

app.get('/ui/scripts/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/scripts', 'jquery.js'));
});

app.get('/ui/scripts/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/scripts', 'article.js'));
});
//-----------------------------

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
