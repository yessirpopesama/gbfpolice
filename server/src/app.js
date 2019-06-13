const Koa = require('koa');
const router = require('./router');
const error = require('koa-json-error');
const bodyparser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const app = new Koa();
const moment = require('moment');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));

app.use(cors({
    credentials: true
}));

app.use(error(function formatError(err) {
    console.error({err: err}, "formatError");
    let r = {};
    r.errorno = err.errorno || 400;
    r.errormsg = err.errormsg || 'Unkonw Error';
    return r
}));

morgan.token('date_current', () => {
    return moment().format('YYYY-MM-DD HH:mm:ss.SS')
})
app.use(async (ctx, next) => {
    morgan.token('bodydata', () => {
        let body = JSON.stringify(ctx.request.body)
        return body ? body : ctx.request.body ? ctx.request.body : "-"
    });
    let mo = morgan(`{"time":":date_current","method":":method","url":":url","body":":bodydata","status":":status","response_time":":response-time ms","content_length":":res[content-length]","remote_addr":":remote-addr","user_agent":":user-agent"}`)
    await mo(ctx, next)
});

app.use(helmet());

app.use(bodyparser({
    jsonLimit: "5mb"
}));


router(app);

module.exports = app.listen(process.env.PORT || 8100);
console.log(`App start listen at ${process.env.PORT || 8100}`);
