const log = console.log;
const express = require('express');

const {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioByUsername,
} = require('../controllers/portfolioForm.controller');

const auth = require('../middlewares/auth');

const router = new express.Router();

router.post('/portfolio', auth, createPortfolio);

router.get('/portfolio', auth, getPortfolioByUsername);

router.patch('/portfolio', auth, updatePortfolio);

router.delete('/portfolio', auth, deletePortfolio);

module.exports = router;
