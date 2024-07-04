const express = require('express');
const router = express.Router();

//configurando multer
const multer = require('multer');
const path = require('path');

//creamos un storage, un lugar donde guardar el archivo cuando se suba
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null, 'uploads' )
    },
    filename:(req, file, cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

//esto para que sepas donde los vas a guardar
//y validar los archivos y peso que mandamos 
const upload = multer({ 
    storage,
    
    fileFilter: (req, file, cb) => {
        //expresion regular 
        const filetypes = /jpeg|jpg|png/;

        //esto retorna true o false
        const mimetype = filetypes.test(file.mimetype);

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if(mimetype && extname){
            return cb(null,true);
        }

        cb('tipo de archivo no soportado');
    },

    limits: {fileSize: 1024 * 1024 * 1},


});

//esto es para agregar una imagen a la tabla 
//router.post('/', upload.single('imagen'), controller.crearProducto);


const controller = require('../controllers/productos.controller');


// el prefijo es '/productos' 
router.get('/', controller.index);
router.get('/:id', controller.mostrarProducto);
router.post('/', controller.crearProducto);
router.put('/:id', controller.modificarProductos);
router.delete('/:id', controller.borrarProducto);





///////////////////----------------///////////////////

//ESTO ES CUANDO TRABAJAMOS CON EL ARRAY

// const productos = [
//     {id:1, nombre:'Producto 1', stock: 10},
//     {id:2, nombre:'Producto 2', stock: 15},
//     {id:3, nombre:'Producto 3', stock: 20}
// ]

// router.get('/:id',(req, res) => {
//     console.log(req.params.id);

//     const producto = productos.find((e) => e.id == req.params.id);

//     console.log(producto);

//     if(!producto){
//         return res.status(404).json({error:'No existe el producto'})
//     }

//     res.status(201).send(producto)
// });


//se envia un cuerpo a esta peticion 
//creamos un elemento atraves del metodo POST
// router.post('/', (req, res) => {

//     console.log(req.body);
//     const productoEnviado = req.body;

//     const producto = {
//         id: productos.length + 1,
//         nombre: productoEnviado.nombre,
//         stock: productoEnviado.stock
//     };

//     productos.push(producto);

//     res.send(producto);
// });

//metodo PUT
//Actualizar datos
// router.put('/:id', (req, res) => {
//     console.log(req.params);
//     console.log(req.body);

//     const producto = productos.find((e) => e.id == req.params.id);

//     if(!producto){
//         return res.status(404).json({error:'No existe el producto'})
//     }

//     producto.nombre = req.body.nombre;
//     producto.stock = req.body.stock; 

//     res.send(producto)
// });


//metodo DELETE
//BORRAR DATOS
// router.delete('/:id' , (req, res) => {

//     const producto = productos.find((e) => e.id == req.params.id);

//     if(!producto){
//         return res.status(404).json({error:'No existe el producto'});
//     }

//     const productoIndex = productos.findIndex(e => e.id == req.params);

//     console.log(productoIndex);

//     productos.splice(productoIndex, 1);

//     res.send(producto)
// })



module.exports = router;