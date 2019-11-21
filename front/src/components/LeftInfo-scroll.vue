<template>
	<div class="leftInfo-box" ref="scroll">
		<div class="scoll-wrap">
			<slot/>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'leftInfo-box',
	mounted() {
		this.scroll = new BScroll(this.$refs.scroll, {
			tap: true,
			click: true,
			mouseWheel: true,
    		scrollbars: true,
			bounce: false,
			probeType: 3
		});
		
		// 如果需要滚动，先刷新滚动视图，就可以在可滚动范围内滚动
		this.scroll.on('beforeScrollStart', () => {
			this.scroll.refresh();
		});
	}
	
};

</script>
<style scoped>
.leftInfo-box {
	width: 100%;
	/* height: 100%; */
	overflow: hidden;
}
</style>