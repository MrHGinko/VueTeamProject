<template>
	<div id="point-good">
		<div  class="good" @click="topayPoint(randomPoint[0])">
			<div class="pic">图片信息</div>
			<p class="p-name">点餐优惠券 {{randomPoint[0]}}</p>
		</div>
		<div class="good" @click="topayPoint(randomPoint[1])">
			<div class="pic">图片信息</div>
			<p class="p-name">话费优惠券 {{randomPoint[1]}}</p>
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
		topayPoint(point) {
			this.$emit('buy', point);
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