<template>
  <div class="order">
    <div class="title" ref="title">
      <h2>订单</h2>
      <i class="iconfont iconfangdajing"></i>
    </div>

    <van-tabs v-model="active" animated line-width="20px" 
    color="#ffd300" background="#FCFCFC" ref="orderDetail">
        <van-tab title="全部订单" :style="{height:infoHeight}">
          <Content class="allOrder">
            <h3>一个订单都没有哦~</h3>
            <p>给自己定一个小目标，先下一单。</p>
            <router-link to="/home">去逛逛</router-link>
            
          </Content>
        </van-tab>
        <van-tab title="待评价" :style="{height:infoHeight}">
          <!-- <Content class="appraise"> -->
            <h3>一个订单都没有哦~</h3>
            <p>给自己定一个小目标，先下一单。</p>
            <router-link to="/home">去逛逛</router-link>
          <!-- </Content> -->
        </van-tab>
        <van-tab title="退款" :style="{height:infoHeight}">
          <!-- <Content class="refund"> -->
            <h3>一个订单都没有哦~</h3>
            <p>给自己定一个小目标，先下一单。</p>
            <router-link to="/home">去逛逛</router-link>
          <!-- </Content> -->
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import Content from '../lib/Content'
export default {
  data() {
    return {
      active:0,
      infoHeight:0
    }
  },
  components:{
       [Tabs.name]:Tabs,
       [Tab.name]:Tab,
       Content
  },
  methods:{
    getHeight(){
      return (window.innerHeight - (this.$refs.orderDetail.$refs.wrap.clientHeight + this.$refs.title.clientHeight) + 'px');
    }
  },
  mounted(){
    this.infoHeight = this.getHeight();
    window.console.log(this.infoHeight);
  }
}
</script>
<style lang="scss" scoped>
.order{
  width: 100%;
  height: 100%;
  .title{
    width: 100%;
    height: 50px;
    background: #FCFCFC;
    position: relative;
    h2{
      font-weight: normal;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #333333;
      font-size: 18px;
    }
    .iconfangdajing{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #333333;
      position: absolute;
      font-size: 18px;
      right: 0;
      top: 0;
    }
  }
  .allOrder{
    top: 0;
    bottom: 49px;
    h3{
      font-weight: normal;
      line-height: 20px;
      font-size: 18px;
      color:#666;
      text-align: center;
      margin-top: 160px;
    }
    p{
      margin-top: 30px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      color: #9F9F9F;
    }
    a{
      width: 240px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: #333;
      font-size: 18px;
      display: block;
      background: #FFCD53;
      margin: 26px auto 0;
      border-radius: 4px;
    }
  }
  .appraise{
    top: 0;
    bottom: 49px;
    h3{
      font-weight: normal;
      line-height: 20px;
      font-size: 18px;
      color:#666;
      text-align: center;
      margin-top: 160px;
    }
    p{
      margin-top: 30px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      color: #9F9F9F;
    }
    a{
      width: 240px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: #333;
      font-size: 18px;
      display: block;
      background: #FFCD53;
      margin: 26px auto 0;
      border-radius: 4px;
    }
  }
  .refund{
    top: 0;
    bottom: 49px;
    h3{
      font-weight: normal;
      line-height: 20px;
      font-size: 18px;
      color:#666;
      text-align: center;
      margin-top: 160px;
    }
    p{
      margin-top: 30px;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      color: #9F9F9F;
    }
    a{
      width: 240px;
      height: 46px;
      line-height: 46px;
      text-align: center;
      color: #333;
      font-size: 18px;
      display: block;
      background: #FFCD53;
      margin: 26px auto 0;
      border-radius: 4px;
    }
  }
}

</style>