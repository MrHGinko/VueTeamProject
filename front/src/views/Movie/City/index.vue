<template>
  <div class="city">
    <app-header :hasBack="true" title="城市选择"></app-header>

 <el-amap 
        vid="amap"  
        :zoom="zoom"  
        :plugin="plugin" 
        class="amap-demo" 
        :center="center"
    >  
    </el-amap>
    <div class="toolbar">
        <span v-if="loaded">
        location: lng = {{ lng }} lat = {{ lat }}
        </span>
        <span v-else>正在定位</span>
    </div>



  </div>
</template>
<script>
import { location } from "./city"
export default {

methods: {
  data () {
    return {
      title:[],
    }
  },
  getLocation() {
      let _that = this;
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", result => {
        _that.lat = result.position.lat;
        _that.lng = result.position.lng;
        _that.province = result.addressComponent.province;
        _that.city = result.addressComponent.city;
        _that.district = result.addressComponent.district;
      });
    },
},
mounted () {
  this.getLocation();
  console.log(this.title)
  
}


}
</script>

<style>
.city{
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top:0 ;
  bottom: 0;
  z-index: 101;
}
</style>