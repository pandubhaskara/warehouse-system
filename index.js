const express = require('express')
const app = express()
const port = 5000
const db = require('./database/db')
const route = require('./routes')

db()
app.get("/",(req,res)=>{
    res.status(200).send({
        status: "success",
        message:"API is online"
    })
})
app.use(express.json())
app.use('/api/v1', route)

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
});