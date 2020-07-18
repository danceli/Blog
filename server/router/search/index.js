const Router=require('koa-router');

let router=new Router();

router.get('/searchArticle',async ctx=>{
  let {keyword}=ctx.request.query;
  let res_article=await ctx.db.query(`SELECT * FROM linux_article WHERE CONCAT_WS(" ", title, tanzhu, identity) REGEXP "${keyword}"`);
  if(res_article.length>0){
    ctx.body={
      success:1,
      res_article
    }
  }else{
    ctx.body={
      success:0
    } 
  }
})

module.exports=router.routes();
