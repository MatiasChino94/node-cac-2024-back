//server estatico con express Clase 03  10/06

//PARA USAR MIS VARIABLES ENTORNO
//esto levanta todas mis variables de entorno 
require('dotenv').config();


const express = require('express');
const app = express();


const path = require('path')

//usamo su middleword
//ruta absoluta 
//el 'use' se usacargar midlewaord / routes
app.use(express.static(path.join(__dirname, "public")));


//Agregamos este middleword si en peticiones vamos a recibir un json 
app.use(express.json());

//si quiero enviar un formulario html agregamos el middleword
//app.use(express.urlencoded({extended: true}));

//USANDO ROUTES
const productosRouter = require('./routes/productos.router');
const exp = require('constants');
app.use('/productos', productosRouter);


app.get("/", (req, res) => {
    res.send("Hola desde express...");
});


app.get("/factura",(req, res) => {
    res.sendFile(path.join(__dirname, "private", "factura.html"));
})


//usar variable de entorno 
// const PORT = process.env.PORT || 4000;
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});