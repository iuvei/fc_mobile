<template>
<div id="pagination" :style="{'justify-content':textAlign}">
    <div>
        <div>
            <span class="pages">共 {{allCounts}} 条</span>
        </div>
        <div>
            <button @click="reducePage"  class="btn">﹤</button>
            <span class="btn currentPage">{{currentPage}}</span>
            <button @click="addPage" class="btn">﹥</button>
        </div>
        <div class="select">
            <span>跳至</span>
            <input @keyup.enter="keyUp" type="number" v-model="page">
            <span>页</span>
        </div>
    </div>

</div>
 <!-- props  align 居中 左对齐  右对齐
        allCounts  总条数
        counts 每页显示多少条


 methods  change 翻页，传两个参数，一个是当前页码数，一个是BOOLEAN true（可根据此判断是否为翻页）
          enter  跳转  传一个参数，跳往哪一页 -->
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      page: 1
    };
  },
  props: {
    //布局
    align: {
      type: String,
      default: "center"
    },
    //总条数
    allCounts: {
      type: Number,
      default: 10
    },
    //每页显示条数
    counts: {
      type: Number,
      default: 10
    },

  },
  methods: {
    addPage() {
      if (this.currentPage < this.pages) {
        new Promise((resolve, reject) => {
          this.currentPage = ++this.currentPage;
          resolve();
        }).then(() => {
          this.$emit("change", this.currentPage,true);
        });
      } else {
        this.currentPage = this.currentPage;
        return;
      }
    },
    reducePage() {
      if (this.currentPage > 1) {
        new Promise((resolve, reject) => {
          this.currentPage = --this.currentPage;
          resolve();
        }).then(() => {
          this.$emit("change", this.currentPage,true);
        });
      } else {
        this.currentPage = this.currentPage;
        return;
      }
    },
    // enter事件
    keyUp() {
      new Promise((resolve, reject) => {
        if (this.page >= 1 && this.page <= this.pages) {
          this.page = this.page;
        } else if (this.page < 1) {
          this.page = 1;
        } else if (this.page > this.pages) {
          this.page = this.pages;
        }
        this.currentPage = this.page;
        resolve();
      }).then(() => {
        this.$emit("enter", Number(this.page));
      });
    },

  },
  computed: {
    textAlign() {
      switch (this.align) {
        case "left":
          return "flex-start";
          break;
        case "right":
          return "flex-end";
          break;
        default:
          return "center";
      }
    },
    //总页数
    pages() {
      return Math.ceil(this.allCounts / this.counts);
    }
  }
};
</script>

<style lang="less">
@import url("../../../static/css/common.less");
@font: 16px;
//按键宽度
@width: 0.6rem;
// 按键边框
.btn-border {
  border: 1px solid #7d7d7d;
  border-radius: 4px;
}
#pagination {
  width: 100%;
  font-size: @font;
  display: flex;
  padding: 0.1rem 0;
  div {
    display: flex;
    span {
      display: block;
      .my-display(center;
            center);
    }
    .pages {
      margin: 0 0.2rem;
    }
    .btn {
      width: @width;
      height: @width;
      .btn-border;
      margin: 0 0.1rem;
      .my-display(center;
            center);
      &:active{
        background: #999
      }
    }
    .currentPage {
      background: #2b2c30;
      color: #fff;
    }
    .select {
      margin: 0 0.1rem;
      input[type="number"] {
        display: block;
        width: 1rem;
        height: @width;
        margin: 0 0.1rem;
        text-align: center;
        .btn-border;
      }
    }
  }
}
</style>
