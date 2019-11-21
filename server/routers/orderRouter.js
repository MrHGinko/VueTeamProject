const express = require('express');
const Order = require('../model/Order');
const router = new express.Router();

router.post('/newOrder', (req,res) => {
	// req.body.orderID, req.body.orderName
	// orderInfo为对象数组 暂时存ID 和 Name 
	let result = Order.add(req.session.userInfo._id, req.body.shopName, req.body.orderInfo, req.body.orderType, req.body.price);
	res.json({
		code: 0,
		message: 'OK',
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
	})
})

module.exports = router;