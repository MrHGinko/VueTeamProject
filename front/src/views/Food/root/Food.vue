<template>
	<div id="food-home">
		<header-bar title="美食首页"></header-bar>
		<div class="content">
			<span @click="test()">111</span>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	methods: {
		test() {
			console.log(this.data);
		}
	},
	computed: {
		...mapState({
			data: state=>state.food.data
		})
	},
	created() {
		console.log(this.$store.state.username);
		this.$store.dispatch('food/requestFoodIndexData');
	}
}
</script>

<style>

</style>