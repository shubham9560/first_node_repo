const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;


var app = express()

hbs.registerPartials(__dirname+'/views/partials/')
hbs.registerHelper('currentYear',()=>{return new Date().getFullYear()})
hbs.registerHelper('screamIt',(text)=>{ return text.toUpperCase()})

app.use(express.static(__dirname+'/public_static'))

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n',(e)=>{
        if(e) console.log(e);
    })
    next()
})

// app.use((req,res,next)=>{
//     res.render('maintenance',{pageTitle:'maintenance'})
// })
app.get('/',(req,res)=>{
    //res.send('<h1>hello world!</h1>')
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        text:'welcome'
    })
})

app.get('/about',(req,res)=>{
    "use strict";
    res.render('about.hbs',{
        pageTitle : 'About us',
    })
})
app.get('/bad',(req,res)=>{
    "use strict";
    res.send('error messsage')
})

app.get('/project',(req,res)=>{
    "use strict";
    res.render('project.hbs',{
        pageTitle:'Project',
        text:"this is my project"
    })
})

app.listen(port,()=>console.log(`server started at port : ${port}`))