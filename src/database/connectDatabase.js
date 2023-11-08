const mysql = require('mysql2/promise')
require('dotenv').config()

class DB{
  constructor() {}

  async connection(){
      const conn = await mysql.createConnection(process.env.DATABASE_URL).catch(console.log("Conexão feita"))
      console.log('Connected to PlanetScale!')
      return conn
  } 

  async makeQuery(query){
      try{
        let conn = await this.connection()
        const [rows, fields] = await conn.execute(query).catch(console.log('Query feita'))
        conn.end()
        console.log("Conexão com PlanetScale fechada")
        return rows
      }catch(err){
          console.log("Não foi possivel executar a query: ", err)
          throw err
      }
  }
}

module.exports = DB
