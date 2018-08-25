<template>
    <div id="memberMore">
         <yd-navbar title="更多">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>           
        </yd-navbar>
        <div class="container">

        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#memberMore{
    .init;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    .container{
        .my-container;
        flex: 1;
    }

}

</style>


