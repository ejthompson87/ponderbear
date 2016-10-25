
module.exports = function submitRequest(question, userID, db, res) {
    // check if already logged in
    if (!question.match(/^[-a-zA-Z0-9_@\*#&%!,'"\.\s\?\$]+$/)) {
        res.renderWithLayout('index', {requestErr : "Illegal charactors used."});
        return;
    }
    else if (question.length > 200) {
        res.renderWithLayout('index', {requestErr : "Please limit request to 200 characters."})
    }
    else {
        db.query("INSERT into idea_requests (user_id, question) VALUES (?, ?)", [userID, question], function(err, results) {
            if (err) {
                console.log(err);
                res.renderWithLayout('requests', {requestErr : "Error submitting request"});
                return;
            }
            // if didn't exist, new user was added 
            if (results.affectedRows > 0) {
                res.redirect ('requests');
                return;
            }
            else { 
                res.renderWithLayout('requests', {requestErr : "Error submitting request"});
                return;
            }
        });
    }
}