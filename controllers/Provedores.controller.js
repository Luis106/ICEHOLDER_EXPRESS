const { Provedor } = require("../models/Provedores.model.js");

async function minsertOne(req,res){

    const Nombre = req.body.Nombre;
    const Direccion = req.body.Direccion;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;
    if (Nombre){

       try {

            const newTask = await new Provedor({
                Nombre: Nombre,
                Direccion: Direccion,
                Correo: Correo,
                Telefono: Telefono
               

            }).save();
            res.status(200).json({
                savedTask:newTask
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar la Provedor");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }
}
async function mFindAll(req,res){
    try {

        const result =  await Provedor.find(
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

            await Provedor.updateOne({
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
           res.status(500).send("No se pudo eliminar el Provedor");
       }

    }
}
async function mRestoreOne(req,res){
 
    const id = req.body._id;
    
    
    if (id){

        try {

            await Provedor.updateOne({
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
           res.status(500).send("No se pudo restaurar el Provedor");
       }

    }
}
async function mUpdateOne(req,res){
    const id = req.body._id;
    
    const Nombre = req.body.Nombre;
    const Direccion = req.body.Direccion;
    const Correo = req.body.Correo;
    const Telefono = req.body.Telefono;

    if (id){

       try {

            const response = await Provedor.findOneAndUpdate(
            {
                _id: id,
            }, 
            {
                $set:{
                    Nombre: Nombre,
                    Direccion: Direccion,
                    Correo: Correo,
                    Telefono: Telefono,
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

        const result =  await Provedor.find(
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
async function mFindFor(req,res){
    const param = req.body.Parametro;
    const data = req.body.Datos;

    try {

        const result =  await Provedor.find(
            { del: { $eq: true }, [param]: {$eq: data}}

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
    mPapelera,
    mFindFor
}