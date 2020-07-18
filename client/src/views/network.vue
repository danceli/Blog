<template>
  <div class="network">
    <div class="l_header">
      <div class="logo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-linux" />
        </svg>
      </div>
      <div class="title_text">走进NetWork的大门</div>
      <div class="tag">
        <el-tag effect="plain" type="success" size="small">内容: {{article_length}}</el-tag>
      </div>
    </div>
    <Content @show_length="show_length" />
    <div style="clear:both;"></div>
    <FooterBeiAn />
  </div>
</template>

<script>
import Content from "@/components/articleContent.vue";
import FooterBeiAn from "@/components/footer.vue";
export default {
  name: "network",
  data() {
    return {
      article_length: 0
    };
  },
  methods: {
    show_length(data) {
      this.article_length = data.length;
    }
  },
  components: {
    Content,
    FooterBeiAn
  }
};
</script>

<style scoped lang="css">
.icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.network {
  box-sizing: border-box;
  display: block;
  position: relative;
  padding-left: 13%;
  padding-right: 13%;
  top: 0;
  width: 100%;
  height: 100%;
}
.network .l_header {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 6rem;
  background: url("http://120.25.235.95:8080/client_img/linux_title.f6f6997a.png")
    no-repeat no-repeat;
  transform: translateY(3rem);
  border-radius: 0.3rem;
}
.network .l_header .logo {
  padding-left: 3rem;
  flex: 1;
  transform: translateY(1.5rem);
}
.network .l_header .title_text {
  flex: 1;
  height: 100%;
  line-height: 6rem;
  font-size: 1.4rem;
  font-weight: bold;
}
.network .l_header .tag {
  flex: 1;
  line-height: 6rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>
