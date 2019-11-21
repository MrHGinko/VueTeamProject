<template>
  <div class="search">
      <app-header :hasBack="true" title="搜索"></app-header>
      <div class="search_box">
        <input type="text" placeholder="输入开始搜索吧" v-model="ls">
        <p @click="searcAction"> 搜索</p>
      </div>
      <div class="search_list">
          <ul>
          <li class="uls licontent" v-for="item in searchList"  :key="item.id"  v-lazy="item">
            <!-- <span>{{item.id}}</span> -->
            <img :src="item.jpgUrl" alt="">
            <div class="licenter">
            <h1>{{item.nm}}</h1>
            <p >观众评：<i>{{item.sc}}</i></p>
            <span class="line-ellipsis">主演：{{item.star}}</span>
            <h3 class="line-ellipsis">{{item.showInfo}}</h3>
            </div>
            <div class="liright">
                <router-link to="/movie/detail" ><p @click="goDetail(item.id)">{{item.pd}}</p></router-link>      
            </div>
          </li>
          </ul>
          </div>
  </div>
</template>

<script>

import VueScroller from 'vue-scroller'
import axios from 'axios';
import Vue from 'vue';
export default {
  props: {

  },
  data () {
    return {
      searchList:[],
       nowplayList:[],
    arr1:[],
    noDate:false,
   arr:[],
  page:1,
  pageSize:10,
  ticket:'',
  ac:false,
  value:'',
  ls:'',
  valuess:[]
    }
  },
methods: {

  goDetail(id){
      this.$router.push(`/movie/detail/${id}`);  
  },


  searcAction(){
    this.value = this.ls;
    console.log(this.value)
    this.requestData();
    //  this.searchMethod();
  },
   requestData(){
 axios.get('/static/movie_list.json', { baseURL: 'http://localhost:8083' })
    .then(response => {
      // console.log(response.data.movieList)
        let ls = response.data.movieList;
        console.log(ls);
   this.arr1 =  ls.map(element => {
         return {
           id:element.id,
           jpgUrl:element.img,
           nm:element.nm,
           rt:element.rt,
           sc:element.sc,
           showInfo:element.showInfo,
           star:element.star,
           wish:element.wish,
           /* 调用判断是否上映显示状态 */
           pd:this.pd(element.showInfo)
         }
  });

    console.log(this.arr1)
    this.arr1.map(element=>{
      this.searcElement(element);
    })
      let pd = this.arr1.forEach(element => {
         this.pd(element.showInfo)
      });


    }).catch(error => {
        window.console.log(error);
    })
    },

    /* 判断是否已经上映 */
    pd(element){
      if(element.substr(0,1)=="2"){
        return this.ticket="预购"
      }else{
        return this.ticket = '购买'
      }
    },
    searcElement(element){
      console.log(element)
      if(element.nm == this.value){
         this.searchList.push(element)
      }
    }

},
created  () {
  this.valuess = this.$store.state.Z_result;
  console.log(this.valuess)
}
}
</script>

<style lang="scss" >
.search{
    position: absolute;
    background: #fff;
    top: 0;
    bottom: 0px;
    width: 100%;
    z-index: 102;
   .search_box{
     width: 100%;
     position: absolute;
     top: 44px;
      input{
        width: 80%;
        margin: 20px 31px;
        border:none;
        border-bottom: 2px solid #333;
        padding: 10px;

      }
      p{
        padding: 10px;
        width: 10%;
        background: #f03d37;
        margin:0 auto;
        color: #fff;
        text-align: center;

      }
   }
   .search_list{
     position: absolute;
     top: 200px;
     width: 100%;
     height: 100%;
     h2{
    height: 200px;
    background: green;
    width: 100%;
  }
  .content{
    overflow-y: auto;
  }
  .router-link-active{
    color: blue;
  }
}
.licontent{
  padding: 12px 14px 12px 12px;
  position: relative;
  overflow: hidden;
  img{
    width: 64px;
    height: 90px;
    position: relative;
    right: 0;
  }
  .licenter{
    width: 207px;
    height: 88px;
    padding-right: 5px;
    margin-right: 48px;
    overflow: hidden;
    position: absolute;
    left: 100px;
    top: 12px;
    h1{
      font-weight: 700;
      color: #333;
      line-height: 24px;
    }
    p{
      font-size: 13px;
      color: #888;
      i{
      color: gold;
       font-weight: 700;
    }
    }

    
      .line-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: #666;
    line-height: 20px;
    }
    
  }
  .liright{
    position: absolute;
    right: 12px;
    top: 30px;
    p{
      background: #f03d37;
      padding: 10px;
      font-size: 12px;
      color: #fff;
      border-radius: 4px;
    }
  }
   }
  }

</style>
  