<template>
  <div class="movie">
    
    <app-header  class="mymovie" title="猫眼电影"></app-header>
    <div class="nav"> 
       <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
               <router-link class="tab pad" to="/movie/city"> 城市<div class="arrow"></div></router-link>
    </transition> 
      <router-link class="tab" to="/movie/NowPlaying"> 正在热映</router-link>
      <router-link class="tab" to="/movie/commingsoon">即将上映</router-link>
      <router-link  class="tab" to="/movie/search"> 搜索</router-link>   
     </div>
   <router-view></router-view>
  </div>
</template>
<script>
import Search from './Search/index'
import CommingSoon from './CommingSoon/index'
import NowPlaying from './NowPlaying/index'
import City from './City/index'

import axios from 'axios'
export default {
  components: {
    // Search,
    // CommingSoon,
    // NowPlaying,
    // City
  },
  props: [String],
  data () {
    return {
      list:[],
      indexSelct:'1',
      MovieList:[]
    }
  },
  methods: {
    requestData(){
     
    },

  },
  created () {
    this.requestData();
}
}
</script>

<style scoped lang=scss>
.movie{
  width: 100%;
  height: 100%;
}
    .mymovie{
        background:#f03d37;
        color: #fff;
    }
    .nav{
        background: #fff;
        position: absolute;
        width: 100%;
        top: 44px;
        height: 44px;
        line-height: 44px;
        display: flex;
         justify-content: space-around;
         text-align: center;
       .tab{
         flex: 1
       }
    }
    .router-link-active{
      border-bottom: 2px solid blue;
      color: #f03d37;
    }
    .pad{
      i{
       transform:skew(7deg); 
      }
    }
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
</style>

