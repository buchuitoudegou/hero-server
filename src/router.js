import Router from 'koa-router';
import { model } from './models';
import bodyParser from 'koa-bodyparser';

const router = new Router({ prefix: '/api' });
router.use(bodyParser());

router
.get('/hero/all', async (ctx) => {
  try {
    const result = await model.queryAllHero();
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '查询所有英雄成功',
      data: result
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY_ERROR',
      msg: '查询错误'
    };
  }
})
.get('/hero/:hid', async (ctx) => {
  try {
    if (ctx.params.hid.split(' ').length > 1) {
      throw new String('error query');
    }
    const result = await model.queryHeroInfoByName({ hid: ctx.params.hid });
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '查询英雄成功',
      data: result
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY_ERROR',
      msg: '查询错误'
    };
  }
})
.get('/heroskill/:hid', async (ctx) => {
  try {
    if (ctx.params.hid.split(' ').length > 1) {
      throw new String('error query');
    }
    const result = await model.queryHeroSkill({ hid: ctx.params.hid });
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '查询英雄技能成功',
      data: result
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY_ERROR',
      msg: '查询错误'
    };
  }
})
.post('/register', async (ctx) => {
  try {
    if (!ctx.request.body.username || !ctx.request.body.password) {
      throw new String('register fail');
    } else if (ctx.request.body.username.split(' ').length > 1 || ctx.request.body.password.split(' ').length > 1) {
      throw 'invalid username or password';
    } else {
      const result = await model.queryUser({ username: ctx.request.body.username });
      if (result.length > 0) {
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          msg: 'DUPLICATED USERNAME'
        };
      } else {
        await model.addUser(ctx.request.body);
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          msg: 'success'
        };
      }
    } 
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'INTERNAEL ERROR',
      msg: 'fail'
    };
  }
})
.put('/login', async (ctx) => {
  try {
    if (!ctx.request.body.username || !ctx.request.body.password) {
      throw 'login fail';
    } else if (ctx.request.body.username.split(' ').length > 1 || ctx.request.body.password.split(' ').length > 1) {
      throw 'invalid username or password';
    } else {
      const result = await model.queryUser({ username: ctx.request.body.username });
      if (result.length === 0) {
        ctx.status = 200;
        ctx.body = {
          status: 'FAIL',
          msg: 'username not exists'
        };
      } else {
        if (result[0].password === ctx.request.body.password) {
          ctx.status = 200;
          ctx.body = {
            status: 'OK',
            msg: 'success'
          }
        } else {
          ctx.status = 200;
          ctx.body = {
            status: 'FAIL',
            msg: 'invalid password'
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'INTERNAL ERROR',
      msg: 'fail'
    };
  }
});

export default router;
