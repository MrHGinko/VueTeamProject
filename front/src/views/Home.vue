<template>
	<div id="home">
		<h1>首页</h1>
		<div class="line"></div>
		<router-link to="/food">
			美食
		</router-link>
		<div class="line"></div>
		<router-link to="/mine">我的</router-link>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.line {
	height: 20px;
	background: rgb(189, 189, 189);
	width: 100%;
}
</style>