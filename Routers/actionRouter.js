const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel');

router.use(express.json());




module.exports = router;