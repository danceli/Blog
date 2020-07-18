<template>
  <div class="introduction">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
        <span>博客简介</span>
      </div>
      <div class="text item">
        用于总结平常的工作和学习中的经验。
      </div>
      <div class="text item">
        我来到->我记录
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'introduction',
  data() {
    return {
      
    }
  },
}
</script>

<style scoped lang="css">
.introduction{
  padding:0.2rem;
  padding-left: 1rem;
} 
.introduction .title{
  text-align: center;
}
.item{
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>
