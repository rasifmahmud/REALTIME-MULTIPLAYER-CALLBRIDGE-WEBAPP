/**
 * Created by razon on 11/8/16.
 */
var express = require('express');
var router = express.Router();
module.exports = router;


// routing to the dashboard
router.route('/')
    .get(function (req, res) {
        res.render('HomePage');

    });
// routing to the dashboard
router.route('/play')
    .get(function (req, res) {
        res.render('CallTheMotherFuckerBridge');

    });
