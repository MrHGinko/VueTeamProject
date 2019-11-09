<template>
	<div id="topInput">
	
		<span class="backBtn" @click="backone()"> <van-icon name="cross" /> </span>
	
		<input class="topIpt" type="text" :value="title">
	
		<span class="shareBtn"> <span><van-icon name="share" /></span> </span>	
	</div>
	
</template>

<script>
export default {
	name: 'header-bar',
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			flag: false,
		}
	},
	methods: {
		changeFlag() {
			this.flag = !this.flag;
			return this.flag
		},
		backone() {
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
#topInput {
	position: fixed;
	width: 100%;
	height: 48px;
	top: 0;
	left: 0;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.507);
	display: flex;
	z-index: 2;
	background-color: #fff;
}

.backBtn {
	display: inline-block;
	box-sizing: border-box;
	margin: 12px 0px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	width: 48px;
	font-size: 24px;
	border-right: 1px solid #000;
}

.topIpt {
	flex: 1;
	margin: 12px;
	border: none;
	padding-top: 4px;
}

.shareBtn {
	width: 48px;
	line-height: 48px;
}
.shareBtn span {
display: inline-block;

    box-sizing: border-box;
    margin: 12px 0px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    width: 48px;
    font-size: 24px;
}

</style>