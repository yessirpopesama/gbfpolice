const Router = require('koa-router');
const controller = require('./controller');

const router = Router({
    prefix: '/api/v1/arrest'
});

router.get('/all', controller.arrest);

module.exports = router;