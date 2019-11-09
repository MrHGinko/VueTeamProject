const express = require('express')

const router = new express.Router();

router.get('/food_index', (req, res)=> {
	console.log(res.pathname);
	res.json(require("../data/food/index-list.json"));
})

router.get('/find_list', (req, res)=> {
	console.log(res.pathname);
	res.json(require("../data/food/find-list.json"));
})

router.get('/restautant_list', (req, res)=> {
	console.log(res.pathname);
	res.json(require("../data/food/restaurant-list.json"));
})

router.get('/seller', (req, res)=> {
	console.log(res.pathname);
	res.json(require("../data/food/seller.json"));
})


module.exports = router