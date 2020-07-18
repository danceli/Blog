<template>
  <transition name="bounceDown">
    <div class="search" v-show="$store.state.search_show">
      <div class="inputbox">
        <div style="flex:10;">
          <input type="text" v-model="keyWord" placeholder="请输入内容" @input="search()"/>
        </div>
        <div style="flex:1;" class="searchicon">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <div class="res-search-box" v-show="is_show">
        <div v-for="item,index in resList" :key="index" @click="viewArticle(item.id)">
          {{item.title}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      keyWord:'',
      resList:[]
    };
  },
  computed: {
    is_show(){
      if(this.keyWord==='' || this.resList.length==0){
        return false;
      }else{
        return true
      }
    }
  },
  methods: {
   async search(){
     if(this.keyWord){
       let res=await this.$Axios.get(`http://120.25.235.95:8080/search/searchArticle?keyword=${this.keyWord}`);
       if(res.data.success){
         this.resList=res.data.res_article;
       }
     }
    },
    viewArticle(id){
      this.$router.push(`/article/${id}`);
      this.keyWord='';      //清空搜索框
      this.$store.dispatch('search_toggle',false);//隐藏搜索框
    }
  }
};
</script>

<style scoped lang="css">
.search {
  width: 40%;
  z-index: 14;
  position: fixed;
  text-align: center;
  left: 30%;
  /* margin-left: -50%; */
}
.search .res-search-box{
  width: 100%;
  margin-top: .1rem;
  padding: 0.3rem;
  background: #377d6a ;
  color: white;
}
.search .res-search-box div{
  width: 100%;
  background: #377d6a ;
  cursor: pointer;
  box-sizing: border-box;
  font-size: .9rem;
  padding-top: .3rem;
  text-align: left;
}
.search .res-search-box div:hover{
  color: deepskyblue;
}

.search .inputbox {
  background: #377d6a;
  width: 100%;
  display: inline-flex;
  height: 2rem;
  line-height: 2rem;
  border-radius: 0.2rem;
  padding: 0.3rem;
}
.search .inputbox div input {
  color: aliceblue;
  width: 100%;
  border: none;
  outline: none;
  background: none;
}
.search .inputbox div i {
  color: aliceblue;
}

.search .inputbox div input::placeholder {
  color: #ccc;
}
@media (max-width: 414px) {
  .search {
    width: 100%;
    z-index: 14;
    position: fixed;
    text-align: center;
    left: auto;
    transform: none;
  }
  .search .inputbox {
    background: #377d6a;
    width: 100%;
    display: inline-flex;
    height: 2rem;
    line-height: 2rem;
    border-radius: 0;
    padding: 0.3rem;
  }
}
</style>
