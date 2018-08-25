<template>
<div>
<div id="bgModel" @click="hidden" v-show="value"></div>
 <div id="popNotice" :style="{width:width}" >
         <!-- <div class="button">
                 <slot name="button"><button>点击</button></slot>
          </div> -->
          <transition name="fade">
                <div class="pop_main" v-show="value">
         <span class="triangle" :style="{'border-bottom-color':bgcolor}"></span>
        <div class="pop_content" :style="{background:bgcolor}">
        <slot name="content"></slot>              
        </div>
        </div>
              
              </transition>    
        
       
    </div>

</div>

   
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "Hidden"
  },
  props: {
    width: {
      type: String,
      default: "2rem"
    },
    placement: {
      type: String,
      default: "bottom"
    },
    bgcolor: {
      type: String,
      default: "red"
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    hidden() {
      this.$emit("Hidden", false);
    }
  }
};
</script>
<style lang='less'>
@import url("../../../static/css/common.less");
#popNotice {
  display: flex;
  flex-direction: column;
  .button {
    text-align: right;
  }
  .pop_main {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 10px;
    z-index: 999;
    .triangle {
      .my-triangle(red);
      position: absolute;
      right: 0.15rem;
      top: -8px;
    }
    .pop_content {
      background: red;
      border-radius: 4px;
      padding: 0.15rem;
    }
  }
}
#bgModel {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background: rgba(0, 0, 0, 0.103);
  z-index: 200;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


