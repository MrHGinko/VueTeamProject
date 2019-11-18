<template>
  <div id="app">
      <!-- <Content /> -->
      <router-view/>

      <FootNav />
  </div>
</template>

<script>
import FootNav from './views/lib/FootNav'
// import Content from './views/lib/Content'
import './views/font/iconfont.css'
export default {
  components:{
    FootNav
    // Content
  }
}
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
}

</style>
