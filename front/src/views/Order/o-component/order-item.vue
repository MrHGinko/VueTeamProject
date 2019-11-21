<template>
	<div id="order-item">
		<span class="pic"> <img :src="order.orderInfo[0].orderPicurl"> </span>
		<div class="info">
			<p class="i-title">
				<!-- {{ order.orderName }} -->
				<span
					v-for="(item, index) in order.orderInfo"
					:key="index"
				>
					{{ item.orderName }}  <span v-if="index < order.orderInfo.length-1"> || </span>
				</span>
			</p>
			<p class="i-date">{{ getDate(order.orderDate) }}</p>
			<p>订单号：{{ order._id }}</p>
			<p>店名：{{ order.shopName }}</p>
			<p>
				总价：{{ order.price }}
				<button
					class="act"
					:class="statusClass"
					@click="
						change(
							order._id,
							order.status + 1,
						)
					"
				>
					{{ btnTxt[order.status] }}
				</button>
			</p>
		</div>
		<!-- {{order.orderInfo.orderName}}
		{{order.orderType}}
		{{order.orderInfo.orderID}}
		{{order.price}}
		{{order._id}}
		{{getDate(order.orderDate)}} -->
	</div>
</template>

<script>
	export default {
		props: {
			order: Object,
		},
		data() {
			return {
				btnTxt: [
					'去付款',
					'现在使用',
					'去评价',
					'售后申请',
				],
			};
		},
		computed: {
			statusClass() {
				return `s${this.order.status}`;
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
			change(id, status) {
				// console.log(id, status);
				if (status < 4) {
					this.$emit('change', id, status);
					// 包括 评价页面, 售后页面,
				} else {
					console.log('去评价页面');
				}
			},
		},
		created() {
			
		},
	};
</script>

<style lang="scss" scoped>
	#order-item {
		width: 100;
		box-sizing: border-box;
		padding: 8px;
		font-size: 12px;
		display: flex;
		border-bottom: 2px solid rgb(196, 196, 196);
		.pic {
			display: flex;
			color: white;
			align-items: center;
			img {
				height: 60px;
				vertical-align: middle;
				transform: translateY(50%);
				margin-top : -50%;
			}
		}
		.info {
			flex: 1;
			padding: 0 8px;
			p {
				line-height: 18px;
				&.i-title {
					width: 270px;
					font-size: 14px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				&.i-date {
					font-size: 10px;
					color: rgb(184, 184, 184);
					text-align: right;
				}
				.act {
					float: right;
					border: none;
					border-radius: 4px;
					box-shadow: 1px 1px 5px black;
				}
				.s0 {
					background-color: rgb(48, 248, 255);
				}
				.s1 {
					background: rgb(255, 196, 33);
				}
				.s2 {
					background: rgb(255, 39, 129);
				}
				.s3 {
					background: rgb(46, 255, 192);
				}
			}
		}
	}
</style>
