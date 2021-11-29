
const { Venta } = require("../models/Venta.model");

async function minsertOne(req,res){

    const Productos = req.body.Productos;
    const Cantidades = req.body.Cantidades;
    const Fecha = req.body.Fecha;
    const Personal = req.body.Personal;
    
    console.log(Productos)
    console.log(Cantidades)
    console.log(Personal)
    if (Productos && Cantidades && Personal){
       try {

            const nuevaVenta = await new Venta({
                Productos: Productos,
                Cantidades: Cantidades,
                Fecha: Fecha,
                Personal: Personal,
                
            }).save();
            res.status(200).json({
                NuevaVenta:nuevaVenta
            });
           

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar el Venta");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }

}

///http://localhost:3000/Venta/listall?status=NEW
async function mFindAll(req,res){

        try {
            const result =  await Venta.find({
                del: { $eq: true } ,
            });
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

    const taskId = req.body._id;
    if (taskId){
        try {
            const result =  await Venta.findOneAndUpdate({
                 _id: Id,
             }, {
                 $set:{
                     del: false
                 }
             },{new: true}); 
           
             res.status(200).json({
                 result
             });
 
        } catch (error) {
 
            console.log(error)
            res.status(500).send("No se pudo eliminar la Venta");
        }
    }
}

async function mRestore(req,res){
    const Id = req.body._id;
    if (Id){

       try {

           const result =  await Venta.findOneAndUpdate({
                _id: Id,
            }, {
                $set:{
                    del: true
                }
            },{new: true}); 
          
            res.status(200).json({
                result
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo restaurar la Venta");
       }

    }
}

module.exports= {
    minsertOne,
    mFindAll,
    mRestore,
    mDeleteOne
}