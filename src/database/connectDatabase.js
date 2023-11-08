const mysql = require('mysql2')
require('dotenv').config()

class DB{
  constructor() {}

  async connection(){
      const conn = mysql.createConnection(process.env.DATABASE_URL)
      return conn
  } 

  async makeQuery(query){
      try{
        let conn = await this.connection()
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
