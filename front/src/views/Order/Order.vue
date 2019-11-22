<template>
	<div id="Order">
		<header-bar title="订单"></header-bar>
		<div class="content">
			<p class="a-order border-bottom" @click="allOrder()">
				我的订单 <span class="o-btn">全部订单 <van-icon class="o-ic" name="arrow"></van-icon></span>
			</p>
			<div class="s-o-list">
				<div v-for="(item, index) in selectList" :key="index" :class="{active: index === status}">
					<div @click="changeStatus(item.status)">
						<span class="s-icon"> <van-icon :name="item.icon" /> </span> <br />
						<span>{{ item.title }}</span>
					</div>
				</div>
			</div>
			<p class="last-o">最近订单</p>

			<!-- v-for 展示最近订单  -->
			<scroll-box class="order-list">
				<div>
					<orderItem v-for="item in showList" :order="item" :key="item._id" @change="HandleChange"></orderItem>
				</div>
			</scroll-box>
		</div>
		<van-popup closeable v-model="isShow" position="left" :style="{width: '72%', height: '100%'}">
			<buyMenu v-model="isShow" :orderID="buyID" />
		</van-popup>
		<loading v-if="isLoading" type="spinner"></loading>
	</div>
</template>

<script>
	import buyMenu from './o-component/buyMenu';
	import orderItem from './o-component/order-item';
	import {Popup} from 'vant';
	export default {
		components: {
			orderItem,
			buyMenu,
			[Popup.name]: Popup,
		},
		data() {
			return {
				selectList: [
					{icon: 'peer-pay', title: '待付款', status: 0},
					{icon: 'play', title: '待定', status: 1},
					{icon: 'comment-o', title: '待评价', status: 2},
					{icon: 'replay', title: '售后', status: 3},
				],
				orderList: [],
				status: 'all',
				isShow: false,
				buyID: null,
			};
		},
		computed: {
			isLoading() {
				return this.$store.state.isLoading;
			},
			showList() {
				if (this.status === 'all') return this.orderList;
				else return this.orderList.filter(item => item.status === this.status);
			},
		},
		watch: {
			isShow() {
				if (!this.isShow) {
					this.refreshData();
				}
			},
		},
		methods: {
			async refreshData() {
				let result = await this.$store.dispatch('order/getOrderList');
				this.$store.commit('order/setOrderList', result.data);
				this.orderList = this.$store.state.order.orderList;
			},
			changeStatus(flag) {
				this.status = flag;
			},
			allOrder() {
				this.status = 'all';
			}, // test OK
			async testAdd() {
				let result = await this.$store.dispatch('order/addOrder', {});
				console.log(result);
			},
			async HandleChange(id, status) {
				if (status === 1) {
					// console.log('计算余额');
					this.buyID = id;
					this.isShow = true;
					return;
				} else if (status === 3) {
					this.buyID = id;
					this.$router.push({
						name: 'comment',
						params: {
							id: this.buyID,
						},
					});
					return;
				} else {
					let order = {
						id,
						change: status,
					};
					let result = await this.$store.dispatch('order/changeStatus', order);
					if (result.data.code === 0) {
						this.refreshData();
						this.$Toast('修改成功');
					}
				}
			}, // test OK
		},

		async created() {
			this.refreshData();
			this.$store.dispatch('mine/refreshData');
			this.list = this.$store.commit('get');
		},
	};
</script>

<style lang="scss" scoped>
	.content {
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
				vertical-align: middle;
			}
		}
	}
	.s-o-list {
		display: flex;
		justify-content: space-around;
		font-size: 12px;
		margin-top: 16px;
		padding-bottom: 16px;
		div {
			&.active {
				color: red;
			}
			display: inline-block;
			text-align: center;
			div .s-icon {
				font-size: 28px;
			}
		}
	}
	.last-o {
		font-size: 12px;
		padding: 8px;
		background: rgb(209, 209, 209);
		color: rgb(97, 97, 97);
	}
	.order-list {
		height: 425px;
	}
</style>
