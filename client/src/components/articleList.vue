<template>
  <div class="list" @click="godetail()">
    <div class="list-item">
      <div class="item-left">
        <div class="time">{{detail.create_time | filterTime(detail.create_time)}}</div>
        <div class="article-title">{{detail.title}}</div>
        <div class="detail">
          <div style="margin-left:0;">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="detail.icon_type" />
            </svg>
            {{detail.article_type}}
          </div>
          <div class="zan">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-support" />
            </svg>
            {{detail.zan}}
          </div>
          <div class="views">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-view" />
            </svg>
            {{detail.views}}
          </div>
          <div class="comment-length">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-method-draw-image" />
            </svg>
            {{detail.comments_length}}
          </div>
        </div>
      </div>
      <div class="item-right">
        <img :src="detail.cover_image" alt />
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "articleList",
  data() {
    return {};
  },
  props: ["detail"],
  methods: {
    godetail() {
      this.$router.push(`article/${this.detail.id}`);
    }
  },
  filters: {
    filterTime(str) {
      let date = new Date(str);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
    }
  }
};
</script>

<style scoped lang="css">
.el-divider {
  margin-top: 12px;
  margin-bottom: 12px;
}
.icon {
  width: 0.8em;
  height: 0.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.list {
  box-sizing: border-box;
}
.list .list-item {
  height: 6rem;
  box-sizing: border-box;
  padding: 0.2rem;
  /* background: #CCC; */
  line-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list .list-item .item-right {
  padding: 0;
  width: 7rem;
  height: 5rem;
  cursor: pointer;
  border-radius: 0.3rem;
}

.list .list-item .item-right img {
  width: 100%;
  height: 100%;
}
.list .list-item .time {
  font-size: 0.8rem;
  cursor: default;
  color: #0989;
}
.list .list-item .article-title {
  font-size: 1.2rem;
  cursor: pointer;
}
/* .list .list-item .item-left {
  padding: .2rem;
} */
.list .list-item .item-left .detail {
  display: flex;
  font-size: 0.85rem;
}
.list .list-item .item-left .detail > div {
  cursor: pointer;
  margin-left: 1rem;
}
</style>
