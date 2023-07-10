const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
const {userRouter} = require('./routes/user.routes')
const {restaurantRouter} = require('./routes/restaurent.routes')
const {orderRouter} = require('./routes/order.routes')
const {connection} = require('./db')

app.get('/',(req,res) => {
    res.send("Home Page!!")
})

app.use('/user',userRouter)
app.use('/restaurant',restaurantRouter)
app.use('/order',orderRouter)


app.listen(process.env.PORT, async ()=>{
    try{
     await connection
    console.log('connected to the database')
    }
    catch(err){
        console.log(err)
    }
    console.log('Running at',process.env.PORT)
})




