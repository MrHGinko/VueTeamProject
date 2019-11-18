<template>
  <div class="detail">
      <header class="header" ref="header"></header>
      <div class="notice" ref="notice"></div>

    <van-tabs v-model="active" ref="menus" animated line-width="20px" color="#ffd300">
        <van-tab title="点菜" :style="{height:infoHeight}">
            <div class="info" >
            <LeftInfoBox class="left_info" ref="leftInfo">
                <div class="left_info_nav" v-for="(item,index) in shopData" :key="index" @click="navAction(index)">{{item.categoryName}}</div>
            </LeftInfoBox>
            <RightInfoBox class="right_info" ref="rightInfo">
                <div class="kind" v-for="(item,index) in shopData" :key="index">
                    <h3>{{item.categoryName}}</h3>
                    <div class="commodity" v-for="(commodity,index) in item.spuList" :key="index">
                        <img :src="`${commodity.bigImageUrl}`" alt="">
                        <div class="commodityDetail">
                            <h2>{{commodity.spuName}}</h2>
                            <p>{{commodity.spuDesc}}</p>
                            <div class="sell">
                                <span class="monthSell iconfont" v-html="'月售' + commodity.saleVolumeDecoded"></span>
                                <span class="praise iconfont" v-html="'赞' + commodity.praiseNumDecoded"></span>
                            </div>
                            <div class="price">
                                <span class="currentPrice">￥{{commodity.currentPrice}}</span>
                                <span class="originPrice">￥{{commodity.originPrice}}</span>
                                <i class="iconfont iconjiahao" @click="addCart(commodity)"></i>
                            </div>
                            <p>{{commodity.spuId}}</p>
                            <div class="discount">
                                <span :class="{discountDetail:(commodity.spuPromotionInfo?true:false)}">{{commodity.spuPromotionInfo?commodity.spuPromotionInfo:''}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </RightInfoBox>
            </div>
            
        </van-tab>
        <van-tab title="评价" :style="{height:infoHeight}" class="appraise">
            内容 2
        </van-tab>
        <van-tab title="商家" :style="{height:infoHeight}" class="merchant">
            内容 3
        </van-tab>
    </van-tabs>
    <div class="shopping">
        <div class="shoppingCart" @click="showPopup">
            <i class="iconfont icongouwuchekong"></i>
            <span class="num" v-show="commodities.length==0?false:true">{{commodities.length}}</span>
        </div>
        <div class="totalPrices"></div>
        <div class="pay"></div>
    </div>
    <van-popup v-model="show" class="shoppingDetail"  position="bottom"
        :style="{ 'height': '50%' }">
        <header class="header">
            <span class="title">购物车</span>
            <span class="empty iconfont iconlaji" @click="emptyCart">清空购物车</span>
        </header>
        <div class="shoppingList" v-for="(item,index) in commodities" :key="index">
            <div class="shoppingInfo">
                <span class="shoppingName">{{item.spuName}}</span>
                <span class="price">￥{{item.currentPrice}}</span>
            </div>
            <div class="quantity">
                <i class="iconfont iconjianhao"></i>
                <span class="num">1个</span>
                <i class="iconfont iconjiahao"></i>
            </div>
        </div>
    </van-popup>
      <!-- <nav class="nav">
          <li>点菜</li>
          <li>评价</li>
          <li>商家</li>
      </nav> -->
      <!-- <div class="info">
          <LeftInfoBox class="left_info" ref="leftInfo">
              <div class="left_info_nav" v-for="(item,index) in shopData" :key="index" @click="navAction(index)">{{item.categoryName}}</div>
          </LeftInfoBox>
          <RightInfoBox class="right_info" ref="rightInfo">
              <div class="kind" v-for="(item,index) in shopData" :key="index">
                  <h3>{{item.categoryName}}</h3>
                  <div class="commodity" v-for="(commodity,index) in item.spuList" :key="index">
                      <img :src="`${commodity.bigImageUrl}`" alt="">
                      <div class="commodityDetail">
                          <h2>{{commodity.spuName}}</h2>
                          <p>{{commodity.spuDesc}}</p>
                          <div class="sell">
                              <span class="monthSell iconfont" v-html="'月售' + commodity.saleVolumeDecoded"></span>
                              <span class="praise iconfont" v-html="'赞' + commodity.praiseNumDecoded"></span>
                          </div>
                          <div class="price">
                              <span class="currentPrice">￥{{commodity.currentPrice}}</span>
                              <span class="originPrice">￥{{commodity.originPrice}}</span>
                              <i class="iconfont iconjiahao"></i>
                          </div>
                          <div class="discount">
                              <span :class="{discountDetail:(commodity.spuPromotionInfo?true:false)}">{{commodity.spuPromotionInfo?commodity.spuPromotionInfo:''}}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </RightInfoBox>
      </div> -->
      <!-- <div class="shopping">
          <div class="shoppingCart">
              <i class="iconfont icongouwuchekong"></i>
              <span class="num">1</span>
          </div>
          <div class="totalPrices"></div>
          <div class="pay"></div>
      </div> -->
      <!-- <slot/> -->
  </div>
  
</template>

<script>
import axios from 'axios'
import Content from '../lib/Content'
import RightInfoBox from './RightInfo'
import LeftInfoBox from './LeftInfo'
import { Tab, Tabs, Popup} from 'vant';
export default {
    data(){
        return{
            shopData:[],
            active: 0,
            infoHeight:0,
            commodities:[],
            show: false
        }
    },
   components:{
       Content,
       RightInfoBox,
       LeftInfoBox,
       [Tabs.name]:Tabs,
       [Tab.name]:Tab,
       [Popup.name]:Popup
   },
    methods:{
        requestData(){
        axios.get('/data/shopDatas.json',{baseURL:'http://localhost:8080'})
        .then(response=>{
            let Data = response.data.data.categoryList;
            let shopInfo = response.data.data.shopInfo;
            Data.forEach((item,index)=>{
                this.shopData.push(item);
            })
            // for(var key in shopInfo){
            //     this.shopInfos.push(shopInfo[key]);
            // }
            // window.console.log(this.shopData);
            // window.console.log(shopInfo);
        }).catch(error=>{
            window.console.log(error);
        })
        },
        navAction(index){
            let rollY = null;
            if(index == 0){
                rollY = 0;
            }else if(index > 0){
                for(var i = 0 ; i < index; i++){
                    rollY += this.$refs.rightInfo.$el.children[0].childNodes[i].clientHeight;
                    // window.console.log(rollY);
                }
            }
            this.$center.$emit('send', rollY);
            let leftInfoList = this.$children[0].$el.children[0].childNodes;
            for(var j = 0; j < leftInfoList.length; j++){
                if(j == index){
                   leftInfoList[j].style.background = '#fff';
                }else{
                    leftInfoList[j].style.background = '';
                }
            }
        },
        listener(data){
            // window.console.log(data);
        },
        getHeight(){
            return (window.innerHeight - (this.$refs.header.clientHeight + this.$refs.notice.clientHeight*1.25 + this.$refs.menus.$refs.wrap.clientHeight) + 'px');
        },
        addCart(commodity){
            // this.shopData.forEach(item => {
            //     item.spuList.forEach((item,index) => {
            //         //  window.console.log(item.spuId);
            //         //  window.console.log(item);
            //          if(id === item.spuId){
            //              window.console.log(item);
            //          }
            //     })
            // })
            this.commodities.push(commodity);
            // window.console.log(this.commodities);
        },
        showPopup() {
            if(this.commodities.length == 0){
                this.show = false;
            }else{
                this.show = true;
            }
        },
        emptyCart(){
            this.commodities = [];
            this.show = false;
        }
       
    },
    created(){
        this.requestData();
        // window.console.log(this.$children);
        this.$center.$on('onScroll', this.listener);
    },
    mounted(){
        this.infoHeight = this.getHeight();
        // window.console.log(this.commodities);
    },
    beforeDestroy(){
		this.$center.$off('onScroll', this.listener);
	}
}
</script>
<style lang="scss" scoped>
h1,h2,h3,h4,h5,h6{
    font-weight: normal;
}
.detail{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 666;
    .header{
        width: 100%;
        height: 50px;
        background: #2E2F3B;
    }
    .notice{
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        padding: 5px 0 0 95px;
        margin-bottom: 20px;
        background: #2E2F3B;
    }
    .info{
        width: 100%;
        height: 100%;
        .left_info{
            width: 80px;
            height: 100%;
            background: #F5F5F5;
            .left_info_nav{
                padding: 9px 10px 22px;
                font-size:13px;
                color: #666;
                line-height: 16px;
            }
        }
        .right_info{
            width: calc(100% - 80px);
            height: 100%;
            left: 80px;
            background: #fff;
            .kind{
                width: 100%;
                box-sizing: border-box;
                padding:0 10px;
                h3{
                    font-size: 12px;
                    color: #333;
                    height: 36px;
                    line-height: 36px;
                   
                }
                .commodity{
                    width: 100%;
                    height: 100px;
                    padding-bottom: 22px;
                    display: flex;
                    img{
                        width: 75px;
                        height: 75px;
                    }
                    .commodityDetail{
                        width: calc(100% - 75px);
                        h2{
                            font-size: 16px;
                            line-height: 22px;
                            color: #333;
                            font-weight: bold;
                            min-width: 100px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-bottom: 2px;
                        }
                        p{
                            min-width: 100px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            line-height: 14px;
                            font-size: 11px;
                            color: #666;
                            margin-bottom: 3px;
                        }
                        .sell{
                            line-height: 15px;
                            margin-bottom: 3px;
                            .monthSell{
                                font-size: 11px;
                                color: #666;
                                margin-right: 10px;
                            }
                            .praise{
                                font-size: 11px;
                                color: #666;
                            }

                        }
                        .price{
                            height: 22px;
                            line-height: 22px;
                            .currentPrice{
                                display: inline-block;
                                height: 22px;
                                font-size: 18px;
                                color: #fb4e44;
                            }
                            .originPrice{
                                display: inline-block;
                                font-size: 11px;
                                color: #a9a9a9;
                                margin-left: 4px;
                                text-decoration: line-through;
                            }
                            .iconjiahao{
                                float: right;
                                color:#FFC337; 
                                font-size: 24px;
                            }
                        }
                        .discount{
                            height: 16px;
                            margin-top: 4px;
                            .discountDetail{
                                text-align:center;
                                font-size: 10px;
                                color: #fb4e44;
                                border: 1px solid #fb4e44;
                                box-sizing: border-box;
                                padding: 1px;
                            }
                        }
                    }
                }
            }
        }
    }
    .shopping{
        width: 100%;
        height: 50px;
        background: #3B3B3C;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        z-index: 9999;
        .shoppingCart{
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: #666666;
            border-radius: 50%;
            position: relative;
            left: 10px;
            bottom: 10px;
            margin-right: 10px;
            .icongouwuchekong{
                color:#C4C4C4;
                font-size: 30px;
            }
            .num{
                width: 16px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                color: #fff;
                background: #FB4E44;
                border-radius: 50%;
                position: absolute;
                top: -1px;
                right: -1px;
            }
        }
        .totalPrices{
            flex: 1;
            height: 50px;
            font-size: 14px;
            color: #999999;
        }
        .pay{
            height: 50px;
            padding: 0 18px;
            font-size: 16px;
            color: #999999;
        }
    }
    .appraise{
        background: #fff;
        position: relative;
        z-index: 999;
    }
    .merchant{
        background: #fff;
        position: relative;
        z-index: 999;
    }
    .shoppingDetail{
        width: 100%;
        .header{
            width: 100%;
            height: 38px;
            padding: 4px 15px;
            background: #F4F4F4;
            box-sizing: border-box;
            .title{
                float: left;
                font-size: 12px;
                color:#333;
                line-height: 30px;
            }
            .empty{
                float: right;
                font-size: 12px;
                color:#333;
                line-height: 30px;
            }
        }
        .shoppingList{
            box-sizing: border-box;
            width: 100%;
            height: 60px;
            padding:0 15px;
            display: flex;
        }
        .shoppingInfo{
            flex: 1;
            display: flex;
            .shoppingName{
                flex: 1;
                display: flex;
                align-items: center;
                font-size: 16px;
                color: #333;
            }
            .price{
                height: 60px;
                line-height: 60px;
                font-size: 16px;
                color: #FB4E44;
                margin: 0 25px;
            }
        }
        .quantity{
            height: 30px;
            .iconjianhao{
                width: 25px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                padding: 15px 10px;
                display: inline-block;
                font-size: 16px;
            }
            .num{
                height: 30px;
                text-align: center;
                line-height: 30px;
                display: inline-block;
                font-size: 16px;
                color: #333;
            }
            .iconjiahao{
                width: 25px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                padding: 15px 10px;
                display: inline-block;
                font-size: 16px;
                color: #FFC337;
            }
        }
    }
}

</style>