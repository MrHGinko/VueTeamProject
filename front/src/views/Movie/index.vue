<template>
  <div class="movie">
    
    <app-header  class="mymovie" title="猫眼电影"></app-header>
    <div class="nav"> 
       <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
               <router-link class="tab" to="/movie/city"> 城市</router-link>
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
</style>

