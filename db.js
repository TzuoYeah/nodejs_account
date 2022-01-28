const { Pool } = require('pg')
const { credentials } = require('./config')
const pool = new Pool( credentials.postgres )

module.exports = {
    auth: async(email="")=>{
        const { rows } = await pool.query('SELECT email,password FROM USERS WHERE email IN ($1)',[email])
        return rows
    },
    findUser: async(email="")=>{
        const { rows } = await pool.query('SELECT name,email FROM USERS WHERE email IN ($1)',[email])
        return rows
    },
    addUser: async(email="",password="")=>{
        const sql = `
        INSERT INTO  Users(
            name,
            email,
            password,
            comment,
            age,
            available
        ) VALUES($1, $2, $3, $4, $5, $6)
        `
        await pool.query(sql,[
            email,
            email,
            password,
            'comment',
            0,
            true
        ])
        return {}
    },
}