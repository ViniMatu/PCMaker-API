const mysql = require('mysql2')
require('dotenv').config()

class DB{
  constructor() {}

  async makeQuery(query){
      try{
        const conn = mysql.createConnection(process.env.DATABASE_URL)
        const rows = await conn.promise().query(query).then(([rows, fields]) => {
          return rows
        }).catch(console.log)
        conn.end()
        return rows
      }catch(err){
          console.log("Não foi possivel executar a query: ", err)
          throw err
      }
  }
}

module.exports = DB
