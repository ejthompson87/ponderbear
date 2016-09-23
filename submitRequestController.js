
//when submit request button pressed
exports.createSubmitRequestController = function (db) {
    return function (req,res) {
        // check if already logged in
        if (req.session.userid != null) {
            db.query("INSERT into idea_requests (user_id, question) VALUES (?, ?)", [req.session.userid, req.body.idea], function(err, results) {
                if (err) {
                    console.log(err);
                    res.renderWithLayout('requests', {requestErr : "Error submitting request"});
                }
                // if didn't exist, new user was added 
                if (results.affectedRows > 0) {
                    res.redirect ('requests');
                }
                else { 
                    res.renderWithLayout('requests', {requestErr : "Error submitting request"});
                }
            });
        }
        else {
            // store request into session
            req.session.request = req.body.idea;

            // redirect to login page 
            res.redirect ('login');
        }
    }
}