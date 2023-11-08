const mysql = require('mysql2/promise')
require('dotenv').config()

class DB{
  constructor() {}

  async connection(){
    try{
        const conn = await mysql.createConnection(process.env.DATABASE_URL)
        console.log('Connected to PlanetScale!')
        return conn
    }catch(e){
      console.log("Erro na conexão com o banco de dados: ", e)
      throw e;
    }
  } 

  async makeQuery(query){
    try{
      let conn = null
      try{
        conn = await this.connection()
        const [rows, fields] = await conn.execute(query)
        return rows
      }catch(err){
          console.log("Não foi possivel executar a query: ", err)
          throw err
      } finally{
        conn.end()
        console.log("Conexão com PlanetScale fechada")
      }
    } catch (e){
      throw e
    }
  }
}

module.exports = DB