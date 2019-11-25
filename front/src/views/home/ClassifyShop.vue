<template>
  <div class="shop">
    <header class="header" ref="header">
        <i class="iconfont iconarrow-right" @click="backAction"></i>
    </header>
    <Content class="content">
        <Shops class="shops"/>
    </Content>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Content from "../lib/Content";
import Shops from "./Shops";
export default {
    components:{
        Content,
        Shops
    },
    methods: {
        backAction(){
            this.$router.replace('/home');
        }
    }
}
</script>
<style lang="scss" scoped>
.shop{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    .header{
        width: 100%;
        height: 50px;
        background: #2E2F3B;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
        .iconarrow-right{
            width: 50px;
            height: 50px;
            font-size: 14px;
            color: #fff;
            float: left;
            text-align: center;
            line-height: 50px;
        }
    }
    .content{
        position: absolute;
        left: 0;
        top: 50px;
        bottom: 0;
        .shops{
            width: 100%;
            height: 100%;
        }
    }
   
}
</style>