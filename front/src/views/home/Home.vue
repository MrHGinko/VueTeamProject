<template>
  <div class="home">
    <Header/>
    <Content class="content">
      <HeaderNav></HeaderNav>
      <h2>附近商家</h2>
      <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ul>
      <Shops/>
    </Content>
  </div>

</template>

<script>
import Header from "./Header";
import Content from "../lib/Content";
import HeaderNav from "./HeaderNav";
import Shops from "./Shops";
export default {
  components: {
    Header,
    Content,
    HeaderNav,
    Shops
  },
  data() {
    return {
      list: ["综合排序", "销量最高", "距离最近", "筛选"]
    };
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    top: 50px;
    bottom: 49px;
    h2 {
      width: 100%;
      height: 24px;
      line-height: 24px;
      text-align: center;
      margin: 15px 0 5px 0;
      font-size: 18px;
      font-weight: 800;
      color: #333;
    }
    ul {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      li {
        flex: 1;
        list-style: none;
        text-align: center;
      }
    }
  }
}
</style>