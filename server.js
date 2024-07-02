const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const app = express();

// Dados de usuários (em um banco de dados real, você armazenaria isso de forma segura)
let users = [
    { login: 'Admin', password: '12345678' }
];

// Configuração de sessão
app.use(session({secret: 'dkalsjdklajsdljskd32323', resave: false, saveUninitialized: true}));

// Configuração do body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Configuração do mecanismo de visualização
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

// Rota para login
app.post('/', (req, res) => {
    const { login, password } = req.body;
    const user = users.find(u => u.login === login && u.password === password);
    
    if (user) {
        req.session.login = login;
        res.render('index3', { login: login });
    } else {
        res.render('index1');
    }
});

// Rota para servir a página inicial
app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('index3', { login: req.session.login });
    } else {
        res.render('index1');
    }
});

// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Rota para cadastro
app.post('/register', (req, res) => {
    const { usuario, senha } = req.body;
    if (usuario && senha) {
        users.push({ login: usuario, password: senha });
        res.render('index1'); // Redireciona para a página de login após o cadastro
    } else {
        res.send('Falha no cadastro: Usuário ou senha não fornecidos.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
