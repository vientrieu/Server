const express = require('express');
const categoryController = require('../controller/category.controller');
const router = express.Router();
router.get('/', (req, res) => {categoryController.find(req, res)});
router.get('/:id', (req, res) => {categoryController.findById(req, res)});
module.exports = router;