import mysql from 'mysql';
import { sqlconfig } from '../config';

const dbConnection = mysql.createConnection(sqlconfig);

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database is connected.');
  }
});

export default dbConnection;
