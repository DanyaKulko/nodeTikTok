const express = require('express');
const router = express.Router();
global.request = require('request');
global.axios = require('axios');


const get_testing = require("./get_testing");
const post_testing = require("./post_testing");

router.get('/testing', (req, res, next) => {get_testing(req, res);});
router.post('/testing', (req, res, next) => {post_testing(req, res);});

module.exports = router;
