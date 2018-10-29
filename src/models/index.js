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
    });
  }
  queryAllHero() {
    const sql = `
  use hero;
  select * from heros
  ;`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (error, rows) => {
        if (error) {
          console.log(error);
          reject('英雄数据库查询错误');
        } else {
          resolve(rows[1]);
        }
      })
    });
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
    });
  }
}

export const model = new Model(db);
