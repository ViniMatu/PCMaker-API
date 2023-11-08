const mysql = require('mysql2/promise')
require('dotenv').config()

class DB{
  constructor() {}

  async connction(){
    try{
      const dbConfig = process.env.DATABASE_URL
      const conn = mysql.createConnection(dbConfig)
      console.log(`Conectado ao PlanetScale`)
      return conn
    } catch (e){
      console.log("Erro ao se conectar ao PlanetScale: ", e)
      throw e
    }
  }

  async makeQuery(query){
      try{
        const conn = await this.connction()
        const [rows, fields] = await conn.query(query)
        conn.end()
        return rows
      }catch(err){
          console.log("Não foi possivel executar a query: ", err)
          throw err
      }
  }
}

module.exports = DB
