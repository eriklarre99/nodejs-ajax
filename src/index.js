const express = require('express');
const morgan = require('morgan');
const path = require('path');

// inicializacion de express
const app = express();

// settings 
app.set('port' , process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para envios de datos por url
app.use(express.json()); //encargado de entender y de recibir json

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname , '/public' )))

// 404 handler
app.use((req, res, next) => {
    res.status(404).render('404');
    // res.status(404).send('Not found');
});  

app.listen( app.get('port') , () => {
    console.log(`Servidor On Port: ${app.get('port')}`);
})