const express = require('express');
const router = express.Router();
const generationController = require('../controller/generation.controller');
router.get('/category', (req, res) => {generationController.genCategory(req, res)});
router.get('/traffic-sign', (req, res) => {generationController.genTrifficSign(req, res)});
router.get('/marker', (req, res) => {generationController.genMarker(req, res)});
// router.post('/', (req, res) => {pointController.save(req, res)});
module.exports = router;