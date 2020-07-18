<template>
  <div class="hot-compoennt">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span>热门文章</span>
      </div>
      <div class="text item" v-for="item,index in hotList" :key="index">
        <router-link :to="`/article/${item.id}`">{{item.title}}</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "hotComponent",
  data() {
    return {
      hotList: []
    };
  },
  async created() {
    let res = await this.$Axios.get(
      "http://120.25.235.95:8080/article/hotArticle"
    );
    if (res.data.success) {
      this.hotList = res.data.list;
    } else {
      alert("加载失败");
    }
  },
  methods: {
    goHot(item) {
      if (item.id) {
        this.$router.push(`/article/${item.id}`);
      }
    }
  }
};
</script>

<style scoped lang="css">
.hot-compoennt {
  padding: 0.2rem;
  padding-left: 1rem;
}
.hot-compoennt .title {
  text-align: center;
}
.item {
  cursor: pointer;
  font-size: 14px;
  padding-top: 0.3rem;
}
.item a {
  text-decoration: none;
  color: black;
}
.item a:hover {
  color: pink;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
