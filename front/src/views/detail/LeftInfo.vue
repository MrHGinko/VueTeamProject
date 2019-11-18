<template>
    <LeftInfoBox class="content">
        <slot/>
    </LeftInfoBox>
  
</template>

<script>
import LeftInfoBox from '../../components/LeftInfo-scroll'
export default {
    components:{
        LeftInfoBox
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