// ************ Require's ************
const createError = require('http-errors');
const session = require('express-session');
const cookies = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ port - (don't touch) ************
const port = 3002;

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, './public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
//const mainRoutes = require('./routes/main'); // Rutas main
const productsRoutes = require('./routes/products'); // Rutas /products
const userRoutes = require('./routes/users'); // Rutas /users
const genresRoutes = require('./routes/genres'); // Rutas /genres

//app.use('/', mainRoutes);
app.use('/', productsRoutes);
app.use('/users', userRoutes);
app.use('/genres', genresRoutes);

/*app.use('*', (req, res) => {
  res.render('../views/page_404');
});*/


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
//app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
/*app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

// ************ exports app - dont'touch ************
module.exports = app;

