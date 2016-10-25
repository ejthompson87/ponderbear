var submitReq = require('./submitRequestFunction.js');

//when submit request button pressed
exports.createSubmitRequestController = function (db) {
    return function (req,res) {
        // check if already logged in
        if (req.session.userid != null) {
            submitReq(req.body.idea, req.session.userid, db, res);
        } else {
            // store request into session
            req.session.request = req.body.idea;

            // redirect to login page 
            res.redirect ('login');
        }
    }
}