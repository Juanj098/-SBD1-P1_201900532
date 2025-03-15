const express = require('express')
const oracledb = require('oracledb')

const app = express()

const port = 3000

const db = {
    user    :"SYSTEM",
    password: 'G3R4RDI',
    connectionString: 'localhost:1522/FREE'
}

async function connectToDB() {
    const connectiondb = await oracledb.getConnection({
        user    :"c##juanjo",
        password: 'G3R4RDI',
        connectionString: 'localhost:1522/FREE'
    })    
    await connectiondb.close()
}

connectToDB()

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.get('/ping', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection(db);
      const result = await connection.execute('SELECT SYSDATE FROM DUAL');
      res.json(result.rows);
    } catch (err) {
      console.error('Error al consultar la base de datos:', err);
      res.status(500).send('Error en la consulta');
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  });

app.listen(port,()=>{
    console.log(`example app listening on port ${port} :)`)
})
