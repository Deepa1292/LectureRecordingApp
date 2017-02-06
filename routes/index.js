var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var username = 'not logged in';
    if(!req.session.authenticatedUser) {
        console.log("weird");
        console.dir(req.session);
    }
    else {
        var user = {};
        user.tuid = req.session.authenticatedUser.id;
        user.givenname = req.session.authenticatedUser.givenname;
        user.surname = req.session.authenticatedUser.surname;
        user.mail = req.session.authenticatedUser.mail;
        user.usercontext = req.session.authenticatedUser.usercontext;
    }
    // Provide data for rendering the page
    res.render('index', { title: 'TUD Login Demo', user: user });
});

module.exports = router;