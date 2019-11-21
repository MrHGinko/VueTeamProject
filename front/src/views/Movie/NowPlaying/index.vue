<template>
  <div class="nowplay">
   <router-view></router-view>
        <app-scroll class="content" >
<scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
          <ul>
          <li class="uls licontent" v-for="item in arr1"  :key="item.id"  v-lazy="item">
            <!-- <span>{{item.id}}</span> -->
            <img :src="item.jpgUrl" alt="">
            <div class="licenter">
            <h1>{{item.nm}}</h1>
            <p >观众评：<i>{{item.sc}}</i></p>
            <span class="line-ellipsis">主演：{{item.star}}</span>
            <h3 class="line-ellipsis">{{item.showInfo}}</h3>
            </div>
            <div class="liright">
                <router-link to="/movie/detail"><p @click="goDetail(item.id,item.name)" >{{item.pd}}</p></router-link>    
                  </Detail :title="title">
            </div>
          </li>
          </ul>
           </scroller>
        </app-scroll>
        
  </div>
</template>

<script>
// import nowplayData from '../../../services/NowPlayServe'
// let {nowplay} = nowplayData;
import VueScroller from 'vue-scroller'
import axios from 'axios';
import Vue from 'vue';
import Detail from './detail/detail'
import { Lazyload } from 'vant'
Vue.use(Lazyload);
export default {
  components: {
    Detail
  },
data () {
  return {
    nowplayList:[],
    arr1:[],
    noDate:false,
   arr:[],
  page:1,
  pageSize:10,
  ticket:'',
  ac:false,
  title:''
  }
},
methods:{

  

  goDetail(id,title){
    console.log(title)
      this.$router.push(`/movie/detail/${id}`);
      this.$routerrouter.go();
     
      this.title = title; 
  },
  

   // 获取数据
     getData(){
           var that=this;
           axios.get('/static/movie_list.json',{baseURL: 'http://localhost:8083'} ,{params:{pageNum:that.page,pageSize:that.pageSize}})
　　　　 .then(function(data){
                          if(data.data.success){
 　　　　　　　　  //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，如果是最后一页给that.noDate=true）
                                that.noDate=data.data.data.isLastPage;
                               // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
                               if(that.page==1){
                                     that.arr=data.data.data.list;
                              }else{
                                       that.arr=that.arr.concat(data.data.data.list)
                               }
                          }
                     })
            },
        // 下拉刷新
       refresh(){
         this.page=1;//重置页数刷新每次页数都是第一页
          this.noDate=false;//重置数据判断
          setTimeout(function(){
             this.getData();
              this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
          }.bind(this),1700)
      },
   // 上拉加载
    infinite(done){
        if(this.noDate){
              this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
       }else{
           setTimeout(() => {
                  this.page++;//下拉一次页数+1
                  this.getData();
                  done();//进行下一次加载操作
           }, 1500);
     }
    },

/* 请求本地文件，渲染页面 */
  requestData(){
 axios.get('/static/movie_list.json', { baseURL: 'http://localhost:8083' })
    .then(response => {
      // console.log(response.data.movieList)
        let ls = response.data.movieList;

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
    }
},


computed: {
     
},


mounted () {
   /*vue实例挂载完成，data.message成功渲染。*/
  this.getData()
  
  
},





created () {
 
  /* created阶段，vue实例的数据对象data有了，el还没有 */
  this.requestData();
  

}
}
</script>

<style lang="scss" scoped>
.nowplay{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 89px;
  bottom: 49px;
  width: 100%;
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
 

</style>