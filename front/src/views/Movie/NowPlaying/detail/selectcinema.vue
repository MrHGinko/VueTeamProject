<template>
 <div class="select">
      <h1>选择页面</h1>
 </div>
</template>

<script>
export default {
    data () {
        return {
            ids2:null,
        }
    },
    computed: {
        ids2() {
            return `/movie/detail/${this.value}/cinemas`;
        },
    },
    methods: {
        
    },
    created () {
        
    }

}
</script>

<style>
    .select{
        width: 100%;
        height: 100%;
        background: yellow;
    }
</style>