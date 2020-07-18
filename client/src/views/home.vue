<template>
  <div class="section">
    <el-row>
      <el-col :span="24">
        <div class="img-box">
          <img src="http://120.25.235.95:8080/img/background.81db5164.jpg" alt />
        </div>
        <div class="line-text">
          <h1>杨小惠</h1>
          <div class="subtitle-box">
            <span>{{text.substring(0,count)}}</span>
            <span>|</span>
          </div>
        </div>
        <div class="tobottom">
          <a href="#">
            <i class="el-icon-bottom"></i>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      timer: null,
      count: 0,
      text: "想要的都拥有，得不到的都释怀！"
    };
  },
  created() {
    clearInterval(this.timer);
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.count++;
        if (this.count == 16) {
          clearInterval(this.timer);
          this.count = 0;
          this.setTimer();
        }
      }, 350);
    }
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped lang="css">
.section {
  width: 100%;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
}
.section .img-box {
  width: 100%;
  height: 100%;
}
.section .img-box img {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center center;
}
.section .line-text {
  font-family: 'Titillium Web, PingFang SC, Hiragino Sans GB, "Microsoft JhengHei", "Microsoft YaHei", Helvetica Neue, Helvetica, Arial, sans-serif';
  color: white;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  text-align: center;
}
.section .line-text h1 {
  width: 100%;
  font-size: 3rem;
}
.section .line-text .subtitle-box {
  text-align: center;
  position: relative;
  padding: 0;
  margin-bottom: 3rem;
  font-size: 1.3rem;
}
.section .tobottom {
  position: absolute;
  width: 100%;
  bottom: 2rem;
  z-index: 9;
  text-align: center;
}
.section .tobottom a {
  cursor: pointer;
}
@keyframes hidden {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  10% {
    opacity: 0.1;
    transform: translateY(0.02rem);
  }
  20% {
    opacity: 0.2;
    transform: translateY(0.04rem);
  }
  30% {
    opacity: 0.3;
    transform: translateY(0.06rem);
  }
  40% {
    opacity: 0.4;
    transform: translateY(0.08rem);
  }
  50% {
    opacity: 0.5;
    transform: translateY(0.1rem);
  }
  60% {
    opacity: 0.6;
    transform: translateY(0.12rem);
  }
  70% {
    opacity: 0.7;
    transform: translateY(0.14rem);
  }
  80% {
    opacity: 0.8;
    transform: translateY(0.16rem);
  }
  90% {
    opacity: 0.9;
    transform: translateY(0.18rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0.2rem);
  }
}
.section .tobottom a > i {
  transform: translateY(0);
  font-size: 1.8rem;
  color: white;
  animation-name: hidden;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}
</style>
