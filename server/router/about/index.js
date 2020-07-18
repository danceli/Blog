const Router=require('koa-router');
const gravatar=require('gravatar');

let router=new Router();

//about/get_comments
router.post('/get_comments',async ctx=>{
  let res=await ctx.db.query(`SELECT * FROM comment`);

  Array.from(res).forEach(async item=>{
    let child=await ctx.db.query(`SELECT * FROM comment_reply WHERE comment_id=${item.comment_id};`)
    item.children=child;
  })
  ctx.body={
    success:1,
    res
  }
})
//about/get_comments_reply
router.post('/get_comments_reply',async ctx=>{
  let {id}=ctx.request.fields;
  let res=await ctx.db.query(`SELECT * FROM comment_reply WHERE comment_id=${id};`);
  ctx.body={
    success:1,
    res
  }
})
//about/send_comment
router.post('/send_comment',async ctx=>{
  let {name,email,text,time,equip}=ctx.request.fields;
  let avatar_url = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
  let res=await ctx.db.query(`INSERT INTO comment VALUES(0,'${name}','${email}','${text}',${time},'${avatar_url}','${equip}',1,${time});`);

  ctx.body={
    success:1,
    res
  }
});

router.post('/reply_comment',async ctx=>{
  let {comment_user,reply_user} = ctx.request.fields;
  //修改answer_id=0
  await ctx.db.query(`UPDATE comment SET answer_id=${1} WHERE comment_id=${comment_user.comment_id}`);
  let now=new Date().getTime();
  let avatar_url = gravatar.url(reply_user.email, {s: '200', r: 'pg', d: 'mm'});
  let res=await ctx.db.query(`SELECT * FROM comment WHERE comment_id='${comment_user.comment_id}';`);
  let equipment=reply_user.equipment[reply_user.equipment.length-2];
  await ctx.db.query(`INSERT INTO comment_reply VALUES (${res[0].comment_id},${now},${now},'${reply_user.name}','${reply_user.email}','${avatar_url}','${equipment}','${reply_user.text}',${now});`);
  ctx.body={
    success:1,
    user:{comment_id:res[0].comment_id,avatar:avatar_url,equipment:equipment,time:now,text:reply_user.text,name:reply_user.name}
  }
})
module.exports=router.routes();
