<template>
	<div class="rightInfo-box" ref="scroll">
		<div class="scoll-wrap">
			<slot/>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	name: 'rightInfo-box',
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
		this.scroll.on('scroll',(pos) => {
  			this.$center.$emit('onScroll', pos.y);
		})
	},
	methods:{
		listener(data){
			this.scroll.scrollTo(0,-data, 500);
		}
	},
	created(){
		this.$center.$on('send', this.listener);
	},
	beforeDestroy(){
		this.$center.$off('send', this.listener);
	}
	
};

</script>
<style scoped>
.rightInfo-box {
	width: 100%;
	/* height: 100%; */
	overflow: hidden;
}
</style>