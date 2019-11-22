<template>
	<div id="buymenu">
		<div class="infoBox">
			<p>
				<van-swipe class="i-timg" :autoplay="3000" indicator-color="#ff9924">
					<van-swipe-item v-for="(item, index) in order.orderInfo" :key="index">
						<img class="info-img" :src="item.orderPicurl" />
					</van-swipe-item>
				</van-swipe>
				<span class="i-name" v-for="(item, index) in order.orderInfo" :key="index">
					<!-- {{ order.orderName }} -->
					{{ item.orderName }} <br />
				</span>
			</p>
			<p class="i-id">
				<span v-if="order.orderType == 'Food'">店铺名称</span>
				<span v-else-if="order.orderType == 'Film'">电影院名称</span><br />
				{{ order.shopName }}
				<br />
				<br />
				订单编号 <br />
				{{ order._id }}
				<br /><br />
				创建时间 <br />
				{{ getDate(order.orderDate) }}
			</p>
			<p>
				<button class="btn" @click="p = topay(order._id, order.status + 1)">
					付款
				</button>
			</p>

			<p class="i-pay border-bottom">
				您应付款:
				<span class="price"> {{ order.price }} </span>
			</p>
			<p class="i-balance border-bottom">
				余额:
				<span :class="active">
					{{ $store.state.mine.userInfo.balance }}
				</span>
			</p>
		</div>
		<loading v-if="isLoading" type="spinner"></loading>
	</div>
</template>

<script>
	import {Swipe, SwipeItem} from 'vant';
	export default {
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
		},
		props: {
			orderID: String,
			value: Boolean,
		},
		data() {
			return {
				order: {},
				can: false,
			};
		},
		watch: {
			value() {
				// 根据传入的orderID 拿取已保存在vuex中list中的点击的订单
				if (this.value) {
					this.$store.state.order.orderList.forEach(item => {
						if (item._id === this.orderID) {
							this.order = item;
							console.log(this.order);
						}
					});
				}
				// 避免false后仍然触发, 优化
			},
		},
		computed: {
			isLoading() {
				return this.$store.state.isLoading;
			},
			active() {
				if (this.order.price <= this.$store.state.mine.userInfo.balance) {
					this.can = true;
					return 'balance-ok';
				} else {
					this.can = false;
					return 'balance-fail';
				}
			},
		},
		methods: {
			getDate(orderDate) {
				let date = new Date(orderDate);
				let time =
					date.getHours() +
					' : ' +
					date.getMinutes() +
					' ' +
					date.getFullYear() +
					'-' +
					(date.getMonth() + 1) +
					'-' +
					(date.getDate() + 1);
				return time;
			},
			async topay(id, change) {
				console.log(id, change, this.can);
				this.$store.commit('setLoading', true);
				if (this.can) {
					//可以付款, 余额大于应付款金额
					// 修改金额 修改积分
					let result = await this.$store.dispatch('mine/userChangeInfo', {
						balance: Number(this.$store.state.mine.userInfo.balance - this.order.price),
						point: Number(this.$store.state.mine.userInfo.point + this.order.price),
					});
					//重新获取状态
					let fresh = await this.$store.dispatch('mine/userGetInfo');
					this.$store.commit('mine/setUserInfo', fresh.data[0]);

					if (this.gopay(id, change)) {
						this.$Toast('付款成功');
						this.$store.commit('setLoading', false);
						this.$emit('input', false);
					} else {
						this.$Toast('发生未知错误');
						this.$store.commit('setLoading', false);
						this.$emit('input', false);
					}
				} else {
					this.$Toast('您的余额不足');
					this.$store.commit('setLoading', false);
					this.$emit('input', false);
				}
			},
			async gopay(id, status) {
				let order = {
					id,
					change: status,
				};
				let result = await this.$store.dispatch('order/changeStatus', order);
				if (result.data.code === 0) {
					let result = await this.$store.dispatch('order/getOrderList');
					this.orderList = result.data;
					return true;
				} else return false;
			},
		},
		created() {
			console.log(1);
			// 创建后第一次触发value(赋值为真)  不然第一次点击order没法立即获取值
			this.value = 1;
		},
	};
</script>

<style lang="scss" scoped>
	#buymenu {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 54px 8px;
		font-size: 14px;
		.info-img {
			width: 200px;
			border: 1px solid rgb(221, 221, 221);
		}
		.infoBox {
			.i-id {
				color: rgb(139, 139, 139);
				font-size: 12px;
			}
			.i-pay {
				color: rgb(139, 139, 139);
				padding: 8px;
				.price {
					font-size: 18px;
					color: rgb(255, 99, 51);
				}
			}
			.i-balance {
				color: rgb(139, 139, 139);
				padding: 8px;
				.balance-ok {
					font-size: 18px;
					color: rgb(5, 92, 255);
				}
				.balance-fail {
					font-size: 18px;
					color: rgb(255, 51, 51);
				}
			}
			p {
				text-align: center;
				margin-bottom: 16px;
				.i-timg {
					padding-left: 28px;
					padding-bottom: 16px;
				}
				.i-img {
					display: inline-block;
					width: 64px;
					height: 104px;
					vertical-align: middle;
					background: rgb(201, 201, 201);
					margin-bottom: 8px;
				}
				.i-name {
					font-size: 18px;
					font-weight: bold;
				}
				.btn {
					border: none;
					background: rgb(255, 153, 36);
					width: 100%;
					padding: 8px 0;
					margin-top: 8px;
					border-radius: 8px;
					color: rgb(255, 255, 255);
				}
			}
		}
	}
</style>
