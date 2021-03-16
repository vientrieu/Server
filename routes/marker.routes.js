const express = require('express');
const router = express.Router();
const markerController = require('../controller/marker.controller');
router.get('/', (req, res) => {markerController.find(req, res)});
router.post('/', (req, res) => {markerController.save(req, res)});
module.exports = router;