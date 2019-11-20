<template>
  <div class="mine">
      	  <app-header title="我的" class="mineh"></app-header>
                  <div class="all">
                              <div class="mine_header">
                                  <span><img src="https://img.meituan.net/maoyanuser/8b5a75c66ef4efb62fb695631b13419212452.png" alt=""></span>
                              </div>

                                <div class="dd">
                                    <h1>我的订单</h1>
                                    <div class="divs">
                                      <div class="div1"><img src="http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/movie.png" alt=""><p>电影</p></div>
                                      <div class="div1"><img src="http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/store.png" alt=""><p>商城</p></div>
                                    </div>
                                </div>
                                <div class="ts">
                                    <h2 >在线观影 <div class="arrow"></div></h2>
                                    <h2>优惠券</h2>
                                    <h2>折扣卡</h2>
                                </div>
                                
                  </div>
                  
  </div>
</template>
<script>
export default {
data () {
  return {
    titles:[
      {id : 1, title : "在线观影",},
      {id : 2, title : "优惠券",},
      {id : 3, title : "折扣卡",},
    ]
  }
}
}
</script>

<style lang="scss" scoped>
.mine{
position: absolute;
top: 0px;
width: 100%;
height: 100%;
.all{
  .mineh{
    background: #e54847 !important;
  }
  background: #eee;
  position: absolute;
  top: 43px;
  bottom: 49px;
  width: 100%;
  height: 100%;
.mine_header{
  position: relative;
  width: 100%;
  height: 150px;
  background: url('http://s0.meituan.net/bs/file/?f=myfe/canary:static/deploy/dpmmweb/client/dpmmweb/component/mycenter/img/bg.png');
      span{
    position: absolute;
    top: 44px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    height: 66px;
    overflow: hidden;
    width: 66px;
    border-radius: 50%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.dd{
  width: 100%;
  height: 149px;
  background: #fff;
  margin-top: 20px;
  h1{
    display: block;
    width: 65px;
    margin: 0 auto;
    padding-top: 20px;
  }
}


.ts{
    height: 88px;
    width: 100%;
    margin-top: 30px;
    h2{
     width: 100%;
     box-sizing: border-box;
     padding: 7px;
     border-bottom: 1px solid #aaa;
     background: #fff;
     height: 30px;

     .arrow {
    display: block;
    width: 5px;
    height: 5px;
    position: absolute;
    bottom: 15px;
    left: 20%;
    margin-left: -11px;
    border: 3px solid transparent;
    border-bottom: 3px solid #000;
    border-right: 3px solid #000;
    z-index: 99;
    opacity: .8;
    transform: rotate(45deg);
    animation: arrow 1.5s infinite ease-in-out;
}
  
@keyframes arrow {
0% {
opacity:0;
-webkit-transform:translate(0, 0px) rotate(45deg)
}
50% {
opacity:1;
-webkit-transform:translate(0, -3px) rotate(45deg)
}
100% {
opacity:0;
-webkit-transform:translate(0, -7px) rotate(45deg)
}}



     }
  }
}


}

.divs{
  display: flex;
  justify-content: space-around;
  text-align: center;
  line-height: 28px;
  
  .div1{
    flex: 1;
    display: flex;
    height: 88px;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
    img{

      width: 44px;
      height: 44px;
  }
  }
  
}


 

</style>
