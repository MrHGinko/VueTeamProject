<template>
	<div id="address">
		<h1 @click="toaddads">添加地址</h1>
		<div class="a-item" @click="sel(item.tel, item.address)" v-for='(item, index) in $store.state.mine.userInfo.address' :key="index">
			<p>收货人电话: {{item.tel}}</p>
			<p>收货地址:    {{item.address}}</p>
		</div>

		<van-popup closeable v-model="to" position="right" :style="{width: '80%', height: '100%'}">
			<div id="addMask">
				<input type="text" placeholder="输入收货人电话" v-model.lazy="stel" />
				<input type="text" placeholder="输入详细地址" v-model.lazy="sads" />
				<button class="btn" @click="add">添加地址</button>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {Popup} from 'vant';
	export default {
		components: {
			[Popup.name]: Popup,
		},
		data() {
			return {
				to: false,
				stel: null,
				sads: null,
			};
		},
		methods: {
			sel(tel, ads) {
				this.$store.commit('setAds', {
					tel,
					ads
				})
				this.$center.$emit('toggleAds', false);
			},
			async add() {
				if (!this.stel && !this.sads) {
					this.$Toast('输入未完成');
					return ;
				}
				let ads = this.$store.state.mine.userInfo.address;
				ads.push({
					tel: this.stel,
					address: this.sads,
				});
				// 先获取所有地址, 存到一个变量上, 进行Update
				console.log(ads);
				let result = await this.$store.dispatch('mine/userChangeInfo', {
					address: ads,
				});

				await this.$store.dispatch('mine/refreshData');

				this.to = false;
				this.stel = '';
				this.sads = '';
			},
			select(index) {
				this.to = false;
				this.$center.$emit('toggleAds', false);
			},
			toaddads() {
				this.to = true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	#address {
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(255, 255, 255);
		z-index: 3000;
		padding: 16px;
		padding-top: 48px;
		.a-item {
			border: 1px solid #ccc;
			margin-bottom: 12px;
			font-size: 14px;
			box-sizing: border-box;
			padding: 8px;
			p {
				line-height: 32px;
			}
		}
		h1 {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 32px;
			line-height: 32px;
			text-align: center;
			background: rgb(255, 180, 41);
		}
	}
	#addMask {
		padding: 16px;
		padding-top: 48px;
		.btn {
			width: 100%;
			padding: 8px;
			background: rgb(255, 180, 41);
			border: none;
			border-radius: 8px;
			margin-top: 8px;
		}
		input {
			width: 100%;
			padding: 8px;
			box-sizing: border-box;
			font-size: 16px;
			margin-bottom: 8px;
			border: none;
			border-bottom: 1px solid rgb(212, 212, 212);
			transition: 0.5s;
			&:focus {
				border-bottom-color: rgb(61, 61, 61);
			}
		}
	}
</style>
