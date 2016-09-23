
//when admin submit button pressed
exports.createAdminController = function (db) {
    return function (req,res) {
        
        // check to make sure admin user
        // if (req.session.userid == 17)

        // link id and to request
        if (req.body.inputAnswer != null && req.body.inputAnswer !== "") {
            db.query("UPDATE idea_requests SET answer = ? WHERE id = ?", [req.body.inputAnswer, req.body.id], function(err, results) {
                if (err) {
                    console.log(err);
                    res.renderWithLayout('admin', {adminInputErr : "Error submitting answer"});
                }
                // if open request, redirect to admin and display requests
                if (results.affectedRows > 0) {
                    res.redirect('/admin');
                } else { 
                    res.renderWithLayout('admin', {adminInputErr : "Error submitting answer"});
                }
            });
        } else {
            // bad request error message for submitting empty string 
            res.send(400);
        }
    };
};