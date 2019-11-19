<template>
	<div id="buymenu">
		<div class="infoBox">
			<p> <span class="i-img"> 图片 </span><br/> <span class="i-name">优惠券</span>  </p>
			<p class="i-id">订单编号 <br> ******************** </p>
			<p> <button class="btn" @click="p=topay()">支付</button> </p>

			<p class="i-pay border-bottom">您应支付: <span class="price"> {{needPoint}} </span> </p>
			<p class="i-balance border-bottom">剩余积分: <span :class="active"> {{$store.state.mine.userInfo.point}} </span> </p>
		</div>
			<loading v-if="isLoading" type="spinner"></loading>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
		needPoint: Number,
	},
	data() {
		return {
			can: false
		}
	},
	computed: {
		isLoading() {
			return this.$store.state.isLoading;
		},
		active() {
			if(this.needPoint <= this.$store.state.mine.userInfo.point) {
				this.can = true;
				return 'balance-ok';
			} else { 
				this.can = false;
				return 'balance-fail'; 
			}
		}
	},
	methods: {
		async topay() {
			this.$store.commit('setLoading', true);
			if(this.can) {
				let result = await this.$store.dispatch('mine/userChangeInfo',{
					point: Number(this.$store.state.mine.userInfo.point - this.needPoint),
				})
				//重新获取状态
				let fresh = await this.$store.dispatch('mine/userGetInfo');
				this.$store.commit('mine/setUserInfo', fresh.data[0]);
				this.$store.commit('setLoading', false);
				this.$emit('input', false);
				this.$Toast('支付完成');
			}else {
				this.$Toast('您的积分不足');
				this.$store.commit('setLoading', false);
				this.$emit('input', false);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	#buymenu {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 54px 8px;
		font-size: 14px;
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
				text-align : center;
				margin-bottom: 16px;
				.i-img {
					display:inline-block;
					width: 64px;
					height: 104px;
					vertical-align: middle;
					background: rgb(201, 201, 201);
					margin-bottom: 8px;
				}
				.i-name {
				
					font-size: 20px;
					font-style: italic;
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