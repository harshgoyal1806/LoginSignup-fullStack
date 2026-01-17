const express = require("express");
const ensureAuthenticated = require("../MiddleWares/Auth")
const router =express.Router();

router.get("/",ensureAuthenticated,(req,res)=>{
    res.status(200)
    .json([
        {
            name:"moblie",
            price:10000
        },
        {
            name:"tv",
            price:20000
        }
    ])
})

module.exports = router;