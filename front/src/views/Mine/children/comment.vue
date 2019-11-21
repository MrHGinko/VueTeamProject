<template>
	<div id="comment">
		<header-bar
			title="评论"
			:logout="
				() => {
					this.$router.go(-1);
				}
			"
		></header-bar>
		<textarea
			class="com-con"
			placeholder="赶紧来输入评论吧!"
			re
		></textarea>
		<div class="ratebox">
			<div
				class="rate"
				v-for="(item, index) in rateList"
				:key="index"
			>
				<p class="r-title">{{ item.title }}</p>
				<van-rate
					v-model="item.value"
					:size="32"
					color="rgb(255, 149, 50)"
				/>
			</div>
		</div>
		<button class="btn" @click="toComment()">评价</button>
	</div>
</template>

<script>
	import { Rate } from 'vant';
	export default {
		components: {
			[Rate.name]: Rate,
		},
		props: {
			id: String,
		},
		data() {
			return {
				rateList: [
					{ title: '菜肴美味', value: 0 },
					{ title: '派送服务', value: 0 },
					{ title: '店铺评价', value: 0 },
				],
				orderID: null,
			};
		},
		methods: {
			async toComment() {
				console.log('评价中');
				let order = {
					id: this.orderID,
					change: 3,
				};
				let result = await this.$store.dispatch('order/changeStatus', order);
				if(result.data.code === 0) {
					this.$Toast("评价成功");
					this.$router.replace('/order');
				}
			}
		},
		created() {
			this.orderID = this.$route.params.id;

		}
	};
</script>

<style lang="scss" scoped>
	#comment {
		width: 100%;
		box-sizing: border-box;
		position: absolute;
		background: #fff;
		top: 48px;
		bottom: 0;
		z-index: 1;
		padding: 8px;
		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			border: none;
			width: 100%;
			height: 48px;
			font-size: 16px;
			text-align: center;
			line-height: 48px;
			background: rgb(255, 149, 50);
		}
		.com-con {
			width: 100%;
			height: 40%;
			box-sizing: border-box;
			font-size: 16px;
			resize: none;
		}
		.ratebox {
			.rate {
				margin-top: 20px;
				padding-left: 16px;
				.r-title {
					font-size: 16px;
					text-indent: 8px;
				}
			}
		}
	}
</style>
