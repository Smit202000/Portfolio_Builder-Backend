const log = console.log;
const express = require('express');

const { createPortfolio, getAllPortfolio, getPortfolioById, updatePortfolio, deletePortfolio } = require('../controllers/portfolio-form.controller');
const userModel = require('../models/user');
const portfolioModel = require('../models/portfolio-form');

const router = new express.Router();

router.post('/portfolio', createPortfolio);

router.get('/portfolio', getAllPortfolio);

router.get('/portfolio/:id', getPortfolioById);

router.patch('/portfolio/:id', updatePortfolio);

router.delete('/portfolio/:id', deletePortfolio);

module.exports = router 