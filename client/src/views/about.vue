<template>
  <div class="about">
    <div class="title" id="title">
      <div>About Me</div>
    </div>
    <div class="date">
      <i class="el-icon-date"></i>
      <span>2020-02-20</span>
    </div>
    <div class="quote">
      <p>A Coder,Live in HeNan,China.</p>
    </div>
    <p class="persional-detail">
      <el-card class="box-card">
        <img class="avatar" src="http://120.25.235.95:8080/client_img/avatar.98d97d06.jpg" alt />
        <!-- show  reward -->
        <el-dialog title="请我喝杯咖啡把~" width="30%" :visible.sync="rewardVisible" :center="true">
          <div class="paybox">
            <div>
              <img src="http://120.25.235.95:8080/client_img/alipay.0c7d62dc.jpg" alt />
              <span>支付宝</span>
            </div>
            <div>
              <img src="http://120.25.235.95:8080/client_img/wechatpay.87b99e7b.png" alt />
              <span>微信</span>
            </div>
          </div>
        </el-dialog>
        <button class="reward" @click="showreward()">打赏</button>
        <div v-for="item,index in user" :key="index" class="text item">
          <span>{{item.title}}&nbsp;&nbsp;:</span>
          <span style="padding-left:.6rem;">
            <a :href="item.path">{{item.value}}</a>
          </span>
        </div>
      </el-card>
    </p>
    <div class="copyright">
      <strong>©版权声明</strong>
      本博客所有文章除特别声明外，均采用
      <a
        href="https://www.apache.org/licenses/LICENSE-2.0.html"
      >Apache License 2.0</a> 许可协议。转载请注明出处！
    </div>
    <el-divider></el-divider>
    <div class="share">
      <div>|</div>
      <transition name="fadeRight" tag="div">
        <div class="iconrow" v-show="iconShow">
          <svg v-for="item,index in icons" :key="index" class="icon" aria-hidden="true">
            <use :xlink:href="item.name" @click="share(item.shareUrl)" />
          </svg>
        </div>
      </transition>
      <div class="shareBtn" @click="iconHidden()">
        <img src="../assets/share.png" alt /> 分享
      </div>
    </div>
    <!-- //wechatShare -->

    <el-divider class="hr"></el-divider>
    <Comment />
    <!-- <div>
      <el-backtop target=".title" :visibility-height="100"></el-backtop>
    </div>-->
    <FooterBeiAn />
  </div>
</template>

<script>
import FooterBeiAn from "@/components/footer.vue";
import Comment from "@/components/comment.vue";
export default {
  name: "about",
  data() {
    return {
      rewardVisible: false,
      user: [
        { title: "姓名", value: "李新宇" },
        { title: "家乡", value: "周口" },
        { title: "现住地", value: "洛阳" },
        {
          title: "Github",
          value: "https://github.com/danceli",
          path: "https://github.com/danceli"
        },
        { title: "微信", value: "lixinyu332535219" },
        {
          title: "QQ",
          value: "332535219",
          path: "http://wpa.qq.com/msgrd?v=3&uin=332535219&site=qq&menu=yes"
        },
        { title: "Email", value: "dancelixxx@gmail.com" }
      ],
      iconShow: false,
      icons: [
        {
          name: "#icon-tubiaozhizuo--copy",
          shareUrl: "http://www.yxhlxy.icu:8080/client_img/wechatShare.png"
        },
        { name: "#icon-douyin" },
        {
          name: "#icon-weibo",
          shareUrl:
            "http://service.weibo.com/share/share.php?url=120.25.235.95&sharesource=weibo&title=李新宇的分享&appkey=2951127494"
        },
        {
          name: "#icon-icon",
          shareUrl:
            "http://connect.qq.com/widget/shareqq/index.html?url=120.25.235.95&showcount=0&desc=快来看看吧！&title=李新宇的分享&pics=http://5b0988e595225.cdn.sohucs.com/images/20170921/ea4331ac1fdf4842b1e2f526c27ca490.jpeg"
        }
      ]
    };
  },
  methods: {
    showreward() {
      this.rewardVisible = true;
    },
    iconHidden() {
      this.iconShow = !this.iconShow;
    },
    share(url) {
      //判断是不是微信
      if (url == "http://www.yxhlxy.icu:8080/client_img/wechatShare.png") {
        this.$alert(`<img src=${url}></img>`, {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          center: true,
          closeOnClickModal: true,
          closeOnPressEscape: true,
          showClose: false
        });
      } else {
        window.open(url);
      }
    }
  },
  components: {
    Comment,
    FooterBeiAn
  }
};
</script>

<style scoped lang="css">
.hr {
  margin-top: 1rem;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.about {
  box-sizing: border-box;
  display: block;
  position: relative;
  padding-left: 15%;
  padding-right: 15%;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: red; */
}
.about .title {
  text-align: center;
  font-size: 1.4rem;
}
.about .title div {
  display: block;
  font-weight: bold;
  text-decoration: none;
  color: #403e3e;
  padding-left: 2rem;
  padding-top: 4rem;
}
.about .title div::after {
  border-bottom: 0.11rem dashed #cce5ff;
  content: "";
  width: 7rem;
  display: block;
  margin: 0.2em auto 0;
  height: 2px;
}
.about .date {
  font-size: 1rem;
  color: #5c6b72;
}
.about .date span {
  padding-left: 1rem;
}
.about .quote p {
  color: #5c6b72;
  padding-left: 1.6rem;
  border-left: 0.3rem solid #cce5ff;
}
.text {
  font-size: 0.9rem;
}
.item {
  padding: 0.5rem 0;
}
.box-card {
  width: 100%;
}
.target {
  /* color: #0681D0;
  text-decoration: underline;
  cursor: pointer; */
}
.about .persional-detail {
  position: relative;
}
.about .persional-detail .avatar {
  width: 6rem;
  height: 6rem;
  position: absolute;
  right: 3rem;
  top: 50%;
  margin-top: -3rem;
  border-radius: 50%;
  transform: scale(1);
  transition: 1s all ease;
}
.about .persional-detail .avatar:hover {
  transform: scale(1.3, 1.3);
}
.reward {
  /* color: #403e3e; */
  cursor: pointer;
  background-color: transparent;
  height: 1.8rem;
  background: #403e3e;
  color: white;
  font-size: 1.1rem;
  position: absolute;
  right: 3.6rem;
  bottom: 1.2rem;
  border: none;
  outline: none;
  padding: 0 1.1rem;
  border-radius: 0.2rem;
  transition: 0.4s all ease;
}
.reward:hover {
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}
.paybox {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.paybox img {
  display: block;
  border-radius: 0.3rem;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.3);
  width: 8rem;
  height: 8rem;
}
.paybox span {
  display: block;
  font-size: 1rem;
  text-align: center;
  padding-top: 0.5rem;
}
.about .copyright {
  color: #999;
  margin-top: 1rem;
}
.about .share {
  height: 1.5rem;
  color: #0681d0;
  display: flex;
  justify-content: space-between;
}
.about .share div {
  height: 1.5rem;
  line-height: 1.5rem;
}
.about .share img {
  width: 0.8rem;
  height: 0.8rem;
}
.about .share .shareBtn {
  cursor: pointer;
}
.about .share .iconrow {
  display: flex;
  align-items: center;
  width: 10rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background: #f5f5f5;
  border-radius: 0.2rem;
  box-sizing: border-box;
}
.about .share .iconrow svg {
  flex: 1;
  cursor: pointer;
  padding-left: 0.6rem;
  transition: 0.6s all ease;
}
.about .share .iconrow svg:hover {
  transform: scale(1.15);
}
</style>
