<template>
    <div id="_Box" :style="{width:width,height:height,background:!bcg?backgroundColor:colorEffect}" @touchstart="start" @touchend="end">
        <slot></slot>    
    </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "1rem"
    },
    backgroundColor: {
      type: String,
      default: "#3b5999"
    },
    colorEffect: {
      type: String,
      default: "#2b3f6b"
    },
    readOnly:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      bcg: false
    };
  },
  methods:{
    start(){
      if(this.readOnly){
        return
      }else{
        this.bcg=true;
      }  
    },
    end(){
      if(this.readOnly){
        return
      }else{
        this.bcg=false;
      }
      
    }
  }
};
</script>
<style lang="less">
</style>


