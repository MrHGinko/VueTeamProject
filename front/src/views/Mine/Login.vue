<template>
	<div id="Login">
		<span class="b-exit" @click="exitLog()"><van-icon name="cross" /></span>
		<div class="l-box">
			<div class="logo"></div>
			<input v-model="username" type="text" placeholder="Enter Username">
			<input v-model="password" type="password" placeholder="Enter Password">
			<input type="button" value="Login" class="l-btn" @click="userLog()">
			<span class="to-reg" @click="toRegiester()">go to Regiester <span style="vertical-align:middle"><van-icon name="arrow" /></span> </span>
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
			this.$center.$emit('toggleLogin', false);
		},
		toRegiester() {
			this.$center.$emit('toggleReg', true);
		},
		async userLog() {
			if(!this.username || !this.password) {
				this.$Toast('输入未完成')
				return ;
			}
			let user = {
				username: this.username,
				password: this.password
			}
			let result = await this.$store.dispatch('mine/userLoginAction', user);

			console.log(result);

			this.$Toast(result);	
			if(result.code === 0) {
				this.exitLog();
				this.$store.commit('setLogin', true);
				this.$store.commit('setUsername', this.username);

				// vuex 获取 userinfo
				await this.$store.dispatch('mine/refreshData');
			}
			this.username = ''; this.password= '';
		},
	}
}
</script>

<style lang="scss" scoped>
	#Login {
		height: 100%;
		width: 100%;
		position:absolute;
		top: 0;
		left: 0;
		background: rgb(255, 255, 255);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		.b-exit {
			position: absolute;
			right: 16px;
			top: 16px;
		}
		.l-box {
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
			.l-btn {
				background: rgb(255, 169, 72);
				border-radius: 8px;
				color: rgb(39, 39, 39);
			}
			.to-reg {
				font-size: 12px;
				color: rgb(38, 114, 255);
				padding-left: 35%;
				margin-top: 16px;
			}
		}
	}
</style>