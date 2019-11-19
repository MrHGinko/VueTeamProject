<template>
	<div id="pointMark">
	
		<div class="showbox">
			<p><span class="p-icon"><van-icon name="coupon-o" /></span>   <span> 优惠券</span></p> 
			<p><span class="p-icon"><van-icon name="gold-coin" /></span>   <span> {{point}}</span></p> 
			<p><span class="p-icon"><van-icon name="thumb-circle-o" /></span>   <span> 积分好物 </span></p> 
		</div>
		<p class="line">推荐优惠券</p>

		<scroll-box  class="pointList">	
			<pointGood @buy="handleBuy" v-for="(item, index) in 4" :key="index"/>
		</scroll-box>

		<van-popup
			closeable
			v-model="isShow"
			position="left"
			:style="{ width: '72%', height: '100%' }"
		> <buyMenu v-model="isShow" :needPoint="needPoint"/> </van-popup>

	</div>
</template>

<script>
import pointGood from './pointGood'
import buyMenu from '../m-component/buyMenu'
import {Popup} from 'vant'
export default {
	components: {
		pointGood,
		[Popup.name]: Popup,
		buyMenu
	},	
	data() {
		return {
			isShow:false,
			needPoint: null,
		}
	},
	computed: {
		point() {
			return this.$store.state.mine.userInfo.point;
		}
	},
	methods: {
		handleBuy(needPoint) {
			this.needPoint = needPoint;
			this.isShow = true;
			console.log(needPoint);
		}
	}
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