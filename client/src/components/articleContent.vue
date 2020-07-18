<template>
  <div class="content">
    <div class="left">
      <ArticleList v-for="item,index in articleList" :key="index" :detail="item" ref="article"></ArticleList>
      <div style="text-align:center;padding-bottom:1rem;">
        <el-button
          type="info"
          plain
          :loading="is_loading"
          @click="loadOnePage()"
          v-if="articleList.length>=6"
        >加载更多</el-button>
      </div>
    </div>
    <div class="right">
      <InTroduction />
      <HotComponent />
    </div>
  </div>
</template>

<script>
// import FooterBeiAn from '@/components/footer.vue';
import ArticleList from "@/components/articleList.vue";
import InTroduction from "@/components/introduction.vue";
import HotComponent from "@/components/hotComponent.vue";
export default {
  name: "ArticleContent",
  data() {
    return {
      article_length: 0,
      articleList: [],
      cur_page: 0,
      is_loading: false
    };
  },
  async created() {
    let type = this.$route.name;
    let res = await this.$Axios.post(
      "http://120.25.235.95:8080/article/getArticleList",
      {
        type: type,
        page: this.cur_page
      }
    );
    if (res.data.success) {
      this.articleList = res.data.res;
      this.article_length = res.data.article_length;
      //给父元素发送数据
      this.send_length();
    } else {
      this.$message({
        showClose: true,
        message: "错了哦，网络链接错误",
        type: "error"
      });
    }
  },
  components: {
    ArticleList,
    InTroduction,
    HotComponent
  },
  methods: {
    async loadOnePage() {
      this.cur_page++;
      this.is_loading = true;
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/article/getArticleList",
        {
          type: this.$route.name,
          page: this.cur_page
        }
      );
      this.articleList = this.articleList.concat(res.data.res);
      this.is_loading = false;
    },
    send_length() {
      if (this.article_length) {
        this.$emit("show_length", { length: this.article_length });
      }
    }
  }
};
</script>

<style scoped lang="css">
.content {
  margin-top: 4.5rem;
  width: 100%;
  position: relative;
  display: flex;
}
.content .left {
  flex: 7;
}
.content .right {
  flex: 3;
}
</style>
