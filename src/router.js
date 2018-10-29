import Router from 'koa-router';
import { model } from './models';

const router = new Router({ prefix: '/api' });

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
});

export default router;
