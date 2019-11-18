<template>
  <div class="footNav">
    <div class="nav">
      <router-link class="tab" to="/home">
        <i class="iconfont iconyemian-copy-copy"></i>
        <span>首页</span>
      </router-link>
      <router-link class="tab" to="/order">
        <i class="iconfont iconorder"></i>
        <span>订单</span>
      </router-link>
      <router-link class="tab" to="/mine">
        <i class="iconfont iconmeituanwaimai"></i>
        <span>我的</span>
      </router-link>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.footNav{
    width: 100%;
    height: 49px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #fff;
    .nav{
        width: 100%;
        height: 100%;
        display: flex;
        .tab{
            color: #999;
            text-decoration: none;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .iconfont{
              font-size: 24px;
            }
            span{
              font-size: 12px;
              line-height: 12px;
              color: #999;
            }
        }
        .router-link-active{
          color: #FFBF2E;
        }
    }
}



</style>