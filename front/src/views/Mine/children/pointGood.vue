<template>
	<div id="point-good">
		<div class="good" @click="topayPoint(randomPoint[0])">
			<div class="pic"></div>
			<p class="p-name">name {{randomPoint[0]}}</p>
		</div>
		<div class="good" @click="topayPoint(randomPoint[1])">
			<div class="pic"></div>
			<p class="p-name">name {{randomPoint[1]}}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	computed: {
		randomPoint() {
			return [Math.round(Math.random() * 100 + 50), Math.round(Math.random() * 100 + 100)]
		},
	},
	methods:{
		async topayPoint(need) {
			console.log(need);
			// this.$store.commit('setLoading', true);
			// if(this.can) {
			// 	// 积分足够
			// 	let result = await this.$store.dispatch('mine/userChangeInfo',{
			// 		point: Number(this.$store.state.mine.userInfo.point - need),
			// 	})

			// 	//重新获取状态
			// 	let fresh = await this.$store.dispatch('mine/userGetInfo');
			// 	this.$store.commit('mine/setUserInfo', fresh.data[0]);

			// 	this.$Toast('付款成功');
			// 	this.$store.commit('setLoading', false);
			// 	this.$emit('input', false);
			// } else {
			// 	this.$Toast('您的余额不足');
			// 	this.$store.commit('setLoading', false);
			// 	this.$emit('input', false);
			// }
		},
	}
}
</script>

<style lang="scss" scoped>
	#point-good{
		display: flex;
		justify-content: space-evenly;
		.good {
			flex: 1;
			margin-bottom : 8px;
			padding: 4px;
			margin: 4px;
			box-sizing: border-box;
			border: 4px solid rgb(207, 207, 207);
			.pic {
				
				height: 108px;
				background-color: rgb(223, 223, 223);
			}
			.p-name {
				text-align : center;
				font-size: 14px;
				line-height: 28px;
			}

		}
	}
</style>