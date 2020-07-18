<template>
  <div class="login">
    <div class="login-box">
      <h2>后台登陆</h2>
      <el-form :model="ruleForm" ref="ruleForm" class="login-form" :rules="rules">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm() {
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/admin/login",
        {
          userinfo: this.ruleForm
        }
      );
      if (res.data.success) {
        //登陆成功
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        //存储等到localStorage
        localStorage.setItem("token", res.data.token);
        //解析token
        const decode = jwt_decode(res.data.token);
        //存储到vuex中
        this.$store.dispatch("setUser", decode);
        this.$router.push("/photography");
      } else {
        //登陆失败
        this.$message({
          message: res.data.msg,
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped lang="css">
.btn {
  box-sizing: border-box;
  width: 100%;
  font-size: 17px;
  font-family: "黑体";
}

.login {
  width: 100vw;
  height: 100vh;
  background: #f3f3f4;
  position: relative;
}
.login .login-box {
  box-sizing: border-box;
  width: 400px;
  height: 300px;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-200px, -150px);
  border-radius: 10px;
  box-shadow: 1px 3px 3px #ccc;
  padding: 20px;
}
.login .login-box h2 {
  text-align: center;
}
</style>
