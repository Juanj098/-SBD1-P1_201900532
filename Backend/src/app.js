const express = require('express')
const oracledb = require('oracledb')

const app = express()

const port = 3000

async function connectToDB() {
    const connectiondb = await oracledb.getConnection({
        user    :'juanj',
        password: 'G3R4RDI',
        connectionString: 'localhost:1522/SDB1_P1_201900532'
    })    

    await connectiondb.close()
}

connectToDB()

app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.listen(port,()=>{
    console.log(`example app listening on port ${port} :)`)
})
