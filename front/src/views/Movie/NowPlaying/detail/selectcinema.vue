<template>
 <div class="select">
      <app-header :hasBack="true" title=""></app-header>
      <div class="content">
          <div class="title_cinema">
              <h1>海上钢琴师</h1>
              <h2>2019-11-22 10:40 原版2D</h2>
          </div>
          <h1 class="h111">{{num}}号厅</h1>
          <div class="list_set"> 
              <div v-for="(item,index) in forList" :key="index" class="forlist" @click="setAction(index);tabNameClick(index)"  :class="{selected:index == tabIndex}">
                    <div class="tab1 " ref="tab1"  :class="tab2" >{{parseInt((index + 8)/8)}}</div>
                    <div class="tab1">{{parseInt((index + 8)%8) + 1}}</div>
              </div>
          </div>
          <div class="szlblist">
              <div class="szlblists" v-for="(item,index) in indexsarr" :key="index" >
                  <h4 class="h444">{{item.p}}
                  {{item.l}}</h4>
              </div>
              <div class="h555" @click="zfAction">
                  <i>{{prititle}}</i>
              </div>
          </div>
      </div>
 </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
export default {
    data () {
        return {
            ids2:null,
            forList:[],
            selIndex:'',
            indexsarr:[],
            indexobj:{},
            arrs:[],
            tab2:'',
            cines:[],
            tabIndex:null,
            prititle:'请先选座',
            num:null,
            selectId:null,
            values:null,
            value:null
        }
    },
    computed: {

    },
    methods: {
        zfAction(){
            if((this.prititle.slice(0,1))*1){

                alert("订单提交成功")
            }
        },
        tnum(){
            this.num = parseInt(Math.random() * 10) ;
        },

    cinemaAction(index){
        console.log(index);
        let idss = window.location.href;
        let ass = idss.indexOf(1);
        let bss = idss.slice(ass,ass+7);
        this.value = bss;
        console.log(this.value)
    },
    getdyid(){

        let idss = window.location.href;
        let ass = idss.indexOf(1);
        let bss = idss.slice(ass,ass+7);
        this.values = bss;
    },

        tabNameClick(index){
       this.tabIndex = index;
            },
        
        addlist(){
            for (let index = 0; index < 40; index++) {
                this.forList.push(index);
            }
        },
        /* 选座 */
        setAction(a){
             this.selIndex = a;
           
              if(this.indexsarr.length !=0){
                this.prititle = this.indexsarr.length * 35 + "元"  + " " + "确认选座";
            }

            let p = null;
            let l = null;
            let num = null;
            p = parseInt((this.selIndex + 8)/8) + "排";
            l = parseInt((this.selIndex + 8)%8)+1 + "列";
            num = this.selIndex;
            this.indexobj = {
                p:p,
                l:l,
                num
            }

            
          if(this.indexsarr.length >= 6){
              alert("只能选6个");
               
          }else{
             
             console.log(this.indexobj)
            //设置cur默认类型为数组，并且初始值为空的数组
              this.indexsarr.push(this.indexobj);
              let obj = {};
                this.indexsarr = this.indexsarr.reduce((cur,next) => {
                obj[next.num] ? "" : obj[next.num] = true && cur.push(next);
                return cur;
             },[]) 
                 localStorage.setItem('cines',JSON.stringify( this.indexsarr));
                 this.localset()
                   if(this.indexsarr.length !=0){
                this.prititle = this.indexsarr.length * 35 + "元"  + " " + "确认选座";
            }
          }
         
        // console.log(JSON.stringify(this.indexsarr).indexOf(JSON.stringify(this.indexobj)))
        },
        localset(){
           
                // this.cines = JSON.parse(localStorage.getItem('cines'));
        },
            /*根据影院ID过滤显示*/
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
  console.log(this.arr)
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
        this.addlist();
        this.localset();
        this.tnum();
        this.getdyid();
        this.selectId = this.$store.state.cinemaSelect;
    }

}
</script>

<style lang="scss" scoped>
.select{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: yellow;
        z-index: 108;
        .title_cinema{
            width: 100%;
            padding: 10px;
            background: #fff;
            box-sizing: border-box;
        }

        .content{
            position: absolute;
            top: 44px;
            bottom: 0;
            height: 100%;
            width: 100%;
            .h111{
                width: 88px;
                height: 28px;
                line-height: 28px;
                background: #555;
                margin: 0 auto;
                text-align: center;
                border-radius: 4px;
            }
            .forlist{
                background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAWlBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP8/P3p6u3Y2d7z8/XLzdT4+PnS1NrP0dfw8PLQ0dhOVyJQAAAAEnRSTlMA8r5NhGoRCOLVs3njyiAcsnjlsKc3AAABFElEQVRYw+3Yy3KDMAyFYewA4ZJLqyPbAdL3f80mbWY8LaYTZDad6N/zDdZOKn5VV12DZzNtV9XFX+17g5WZfr/snVrAu4GebnAeaE9L3vmAMdDKwojDeeG9R3im1bHHMf3qd4xMgnhEn/Jqg0CiAkydACt4EuZRJcA3OCno0CXABoMUHNAkQIDEAf8L3FmDW1ngV8bu7l4JIB98VN7+DxfHdE8Ixk/ZXbArLBxRPvidgy0MeDuQYQqAtgMJUFBBBRVUUEEFFVRQQQUVfCVwClIvTEnwOkHYx3UGZhdBA97OY5i4L2+Rg40bfV5xo483By+nPB6VP64iLB9dvIrELFzO6GbFYcpGl6iEuHKuxWGuKDW6T1dge519C3laAAAAAElFTkSuQmCC") ;
                background-size: 100%;
                width: 20px;
                height: 20px;
                float: left;
                margin: 15px;
                .tab1{
                    opacity: 0;
                }
            }
              .szlblist{
            position: absolute;
            bottom: 100px;
            width: 100%;
            padding: 10px;
            background: #fff;
            box-sizing: border-box;
            .h444{
                // position: absolute;
                // bottom: 100px;
                padding: 5px;
                display: inline;
                float: left;
                background: #eee;
                margin: 2px;
            }
        }
        .h555{
            text-align: center;
            line-height: 100px;
            position: absolute;
            left: 56px;
            width: 300px;
            bottom: 100px;
            height: 100px;
            background: red;
            margin: 0 auto;
            color: #fff;
            font-weight: 800;
            font-size: 26px;
            border-radius: 10px;
        }
        }
      
}
</style>
    
