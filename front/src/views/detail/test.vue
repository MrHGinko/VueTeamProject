<template>
  <div>
    <p @click="showPopup">展示弹出层</p>
    <van-popup v-model="show"  position="bottom"
        :style="{ 'max-height': '50%' }">
      

  </van-popup>

  </div>
  
</template>

<script>
import { ActionSheet, Popup } from 'vant';

export default {
    components:{
       [ActionSheet.name]:ActionSheet,
       [Popup.name]:Popup
   },

  data() {
    return {
      show: false
    }
  },

  methods: {
    showPopup() {
      this.show = true;
    }
  }
}
</script>
<style lang="scss" scoped>
div{
  
}
</style>