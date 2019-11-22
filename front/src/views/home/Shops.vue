<template>
  <div class="shops">
      <div class="shop" v-for="(item,index) in shopsData" :key="index" @click="goDetail(item)">
          <img :src="`${item.picUrl}`" alt="">
          <div class="detail">
              <h3>{{item.shopName}}</h3>
              <div class="evaluate">
                  <div class="left">
                      <div class="grade">
                          <i class="iconfont iconpingjia" v-for="(item,index) in 5" :key="index"></i>
                      </div>
                      <span class="score"></span>
                      <span class="onSale iconfont" v-html="item.monthSalesTip"></span>
                  </div>
                  <div class="right">
                      <span class="time iconfont" v-html="item.deliveryTimeTip"></span>
                      <span class="distance iconfont" v-html="item.distance"></span>
                  </div>
              </div>
              <p class="price">
                  <span class="iconfont" v-html="item.minPriceTip"></span>
                  <span class="iconfont" v-html="item.shippingFeeTip"></span>
                  <span class="iconfont" v-html="item.averagePriceTip"></span>
              </p>
              <p class="discount" v-for="(item,index) in item.discounts2" :key="index">
                  <img :src="`${item.iconUrl}`" alt="" >
                  <span class="discountDetail iconfont" v-html="item.info"></span>
              </p>
          </div>
      </div>
      <router-view></router-view>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            shopsData:[]
        }
    },
    methods:{
    //获取头都导航数据
    requestData(){
      axios.get('/data/poilist.json',{baseURL:'http://localhost:8080'})
      .then(response=>{
        let Data = response.data.data.data.shopList;
          Data.forEach((item,index)=>{
            this.shopsData.push(item);
            // window.console.log(item);
        })
      }).catch(error=>{
        window.console.log(error);
      })
    //   window.console.log(this.$router);
    },
    goDetail(item){
        this.$store.commit('shoppingCart/sendShopInfo',item);
        this.$router.push(`detail/${item.mtWmPoiId}`);
    },
    listener(data){
            // window.console.log(Math.abs(data));
            if(Math.abs(data) > 1800 && Math.abs(data) < 1900){
                this.requestData();
            }
        },
  },
  created(){
    this.requestData();
        // window.console.log(this.shopsData);
    this.$center.$on('scrollTop', this.listener);
     
  },
  beforeUpdate() {
        // window.console.log(this.shopsData);
        // window.console.log(this);
  },
  beforeDestroy(){
		this.$center.$off('scrollTop', this.listener);
    }
}
</script>
<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
.shops{
    width: 100%;
    .shop{
        width: 100%;
        // height: 120px;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 10px 0 25px 0;
        display: flex;
        color: #333;
        text-decoration: none;
        img{
            width: 76px;
            height: 57px;
            margin-right: 10px;
        }
        .detail{
            // height: 108px;
            flex: 1;
            h3{
                height: 18px;
                line-height: 18px;
                font-size: 16px;
                font-weight: 600;
            }
            .evaluate{
                height: 16px;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                margin-top: 4px;
                .left{
                    height: 16px;
                    overflow: hidden;
                    .grade{
                        height: 16px;
                        line-height: 16px;
                        float: left;
                        .iconfont{
                            font-size: 10px;
                            color: #FFD454;
                            margin-right: 4px;
                            float: left;
                        }
                    }
                    .score{
                        float: left;
                    }
                    .onSale{
                        font-size: 12px;
                        margin-left: 10px;
                        float: left;
                    }
                }
                .right{
                    flex: 1;
                    text-align: right;
                    .iconfont{
                        font-size: 12px;
                    }
                    .time{

                    }
                    .distance{
                        margin-left: 4px;
                    }
                }
            }
            .price{
                height: 16px; 
                font-size: 12px;
                margin-top: 4px;
                .iconfont{
                    font-size: 12px;
                    margin-right: 4px;
                }
            }
            .discount{
                height: 16px;
                margin-top: 4px;
                font-size: 12px;
                display: flex;
                img{
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                }
                .discountDetail{
                    flex: 1;
                    width: 200px;
                    font-size: 11px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>