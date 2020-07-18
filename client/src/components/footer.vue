<template>
  <div class="beian">
    2020 © Powered by
    <a href="https://github.com/danceli">DanceLi</a>
    <span>
      |
      <a href="http://www.beian.miit.gov.cn">豫ICP备20009062号-1</a>
    </span>
  </div>
</template>

<script>
export default {
  name: "footer-beian",
  data() {
    return {};
  }
};
</script>

<style scoped lang="css">
.beian {
  user-select: none;
  text-align: center;
  color: #888;
  padding: 24px 0;
  font-size: 13px;
}
.beian a {
  text-decoration: none;
}
</style>
