<template>
	<div id="mine">
		<header-bar title="Mine" :logout="logout"></header-bar>
		<scroll-box class="content">
			<div class="userinfo" v-if="isLogin">
				<span  @click="showInfo()" class="userimg"></span>
				<div class="u-info">
					<span class="u-name">{{name}}</span> <br>
					<span class="u-detail" @click="showInfo()">个人信息 > </span>
				</div>
			</div>

			<div class="userinfo" v-else>
				<p class="loginBtn" @click="toLogin()">请先登录</p>
			</div>


			<div class="m-box" v-for="(item, index) in mineBoxList" :key="index">
				<router-link v-for="(line, index) in item" :key="index" :to="line.to">
					<div class="m-inc border-bottom">
						<div> <span class="m-l-icon"> <van-icon name="orders-o" /> </span>
							{{line.name}}
						<span class="m-r-icon"> {{returnInfo(line.rTxt)}}  <van-icon name="arrow" /> </span> </div>
					</div>
				</router-link>
			</div>
		</scroll-box>

		<div>
			<van-popup
				closeable
				v-model="isShow"
				position="right"
				:style="{ width: '50%', height: '100%' }"
			> <infoMask v-model="isShow"/> </van-popup>
		</div>

		<router-view name="mineChild">  </router-view>
	</div>
</template>

<script>
import infoMask from './m-component/infoMask'
import { Popup } from 'vant';
export default {
	components: {
		infoMask,
		[Popup.name]: Popup,
	},
	data() {
		return {
			isShow: false,
			mineBoxList: {
				mine: [
					{
						name: '金额',
						to: '/mine/balance',
						icon: 'orders-o',
						rTxt: 'balance',
					},
					{
						name: '积分',
						to: '/mine/pointMark',
						icon: 'orders-o',
						rTxt: 'point',
					},
					{
						name: '卡包',
						to: '#',
						icon: 'orders-o',
						rTxt: '',
					},
					{
						name: '优惠券',
						to: '#',
						icon: 'orders-o',
						rTxt: '',
					},
				],
				record: [
					{
						name: '我的订单',
						to: '/order',
						icon: 'orders-o',
						rTxt: '',
					},
					{
						name: '我的评论',
						to: '#',
						icon: 'orders-o',
						rTxt: '',
					},
					{
						name: '我的足迹',
						to: '#',
						icon: 'orders-o',
						rTxt: '',
					},
					{
						name: '我的收藏',
						to: '#',
						icon: 'orders-o',
						rTxt: '',
					}
				]
			}
		}
	},
	computed: {
		isLogin() {
			return this.$store.state.isLogin;
		},
		name() {
			return this.$store.state.mine.userInfo.nickName;
		},
		balance() {
			return this.$store.state.mine.userInfo.balance; 
		},
		point() {
			return this.$store.state.mine.userInfo.point;
		}
	},
	methods: {		
		returnInfo(info) {
			switch(info) {
				case 'balance': return this.balance;
				case 'point': return this.point;
			}
		},
		showInfo() {
			this.isShow = !this.isShow;
		},
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
				this.$store.commit('mine/setUserInfo', {});
			}
		},
		toLogin() { 
			this.$center.$emit('toggleLogin', true);
		},

	},
	created() {
		this.$store.dispatch('mine/refreshData');
	},
	beforeRouteLeave(to, from, next) {
		console.log(to.path.slice(1));

		if(to.path.slice(1) === 'order') {
			if(this.$store.state.isLogin) {
				next();
			}else {
				this.toLogin();
			}
		}
	},
	beforeRouteUpdate(to, from ,next) {
		console.log(to.path.slice(6));
		if(to.path.slice(6) === '') {console.log(to); next()}; //匹配到 /mine/

		if(to.path.slice(6) === 'pointMark') {
			if(this.$store.state.isLogin) {
				next();
			}else {
				this.toLogin();
			}
		}

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
	a{
		display: block;
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
			float: right;
			i {
				padding-left: 8px;
				vertical-align: middle;
			}
		}
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