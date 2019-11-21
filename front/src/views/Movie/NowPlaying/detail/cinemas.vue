<template>
<div class="cinemas">
  <router-view></router-view>
  <app-header :hasBack="true" title="附近的电影院"></app-header>
  <app-scroll class="cinemas_content" >
  <div >
          
          <router-link :to= "ids2">
          <div class="licontents" v-for="(item,index) in arr"  :key="index"  v-lazy="item" @click="cinemaAction(item.id)"  >
            <!-- <span>{{item.id}}</span> -->
            <div class="licenter">
            <h1 class="h11">{{item.nm}}</h1>
            <h5 >{{item.sellPrice}}<i>元起</i></h5>
            <span class="line-ellipsisss">{{item.addr}}</span>
            <h3  class="h33 " ref="h33" :class="classVal">距离你所在的位置：<em>{{item.distance}}</em></h3>
            </div>
          </div>  
      </router-link>
  </div>
  </app-scroll> 
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
export default {
  
  data () {
    return {
            value:'',
            arr:[],
            arr1:[],
            indexs:null
    }
  },
  computed: {
    ids2(){
      return `/movie/detail/${this.value}/selectcinema` 
    }
  },

  methods: {
    /* vuex管理影院id */
    cinemaAction(index){
        let idss = window.location.href;
        let ass = idss.indexOf(1);
        let bss = idss.slice(ass,ass+7);
        this.value = bss;
        // console.log(index)
        this.indexs = index;
        // console.log('点击选择影院')
        this.$store.commit('getCinemaSelect', this.indexs);
    }, 

        requestData(){

        axios.get('/static/cinema_data.json', { baseURL: 'http://localhost:8083' })
            .then(response => {
         console.log(response)
          let ls = response.data.cinemas;
            console.log(ls)
          this.arr =  ls.map(element => {
         return {
           id:element.id,
           sellPrice:element.sellPrice,
           nm:element.nm,
           addr:element.addr,
           sellPrice:element.sellPrice,
           distance:element.distance,
         }
  });
  // console.log(this.arr)
              this.arr.map(element=>{        
                  this.searcElement(element);     
                    })
                    this.playerOptions.sources[0].src = this.arr1[0].video;
                    }).catch(error => {
                        window.console.log(error);
                    })
    },
  },
  created () {
    this.requestData();
    this.cinemaAction()
  }

}
</script>

<style>
.cinemas{
    position: absolute;
    top: 0;
    bottom:0;
    background: #fff;
    width: 100%;
   height: 100%;
    z-index: 106;
    
}
.cinemas_content{
      position: absolute;
      top: 44px;
      width: 100%;
      height: 100%;
      bottom: 0;
    }
  .licontents{
    position: relative;
    padding: 10px;
    border-bottom: 1px solid #eee;
    line-height: 26px;
  }
  .licontents h5 {
    position: absolute;
    right: 22px;
    top: 10px;
    color: gold;
    font-weight: 500;
  }
   .licontents h5 i{
     color: red;
     font-weight: 100;
     font-size: 12px;
   }
    .line-ellipsisss{
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300px;
    overflow: hidden;
    color: #666;
    font-size:13px;
    }
    .h11{
      color: #333;
      font-weight: 900;
    }
    .h33{
      color: #999;
    }
    .h33 em{
      color: blueviolet;
    }
</style>