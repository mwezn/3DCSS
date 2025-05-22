const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 5000;
const path=require('path')


app.use( '/' , express.static(path.join(__dirname ,'')))
console.log(path.join(__dirname ,''))

app.get('/', (req, res)=> {
    //res.setHeader("Content-Type", "text/javascript");
    res.sendFile('index.html', { root: __dirname })
})

app.get('/cube',(req, res)=>{
    res.sendFile('cube.html', {root: __dirname})
})
app.listen(port,()=>console.log(`Server listening on port: ${port}`))