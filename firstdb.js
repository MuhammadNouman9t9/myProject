const express = require('express')
const mongoose = require('mongoose')

const app =express()

mongoose.connect('mongodb+srv://mnouman:Nouman123@cluster0.j71hugz.mongodb.net/')

app.get("/getuser", (req, res)=>{

})

app.listen(4000)