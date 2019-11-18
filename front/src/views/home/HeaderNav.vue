<template>
  <div class="headerNav">
    <nav class="nav">
      <li v-for="(item,index) in headerNavData1" :key="index">
        <img :src="`${item.icon}`" alt="">
        <h3>{{item.name}}</h3>
      </li>
    </nav>
    <nav class="nav">
      <li v-for="(item,index) in headerNavData2" :key="index">
        <img :src="`${item.icon}`" alt="">
        <h3>{{item.name}}</h3>
      </li>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      headerNavData1:[],
      headerNavData2:[]
    }
  },
  methods:{
    //获取头都导航数据
    requestData(){
      axios.get('/data/headerNav.json',{baseURL:'http://localhost:8080'})
      .then(response=>{
        let Data = response.data.data.kingkongList;
          Data.forEach((item,index)=>{
          if(index>= 0 && index < 5){
            this.headerNavData1.push(Data[index]);
          }else if(index>= 5 && index < 10){
            this.headerNavData2.push(Data[index]);
          }
        })
        // window.console.log(this.headerNavData1);
        // window.console.log(this.headerNavData2);
      }).catch(error=>{
        window.console.log(error);
      })
    },
  },
  created(){
    this.requestData();
  }
}
</script>
<style lang="scss" scoped>
.headerNav{
  width: 100%;
  height: 160px;
  .nav{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    li{
      list-style: none;
      width: 44px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img{
        width: 44px;
        height: 44px;
      }
      h3{
        font-weight: normal;
        font-size: 25%;
        color: #333;
        text-align: center;
        margin-top: 6px;
      }
    }
  }
}

</style>