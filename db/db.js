//conectandome a la base de datos

const mysql = require('mysql2');

//a este objeto hay que pasarle los siquientes datos
const conexion = mysql.createConnection({
    //a que servidor me estoy conectando
    //poner variables de entorno
    // 'process.env.laVariabledeEntorno' en cada lugar
    host: 'localhost',
    //usurio de la base de datos (ojo esto es local)
    user: 'root',
    //password(ojo esto es local)
    password: '',
    //nombre de la base de datos a conectar
    database: 'vinitoteca_cac',

});

conexion.connect((error) => {
    if(error){
       return console.log(error);
    }

    console.log('Conectado con exito');
});

module.exports = conexion;