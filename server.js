var express = require('express');
var fs = require('fs');
var app = express();
var mustacheExpress = require('mustache-express');
var mysql = require('mysql');
var loginC = require('./loginController.js');
var registerC = require('./registerController.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var submitC = require('./submitRequestController.js');
var logoffC = require('./logoffController.js');
var adminC = require('./adminController.js');


// // Use the browser's built-in functionality to quickly and safely escape
// // the string
// function escapeHtml(str) {
//     var div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
// }

// // UNSAFE with unsafe strings; only use on previously-escaped ones!
// function unescapeHtml(escapedStr) {
//     var div = document.createElement('div');
//     div.innerHTML = escapedStr;
//     var child = div.childNodes[0];
//     return child ? child.nodeValue : '';
// }


//conntect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "monopoly",
  database: "ponderbear"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

// render pages
app.engine('html', mustacheExpress());   
app.set('view engine', 'html');  

app.set('views', __dirname + '/public');

// Session middleware
app.use(session({
    secret: '%GGn!fly7y^WotDy7aG0rN', // just a long random string
    resave: false,
    saveUninitialized: true
}));


// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

/// Routes ////

app.use (function(req, res, next) {
    res.renderWithLayout = function(template, data) {
        if (data == null) {
            data = {};
        }
        if (req.session.userid != null) {
            data.loggedIn = true;
        } else {
            data.loggedIn = false;
        }
        res.render(template, data);
    }
    next();
})

// retrieve questions and answers from SQL
app.get('/requests', function(req, res){
    con.query('SELECT * FROM idea_requests WHERE user_id = ?;', [req.session.userid], function(err, rows){
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows);
        //res.render
        res.renderWithLayout('requests', {questions : rows.reverse()});
  });
});

app.get('/admin', function(req,res){
    // check if admin logged in (admin userID is 17)
    con.query('SELECT * FROM users WHERE username = ?', ["admin"], function(err, results) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.session.userid === results[0].id) {
            con.query('SELECT * FROM idea_requests WHERE answer IS NULL', function(err, results) {
                console.log(results);
                if (err) {
                    console.log(err);
                    res.renderWithLayout('admin', {adminErr : "Error retrieving request"});
                } else { 
                    res.renderWithLayout('admin', {questions : results});
                }
            });
        } else {
            res.renderWithLayout('admin', {restrictedAlert : "Restricted Access Only"});
        }
    });
});

// call login controller when login button pressed
app.post('/login', loginC.createLoginController(con));

// call register controller when register button pressed
app.post('/register', registerC.createRegisterController(con));

// call submit controller when submit button pressed
app.post('/submit', submitC.createSubmitRequestController(con));

// call logoff controller when logoff button pressed
app.post('/logoff', logoffC.createLogoffController(con));

// call a admin controller when answers submitted
app.post('/admin', adminC.createAdminController(con));
// emmaadmin3_4

app.get('/login', function(req, res) {
    res.renderWithLayout('login');
})

app.get('/register', function(req, res) {
    res.renderWithLayout('register');
})

app.get('/', function (req, res) {
    res.renderWithLayout('index');
});

// set static folder
app.use(express.static(__dirname + '/public')); 

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});