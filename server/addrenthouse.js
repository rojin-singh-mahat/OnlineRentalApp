const express = require('express');
const router = express.Router();
const adminAuthentication = require("../middelware/adminAuthentication");

const Renthouse = require('../models/renthouseSchema');

const multer = require("multer");

const upload = multer({ dest: 'uploads/'});

module.exports = router.post('/addrenthouses', adminAuthentication, upload.single("myrentfile"), async(req , res, next) =>{
    try{
        const data = new Renthouse({
            type: req.body.type,
            price : req.body.price,
            rent : req.body.rent,
            fileName : req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize : req.file.size,   
        });
        await data.save();
        res.status(201).send("data uploaded sucessfully")
    } catch (error) {
        res.status(400).send(error.message);

    }
})





