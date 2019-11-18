<template>
  <!-- <div class="content"> -->
      <scrollBox class="content">
          <slot/>
      </scrollBox>
  <!-- </div> -->
  
</template>

<script>
import scrollBox from '../../components/scroll-box'
export default {
    components:{
        scrollBox
    }
}
</script>
<style lang="scss" scoped>
.content{
  width: 100%;
  position: absolute;
  left: 0;
//   top: 50px;
//   bottom: 49px;
//   overflow: hidden;
}

</style>