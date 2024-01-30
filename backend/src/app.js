const koa = require("koa");
const authRouter = require('../routes/auth.route')
const app = new koa();


app.use(authRouter.routes())

app.use((ctx) => {
  ctx.status = 200;
  ctx.body = { message: "hey there!!!!" };
});

module.exports = app;
