<template>
	<div class="pay">
		<header class="header" ref="header">
			提交订单
			<i
				class="iconfont iconarrow-right"
				@click="backAction"
			></i>
		</header>
		<content id="content">
			<div class="content">
				<p class="shopName">
					{{ this.ShopInfo.shopName }}
					<i class="iconfont iconarrow-left"></i>
				</p>
				<div
					class="shopInfo"
					v-for="(item, index) in commodities"
					:key="index"
				>
					<img
						:src="`${item.littleImageUrl}`"
						alt=""
					/>
					<p class="title">{{ item.spuName }}</p>
					<span class="quantity">{{
						item.saleVolume
					}}</span>
					<span class="price"
						>￥{{ item.currentPrice }}</span
					>
				</div>
				<div
					class="dispatchPrice iconfont"
					v-html="this.ShopInfo.shippingFeeTip"
				></div>
			</div>
		</content>
		<footer class="footer">
			<span class="totalPrice">￥{{ totalPrice }}</span>
			<span class="discountsPrice"
				>| 已优惠￥{{ discountsPrice }}</span
			>
			<div class="submitOrder" @click="submitOrder">
				提交订单
			</div>
		</footer>
	</div>
</template>

<script>
	import Content from '../lib/Content';
	export default {
		data() {
			return {
				commodities: [],
				ShopInfo: [],
			};
		},
		components: {
			Content,
		},
		computed: {
			totalPrice() {
				let totalPrice = 0;
				this.commodities.forEach(item => {
					totalPrice +=
						item.saleVolume *
						item.currentPrice;
				});
				return totalPrice;
			},
			discountsPrice() {
				let discountsPrice = 0;
				this.commodities.forEach(item => {
					discountsPrice +=
						item.saleVolume *
						(item.originPrice -
							item.currentPrice);
				});
				return discountsPrice;
			},
		},
		methods: {
			backAction() {
				history.back();
			},
			async submitOrder() {
				let allInfo = [];
				this.commodities.forEach((item, index) => {
					allInfo[index] = {
						orderPicurl: item.bigImageUrl,
						orderName: item.spuName,
						currentPrice: item.currentPrice,
						orderCount: item.saleVolume,
					};
				});
				// this.$store.
				let info = {
					shopName: this.ShopInfo.shopName,
					orderType: 'Food',
					price: this.totalPrice,
					orderInfo: allInfo,
				};
				this.$store.commit(
					'shoppingCart/setInfo',
					info,
				);

				console.log(info);

				let result = await this.$store.dispatch(
					'order/addOrder',
					info,
				);
				console.log(result);
				this.$router.replace('/order');
			},
		},
		created() {
			this.commodities = this.$store.getters[
				'shoppingCart/getCartInfo'
			];
			this.ShopInfo = this.$store.getters[
				'shoppingCart/getShopInfo'
			];
			// window.console.log(this.commodities);
			// window.console.log(this.ShopInfo);
		},
	};
</script>
<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.pay {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 9999;
		background: #fff;
		.header {
			width: 100%;
			height: 50px;
			background: #0085ff;
			position: fixed;
			line-height: 50px;
			text-align: center;
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			z-index: 999;
			.iconarrow-right {
				width: 50px;
				height: 50px;
				font-size: 14px;
				color: #fff;
				float: left;
				text-align: center;
				line-height: 50px;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		#content {
			width: 100%;
			position: absolute;
			left: 0;
			top: 50px;
			bottom: 50px;
			box-sizing: border-box;
			padding: 0 15px;
			z-index: 666;
			.shopName {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				.iconarrow-left {
					float: right;
					// width: 50px;
					// height: 50px;
					// text-align: center;
					// line-height: 50px;
				}
			}
			.shopInfo {
				width: 100%;
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				display: flex;
				img {
					width: 40px;
					height: 40px;
				}
				.title {
					line-height: 40px;
					color: #333;
					font-size: 14px;
					flex: 1;
				}
				.quantity {
					font-size: 14px;
					color: #333;
					line-height: 40px;
					text-align: center;
					min-width: 40px;
				}
				.price {
					font-size: 14px;
					color: #333;
					line-height: 40px;
					text-align: center;
					min-width: 40px;
				}
			}
			.dispatchPrice {
				width: 100%;
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				font-size: 14px;
				color: #333;
				text-align: right;
			}
		}
		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			height: 50px;
			width: 100%;
			background: #3c3c3c;
			display: flex;
			align-items: center;
			z-index: 999;
			.totalPrice {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
				color: #fff;
				font-size: 18px;
				float: left;
			}
			.discountsPrice {
				font-size: 14px;
				line-height: 16px;
				color: #999;
			}
			.submitOrder {
				position: absolute;
				right: 0;
				top: 0;
				height: 50px;
				line-height: 50px;
				text-align: center;
				padding: 0 18px;
				font-size: 16px;
				// color: #999;
				color: #333;
				background: #f8c74e;
			}
		}
	}
</style>
