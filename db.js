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
        return rows[0]
    },
    addUser: async(name, email, password)=>{
        if(!name|!email|!password) return {failed:"Data deficient."}
        const sql = `
        INSERT INTO  Users(
            name,
            email,
            password,
            available
        ) VALUES($1, $2, $3, $4)
        `
        await pool.query(sql,[
            name,
            email,
            password,
            true
        ])
        
        return {success:{name:name,email:email}}
    },
}