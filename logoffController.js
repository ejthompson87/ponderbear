
// if logoff button is pressed
exports.createLogoffController = function (db) {
    return function (req, res) {
        // set session to null
        req.session.userid = null;
        req.session.request = null;

        // redirect to login
        res.redirect ('/login');
    }
}