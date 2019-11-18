const express = require('express')
const UserInfo = require('../model/UserInfo')
const router = new express.Router();


router.get("/get_info",async (req,res) => {
	let result = await UserInfo.find(req.session.userInfo.tel);
	res.json({
		code: 0,
		message: 'OK',
		data: result,
	})
})

router.post('/change_info',async (req, res) => {
	let options = req.body;
	
	let result = await UserInfo.change(req.session.userInfo.tel, options);
	res.json({
		code: 0,
		message: 'OK',
		data: result
	})
	
})

module.exports = router;