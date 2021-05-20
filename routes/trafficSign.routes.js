const express = require('express');
const traficSignController = require('../controller/trafficSign.controller');
const router = express.Router();
router.get('/', (req, res) => {traficSignController.find(req, res)});
router.get('/:id', (req, res) => {traficSignController.findById(req, res)});
module.exports = router;