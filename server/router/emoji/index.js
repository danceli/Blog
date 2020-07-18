const Router=require('koa-router');

let router=new Router();
router.get('/',async ctx=>{
  let res=await ctx.db.query(`SELECT * FROM emoji`);
  if(res.length>0){
    ctx.body={
      res,
      success:1
    }
  }else{
    ctx.body={
      res,success:0
    }
  }
})
module.exports=router.routes();
