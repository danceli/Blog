<template>
  <div id="app">
    <Search />
    <Slider />
    <div @click="hidden()">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Slider from "@/components/slider.vue";
import Search from "@/components/search.vue";
import jwt_decode from 'jwt-decode';
export default {
  name: "App",
  components: {
    Slider,
    Search
  },
  created() {
    if(localStorage.token){
      const decode=jwt_decode(localStorage.token);
      this.$store.dispatch('setUser',decode);
    }
  },
  methods: {
    hidden() {
      if (this.$store.state.search_show == true) {
        this.$store.dispatch("search_toggle", false);
      }
      if (this.$store.state.slider_show == true) {
        this.$store.dispatch("slider_toggle", false);
      }
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
}
</style>
