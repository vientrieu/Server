const express = require('express');
const router = express.Router();
const pointController = require('../controller/point.controller');
router.get('/', (req, res) => {pointController.find(req, res)});
router.post('/', (req, res) => {pointController.save(req, res)});
module.exports = router;