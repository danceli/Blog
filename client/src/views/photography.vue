<template>
  <div class="photography">
    <div v-if="isAdmin">
      <div class="title">
        <div>记录一切美好</div>
        <div class="subtitle">春天该很好，你若尚在场。</div>
      </div>
      <div class="photo-box">
        <el-card
          class="card"
          v-for="(item, index) in photos"
          :key="index"
          :offset="index > 0 ? 2 : 0"
          :body-style="{ padding: '0px' }"
        >
          <el-image :src="item.url" class="image" :preview-src-list="srcList"></el-image>
          <div style="padding: 10px;">
            <span>{{item.describe}}</span>
            <div class="bottom clearfix"></div>
          </div>
        </el-card>
      </div>
      <div class="page">
        <el-pagination
          :page-size="15"
          background
          layout="prev, pager, next"
          :total="srcList.length"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <div class="authority" v-else>
      <div class="show-title">
        <span>访问照片需要登录管理员账号,请与坛主联系索要。</span>
        <router-link to="/login">去登录</router-link>
      </div>
      <div class="banner">
        <el-carousel style="height:450px;">
          <el-carousel-item v-for="item,index in banner" :key="index">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <FooterBeiAn />
  </div>
</template>

<script>
import FooterBeiAn from "@/components/footer.vue";
export default {
  name: "photography",
  data() {
    return {
      cur_page: 1,
      photos: [],
      srcList: [],
      banner: [
        "http://120.25.235.95:8080/banner/sex1.jpg",
        "http://120.25.235.95:8080/banner/sex2.jpg",
        "http://120.25.235.95:8080/banner/sex3.jpg",
        "http://120.25.235.95:8080/banner/sex4.jpg",
        "http://120.25.235.95:8080/banner/sex5.jpg"
      ]
    };
  },
  async created() {
    //请求照片数据
    await this.getPhoList();
  },
  computed: {
    isAdmin() {
      return this.$store.state.adminUser.identity === "root";
    }
  },
  components: { FooterBeiAn },
  methods: {
    async getPhoList() {
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/admin/picture",
        {
          page: this.cur_page
        }
      );
      if (res.data.success) {
        //请求成功
        this.photos = res.data.pictures;
        this.srcList = res.data.src_list;
      } else {
        alert("请检查网络！");
      }
    },
    async handleCurrentChange(i) {
      this.cur_page = parseInt(i);
      await this.getPhoList();
    }
  }
};
</script>

<style scoped lang="css">
.photography {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2rem 4rem;
}
.photography .title div:first-child {
  font-size: 1.6rem;
  text-align: center;
}
.photography .title .subtitle {
  padding-top: 1rem;
  color: #ccc;
  text-align: center;
  font-size: 0.9rem;
}
.photography .photo-box {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.photography .photo-box .card {
  cursor: pointer;
  box-sizing: border-box;
  width: calc(20% - 1rem);
  margin: 0.5rem;
  transition: all 0.4s ease;
}
/* .photography .photo-box .card:hover {
  transform: scale(1.1);
} */
.photography .authority .show-title {
  background: aquamarine;
  font-size: 1.8rem;
  text-align: center;
  border-radius: 6px;
}
.photography .authority .banner {
  margin-top: 0.5rem;
}
.photography .authority .banner img {
  width: 100%;
  height: 100%;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-carousel__item {
  height: 450px;
}
</style>
