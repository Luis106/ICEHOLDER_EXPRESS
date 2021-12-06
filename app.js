///Requerimeintos
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

///Rutas
var indexRouter = require('./routes/index');
var usuarioRoutes = require('./routes/usuario.routes.js');
var ProductoRouter = require("./routes/Producto.routes.js");
var authRouter = require("./routes/auth.routes.js");
var VentaRouter = require("./routes/Venta.routes.js");
var ProvedoresRouter = require("./routes/Provedores.routes.js");

var app = express();

///Mongoose 
const mongoose = require("mongoose");
//Local
//const databaseUrl = "mongodb://localhost:27017/c"
///Atlas
const databaseUrl = "mongodb+srv://root:root@clusterulsa.ntifm.mongodb.net/iceholder?retryWrites=true&w=majority"
const databaseOptions = {
    useNewUrlParser: true
};
mongoose.connect(databaseUrl,databaseOptions );
mongoose.connection.on("open", function(){
    console.log("MongoDB connection opened");
});

///Inicializar Redis
/*
try {
  const redis = require("redis")
  client  = redis.createClient();
  
  const util = require("util")
  client.get = util.promisify(client.get); 
  console.log("Redis conectado")
  
} catch (error) {
  console.log("Redis no conectado")
  
}
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//app.use('/', indexRouter);
app.use('/Usuario', usuarioRoutes);
app.use("/auth",authRouter)
app.use("/Producto", ProductoRouter)
app.use("/Ventas", VentaRouter)
app.use("/Provedores", ProvedoresRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Ruta no encontrada")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  // render the error page
  res.status(err.status || 500);
  res.render('error');

  // Pass to next layer of middleware
  next();
});

module.exports = app;
