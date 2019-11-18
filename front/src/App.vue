<template>
	<div id="app">

		<router-view></router-view>

		<transition :enter-active-class="hasAnimate?'slideInDown':''" leave-active-class="slideOutDown">
			<component v-if="showCom" :is="comName" />
		</transition>
	
	</div>
</template>

<script>
import Login from './views/Mine/Login'
import Regiester from './views/Mine/Regiester'
export default {
	components: {
		Login,
		Regiester
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
		this.$center.$on('toggleLogin', (value) => {
			if (this.showCom && value) {
				this.hasAnimate = false;
			} else {
				this.hasAnimate = true;
			}
			this.showCom = value;
			this.comName = 'Login';
		})
		// 监听展示注册组件
		this.$center.$on('toggleReg', (value) => {
			if (this.showCom && value) {
				this.hasAnimate = false;
			} else {
				this.hasAnimate = true;
			}
			this.showCom = value;
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
</style>