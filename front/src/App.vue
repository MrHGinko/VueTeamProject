<template>
  <div id="app">
	<router-view></router-view>
	<tab-bar class="tab_bar"></tab-bar>
  </div>
</template>
<script>
export default {

}
</script>

<style>
  .tab_bar{
    position: fixed;
    bottom: 0;
  }
</style>