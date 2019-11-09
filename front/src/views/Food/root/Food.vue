<template>
	<div id="food-home">
		<header-bar title="标题组件"></header-bar>
		<div class="content">
			<span @click="test()">111</span>
		</div>
	</div>
</template>

<script>
import headerBar from '../foodComponents/header-bar'
import {mapState} from 'vuex'

export default {
	components: {
		[headerBar.name]: headerBar,
	},
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