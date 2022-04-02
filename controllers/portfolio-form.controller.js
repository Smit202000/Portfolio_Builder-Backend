const portfolioModel = require('../models/portfolio-form');

const createPortfolio = async (req, res) => {
    const pf = new portfolioModel(req.body);
    try{
        await pf.save();
        res.status(201).send(pf);
    } catch(error) {
        res.status(404).send(error);
    }
}

const getAllPortfolio = async (req, res) => {
    try {
        const portfolios = await portfolioModel.find({});
        if(portfolios) 
            return res.send(portfolios);
        res.status(404).send();
    } catch(error) {
        res.status(500).send(error);
    }
}

const getPortfolioById = async (req, res) => {
    try {
        const portfolio = await portfolioModel.findOne({ _id: req.params.id });
        if(portfolio) 
            return res.send(portfolio);
        res.status(404).send();
    } catch(error) {
        res.status(500).send(error);
    }
}

const updatePortfolio = async (req, res) => {
    try{
        const pf = await portfolioModel.findByIdAndUpdate( req.params.id , req.body, { new: true });
        await pf.save();
        res.send(pf);
    } catch(error) {
        res.status(404).send(error);
    }
}

const deletePortfolio = async (req, res) => {
    try{
        const pf = await portfolioModel.findByIdAndDelete(req.params.id);
        if(!pf) 
            return res.status(404).send();
        res.send(pf);
    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = { createPortfolio, getAllPortfolio, getPortfolioById, updatePortfolio, deletePortfolio }