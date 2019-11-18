<template>
    <RightInfoBox class="content">
        <slot/>
    </RightInfoBox>
  
</template>

<script>
import RightInfoBox from '../../components/RightInfo-scroll'
export default {
    components:{
        RightInfoBox
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