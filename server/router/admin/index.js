const Router=require('koa-router');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const config=require("../../lib/config.js");

let router=new Router();

router.post('/login',async ctx=>{
  let {username,password}=ctx.request.fields.userinfo;
  let hash=crypto.createHash('md5');
  
  //查询数据库
  let res=await ctx.db.query(`SELECT * FROM admin WHERE username='${username}';`);
  if(res.length>0){//用户名正确
  //比对密码
    hash.update(password);
    if(res[0].password!=hash.digest('hex')){//密码错误
      ctx.body={
      	success:0,
	msg:'密码输入错误'
      }
    }else {//密码正确
       const rule={id:res[0].ID,name:res[0].username,identity:res[0].identity};
       let token= jwt.sign(rule,config.SECRETKEY,{expiresIn:7200});
       ctx.body={
	 success:1,
	 msg:'登陆成功',
	 token
       }
    }
  }else {
     ctx.body={
       success:0,
       msg:'请输入正确的用户名'
     }
   }

});
router.post('/picture',async ctx=>{
  let {page}=ctx.request.fields;
  console.log(page)
  let page_size=15;
  let res=await ctx.db.query(`SELECT * FROM photo;`);
  let src_list=[];
  Array.from(res).forEach(item=>{
    src_list.push(item.url);
  });
  if(res.length>0){
    ctx.body={
      success:1,
      pictures:res.slice(page_size*(parseInt(page)-1),page_size*parseInt(page)),
      src_list:src_list
    }
  }else{
    ctx.body={
      success:0
    }
  }
});

module.exports=router.routes();
