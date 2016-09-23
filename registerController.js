var passwordHash = require('password-hash');


// when register button pressed
exports.createRegisterController = function(db) {
    return function (req, res) {
        
        // validate submission
        if (req.body.username == "")
        {
            // print username error message
            res.renderWithLayout('register', {usernameErr : "You must provide a username."});
        }
        else if (req.body.password == "")
        {
            // print password error message
            res.renderWithLayout('register', {passwordErr : "You must provide a password."});
        }
        else if (req.body.confirmation !== req.body.password)
        {
            // print confirm password error message
            res.renderWithLayout('register', {rPasswordErr : "Passwords do not match."});
        }

        else if (req.body.checkbox != true) {
            // print check terms and conditions
            console.log(req.body);
            res.renderWithLayout('register', {checkboxErr : "You must agree to terms and conditions to register."})
        }
        else 
        {
            // else check database for username
            db.query("INSERT IGNORE into users (username, hash) VALUES (?, ?)", [req.body.username, passwordHash.generate(req.body.password)], function(err, results) {
                if (err) {
                    console.log(err);
                    res.renderWithLayout('register', {regFailErr : "Error.. Registration failed."});
                }
                // if didn't exist, new user was added 
                if (results.affectedRows > 0)
                {
                    // get new User ID
                    db.query("SELECT id FROM users WHERE username = ? AS idResult", [req.body.username], function(err,results)
                    {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(results);
                        var id = results[0].idResult;

                        // remember that user's now logged in by storing user's ID in session
                        req.session.userid = id;

                        // redirect to requests.html
                        res.redirect ('requests');
                    });

                }
                else 
                {
                     // Alert if username already exists
                    res.renderWithLayout('register', {rRegFailErr : "Registration failed. Try using different Username."});
                }
            });
        }
    };
};