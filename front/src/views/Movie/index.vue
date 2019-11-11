<template>
  <div class="movie">
    	  <app-header  class="mymovie" title="猫眼电影"></app-header>
        <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .mymovie{
        background:#f03d37;
        color: #fff;
    }
</style>

