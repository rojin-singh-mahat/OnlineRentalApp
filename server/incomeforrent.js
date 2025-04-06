const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Renthouseincome = require('../models/rentHouseIncomeSchema');

module.exports = router.get('/getrenthouseincome',adminAuthentication, async(req, res) =>{
    const allIncomes = await Renthouseincome.find();

    console.log(allIncomes);
    try{

        res.status(200).send(allIncomes);

    }catch(error){
        res.status(400).send(error.message);
    }
});