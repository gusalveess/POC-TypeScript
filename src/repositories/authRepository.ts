import db from "../database.js";
import {InsertUser} from '../protocols/Auth.js'

async function CreateUser(user: InsertUser) {
    return db.query(
        `INSERT INTO users (picture, name, email, password) VALUES ($1, $2, $3, $4)`,[user.picture, user.name, user.email, user.passwordHash]
    )
}

async function FindUser(email: string) {
    return db.query(
        `SELECT * FROM users WHERE email=$1`,[email]
    )
}

async function Login(token: string, userid: number) {
    return db.query(`INSERT INTO sessions (token, userid) VALUES ($1, $2)`, [
      token,
      userid,
    ]);
  }

  async function FindToken(token: string) {
    return db.query(
      `SELECT
    *
  FROM sessions
  WHERE token = $1
    AND online = TRUE;`,
      [token]
    );
  }

  async function Finish(token: string) {
    return db.query(`UPDATE sessions SET online = FALSE WHERE token = $1;`, [
      token,
    ]);
  }


export {CreateUser, FindUser, Login, FindToken, Finish}