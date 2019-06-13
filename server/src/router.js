const arrestRouter = require('./modules/arrest/router');

/*
 * 自动加载router目录下的所有路由, 并添加到app中
 */
function register(app) {
    app.use(arrestRouter.routes());
}

module.exports = register;