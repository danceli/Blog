<template>
  <div class="talk">
    <div class="header">
      <div class="book">
        <img src="http://120.25.235.95:8080/client_img/book.png" alt />
      </div>
      <div class="title">读书笔记</div>
      <div>
        <el-tag type="success" effect="plain">内容:{{article_length}}</el-tag>
      </div>
    </div>
    <div class="article-list">
      <el-card
        :body-style="{ padding: '0px' }"
        class="card"
        v-for="item,index in articleList"
        :key="index"
      >
        <div @click="viewArticle(item.id)">
          <img :src="item.cover_image" class="image" />
          <div style="padding: 14px;">
            <div>{{item.title}}</div>
            <div class="auth">
              <span class="sub-title">{{item.tanzhu}}</span>
              <span class="sub-title-icon">{{item.identity}}</span>
            </div>
            <div class="orthers">
              <span style="font-size:11px;">{{item.create_time | filterTime(item.create_time)}}</span>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-support" />
                </svg>
                <span class="number">{{item.zan}}</span>
              </span>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-view" />
                </svg>
                <span class="number">{{item.views}}</span>
              </span>
            </div>
            <div class="bottom clearfix"></div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="page">
      <el-pagination
        :page-size="12"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="article_length"
      ></el-pagination>
    </div>
    <FooterBeiAn />
  </div>
</template>

<script>
import FooterBeiAn from "@/components/footer.vue";
export default {
  name: "sui-bi-za-tan",
  data() {
    return {
      page: 1,
      article_length: 0,
      articleList: []
    };
  },
  async created() {
    await this.initData();
  },
  methods: {
    async initData() {
      //初始化数据
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/article/getLiterature",
        {
          page: this.page,
          type: "readbook"
        }
      );
      if (res.data.success) {
        this.article_length = res.data.article_length;
        this.articleList = res.data.res;
      } else {
        alert("加载失败");
      }
    },
    async handleCurrentChange(i) {
      this.page = i;
      await this.initData();
    },
    viewArticle(id) {
      this.$router.push(`/article/${id}`);
    }
  },
  filters: {
    filterTime(time) {
      let now = new Date().getTime();
      let diff = Math.floor((now - time) / 1000);
      if (diff < 120) {
        return "刚刚";
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + "分钟前";
      } else if (diff < 86400) {
        return Math.floor(diff / 3600) + "小时前";
      } else if (diff < 86400 * 30) {
        return Math.floor(diff / 86400) + "天前";
      } else {
        return Math.floor((diff / 86400) * 30) + "月前";
      }
    }
  },
  components: { FooterBeiAn }
};
</script>

<style scoped lang="css">
.talk {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1rem 4rem;
}
.talk .header {
  width: 100%;
  height: 8rem;
  background: url("http://120.25.235.95:8080/client_img/suibi_banner.jpg")
    no-repeat no-repeat;
  background-size: 100% 100%;
  border-radius: 0.3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.talk .header .book {
  height: 6rem;
}
.talk .header .book img {
  height: 100%;
}
.talk .header .title {
  font-size: 2rem;
}
.talk .article-list {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
}
.talk .article-list .card {
  box-sizing: border-box;
  width: calc(25% - 1rem);
  margin: 0.5rem;
  transform: scale(1);
  transition: 0.4s all ease;
}
.talk .article-list .card:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.talk .article-list .card .auth .sub-title {
  font-size: 9px;
  color: rgba(0, 0, 0, 0.6);
}
.talk .article-list .card .auth .sub-title-icon {
  font-size: 8px;
  color: crimson;
  margin-left: 5px;
  padding: 0 3px;
  border: 0.3px solid crimson;
}
.talk .article-list .card .orthers {
  margin-top: 10px;
  height: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.talk .article-list .card .orthers span {
  color: #bfbfbf;

  display: inline-flex;
  align-items: center;
}
.talk .article-list .card .orthers .number {
  font-size: 11px;
  padding-left: 2px;
}
/* 配置样式 */
.bottom {
  line-height: 12px;
}
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.icon {
  width: 0.7em;
  height: 0.7em;
  vertical-align: -0.15em;
  color: #bfbfbf;
  fill: currentColor;
  overflow: hidden;
}
</style>