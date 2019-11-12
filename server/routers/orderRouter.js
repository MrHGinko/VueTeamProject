const express = require('express');
const Order = require('../model/Order');
const router = new express.Router();

router.post('/newOrder', (req,res) => {
	let result = Order.add(req.session.userInfo._id, req.body.orderID, req.body.orderName, req.body.orderType, req.body.price);
	res.json({
		code: 0,
		message: 'OK',
		data: result
	})
})

router.get('/orderlist',async (req,res) => {
	let result = await Order.find(req.session.userInfo._id);
	res.json({
		code: 0,
		message: 'OK',
		data: result
	})
});

router.post('/change_status', async (req, res) => {
	let {id, change} = req.body;
	let result = await Order.changeStatus(id, change);
	res.json({
		code: 0,
		message: 'OK',
		data: result
	})
})

module.exports = router;