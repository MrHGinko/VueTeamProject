<template>
  <div class="detail">
    <header class="header" ref="header">
        <i class="iconfont iconarrow-right" @click="backAction"></i>
    </header>
    <div class="notice" ref="notice">
        <img class="ShopInfo_picUrl" :src="`${this.ShopInfo.picUrl}`" alt="">
        <div class="noticeInfo">
            <div class="time_distance" >
                <span class="iconfont deliveryTimeTip" v-html="this.ShopInfo.deliveryTimeTip"></span>
                <span class="iconfont distance" v-html="this.ShopInfo.distance"></span>
            </div>
            <p class="announcement">公告：欢迎光临，很高兴为您服务</p>
            <div class="ShopInfo_discount">
                <img class="ShopInfo_iconUrl" :src="`${this.ShopInfo.discounts2[0].iconUrl}`" alt="">
                <span class="ShopInfo_info iconfont" v-html="this.ShopInfo.discounts2[0].info"></span>
                <i class="iconfont iconarrow-left"></i>
            </div>
        </div>
    </div>

    <van-tabs v-model="active" ref="menus" animated line-width="20px" color="#ffd300">
        <van-tab title="点菜">
            <div class="info" :style="{height:contentHeight}">
            <LeftInfoBox class="left_info" ref="leftInfo" :style="{height:infoHeight}">
                <div class="left_info_nav" v-for="(item,index) in shopData" :key="index" @click="navAction(index)" :style="{background:(index == 0 ? '#fff' : '')}">{{item.categoryName}}</div>
            </LeftInfoBox>
            <RightInfoBox class="right_info" ref="rightInfo" :style="{height:infoHeight}">
                <div class="kind" v-for="(item,index) in shopData" :key="index">
                    <h3>{{item.categoryName}}</h3>
                    <div class="commodity" v-for="(commodity,index) in item.spuList" :key="index" @click="showShopInfoDetail(commodity)">
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
                                <div class="changeNum">
                                    <div class="reduceCart" v-if="commodity.saleVolume == 0?false:true">
                                        <i class="iconfont iconjianhao" @click="reduceCart(commodity)"></i>
                                        <span class="num">{{commodity.saleVolume}}</span>
                                    </div>
                                    <i class="iconfont iconjiahao" @click="addCart(commodity)"></i>
                                </div>
                            </div>
                            <!-- <p>{{commodity.spuId}}</p> -->
                            <div class="discount">
                                <span :class="{discountDetail:(commodity.spuPromotionInfo?true:false)}">{{commodity.spuPromotionInfo?commodity.spuPromotionInfo:''}}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </RightInfoBox>
            </div>
            
        </van-tab>
        <van-tab title="评价" :style="{height:contentHeight}" class="appraise">
            内容 2
        </van-tab>
        <van-tab title="商家" :style="{height:contentHeight}" class="merchant">
            <div class="site">{{this.ShopInfo.address}}
                <i class="iconfont iconlocation"></i>
                <i class="iconfont icondianhua"></i>
            </div>
            <div class="safetyArchive">查看食品安全档案
                <i class="iconfont iconchakanshipinanquandangan-"></i>
                <i class="iconfont iconarrow-left"></i>
            </div>
            <div class="time">配送时间 : {{this.ShopInfo.shipping_time}}
                <i class="iconfont iconshijian"></i>
            </div>
            <div class="announcement">麦辣鸡腿汉堡脆辣带劲限时特惠9.9元
                <i class="iconfont icongonggao"></i>
                <i class="iconfont iconarrow-left"></i>
            </div>
            <div class="shopServer">
                <i class="iconfont iconshangjiafuwu"></i>
                <p>商家服务</p>
                <div class="shopServer_right">
                    <div class="shopServerInfo" v-for="item in 2" :key="item">
                        <i class=""></i>
                        <span class="shopServerInfo_">该商户为品牌商户</span>
                    </div>
                </div>
            </div>
            <div class="privilege">
                <div class="privilegeInfo" v-for="(item,index) in ShopInfo.discounts2" :key="index">
                    <img class="privilegeInfo_img" :src="`${item.iconUrl}`" alt="">
                    <span class="privilegeInfo_ iconfont" v-html="item.info"></span>
                </div>
            </div>
        </van-tab>
    </van-tabs>
    <div class="shopping" ref="shopping" v-show="this.active == 0 ? true : false">
        <div class="shoppingCart" @click="showPopup">
            <i class="iconfont icongouwuchekong"></i>
            <span class="num" v-show="commodities.length==0?false:true">{{sum}}</span>
        </div>
        <div class="totalPrices">
            <div class="addDispatchPrice iconfont" v-html="this.ShopInfo.shippingFeeTip" v-if="commodities.length == 0 ? true : false"></div>
            <div class="totalPrices_" v-if="commodities.length == 0 ? false:true">
                <div class="Prices_">
                    <span class="totalCurrentPrice">￥{{totalPrices}}</span>
                    <span class="totalOriginPrice">￥{{totalOriginPrice}}</span>
                </div>
                <span class="dispatchPrice iconfont" v-html="this.ShopInfo.shippingFeeTip"></span>
            </div>
        </div>
        <div class="min_price iconfont" v-if="commodities.length==0?true:false" v-html="this.ShopInfo.minPriceTip"></div>
        <router-link class="pay" @click="toPay" v-if="commodities.length==0?false:true" to ="/pay">去结算</router-link>
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
                <span class="price">￥{{item.currentPrice * item.saleVolume}}</span>
            </div>
            <div class="quantity">
                <i class="iconfont iconjianhao" @click="reduceQuantity(item)"></i>
                <span class="num">{{item.saleVolume}}</span>
                <i class="iconfont iconjiahao" @click="addQuantity(item)"></i>
            </div>
        </div>
    </van-popup>

    
  </div>
  
</template>

<script>
import axios from 'axios'
import Content from '../lib/Content'
import RightInfoBox from './RightInfo'
import LeftInfoBox from './LeftInfo'
import { Tab, Tabs, Popup} from 'vant';
export default {
    props:{
        id:String
    },
    data(){
        return{
            shopData:[],
            active: 0,
            infoHeight:0,
            contentHeight:0,
            commodities:[],
            show: false,
            ShopInfo:[],
            shopInfoDetail:null,
            shows:false
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
   computed: {
       totalPrices(){
           let count = 0;
           this.commodities.forEach(item=>{
               count += (item.currentPrice * item.saleVolume * 10);
           })
           return count = count / 10;
       },
       totalOriginPrice(){
           let count = 0;
           this.commodities.forEach(item=>{
               count += (item.originPrice * item.saleVolume * 10);
           })
           return count = count / 10;
       },
       sum(){
           let sum = 0;
           this.commodities.forEach((item,index)=>{
               sum += item.saleVolume;
           })
            return sum;
       }
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
            let leftInfoList = this.$refs.leftInfo.$el.children[0].children;
            for(var j = 0; j < leftInfoList.length; j++){
                if(j == index){
                   leftInfoList[j].style.background = '#fff';
                }else{
                    leftInfoList[j].style.background = '';
                }
            }
            this.$center.$emit('send', rollY);
        },
        listener(data){
            // window.console.log(data);
            let arr = [0];
            this.$refs.rightInfo.$el.children[0].childNodes.forEach(item=>{
                arr.push(item.clientHeight);
            })
            // window.console.log(arr);
            let leftInfoList = this.$refs.leftInfo.$el.children[0].children;
            let sum = arr.reduce(function(prev, cur, index, arr) {
                    // console.log(prev, cur, index);
                    // console.log(prev,(prev + cur),index);
                if(Math.abs(data) >= prev && Math.abs(data) < (prev + cur)){
                    leftInfoList[index-1].style.background = '#fff';
                }else{
                    leftInfoList[index-1].style.background = '';
                }
                return prev + cur;
            })
        },
        getHeight(){
            return (window.innerHeight - (this.$refs.header.clientHeight + this.$refs.notice.clientHeight*1.25 + this.$refs.menus.$refs.wrap.clientHeight + this.$refs.shopping.clientHeight) + 'px');
        },
        getContentHeight(){
            return (window.innerHeight - (this.$refs.header.clientHeight + this.$refs.notice.clientHeight*1.25 + this.$refs.menus.$refs.wrap.clientHeight) + 'px');
        },
        addCart(commodity){
            ++commodity.saleVolume;
            // window.console.log(commodity)
            this.commodities.push(commodity);
           
            this.commodities = Array.from(new Set(this.commodities));
            this.$store.commit('shoppingCart/setCartInfo',this.commodities);
            // window.console.log(this.commodities);
        },
        reduceCart(commodity){
            this.commodities.forEach((item,index)=>{
                if(item == commodity){
                    item.saleVolume -= 1;
                    if(item.saleVolume <= 0){
                        item.saleVolume = 0;
                        this.commodities.splice(index,1);
                    }
                }
            })
            // this.$store.commit('shoppingCart/setCartInfo',this.commodities);
        },
        showPopup() {
            if(this.commodities.length == 0){
                this.show = false;
            }else{
                this.show = true;
            }
        },
        emptyCart(){
            this.commodities.forEach(item=>{
                item.saleVolume = 0;
            })
            this.commodities = [];
            this.$store.commit('shoppingCart/setCartInfo',this.commodities);
            this.show = false;
        },
        addQuantity(item){
            this.commodities.forEach(value=>{
                if(value == item){
                    value.saleVolume += 1;
                }
            })
            this.$store.commit('shoppingCart/setCartInfo',this.commodities);
        },
        reduceQuantity(item){
             this.commodities.forEach((value,index)=>{
                if(value == item){
                    value.saleVolume -= 1;
                    if(value.saleVolume <= 0 ){
                        value.saleVolume = 0;
                        this.commodities.splice(index,1);
                        if(this.commodities.length == 0){
                            this.show = false;
                        }
                    }
                }
            })
            this.$store.commit('shoppingCart/setCartInfo',this.commodities);
            // window.console.log(this.commodities);
            // window.console.log(this.show);
        },
        backAction(){
            history.back();
        },
        toPay(){
            this.$store.commit('shoppingCart/setCartInfo',this.commodities);
            // window.console.log(this.$store);
        },
        showShopInfoDetail(commodity){
            this.shows = true;
            window.console.log('点击了',commodity);
            this.shopInfoDetail = commodity;
            window.console.log(this.shopInfoDetail);
        }
    },
    created(){  
        
        // window.console.log(this.$store.getters['shoppingCart/getCartInfo']);
        this.commodities = this.$store.getters['shoppingCart/getCartInfo'];

        this.ShopInfo = this.$store.getters['shoppingCart/getShopInfo'];
        this.requestData();
        this.$center.$on('onScroll', this.listener);
        // window.console.log(this.ShopInfo);
        // window.console.log(this.commodities);
        // window.console.log(this.ShopInfo.minPriceTip.substring(4))
    },
    mounted(){
        this.infoHeight = this.getHeight();
        this.contentHeight = this.getContentHeight();
    },
    beforeDestroy(){
        this.$center.$off('onScroll', this.listener);
	}
}
</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
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
    .notice{
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        padding: 5px 0 0 10px;
        margin-bottom: 20px;
        background: #2E2F3B;
        display: flex;
        .ShopInfo_picUrl{
            width: 85px;
            height: 64px;
            margin-right: 10px;
        }
        .noticeInfo{
            flex: 1;
            .time_distance{
                width: 100%;
                height: 16px;
                margin-bottom: 5px;
                .deliveryTimeTip{
                    line-height: 16px;
                    font-size: 12px;
                    color: #fff;
                    margin-right: 9px;
                    float: left;
                }
                .distance{
                    float: left;
                    line-height: 16px;
                    font-size: 12px;
                    color: #fff;
                }
            }
            .announcement{
                line-height: 16px;
                font-size: 12px;
                color: #fff;
                margin-bottom: 10px;
            }
            .ShopInfo_discount{
                width: 100%;
                box-sizing: border-box;
                padding-right: 10px;
                height: 16px;
                // display: flex;
                .ShopInfo_iconUrl{
                    width: 16px;
                    height: 16px;
                    float: left;
                    margin-right: 6px;
                }
                .ShopInfo_info{
                    line-height: 16px;
                    font-size: 12px;
                    color: #fff;
                    float: left;
                    max-width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .iconarrow-left{
                    float: right;
                    color: #fff;
                    line-height: 16px;
                    font-size: 12px;
                }
            }
        }
    }
    .info{
        width: 100%;
        // height: 100%;
        background: #fff;
        .left_info{
            width: 80px;
            height: 100%;
            top:0;
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
            top: 0;
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
                            .changeNum{
                                float: right;
                                .reduceCart{
                                    float: left;
                                    
                                    .iconjianhao{
                                        font-size: 24px;
                                        padding: 15px 10px;
                                        margin-top: -15px;
                                        float: left;
                                    }
                                    .num{
                                        float: left;
                                        padding: 0 5px;
                                        font-size: 16px;
                                        color: #333;
                                        line-height: 22px;
                                        text-align: center;
                                    }
                                }
                                .iconjiahao{
                                    float: right;
                                    color:#FFC337; 
                                    font-size: 24px;
                                    padding: 15px 10px;
                                    margin: -15px -10px 0 0;
                                }
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
        z-index: 2008;
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
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            .addDispatchPrice{
                font-size: 14px;
                color: #999;
                width: 100%;
                height: 50px;
                line-height: 50px;
            }
            .totalPrices_{
                width: 100%;
                height: 50px;
                .Prices_{
                    width: 100%;
                    height: 28px;
                    .totalCurrentPrice{
                        font-size: 24px;
                        color: #fff;
                        line-height: 28px;
                        float: left;
                        margin-right: 5px;
                    }
                    .totalOriginPrice{
                        float: left;
                        font-size: 12px;
                        color: #999;
                        line-height: 14px;
                        margin-top: 12px;
                        text-decoration: line-through;
                    }
                }
                .dispatchPrice{
                    font-size: 12px;
                    line-height: 12px;
                    display: inline-block;
                }
            }
        }
        .pay{
            position: absolute;
            right: 0;
            top: 0;
            height: 50px;
            line-height: 50px;
            text-align: center;
            padding: 0 18px;
            font-size: 16px;
            // color: #999;
            color: #333;
            background: #f8c74e;
        }
        .min_price{
            position: absolute;
            right: 0;
            top: 0;
            height: 50px;
            line-height: 50px;
            text-align: center;
            padding: 0 18px;
            font-size: 16px;
            color: #999;
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
        box-sizing: border-box;
        padding: 0 15px;
        .site{
            margin: 18px 0;
            box-sizing: border-box;
            padding: 0 50px 0 24px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            position: relative;
            .iconlocation{
                position: absolute;
                left: 0;
                top: 0;
            }
            .icondianhua{
                position: absolute;
                top: calc(50% - 10px);
                right: 0;
                font-size: 20px;
                // margin: 10px 0 0 15px;
            }
        }
        .safetyArchive{
            margin: 18px 0;
            box-sizing: border-box;
            padding: 0 50px 0 24px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            position: relative;
            .iconchakanshipinanquandangan-{
                position: absolute;
                left: 0;
                top: 0;
            }
            .iconarrow-left{
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .time{
            margin: 18px 0;
            box-sizing: border-box;
            padding: 0 50px 0 24px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            position: relative;
            .iconshijian{
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .announcement{
            margin: 18px 0;
            box-sizing: border-box;
            padding: 0 50px 0 24px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            position: relative;
            .icongonggao{
                position: absolute;
                left: 0;
                top: 0;
            }
            .iconarrow-left{
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .shopServer{
            margin: 18px 0;
            box-sizing: border-box;
            padding: 0 50px 0 24px;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            position: relative;
            display: flex;
            .iconshangjiafuwu{
                position: absolute;
                left: 0;
                top: 0;
            }
            p{
                line-height: 20px;
                font-size: 14px;
                color: #333;
                margin: 0;
            }
            .shopServer_right{
                flex: 1;
                padding-left: 15px;
                .shopServerInfo{
                    color: #333;
                    padding-left: 21px;
                    margin-right: 15px;
                    .shopServerInfo_{
                        display: block;
                        font-size: 12px;
                        line-height: 20px;
                    }
                }
            }
        }
        .privilege{
            margin: 18px 0;
            box-sizing: border-box;
            font-size: 14px;
            line-height: 20px;
            color: #333;
            .privilegeInfo{
                margin-bottom: 5px;
                line-height: 20px;
                display: flex;
                .privilegeInfo_img{
                    width: 15px;
                    height: 15px;
                    margin-top: 2.5px;
                    display: inline-block;
                }
                .privilegeInfo_{
                    line-height: 20px;
                    color: #333;
                    font-size: 14px;
                    margin-left: 7px;
                    flex: 1;
                }
            }
        }

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