<template>
  <div class="header">
    <div class="location">
      <i class="iconfont iconlocation"></i>
      <span class="site">深圳西部硅谷</span>
      <i class="iconfont iconarrow-left"></i>
    </div>
    <label class="search">
      <input type="text" class="search_input" placeholder="请输入商家或商品名称">
      <i class="iconfont iconfangdajing"></i>
    </label>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.header{
  width: 100%;
  height: 50px;
  background: #1C1B20;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  .location{
    width: 148px;
    height: 30px;
    display: flex;
    align-items: center;
    .iconfont{
      color: #D7D6D7;
    }
    .iconlocation{
      font-size: 15px;
      margin-right: 5px;
    }
    .iconarrow-left{
      font-size: 10px;
      margin: 2px 20px 0 2px;
    }
    .site{
      color: #fff;
      flex: 1;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      max-width: 140px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .search{
    flex: 1;
    height: 30px;
    position: relative;
    .search_input{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 30px;
      font-size: 14px;
      background: #EBEBE4;
      border: none;
      border-radius: 15px;
      outline: none;
      color: #B0B0AE;
      box-sizing: border-box;
      padding: 0 25px;
    }
    .iconfangdajing{
      color: #B0B0AE;
      font-size: 14px;
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }
}

</style>