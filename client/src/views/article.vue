<template>
  <div class="article">
    <div class="content">
      <div class="left">
        <div class="article-content">
          <!-- 作者信息 -->
          <div class="auth">
            <div class="avatar">
              <a href="/about">
                <img :src="detail.avatar" />
              </a>
            </div>
            <div class="auth-right">
              <div class="name">
                <span>{{detail.tanzhu}}</span>
                <span class="tag_identity">{{detail.identity}}</span>
              </div>
              <div class="time">{{detail.create_time | filterTime(detail.create_time)}}</div>
            </div>
            <div class="like">
              <svg :class="isLike?'icon icon-active':'icon'" aria-hidden="true" @click="like()">
                <use xlink:href="#icon-support" />
              </svg>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- 文章内容 -->
          <keep-alive>
            <transition name="fade">
              <div class="md" v-html="html" ref="md"></div>
            </transition>
          </keep-alive>
        </div>
      </div>
      <!-- <div style="clear:both;"></div> -->
      <div class="right">
        <div class="other">广告区域</div>
        <div class="sticky">
          <div class="directory">
            <h4>目录</h4>
            <div class="vertical">
              <div
                v-for="item,index in anchor"
                :key="index"
                :class="index==anchor_cur?'active':''"
                @click="scrollTo(item,index)"
              >{{item}}</div>
            </div>
          </div>
          <div class="hot">
            <HotArticle style="padding:0;" />
          </div>
        </div>
      </div>
    </div>
    <FooterBeiAn />
  </div>
</template>

<script>
import FooterBeiAn from "@/components/footer.vue";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import HotArticle from "@/components/hotComponent.vue";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});
hljs.initHighlighting();
export default {
  name: "articledetail",
  data() {
    return {
      html: "",
      detail: {},
      anchor: [],
      anchor_cur: 0,
      isLike: false
    };
  },
  async created() {
    // console.log(document.documentElement.scrollTop)
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "pink"
    });
    await this.initData(this.$route.params.id);
    //锚点
    this.getAnchor();
    //add views
    await this.addView();
    loading.close();
  },
  components: { HotArticle, FooterBeiAn },
  mounted() {
    addEventListener("scroll", this.onScroll, true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll, true);
  },
  methods: {
    async addView() {
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/article/addView",
        {
          article_id: this.detail.id
        }
      );
    },
    async like() {
      this.isLike = !this.isLike;
      this.$Axios.post("http://120.25.235.95:8080/article/setLike", {
        article_id: this.detail.id,
        isLike: this.isLike
      });
    },
    getAnchor() {
      //初始化锚点
      this.anchor = [];
      let re = /<h2 id=\".+\"/g;
      let arr = this.html.match(re);
      if (arr) {
        arr.forEach(item => {
          item.match(/id=\"(.+)\"/);
          this.anchor.push(RegExp.$1);
        });
      }
    },
    onScroll() {
      //获取所有锚点元素
      let navs = document.querySelector(".md").querySelectorAll("h2");
      //找到所有元素的offsetTop
      let offsetTopArr = [];
      Array.from(navs).forEach(item => {
        offsetTopArr.push(item.offsetTop);
      });
      //获取当前文档流的scrolltop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = 0; i < offsetTopArr.length; i++) {
        if (scrollTop > offsetTopArr[i] && scrollTop < offsetTopArr[i + 1]) {
          this.anchor_cur = i;
        }
      }
    },
    scrollTo(item, i) {
      // window.removeEventListener('scroll',this.onScroll)
      let targetScrollTop = document.getElementById(`${item}`).offsetTop;

      document.documentElement.scrollTop = targetScrollTop + 10;
      document.body.scrollTop = targetScrollTop + 10;
      this.anchor_cur = i;
    },
    async initData(id) {
      let res = await this.$Axios.post(
        `http://120.25.235.95:8080/article/getArticleDetail/${id}`
      );
      this.detail = res.data.res;
      this.html = marked(res.data.html);
      this.getAnchor();
      //add views
      await this.addView();
    }
  },
  filters: {
    filterTime(str) {
      let date = new Date(str);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  },
  watch: {
    async $route(to, from) {
      if (from.name == to.name && to.params.id != from.params.id) {
        await this.initData(to.params.id);
      }
    }
  }
};
</script>

<style scope lang="css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.active {
  color: blue;
}
/* 代码块高亮 */
pre {
  /* border: 1px solid black; */
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  color: #ccc;
  background: #282c34;
}
.tag_identity {
  border-radius: 2rem;
  background: tomato;
  color: aliceblue;
  font-size: 0.65rem;
  padding: 0 0.3rem;
}
.article {
  /* width: 100%; */
  height: 100%;
  padding: 2rem 5rem;
  position: relative;
  background: #f3f3f4;
}
.article .content {
  display: flex;
  /* justify-content: center; */
}
.article .content .left {
  width: 60%;
  position: relative;
  max-width: 60%;
}
.article .content .left .article-content {
  height: 100%;
}
.article .content .left .article-content .auth {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article .content .left .article-content .auth .like {
  cursor: pointer;
  text-align: center;
}
.article .content .left .article-content .auth .like .icon-active {
  color: indianred;
}
.article .content .left .article-content .auth .auth-right {
  position: absolute;
  top: 0;
  left: 2.5rem;
}
.article .content .left .article-content .auth a {
  width: 100%;
  height: 100%;
}
.article .content .left .article-content .auth .avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.article .content .left .article-content .auth .avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.article .content .left .article-content .auth .name {
  align-items: center;
  font-size: 0.7rem;
  height: 1rem;
}
.article .content .left .article-content .auth .name span {
  padding: 0 0.3rem;
}
.article .content .left .article-content .auth .time {
  margin-top: 0.5rem;
  height: 1rem;
  font-size: 0.7rem;
  padding-left: 0.3rem;
}
.article .content .right {
  flex: none;
  position: relative;
  width: 300px;
  margin-left: 3rem;
  /* right: -5rem; */
}
.right .other {
  width: 100%;
  background: white;
  height: 7rem;
  padding: 0.5rem;
}
.right .sticky {
  position: sticky;
  top: 1rem;
}
.right .sticky .directory {
  box-sizing: border-box;
  height: 100%;
  background: white;
  margin-top: 1rem;
  border-radius: 5px;
  padding: 1rem;
}

.right .sticky .directory div {
  cursor: pointer;
  font-size: 0.9em;
  font-family: "黑体";
  padding-top: 0.1rem;
}
.right .sticky .directory .vertical div:hover {
  color: pink;
}
.directory h4 {
  margin: 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.hot {
  padding-top: 1rem;
}
.md {
  box-sizing: border-box;
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 10px;
}
.md h2 {
  margin: 0;
}
.md img {
  width: 100%;
  height: 100%;
}
</style>
