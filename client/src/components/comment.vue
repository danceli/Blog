<template>
  <div class="comment">
    <!-- reply dialog -->
    <el-dialog :title="'回复@'+dialogTitle" :visible.sync="dialogVisible">
      <div class="reply_form">
        <el-input placeholder="请输入姓名" v-model="reply_user.name" clearable></el-input>
        <el-input placeholder="请输入邮箱" v-model="reply_user.email" clearable></el-input>
      </div>
      <el-input
        style="margin-top:.3rem;"
        type="textarea"
        autosize
        placeholder="请输入评论内容"
        v-model="reply_user.text"
      ></el-input>
      <div style="text-align:right;margin-top:.5rem;">
        <el-button type="primary" size="mini" @click="reply()">回复</el-button>
      </div>
    </el-dialog>
    <div class="inputBox">
      <div class="inputitle">
        <input type="text" placeholder="昵称" v-model="name" />
        <input type="text" placeholder="邮箱" v-model="email" />
      </div>
      <div class="edit">
        <div class="textarea" contenteditable="true" ref="txt" placeholder="给我的文章加点评论吧~"></div>
        <div class="emoji">
          <el-popover placement="top" width="400" trigger="click">
            <keep-alive>
              <ul id="emoji_box">
                <li v-for="item,index in emojis" :key="index">
                  <img @click="showimg(item)" :src="item.url" alt />
                </li>
              </ul>
            </keep-alive>
            <svg class="icon" aria-hidden="true" slot="reference">
              <use xlink:href="#icon-biaoqing" />
            </svg>
          </el-popover>
        </div>
        <div class="btn">
          <el-button type="info" size="mini" plain @click="submit()">评论</el-button>
        </div>
      </div>
    </div>
    <div class="cardlist">
      <div class="card" v-for="item,index in comments" :key="index">
        <img :src="item.avatar" alt />
        <div class="vright">
          <div class="vhead">
            <span class="vnick">{{item.name}}</span>
            <span class="equip">{{item.equipment}}</span>
          </div>
          <div class="vmeta">
            <span class="vtime">{{item.time | filterTime(item.time)}}</span>
            <span class="vat" @click="showDialog(item)">回复</span>
          </div>
          <div class="vcontent">
            <p v-html="item.text"></p>
          </div>
          <div class="vquote">
            <div
              class="card"
              v-for="citem,cindex in child_replyUser"
              :key="cindex"
              v-if="item.comment_id==citem.comment_id"
            >
              <img id="vimg" :src="citem.avatar" />
              <div class="vright">
                <div class="vhead">
                  <span class="vnick">{{citem.name}}</span>
                  <span class="equip">{{citem.equipment}}</span>
                </div>
                <div class="vmeta">
                  <span class="vtime">{{citem.time | filterTime(citem.time)}}</span>
                  <span class="vat" @click="showDialog(item,citem)">回复</span>
                </div>
                <div class="vcontent">
                  <p>{{citem.text}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      name: "",
      email: "",
      visible: false,
      emojis: [],
      comments: [],
      comment_user: {},
      child_replyUser: [],
      dialogVisible: false,
      dialogTitle: "",
      reply_user: {
        name: "",
        email: "",
        text: "",
        equipment: window.navigator.userAgent.split(" ")
      }
    };
  },
  async created() {
    //读取emoji表情
    let res = await this.$Axios.get("http://120.25.235.95:8080/getemoji");
    if (res.data.success) {
      this.emojis = res.data.res;
    } else {
      this.$message({
        message: "网络连接错误，请刷新或检查网络",
        type: "error"
      });
    }
    //读取comment
    let comments = await this.$Axios.post(
      "http://120.25.235.95:8080/about/get_comments"
    );
    this.comments = comments.data.res;
    this.comments.forEach(async item => {
      let res = await this.$Axios.post(
        "http://120.25.235.95:8080/about/get_comments_reply",
        {
          id: item.comment_id
        }
      );
      // console.log(res)
      res.data.res.forEach(item => {
        if (item.length != 0) {
          this.child_replyUser.push(item);
        }
      });
    });
  },
  methods: {
    showimg(item) {
      let str = `<img src=${item.url} style="width:.9rem;height:.8rem;"></img>`;
      this.$refs["txt"].innerHTML = this.$refs["txt"].innerHTML + str;
    },
    async submit() {
      let text = this.$refs["txt"].innerHTML;
      let time = new Date().getTime();
      let equipment = window.navigator.appVersion.split(" ");
      let reg = /[\u4e00-\u9fa5\da-zA-Z]{2,12}/;
      if (
        /[\u4e00-\u9fa5\da-zA-Z]{2,12}/.test(this.name) &&
        /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.email)
      ) {
        if (!text) {
          this.$message({
            showClose: true,
            message: "评论不能为空！",
            type: "error"
          });
        } else {
          let res = await this.$Axios.post(
            "http://120.25.235.95:8080/about/send_comment",
            {
              name: this.name,
              email: this.email,
              time,
              equip: equipment[equipment.length - 2],
              text: text
            }
          );
          if (res.data) {
            this.$message({
              showClose: true,
              message: "留言成功！",
              type: "success"
            });
            this.name = "";
            this.email = "";
            this.$refs["txt"].innerHTML = "";
            let comments = await this.$Axios.post(
              "http://120.25.235.95:8080/about/get_comments"
            );
            this.comments = comments.data.res;
          } else {
            this.$message({
              showClose: true,
              message: "留言失败，请检查网络！",
              type: "error"
            });
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的姓名和邮箱！",
          type: "error"
        });
      }
    },
    showDialog(item, citem) {
      if (citem) {
        this.dialogTitle = citem.name;
      } else {
        this.dialogTitle = item.name;
      }
      this.dialogVisible = true;
      this.comment_user = item;
    },
    async reply() {
      if (
        /[\u4e00-\u9fa5\da-zA-Z]{2,12}/.test(this.reply_user.name) &&
        /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(
          this.reply_user.email
        )
      ) {
        if (!this.reply_user.text) {
          this.$message({
            showClose: true,
            message: "评论不能为空！",
            type: "error"
          });
        } else {
          this.reply_user.text = `@${this.dialogTitle},` + this.reply_user.text;
          let res = await this.$Axios.post(
            "http://localhost:3000/about/reply_comment",
            {
              comment_user: this.comment_user,
              reply_user: this.reply_user
            }
          );
          if (res.data.success) {
            this.dialogVisible = false;
          }
          //清除文本框
          Object.keys(this.reply_user).forEach(key => {
            this.reply_user.key = "";
          });
          this.child_replyUser.push(res.data.user);
        }
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的姓名和邮箱格式！",
          type: "error"
        });
      }
    }
  },
  filters: {
    filterTime(str) {
      let now = new Date().getTime();
      let diff = Math.floor((now - str) / 1000);
      if (diff < 120) {
        return "刚刚";
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + "分钟前";
      } else if (diff < 86400) {
        return Math.floor(diff / 3600) + "小时前";
      } else if (diff < 86400 * 30) {
        return Math.floor(diff / 86400) + "天前";
      } else {
        return Math.floor((diff / 86400) * 30) + "月前";
      }
    }
  }
};
</script>

<style scoped lang="css">
#vimg {
  width: 2em;
  height: 2em;
  float: left;
  border-radius: 50%;
  margin-right: 0.7525em;
  border: 1px solid #f5f5f5;
  padding: 0.125em;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  color: #fc9d99;
  overflow: hidden;
  cursor: pointer;
}
.comment {
  padding: 0.5rem 5rem;
}
.comment .reply_form {
  display: flex;
}
.comment .inputBox {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 15rem;
  min-height: 15rem;
  border: 0.09rem solid #ccc;
  border-radius: 0.3rem;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 1, 1, 0.2);
}
.comment .inputBox .inputitle {
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem;
  display: flex;
}
.comment .inputBox .inputitle input {
  font-size: 0.9rem;
  flex: 1;
  border: none;
  outline: none;
  padding-bottom: 0.5rem;
  border-bottom: 0.1rem dotted #ccc;
}
.comment .inputBox .inputitle input:focus {
  border-color: teal;
}
.edit {
  position: relative;
  padding: 0 0.8rem;
}
.edit .textarea {
  font-size: 0.9rem;
  width: 100%;
  height: 5rem;
  max-height: 7rem;
  resize: vertical;
  max-width: 100%;
  background: transparent;
  border: none;
  outline: none;
  transition: 0.25s all ease;
}
.edit .textarea:empty::before {
  color: lightgrey;
  content: attr(placeholder);
}
.edit .emoji {
  text-align: right;
  padding-top: 1rem;
}
#emoji_box {
  width: 400px;
  height: 100%;
  font-size: 15px;
  /* display: flex; */
  list-style: none;
  margin: 0;
  padding: 0;
}
#emoji_box li {
  display: inline-block;
  font-style: normal;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}
.comment .edit .btn {
  text-align: right;
  padding-top: 1.5rem;
}
.cardlist {
  width: 100%;
}
.cardlist .card {
  padding-left: 10px;
  padding-top: 0.8em;
  position: relative;
  display: block;
}
.cardlist .card img {
  width: 3em;
  height: 3em;
  float: left;
  border-radius: 50%;
  margin-right: 0.7525em;
  border: 1px solid #f5f5f5;
  padding: 0.125em;
}
.cardlist .card .vright {
  overflow: hidden;
  padding-right: 20px;
  padding-bottom: 0.5em;
  border-bottom: 1px dashed #f5f5f5;
}
.cardlist .card .vright .vhead {
  line-height: 1.5;
  margin-top: 0;
}
.cardlist .card .vright .vmeta {
  line-height: 1;
  position: relative;
}
.cardlist .card .vright .vcontent {
  word-wrap: break-word;
  word-break: break-all;
  text-align: justify;
  color: #4a4a4a;
  font-size: 0.875em;
  line-height: 2;
  position: relative;
  margin-bottom: 0.75em;
  padding-top: 0.625em;
}
.cardlist .card .vright .vhead .vnick {
  position: relative;
  font-size: 0.875em;
  font-weight: 500;
  margin-right: 0.875em;
  cursor: pointer;
  color: #1abc9c;
  text-decoration: none;
  display: inline-block;
}
.cardlist .card .vright .vhead .vnick::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: #1abc9c;
  transition: 0.3s all ease;
  color: #1abc9c;
}
.cardlist .card .vright .vhead .vnick:hover::before {
  color: red;
  width: 100%;
  left: 0;
  right: 0;
}
.cardlist .card .vright .vhead .equip {
  font-family: "黑体";
  display: inline-block;
  padding: 0.2em 0.5em;
  background: #ededed;
  color: #b3b1b1;
  font-size: 0.75em;
  border-radius: 0.2em;
  margin-right: 0.3em;
}
.cardlist .card .vright .vmeta .vtime {
  color: #b3b3b3;
  font-size: 0.75em;
  margin-right: 0.875em;
}
.cardlist .card .vright .vmeta .vat {
  font-size: 0.8125em;
  color: #ef2f11;
  cursor: pointer;
  float: right;
}
.cardlist .card .vright .vcontent p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.vquote {
  color: #666;
  margin-top: 1em;
  padding-left: 1em;
  border-left: 1px dashed hsla(0, 0%, 93%, 0.5);
}
</style>
