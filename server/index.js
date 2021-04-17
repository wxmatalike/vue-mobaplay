const express=require('express')

const app=express()
app.set('secret','5da4awd4ge4ftj4tykl74uoi465a4asf25')
app.use(require('cors')())
app.use(express.json())

//静态文件托管
app.use('/admin',express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname + '/web'))
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app);
require('./routes/admin')(app);
require('./routes/web')(app)

app.listen(3000,()=>{
    console.log('http:localhost:3000')
})