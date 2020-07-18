<template>
  <div class="slider" :style="{left:$store.state.slider_left+'rem'}">
    <span class="nav-toggle" @click="toggle()">
      <img src="../assets/menu.svg" alt />
    </span>
    <nav class="navbar">
      <div class="logo">
        <a href="/">
          <img src="../assets/linux.svg" alt />
        </a>
      </div>
      <ul class="navmain">
        <li
          v-for="item,index in navbars"
          :key="index"
          @click="changeRouter(item.path)"
        >{{item.title}}</li>
      </ul>
      <div class="navbar navbar-bottom">
        <ul class="nav">
          <li @click="search_toggle()">
            <img src="../assets/search.png" alt />
          </li>
          <li>
            <img src="../assets/github.png" alt />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "slider",
  data() {
    return {
      navbars: [
        { title: "主页", path: "/" },
        { title: "算法", path: "/algorithm" },
        { title: "计算机网络", path: "/network" },
        { title: "随笔杂谈", path: "/talk" },
        { title: "Linux", path: "/linux" },
        { title: "摄影", path: "/photography" },
        { title: "关于我", path: "/about" }
      ]
    };
  },
  methods: {
    toggle() {
      this.$store.dispatch("slider_toggle");
    },
    changeRouter(path) {
      if (this.$router.history.current.path != path) {
        this.$router.push(path);
        //更改slider为隐藏状态
        this.$store.dispatch("slider_toggle", false);
      }
    },
    search_toggle() {
      this.$store.dispatch("search_toggle", true);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="css">
.slider {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 4.75rem;
  height: 100%;
  z-index: 9;
  /* background: #403e3e; */
  background: black;
  transition: all 0.3s ease;
  opacity: 0.75;
}
.slider .nav-toggle {
  position: absolute;
  top: 1rem;
  left: 6rem;
  border: none;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.slider .nav-toggle:hover img {
  opacity: 1;
}
.slider .nav-toggle img {
  opacity: 0.6;
  width: 1.3rem;
  height: 1.3rem;
  transform: translateY(0.65rem);
  transition: all 0.3s ease;
}
.slider .navbar {
  /* position: relative; */
  padding-top: 2rem;
  text-align: center;
}
.slider .navbar .logo {
  text-align: center;
  margin-bottom: 2rem;
}
.slider .navbar .logo a img {
  width: 2.4rem;
}
.slider .navbar .navmain {
  margin-top: 0;
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  color: #bbb;
  font-size: 0.9rem;
}
.slider .navbar .navmain li {
  cursor: pointer;
  width: 4.75rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.slider .navbar .navmain li:hover {
  color: #ccc;
}
.slider .navbar-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.navbar .nav {
  margin-top: 0;
  list-style: none;
  padding-left: 0;
}
.navbar .nav li {
  cursor: pointer;
  width: 4.75rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
}
.navbar .nav li img {
  width: 1.2rem;
  transform: translateY(0.3rem);
}
</style>
