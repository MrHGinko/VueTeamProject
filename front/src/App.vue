<template>
	<div id="app">

		<router-view/>
		<tab-bar class="tab_bar"></tab-bar>
		<FootNav />

		<transition :enter-active-class="hasAnimate?'slideInRight':''" leave-active-class="slideOutRight">
			<component v-if="showCom" :is="comName" />
		</transition>
	
	</div>
</template>
<script>
import Login from './views/Mine/Login'
import Regiester from './views/Mine/Regiester'
import sAddress from './views/Order/o-component/Address'
import FootNav from './views/lib/FootNav'
// import Content from './views/lib/Content'
import './views/font/iconfont.css'
export default {
	components: {
		Login,
		Regiester,
		FootNav,
		sAddress,
	},
	data() {
		return {
			showCom: false,
			comName: 'Login',
			hasAnimate: true
		}
	},
	async created() {

		// 监听展示登录组件
		this.$center.$on('toggleLogin', (flag) => {
			if (this.showCom && flag) {
				this.hasAnimate = false;
			} else {
				this.hasAnimate = true;
			}
			this.showCom = flag;
			this.comName = 'Login';
		})
		this.$center.$on('toggleAds', (flag) => {
			if (this.showCom && flag) {
				this.hasAnimate = false;
			} else {
				this.hasAnimate = true;
			}
			this.showCom = flag;
			this.comName = 'sAddress';
		})
		// 监听展示注册组件
		this.$center.$on('toggleReg', (flag) => {
			if (this.showCom && flag) {
				this.hasAnimate = false;
			} else {
				this.hasAnimate = true;
			}
			this.showCom = flag;
			this.comName = 'Regiester';
		})

		let result = await this.$store.dispatch('mine/checkLogin');
		if(result.code === 0) {
			this.$store.commit('setLogin', true);
			this.$store.commit('setUsername', localStorage.getItem('username'));
		}
	}
	
}
</script>
  
<style>
html,
body,
#app {
	height: 100%;
	width: 100%;
}

.content {
	position: absolute;
	top: 48px;
	width: 100%;
}
