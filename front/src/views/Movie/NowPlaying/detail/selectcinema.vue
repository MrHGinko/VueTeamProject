<template>
 <div class="select">
      <app-header :hasBack="true" title=""></app-header>
      <div class="content">
          <div class="title_cinema">
              <h1>海上钢琴师</h1>
              <h2>2019-11-22 10:40 原版2D</h2>
          </div>
          <h1 class="h111">2号厅</h1>
          <div class="list_set"> 
              <div v-for="(item,index) in forList" :key="index" class="forlist" @click="setAction(index);tabNameClick(index)"  :class="{selected:index == tabIndex}">
                    <div class="tab1 " ref="tab1"  :class="tab2" >{{parseInt((index + 8)/8)}}</div>
                    <div class="tab1">{{parseInt((index + 8)%8) + 1}}</div>
              </div>
          </div>
          <div class="szlblist">
              <div class="szlblists" v-for="(item,index) in cines" :key="index" >
                  <h4 class="h444">{{item.p}}
                  {{item.l}}</h4>
              </div>
          </div>
      </div>
 </div>
</template>

<script>
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
        }
    },
    computed: {
    },
    methods: {
        tabNameClick(index){
       this.tabIndex = index;
 },
        
        addlist(){
            for (let index = 0; index < 40; index++) {
                this.forList.push(index);
            }
        },
        setAction(a){
             this.selIndex = a;

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
          }
         
        // console.log(JSON.stringify(this.indexsarr).indexOf(JSON.stringify(this.indexobj)))
        },
        localset(){
           
                this.cines = JSON.parse(localStorage.getItem('cines'));
        }
    },
    created () {
        this.addlist();
        this.localset();
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
            .h444{
                padding: 5px;
                display: inline;
                float: left;
                background: #eee;
                margin: 2px;
            }
        }
        }
      
}
</style>
    
