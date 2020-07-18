const static=require('koa-static');

module.exports=function(router,options){
  options=options||{};
  options.images=options.images||30;
  options.html=options.html||30;
  options.script=options.script||30;
  options.styles=options.styles||30;
  //静态文件
  router.all(/((\.jpg)|(\.png)|(\.gif))$/i,static('./static',{
    maxage:options.images*86400*1000
  }))
  router.all(/((\.html)|(\.htm))$/i,static('./static',{
    maxage:options.html*86400*1000
  }))
  router.all(/((\.js)|(\.jsx))$/i,static('./static',{
    maxage:options.script*86400*1000
  }))
  router.all(/(\.css)$/i,static('./static',{
    maxage:options.styles*86400*1000
  }))
  router.all('*',static('./static',{
    maxage:30*86400*1000
  }))
}
