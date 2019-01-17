import db from './connect';

class Model {
  constructor(db) {
    this.db = db;
  }
  queryHeroInfoByName({ hid }) {
    const sql = `
  use hero;
  select * from heros
  where heros.hid = ?
  ;`;
    const values = [hid];
    return new Promise((resolve, reject) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          reject('英雄数据库查询错误');
        } else {
          resolve(rows[1]);
        }
      });
    }).catch((error) => { console.log(error); });
  }
  queryAllHero() {
    const sql = `
  use hero;
  select * from heros limit 20
  ;`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (error, rows) => {
        if (error) {
          console.log(error);
          reject('英雄数据库查询错误');
        } else {
          resolve(rows[1]);
        }
      });
    }).catch((error) => { console.log(error); });
  }
  queryHeroSkill({ hid }) {
    const sql = `
  use hero;
  select * from heroskill
  where heroskill.hid = ?
  ;`;
    const values = [ hid ];
    return new Promise((resolve, reject) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          reject('技能数据库查询错误');
        } else {
          resolve(rows[1]);
        }
      });
    }).catch((error) => { console.log(error); });
  }
  queryUser({ username }) {
    const sql = `
  use hero;
  select * from usertable
  where usertable.username = ?
  ;`;
    const values = [username];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('查询用户失败');
        } else {
          res(rows[1]);
        }
      });
    }).catch((error) => { console.log(error); });
  }
  addUser({ username, password}) {
    const sql = `
  use hero;
  INSERT INTO
    usertable(username, password)
  VALUES
    (?, ?)
  ;`;
    const values = [username, password];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('添加用户失败');
        } else {
          res('添加用户成功');
        }
      });
    }).catch((error) => { console.log(error); });
  }
  queryUserDoc({ username }) {
    const sql = `
  use hero;
  select * from userdoc
  where userdoc.username = ?
  ;`;
    //console.log(username);
    const values = [username];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('查询用户收藏失败');
        } else {
          res(rows[1]);
        }
      });
    }).catch((error) => { console.log(error); });
  }
  addDoc({ username, hid}) {
    const sql = `
  use hero;
  insert into
    userdoc(username, hid)
  values
    (?, ?)
  ;`;
    const values = [username, hid];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('收藏失败');
        } else {
          res('收藏成功');
        }
      }); 
    }).catch(error => console.log(error));
  }
  deleteDoc({ username, hid }) {
    const sql = `
  use hero;
  delete from userdoc
  where userdoc.username = ? and userdoc.hid = ?
  ;`;
    const values = [username, hid];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('收藏夹删除失败');
        } else {
          res('收藏成功');
        }
      });
    }).catch(error => console.log(error));
  }
  queryItem({ iid }) {
    const sql = `
  use hero;
  select * from itemtable
  where itemtable.iid = ?
  ;`;
    const values = [iid];
    return new Promise((res, rej) => {
      this.db.query(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
          rej('查询项目失败');
        } else {
          res(rows[1]);
        }
      });
    }).catch(error => console.log(error));
  }
  addItem({ username, iid, iname, tag, stime, etime, rschedule, unit, rtotal, icheck }) {
    const sql = `
  use hero;
  insert into itemtable(username, iid, iname, tag, stime, etime, rschedule, unit, rtotal, icheck)
  value(?,?,?,?,?,?,?,?,?,?)
  ;`;
    const value = [username, iid, iname, tag, stime, etime, rschedule, unit, rtotal, icheck];
    return new Promise((res, rej) => {
      this.db.query(sql, value, (error, rows) => {
        if (error) {
          console.log(error);
          rej('加入新项目失败');
        } else {
          res('加入新项目成功');
        }
      });
    }).catch(error => console.log(error));
  }
  deleteItem({ iid }) {
    const sql = `
  use hero;
  delete from itemtable
  where itemtable.iid = ?
  ;`;
    const value = [iid];
    return new Promise((res, rej) => {
      this.db.query(sql, value, (error, rows) => {
        if (error) {
          console.log(error);
          rej('删除项目失败');
        } else {
          res('删除项目成功');
        }
      });
    }).catch(error => console.log(error));
  }
  queryAllItem({ username }) {
    const sql = `
  use hero;
  select * from itemtable
  where itemtable.username = ?
  ;`;
    const value = [username];
    return new Promise((res, rej) => {
      this.db.query(sql, value, (error, rows) => {
        if (error) {
          console.log(error);
          rej('查询所有项目失败');
        } else {
          res(rows[1]);
        }
      });
    }).catch(error => console.log(error));
  }
}

export const model = new Model(db);
