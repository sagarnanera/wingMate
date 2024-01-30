const koa_router = require("koa-router");
const router = koa_router({prefix:"/api/v1/auth"});


router.get('/login',ctx=>{
    ctx.body = "here in login";
})

module.exports = router;