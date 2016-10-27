var passwordHash = require('password-hash');
var submitReq = require('./submitRequestFunction.js');

exports.createLoginController = function (db) {
    return function (req, res) {
        // when login button pressed
        // validate submission
        if (req.body.username === "")
        {
            // print username error message
            res.renderWithLayout('login', {usernameErr : "You must provide a username."});
        }
        else if (req.body.password === "")
        {
            // print password error message
            res.renderWithLayout('login', {passwordErr : "You must provide a password."});
        }
        else if (!req.body.password.match(/^[-a-zA-Z0-9_@*#&%!\.]+$/)) {
            res.renderWithLayout('login', {loginFailErr :  "Incorrect username and / or password."})
        }
        else if (!req.body.username.match(/^[-a-zA-Z0-9_]+$/)) {
            res.renderWithLayout('login', {loginFailErr :  "Incorrect username and / or password."})
        }
        else
        {
            // else check database for username
            db.query("SELECT * FROM users WHERE username = ?", [req.body.username], function(err, results) {
                if (err) {
                    console.log(err);
                    res.renderWithLayout('login', {regFailErr : "Error.. Login failed."});
                    return;
                }

                // if exists, verify password
                if (results.length > 0 && passwordHash.verify(req.body.password, results[0].hash))
                {
                     // remember that user's now logged in by storing user's ID in session
                    req.session.userid = results[0].id;

                    // check if request submitted and add this
                    if (req.session.request != null && req.session.request !== "") {
                        submitReq(req.session.request, req.session.userid, db, res);
                    }

                    else { 
                        // redirect to requests.html
                        res.redirect ('requests');
                    }
                 }
                else 
                {
                     // Alert if username already exists
                     res.renderWithLayout('login', {loginFailErr : "Incorrect username and / or password."});
                }
            });
        }
    }
}
