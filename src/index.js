import koa from 'koa';
import router from './router';
import { port } from './config';
const app = new koa();

app.use(router.routes());

app.listen(port, () => {
  console.log(`server launch at port ${port}`);
});
