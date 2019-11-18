<template>
	<div id="pointMark">
	
		<div class="showbox">
			<p><span class="p-icon"><van-icon name="coupon-o" /></span>   <span> 优惠券</span></p> 
			<p><span class="p-icon"><van-icon name="gold-coin" /></span>   <span> {{point}}</span></p> 
			<p><span class="p-icon"><van-icon name="thumb-circle-o" /></span>   <span> 积分好物 </span></p> 
		</div>
		<p class="line">推荐优惠券</p>

		<scroll-box  class="pointList">	
			<pointGood />
			<pointGood />
			<pointGood />
			<pointGood />
			<pointGood />
		</scroll-box>
	</div>
</template>

<script>
import pointGood from './pointGood'
export default {
	components: {
		pointGood
	},	
	computed: {
		point() {
			return this.$store.state.mine.userInfo.point;
		}
	},

}
</script>

<style lang="scss" scoped>
.test {
	width: 300px;
	height: 300px;
	margin: 10px;
	background-color: rgb(255, 117, 117);
}
.content {
	position: absolute;
	bottom: 0;
	background: rgb(128, 128, 128);
	top: 200px;
	overflow: hidden;
}
#pointMark {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgb(255, 255, 255);
	box-sizing: border-box;
	padding-top: 48px;
	.line {
		background: rgb(241, 241, 241);
		font-size: 12px;
		text-align: center;
		line-height: 24px;
	}
	.pointList {
		width: 100%;
		padding: 12px;
		box-sizing: border-box;
		height: 416px;
	}
	.showbox {
		display: flex;
		justify-content: space-evenly;
		padding: 12px 0;
		// align-items: center;
		p {
			display: flex;
			flex-direction: column;
			align-items: center;
			.p-icon {
				font-size: 36px;
			}
			span{
				font-size: 12px;
			}
		}
		
	}
}
</style>