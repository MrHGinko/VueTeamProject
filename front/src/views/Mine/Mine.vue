<template>
	<div id="mine">
		<header-bar title="Mine" :logout="logout"></header-bar>
		<scroll-box class="content">
			<div class="userinfo" v-if="isLogin">
				<span class="userimg"></span>
				<div class="u-info">
					<span class="u-name">{{name}}</span> <br>
					<span class="u-detail">个人信息 > </span>
				</div>
			</div>
			<div class="userinfo" v-else>
				<p class="loginBtn" @click="toLogin()">请先登录</p>
			</div>

			<div class="m-box">
				<div class="m-inc border-bottom" @click="toOrder()">
					<div> <span class="m-l-icon"> <van-icon name="orders-o" /> </span>
						我的订单 
					<span class="m-r-icon"> <van-icon name="arrow" /></span> </div>
				</div><div class="m-inc border-bottom" @click="toOrder()">
					<div> <span class="m-l-icon"> <van-icon name="orders-o" /> </span>
						我的订单 
					<span class="m-r-icon"> <van-icon name="arrow" /></span> </div>
				</div>
			</div>
			<div class="m-box">
				<div class="m-inc border-bottom" @click="toOrder()">
					<div> <span class="m-l-icon"> <van-icon name="orders-o" /> </span>
						我的订单 
					<span class="m-r-icon"> <van-icon name="arrow" /></span> </div>
				</div><div class="m-inc border-bottom" @click="toOrder()">
					<div> <span class="m-l-icon"> <van-icon name="orders-o" /> </span>
						我的订单 
					<span class="m-r-icon"> <van-icon name="arrow" /></span> </div>
				</div>
			</div>
	

			
		</scroll-box>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	computed: {
		isLogin() {
			return this.$store.state.isLogin;
		},
		name() {
			return this.$store.state.username;
		}
	},
	methods: {
		toOrder() {
			if(this.$store.state.isLogin) {
				this.$router.push('/order');
			}else {
				this.toLogin();
			}
		},
		async logout() {
			let result = await this.$store.dispatch('mine/userLogoutAction');
			if(result.code === 0) {
				this.$Toast('退出成功');
	
				this.$store.commit('setLogin', false);
				this.$store.commit('setUsername', null);
			}
		},
		toLogin() {
			this.$center.$emit('toggleLogin', true);
		}
	},
	created() {
		
	}
}
</script>

<style lang='scss' scoped>
.content {
	position: absolute;
	top: 48px;
	background: rgb(211, 211, 211);
}
.m-box {
	margin-top : 8px;
	.m-inc {
		background: rgb(255, 255, 255);
		height: 36px;
		line-height: 36px;
		box-sizing: border-box;
		font-size:12px;
		padding: 0 8px;
		.m-l-icon {
			vertical-align: middle;
			font-size: 16px;
		}
		.m-r-icon {
			vertical-align: middle;
			float: right;
		}
	}
}

.userinfo {
	height: 80px;
	background-color: rgb(102, 102, 102);
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 0 12px;
	color: white;
	.u-name {
		display: inline-block;
		margin-bottom: 8px;
	}
	.u-detail {
		display: inline-block;
		font-size: 12px;
	}
	.userimg {
		display: inline-block;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: rgb(224, 224, 224);
		border: 4px solid rgb(151, 151, 151);
		margin-right: 12px;
	}
	.loginBtn {
		width: 100%;
		text-align: center;

	}
}
</style>