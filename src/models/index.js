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
      })
    }).catch((error) => { console.log(error); });
  }
}

export const model = new Model(db);
