<template>
	<div class="scroll-box" ref="scroll">
		<div class="scoll-wrap">
			<slot/>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'scroll-box',
	mounted() {
		this.scroll = new BScroll(this.$refs.scroll, {
			tap: true,
			click: true
		});
		
		// 如果需要滚动，先刷新滚动视图，就可以在可滚动范围内滚动
		this.scroll.on('beforeScrollStart', () => {
			this.scroll.refresh();
		});
	}
};
</script>
<style scoped>
.scroll-box {
	overflow: hidden;
}
</style>