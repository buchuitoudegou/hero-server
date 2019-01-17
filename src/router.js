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
.post('/user/register', async (ctx) => {
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
.put('/user/login', async (ctx) => {
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
    ctx.status = 500;
    ctx.body = {
      status: 'INTERNAL ERROR',
      msg: 'fail'
    };
  }
})
.get('/user/:username/document', async (ctx) => {
  try {
    //console.log(ctx.url);
    const username = ctx.params.username;
    //console.log(ctx.params);
    if (username.split(' ').length > 1) {
      throw 'invalid username';
    } else {
      const result = await model.queryUserDoc({ username: username });
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
        msg: '查询用户收藏成功',
        data: result
      };
    }
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY_ERROR',
      msg: '查询用户收藏失败'
    }
  }
})
.post('/user/document', async (ctx) => {
  try {
    const body = ctx.request.body;
    if (body.username.split(' ').length > 1 || body.hid.split(' ').length > 1) {
      throw 'invalid username or hid';
    } else {
      if (body.op === 'delete') {
        await model.deleteDoc({ username: body.username, hid: body.hid });
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          msg: '删除收藏成功'
        };
      } else {
        await model.addDoc({ username: body.username, hid: body.hid });
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          msg: '添加收藏成功'
        };
      }
    }
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = {
      status: 'INTERNAL_ERROR',
      msg: 'fail'
    };
  }
})
.get(`/item/:iid`, async (ctx) => {
  try {
    const iid = ctx.params.iid;
    if (iid.split(' ').length > 1) {
      throw 'invalid iid';
    }
    const result = await model.queryItem({ iid: iid });
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '查询项目成功',
      data: result
    };
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY ERROR',
      msg: 'fail'
    };
  }
})
.post(`/item`, async (ctx) => {
  const body = ctx.request.body;
  try {
    body.iid = String(Date.parse(new Date()));
    const result = await model.addItem(body);
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '加入项目成功'
    }
  } catch (error) {
    console.log(error);
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY ERROR',
      msg: 'fail'
    }
  }
})
.delete(`/item/:iid`, async (ctx) => {
  try {
    const iid = ctx.params.iid;
    const result = await model.deleteItem({ iid: iid});
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '删除项目成功'
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY FAIL',
      msg: '删除项目失败'
    }
  }
})
.get(`/item/user/:username`, async (ctx) => {
  try {
    const username = ctx.params.username;
    const result = await model.queryAllItem({ username: username });
    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      msg: '查询成功',
      data: result
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'QUERY ERROR',
      msg: '查询失败'
    }
  }
});
export default router;
