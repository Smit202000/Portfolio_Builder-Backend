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

router.post('', auth, createPortfolio);

router.get('', auth, getPortfolioByUsername);

router.patch('', auth, updatePortfolio);

router.delete('', auth, deletePortfolio);

module.exports = router;
