<template>
  <div class="detail">
       <app-header :hasBack="true" title="详情页"></app-header>
       <div class="detail_content">

       </div>
  </div>
</template>

<script>
export default {
    props: {
        id: String
    },data () {
        return {
            value:'',
        }
    },
    created (){
        this.value = this.$route.params.id;
        console.log(this.value);
    }
}
</script>

<style scoped>
.detail{
    position: absolute;
    background: yellow;
    width: 100%;
    height: 100%;
    z-index: 104;
    .detail_content{
        position: absoluet;
        top: 44px;
        width: 100%;
    }
}
</style>