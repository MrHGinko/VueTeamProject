<template>
  <div class="comming">
    <h1 ref="h" v-bind:style="bgcolor">后台工程师正在努力中 - - - - </h1>
  </div>
</template>

<script>
export default {
 data () {
   return {
     bgcolor:'rgb(255,255,255,0)'
   }
 },
  methods: {
      solo(){
         
      }
  },
  created () {
    this.solo()
  }
}
</script>
<style lang="scss" scoped>
  .comming{
    position: absolute;
    width: 100%;
    top: 88px;
    bottom: 49px;
    background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573898810231&di=a3e58dd92730a720fdae40d8b48c1c2a&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-cc89624b3c49c10106fd7fb3bbd0690d_b.gif') center;
    background-size: over;
    h1{
      padding: 10px;
      background: #faf;
    }
  }
</style>
