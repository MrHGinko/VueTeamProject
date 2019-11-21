<template>
  <div class="detail">
      <h1>111</h1>
     <router-view></router-view> 

       <app-header :hasBack="true" :title="arr1[0].nm " class="app_de"></app-header>
       <div class="detail_content">
            <app-scroll class="content" >
          <ul>
          <li class="uls licontent" v-for="item in arr1"  :key="item.id"  v-lazy="item">
            <!-- <span>{{item.id}}</span> -->
           
           <video-player  class="video-player vjs-custom-skin vjs-big-play-button posi"
            ref="videoPlayer"
            :playsinline="false"
            :options="playerOptions"></video-player>
 <img :src="item.jpgUrl" alt="">
            <div class="licenter">
            <h1>影片名：{{item.nm}}</h1>
            <h5 >观众评：<i>{{item.sc}}</i></h5>
            <span class="line-ellipsis">主演：{{item.star}}</span>
            <h3  class="line-ellipsis " ref="h3" :class="classVal">详情信息：{{item.info}}</h3>
            </div>
          </li>
          </ul>
        </app-scroll>
        <div class="goumai">
           <router-link :to="ids"><h2>我想购票</h2></router-link>
           
       </div>
    <p @click="zkAction">{{iszk}}</p>
       </div>
          
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
    components: {
    videoPlayer
  },
    props: {
        id: String,
        // title:String,
    },
    data () {
        return {

            classVal:'h3css',
            value:'',
            iszk:'展开',
            arr:[],
            arr1:[],
            playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: '',  // 路径
          type: 'video/mp4'  // 类型
        }, {
          src: '//path/to/video.webm',
          type: 'video/webm'
        }],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
        }
    },
    computed: {
        ids() {
            return `/movie/detail/${this.value}/cinemas`;
        },
    },
    methods: {


        zkAction(){

            if(this.iszk == "展开"){
                 this.classVal = "h3css2";
                 this.iszk = "关闭";
            }else if(this.iszk == "关闭"){
                 this.classVal = "h3css";
                 this.iszk = "展开";
            }
            
            
        },
    
          requestData(){

        axios.get('/static/movie_list_detail.json', { baseURL: 'http://localhost:8083' })
            .then(response => {
         console.log(response.data.detailMovie[0].vd)
          let ls = response.data.detailMovie;
                console.log(ls)
   this.arr =  ls.map(element => {
         return {
           id:element.id,
           jpgUrl:element.img,
           nm:element.nm,
           rt:element.rt,
           sc:element.sc,
           showInfo:element.showInfo,
           star:element.star,
           wish:element.wish,
            video:element.vd,
            ver:element.ver,
            info:element.dra,
         }
  });
   

    console.log(this.arr1)
     this.arr.map(element=>{        
         this.searcElement(element);     
      })
       this.playerOptions.sources[0].src = this.arr1[0].video;
    }).catch(error => {
        window.console.log(error);
    })

    
    },
   
   searcElement(element){
      
      if(element.id == this.value){
         this.arr1.push(element)
      }
     
    }
    },
    created (){
        this.value = this.$route.params.id;
        this.requestData();
        // this.ids = `/movie/detail/${this.value}/cinemas`;
        
    }
}
</script>

<style scoped lang=scss>
.detail{
    width: 100%;
    height: 100%;
    background-color: rgb(102, 92, 41);
    position: absolute;
    top: 0px;
    bottom: 49px;
    z-index: 101;
 
}
.detail_content{
      position: absolute;
      top: 43px;
      bottom: 0;
      width: 100%;
      h1{
          padding: 5px;
      }
      p{
          padding: 5px;
          top: 283px;
          right: 0;
          position: absolute;
      }
      h5{
          padding: 5px;
      }
      span{
          padding: 5px;
      }
      .h3css{
             display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    position: relative;
    padding: 5px;
    line-height: 27px;
      }
      .h3css2{
    display: -webkit-box;
    -webkit-box-orient: vertical;
   
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    position: relative;
    padding: 5px;
    line-height: 27px;
      }

     
  }
  .goumai{
      position: absolute;
      bottom: 0;
      width: 100%;
      background: red;
      font-weight: 900;
      color: yellow;
      font-size: 30px;
      text-align: center;
      line-height: 66px;
      h2{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
        color: #fff;
      }    
  }

</style>