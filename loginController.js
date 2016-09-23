var passwordHash = require('password-hash');

exports.createLoginController = function (db) {
    return function (req, res) {
        // when login button pressed
        // validate submission
        if (req.body.username == "")
        {
            // print username error message
            res.renderWithLayout('login', {usernameErr : "You must provide a username."});
        }
        else if (req.body.password == "")
        {
            // print password error message
            res.renderWithLayout('login', {passwordErr : "You must provide a password."});
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
                console.log(results)
                
                // if exists, verify password
                if (results.length > 0 && passwordHash.verify(req.body.password, results[0].hash))
                {
                     // remember that user's now logged in by storing user's ID in session
                    req.session.userid = results[0].id;

                    // redirect to requests.html
                    res.redirect ('requests');
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
