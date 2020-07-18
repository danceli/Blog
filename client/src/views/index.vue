<template>
  <div>
    <div class="index">
      <Home />
    </div>
    <FooterBeiAn />
  </div>
</template>

<script>
import FooterBeiAn from "@/components/footer.vue";
import Home from "@/views/home.vue";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Home,
    FooterBeiAn
  },
  methods: {}
};
</script>

<style scoped lang="css">
</style>
