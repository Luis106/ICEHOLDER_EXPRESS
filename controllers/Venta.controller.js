
const { Venta } = require("../models/Venta.model");
const date = new Date();
async function minsertOne(req,res){

    const Productos = req.body.Productos;
    const Cantidades = req.body.Cantidades;
    const Personal = req.body.Personal;
    const Montos = req.body.Montos;
    
    const Fecha = (date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear() )
    const Hora = (date.getHours()+":"+date.getMinutes()+":"+date.getSeconds() )
    if (Productos && Cantidades && Personal && Montos){
       try {

            const nuevaVenta = await new Venta({
                Productos: Productos,
                Cantidades: Cantidades,
                Fecha: Fecha,
                Hora: Hora,
                Personal: Personal,
                Montos: Montos
                
            }).save();
            res.status(200).json({
                NuevaVenta:nuevaVenta
            });
           

       } catch (error) {

           console.log("Error en servidor", error)
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
async function mMontoD(req,res){
    const Fecha = (date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear())
    try {
        const result =  await Venta.find({
            del: { $eq: true }, Fecha: { $eq: Fecha }
        });
        if (result && result.length > 0) {

            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            var n = 0;

            result.forEach(element => {
                n += element.Montos.reduce(reducer)
            });
            console.log(n)

            const response = {
                Dia: Fecha,
                MontoTotal : n,
                Ventas: result.length
            }

            res.status(200).json(response);

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

async function mMontopDia(req,res){
    const Fecha = req.body.Fecha
    try {
        const result =  await Venta.find({
            del: { $eq: true }, Fecha: { $eq: Fecha }
        });
        if (result && result.length > 0) {

            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            var n = 0;

            result.forEach(element => {
                n += element.Montos.reduce(reducer)
            });
            console.log(n)

            const response = {
                Dia: Fecha,
                MontoTotal : n,
                Ventas: result.length
            }

            res.status(200).json(response);

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
async function VentaspDia(req,res){
    const Fecha = req.body.Fecha
    try {
        const result =  await Venta.find({
            del: { $eq: true }, Fecha: { $eq: Fecha }
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



module.exports= {
    minsertOne,
    mFindAll,
    mRestore,
    mDeleteOne,
    mMontoD,
    mMontopDia,
    VentaspDia
}