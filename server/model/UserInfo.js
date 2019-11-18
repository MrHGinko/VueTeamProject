const mongoose = require('mongoose')

const UserInfo = mongoose.model(
	'userInfo',
	new mongoose.Schema({
		tel: {
			type: String,
		},
		nickName: {
			type: String
		},
		balance: {
			type: Number,
			default: 0.00
		},
		point: {
			type: Number,
			default: 0
		},
		// 评价 评论等
	})
);

module.exports.add = async (tel, nickName) => {
	let userInfo = new UserInfo({tel, nickName});
	return await userInfo.save();
}

module.exports.find = async tel => {
	return await UserInfo.find({tel});
}

module.exports.change = async (tel, options) => {
	
	Object.entries(options).forEach(async ([key, value]) => {
		switch(key) {
			case 'nickName': await UserInfo.findOneAndUpdate({tel}, {nickName: value}); break;
			case 'balance': await UserInfo.findOneAndUpdate({tel}, {balance: value}); break;
			case 'point': await UserInfo.findOneAndUpdate({tel}, {point: value}); break;
			default: break;
		}
	})

	return 'OK';
}