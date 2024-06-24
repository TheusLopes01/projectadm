const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')

const port = 3000;
var path = require('path');
const app = express();

var login = "Admin";
var password = "12345678"

app.use(session({secret:'dkalsjdklajsdljskd32323'}));
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));


app.post('/',(req,res)=>{
    if(req.body.password == password && req.body.login == login){
        //Logado com sucesso!
        req.session.login = login;
        res.render('index4', {login: login});
    
    }else{
        res.render('index1') 
    }
})

app.get('/',(req,res)=>{
    if(req.session.login) {
        res.render('index4', {login: login});
        console.log('O meu usuário logado é: '+ req.session.login);
    }else{
        res.render('index1');
    }
    
})


app.listen(port,()=>{
    console.log('servidor rodando');
})