<template>
<div class="loading-wrap">
  <div class="loading">
    <van-loading class="center" type="spinner" size="30px"/>
  </div>
</div>
</template>

<script>
import { Loading } from 'vant';
export default {
  name: 'loading',
  components: {
    [Loading.name]: Loading
  }
}
</script>

<style scoped lang="scss">
.loading-wrap{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 49px;
  z-index: 300;
  .loading{
    width: 100px;
    height: 100px;
    background: rgba($color: #000000, $alpha: 0.6);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .center{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

}
</style>