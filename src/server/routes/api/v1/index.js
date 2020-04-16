const express = require('express');
const pingRouter = require('./ping');

const router = express.Router();

router.use('/ping', pingRouter);

module.exports = router;
