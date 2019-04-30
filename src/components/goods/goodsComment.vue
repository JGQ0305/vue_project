<template>
    <div class="tmpl">
        <nav-bar title="商品评论"></nav-bar>
        <comment :cid="$route.query.id"></comment>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                //也不方便
                // id:this.$route.query.id
            }
        }
        // ,created(){
        //     // this.id = this.$route.query.id;
        //     // console.log(this.$route.query.id);
        // }
    }
</script>
<style>
    
</style>