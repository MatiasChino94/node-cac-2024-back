//traemos esa conexion a la base de datos
const db = require('../db/db');

const index = (req, res) => {
    const sql = "SELECT * FROM productos";

    db.query(sql, (error, rows) => {

        if (error) {
            res.status(500).json({ error: "error en la consulta" });
        }

        res.json(rows);
        console.log(rows);
    })

};

const mostrarProducto = (req, res) => {
    //desestructurar el request
    const { id } = req.params;
    //consulta sql 
    const sql = "SELECT * FROM productos WHERE id = ?";

    //ese [id] lo pega en la consulta sql '?'
    db.query(sql, [id], (error, rows) => {

        //si hay un error en la peticion osea un dato que no sea un id
        if (error) {
            return res.status(500).json({ error: 'Intente mas tarde' });
        }

        //si no hay un producto con ese id va tirar ese error
        if (rows.length == 0) {
            return res.status(404).json({ error: "No existe el producto" });
        }

        //como va traer uno solo, que me traiga la primera posicion 
        res.json(rows[0]);
    })

};

const crearProducto = (req, res) => {
    const { nombre, stock, precio } = req.body;
    const sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?,?,?)";

    //en el orden que esta echo la peticion sql 
    db.query(sql, [nombre, precio, stock], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }

        const respuestaProducto = {
            ...req.body,
            id: result.insertId
        };

        res.json(respuestaProducto);
    });

}

const modificarProductos = (req,res) => {
    const { id } = req.params;
    const {nombre, stock, precio} = req.body;

    const sql = "UPDATE productos SET nombre = ?, stock = ?, precio = ? WHERE id = ?";

    db.query(sql,[nombre, stock, precio, id], (error, result) => {
        if(error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }

        if(result.affectedRows == 0){
            return res.status(404).json({ error: "No existe el producto" });
        }

        const productoActualizado = {
            ...req.body,
            ...req.params
        }

        res.json(productoActualizado)

    })
}

const borrarProducto = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM productos WHERE id = ?';

    db.query(sql, [id], (error, result) => {
        if(error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }

        if(result.affectedRows == 0){
            return res.status(404).json({ error: "No existe el producto" });
        }

        res.json({mensaje: `Producto ${id} borrado con exito`});

    })
}

    module.exports = {
        index,
        mostrarProducto,
        crearProducto,
        modificarProductos, 
        borrarProducto

    }