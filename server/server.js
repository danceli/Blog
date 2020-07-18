const koa=require('koa');
const Router=require('koa-router');
const db=require('./database/index');
const body=require('koa-better-body');
const path=require('path');
const static=require('./router/static.js');
const server=new koa();
const cors=require('@koa/cors');
server.use(cors());
//数据库
server.context.db=db;

//数据
server.use(body({
  uploadDir:path.resolve(__dirname,'upload')
}))

//router 路由
let router=new Router();
//错误同意处理
router.use('*',async (ctx,next)=>{
  ctx.set('Access-Control-Allow-Origin','*');
  ctx.set('Access-Control-Allow-Methods','GET,HEAD,PUT,POST')
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
})

//静态文件
static(router);
router.use('/getemoji',require('./router/emoji/index.js'))
router.use('/about',require('./router/about/index.js'));
router.use('/article',require('./router/article/index.js'));
router.use('/admin',require('./router/admin/index.js'));
router.use('/search',require('./router/search/index.js'));
server.use(router.routes());
server.listen(8080);
