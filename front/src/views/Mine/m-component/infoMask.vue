<template>
	<div id="infoMask">
		<div class="i-name">
			<p> 昵称: </p>
			<input type="text" v-model="nickName">
		</div>
		<div class="i-balance">
			<p> 余额: </p>
			<input type="number" v-model="balance">
		</div>
		<div class="i-name">
			<p> 积分: </p>
			<input type="text" :value="point" disabled>
		</div>

		<button v-if="isUpdate" class="btn" @click="reqChange()"> 确认修改 </button>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
	},
	data() {
		return {
			nickName: this.$store.state.mine.userInfo.nickName,
			balance: this.$store.state.mine.userInfo.balance,
			point: this.$store.state.mine.userInfo.point,
			isUpdate: false,
		}
	},
	computed: {

	},
	watch: {
		value() {
			
			if(!this.value) {
				this.nickName = this.$store.state.mine.userInfo.nickName;
				this.balance = this.$store.state.mine.userInfo.balance;
				this.point = this.$store.state.mine.userInfo.point;
				this.isUpdate = false;
			}
			// 如果未修改就退出, 初始化状态
		},
		nickName(){
			if(!this.isUpdate && this.value) {
				this.isUpdate = true;
			}
			
		},
		balance() {
			if(!this.isUpdate  && this.value) {
				this.isUpdate = true;
			}
		},
	},
	methods: {
		async reqChange() {
			let result = await this.$store.dispatch('mine/userChangeInfo',{
				nickName: this.nickName,
				balance: this.balance,
			})
			let fresh = await this.$store.dispatch('mine/userGetInfo');
			this.$store.commit('mine/setUserInfo', fresh.data[0]);
			this.$store.commit('setUsername',  fresh.data[0].nickName);
			console.log(result);
			this.isUpdate = false;
			this.$emit('input', false)
		}, //test OK
	},
	created() {
	}
}
</script>

<style lang="scss" scoped>
	#infoMask {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 60px 8px;
		font-size: 14px;
		div {
			padding: 6px;
			margin: 8px 0;
			input {
				color: rgb(173, 173, 173);
				border: none;
				border-bottom: 1px solid rgb(204, 204, 204);
				transition: 0.5s;
				width: 100%;
				box-sizing: border-box;
				padding: 8px 0px 4px 6px;
				font-size: 12px;
				&:focus {
					color: #000;
					font-size: 14px;
					border-color: rgb(82, 82, 82)
				}
				&:disabled {
					background: #fff;
				}
			}
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
</style>