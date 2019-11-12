<template>
<div id="Order">
	<header-bar title="订单"></header-bar>
	<scroll-box class="content">
		<p class="a-order border-bottom">我的订单 <span class="o-btn">全部订单 <van-icon class="o-ic" name="arrow"></van-icon></span></p>
		<div class="s-o-list">
			<div v-for="(item,index) in selectList" :key="index">
				<router-link  :to="item.path">
					<span class="s-icon"> <van-icon :name="item.icon" /> </span> <br>
					<span>{{item.title}}</span>
				</router-link>
			</div>
		</div>
		<p class="last-o">最近订单</p>

		<!-- v-for 展示最近订单  -->
		<div class="order-list">
			<button @click="tao()" >新增</button>
			<button @click="tfl()" >查询</button>
			<button @click="tcs()" >修改状态</button>
		</div>
	
	</scroll-box>
		
</div>
</template>

<script>
import orderItem from './o-component/order-item'
export default {
	components: {
		orderItem,
	},
	data() {
		return {
			selectList: [
				{icon: 'peer-pay', title: '待付款', path: '#'},
				{icon: 'play', title: '待使用', path: '#'},
				{icon: 'comment-o', title: '待评价', path: '#'},
				{icon: 'replay', title: '售后', path: '#'},
			],
			orderList: [],
		}
	},
	methods: {
		async tfl() {
			let result = await this.$store.dispatch('order/getOrderList');
			console.log(result);
		},  // test OK
		async tao() {
			let result = await this.$store.dispatch('order/addOrder', [
				'F98', 'Loving Vincent', 'film', 98.02
			])
		},  // test OK 5dcaa8995b939504b8ec5ebd
		async tcs(ID, status) {
			let order = {
				id : "5dcaa8995b939504b8ec5ebd",
				change: 99
			};
			let result = await this.$store.dispatch('order/changeStatus', order);
			console.log(result);
		}  // test OK
	},

	created() {
		// 请求订单 All
		
	}
}
</script>

<style lang="scss" scoped>
.content {
	position: absolute;
	top: 48px;
}
.a-order {
	
	font-size: 12px;
	line-height: 24px;
	box-sizing: border-box;
	padding: 8px 16px;
	.o-btn {
		font-size: 10px;
		float: right;
		color: rgb(175, 175, 175);
		.o-ic {
			vertical-align: middle
		}
	}
}
.s-o-list {
	display:flex;
	justify-content: space-around;
	font-size: 12px;
	margin-top: 16px;
	padding-bottom : 16px;
	div{
		display: inline-block;
		text-align: center;
		a .s-icon {
			font-size: 28px;
		}
	}
}
.last-o {
	font-size: 12px;
	padding: 8px;
	background: rgb(209, 209, 209);
	color: rgb(97, 97, 97)
}
</style>