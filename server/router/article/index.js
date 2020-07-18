const Router=require('koa-router');
const fs=require('fs');

let router=new Router();

//article/hotArticle
router.get('/hotArticle',async ctx=>{
  let res=await ctx.db.query(`SELECT * FROM linux_article ORDER BY views DESC;`);
  let hot_size=6;
  ctx.body={
    success:1,
    list:res.slice(0,hot_size)
  };
})
router.post('/getArticleList',async ctx=>{
  let {type,page}=ctx.request.fields;
  let page_size=6;
  let res=await ctx.db.query(`SELECT * FROM linux_article WHERE article_type='${type}';`);
 
  ctx.body={
    success:1,
    res:res.slice(page*page_size,(page+1)*page_size),
    article_length:res.length
  }
})
router.post('/getArticleDetail/:id',async ctx=>{
  let id=ctx.params.id;
  let res=await ctx.db.query(`SELECT * FROM linux_article WHERE id=${id}`);
  let filename=res[0].file_url;
  
  let html=fs.readFileSync(filename).toString();  
  ctx.body={
    success:1,
    res:res[0],
    html
  }
});

router.post('/setLike',async ctx=>{
  let {article_id,isLike}=ctx.request.fields;
  let one=isLike ? 1 : -1;
  //修改数据库中的zan字段
  let res=await ctx.db.query(`UPDATE linux_article SET zan=zan+${one} WHERE id=${article_id};`);
  if(res){
    ctx.body={
      success:1
    }
  }
})
router.post('/addView',async ctx=>{
  let {article_id}=ctx.request.fields;
  let res=await ctx.db.query(`UPDATE linux_article SET views=views+${1} WHERE id=${article_id};`);
  if(res){
    ctx.body={
      success:1
    }
  }
});
router.post('/getLiterature',async ctx=>{
  let page_size=12;
  let {page,type}=ctx.request.fields;
  let res=await ctx.db.query(`SELECT * FROM linux_article WHERE article_type='${type}';`);
  if(res.length>0){
    ctx.body={
      success:1,
      res:res.slice(page_size*(page-1),page_size*page),
      article_length:res.length
    }
  }
});
module.exports=router.routes();
