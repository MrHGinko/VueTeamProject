<template>
	<div id="Regiester">
		<span class="b-exit" @click="exitLog()"><van-icon name="cross" /></span>
		<div class="r-box">
			<div class="logo"></div>
			<input v-model="username" type="text" placeholder="Enter Username">
			<input v-model="password" type="password" placeholder="Enter Password">
			<input type="button" value="Regiester" class="r-btn" @click="userReg()">
			<span class="to-login" @click="toLogin()">go to Login <span style="vertical-align:middle"><van-icon name="arrow" /></span> </span>
		</div>
	
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: null,
			password: null,
		}
	},
	methods: {
		exitLog() {
			this.$center.$emit('toggleReg', false);
		},
		toLogin() {
			this.$center.$emit('toggleLogin', true);
		},
		async userReg() {
			if(!this.username || !this.password) {
				this.$Toast('输入未完成')
				return ;
			}
			let user = {
				username: this.username,
				password: this.password
			}
			let result = await this.$store.dispatch('mine/userRegiesterAction', user);
			console.log(result);
			result && this.$Toast(result);
			if(result.code === 0) {
				this.toLogin();
			}
			this.username = ''; this.password= '';
		}
	}
}
</script>

<style lang="scss" scoped>
	#Regiester {
		height: 100%;
		width: 100%;
		position:absolute;
		top: 0;
		left: 0;
		background: rgb(255, 255, 255);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		.b-exit {
			position: absolute;
			right: 16px;
			top: 16px;
		}
		.r-box {
			width: 100%;
			height: 50%;
			box-sizing: border-box;
			padding: 4px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.logo {
				width: 56px;
				height: 56px;
				border-radius:50%;
				background-color: rgb(199, 199, 199);
				margin-bottom: 8px;
			}
			input{
				box-sizing: border-box;
				border: none;
				border-bottom: 1px solid rgb(206, 206, 206);
				width: 60%;
				padding: 8px;
				font-size: 14px;
				margin-bottom: 8px;
				transition: 0.5s;
				text-align: center;
				&:focus{
					border-bottom-color: rgb(0, 0, 0);
				}
			}
			.r-btn {
				background: rgb(255, 115, 72);
				border-radius: 8px;
				color: rgb(32, 32, 32);
			}
			.to-login {
				font-size: 12px;
				color: rgb(38, 114, 255);
				padding-left: 35%;
				margin-top: 16px;
			}
		}
	}
</style>