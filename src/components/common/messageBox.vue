<template>
    <div id="messageBox" @touchstart="start"  @touchmove="move" :style="{transform:`translateX(${-moveShift}px)`}">
        <Box :readOnly="readOnly" width="100%" height="1.3rem" backgroundColor='#fff' colorEffect="#d3d3d3">
            <div class="message_form_left">
                <slot name="img"></slot>
                <div class="message">
                    <h3>{{name}}</h3>
                    <slot name="tips"></slot>    
                </div>
            </div>
            <div class="message_form_right">
                <p>{{time}}</p>
                <div class="bot" v-if="mode==='1'">
                   <slot name="badge"></slot> 
                </div> 
                <div class="right_bottom" v-else>
                  <slot name="button"></slot>                 
                </div>                             
            </div>        
        </Box>
    </div>
</template>
<script>
import Box from "./box.vue";
export default {
  props: {
    scroll: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "嘻嘻哈哈"
    },
    mode: {
      //type为‘1’时适用接收消息，type为‘2’适用好友添加通知（多了一个按钮）
      type: String,
      default: "1"
    },
    readOnly:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      startPoint: "",
      moveShift: 0,
      ButtonWidth:60
    };
  },
  methods: {
    start(e) {
      if (scroll===true) {
        this.startPoint = e.touches[0].clientX;
      }else{
        return

      }
    },
    move(e) {
      if (scroll===true) {
        this.moveShift = this.startPoint - e.touches[0].clientX;
      }else{
        return
      }
    }
  },
  components: {
    Box
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#messageBox {
  display: flex;
  #_Box {
    .my-display(space-between,center);
    border-bottom: 1px solid #dcdcdc;
    padding: 0 0.2rem;
    .message_form_left {
      .my-display(none,center);
      img {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.2rem;
      }
      .message {
        .my-display(none,flex-start);
        flex-direction: column;
        p {
          width: 4rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          color: #4b4b4b;
        }
        h3 {
          font-weight: normal;
        }
      }
    }
    .message_form_right {
      height: 100%;
      padding: 0.2rem 0;
      .my-display(space-between,flex-end);
      flex-direction: column;
      font-size: 12px;
      p {
        color: #4b4b4b;
      }
      //   span {
      //     display: block;
      //     padding: 0.05rem;
      //     background: #bae4fa;
      //     border-radius: 100%;
      //     color: #fff;
      //   }
      .bot {
        width: 0.4rem;
        height: 0.4rem;
        color: #fff;
      }
      .right_bottom {
        width: 1.2rem;
        height: 0.65rem;
      }
    }
  }
}
</style>


