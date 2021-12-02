const { Producto } = require("../models/Producto.model.js");

async function minsertOne(req,res){

    const Nombre = req.body.Nombre;
    const Precio = req.body.Precio;
    const Cantidad = req.body.Cantidad;
    if (Producto){

       try {

            const newTask = await new Producto({
                Nombre: Nombre,
                Precio: Precio,
                Cantidad: Cantidad,
               

            }).save();
            res.status(200).json({
                savedTask:newTask
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar la Producto");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }
}

///http://localhost:3000/Producto/listall?status=NEW
async function mFindAll(req,res){
    try {

        const result =  await Producto.find(
            { del: { $eq: true } }
        );

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).json([]);
        }

        } catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
}  

async function mDeleteOne(req,res){

    const id = req.body._id;
    
    
    if (id){

        try {

            await Producto.updateOne({
                _id: id.toString(),
            }, {
                $set:{
                    del: false
                }
            }); 
            res.status(200).json({
                msg: "Registro eliminado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo eliminar el producto");
       }

    }
}
async function mRestoreOne(req,res){
 
    const id = req.body._id;
    
    
    if (id){

        try {

            await Producto.updateOne({
                _id: id.toString(),
            }, {
                $set:{
                    del: true
                }
            }); 
            res.status(200).json({
                msg: "Registro restaurado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo restaurar el producto");
       }

    }
}

async function mUpdateOne(req,res){
    const id = req.body._id;
    
    const Nombre = req.body.Producto;
    const Precio = req.body.Precio;
    const Cantidad = req.body.Cantidad;

    if (id){

       try {

            const response = await Producto.findOneAndUpdate(
            {
                _id: id,
            }, 
            {
                $set:{
                    Producto: Nombre,
                    Precio: Precio,
                    Cantidad: Cantidad,
                }
            },{new: true}); 

            res.status(200).json(response);

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}

async function mPapelera(req,res){
    try {

        const result =  await Producto.find(
            { del: { $eq: false } }
        );

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).json([]);
        }

        } catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
} 


module.exports= {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne,
    mRestoreOne,
    mPapelera
}