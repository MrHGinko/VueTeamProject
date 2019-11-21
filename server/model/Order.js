const mongoose = require("mongoose");

const Order = mongoose.model(
        "order",
        new mongoose.Schema({
                user: {
                        type: mongoose.SchemaTypes.ObjectId,
                        ref: "user"
		},
		shopName: {
			type: String,
		},
		orderInfo: {
			type: Array, 
			// orderID: {
			// 	type:String,
			// 	required: true
			// 	// orderID 为 外卖ID 或 电影ID
			// }, 
			// orderName: {
			// 	type: String,
			// 	required: true
			// },
		},
		orderType: {
			type: String,
			required: true,
			// 订单type 组员分别实现的是外卖与电影,
			// type 从 food 和 film 中 2选一
		},
                price: {
                        type: Number
		},
		orderDate: {
                        type: Date,
			default: new Date().getTime(),
		},
		status: {
			type: Number,
			default: 0
			// order状态
			// 0 1 2 3 
		},
		// address 待实现地址数据库
        })
);

module.exports.add = async (
	user,
	// orderID,
	// orderName,
	shopName,
	orderInfo,
	orderType,
	price,
) => {
	let order = new Order({
		user,
		shopName,
		orderInfo,
		orderType,
		price
	});
	return await order.save(); //保存到数据库
}

module.exports.find = async userid => {
	return await Order.find({user: userid});
}

module.exports.changeStatus = async (id, change) => {
	// id 为数据库订单id
	return await Order.findByIdAndUpdate(id, {status: change});
}