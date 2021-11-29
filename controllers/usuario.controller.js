//import sha256 from 'crypto-js/sha256';
const crypto = require("crypto-js");

const { Usuario } = require("../models/usuario.model.js");



//431a9707c7825d610ac589f9fb102b13011bf0d1e26e5f910ccceec4aa2fc5325e4dd7309ec8a3d2640a8c17f6bcce2d8209c1c7ac1269287f08a7cdb177c1fa
//431a9707c7825d610ac589f9fb102b13011bf0d1e26e5f910ccceec4aa2fc5325e4dd7309ec8a3d2640a8c17f6bcce2d8209c1c7ac1269287f08a7cdb177c1fa

async function mFind(req,res){

    const Nombre = req.body.Nombre;
    const Contraseña = req.body.Contraseña

    console.log(Nombre + " Cons")
    console.log(Contraseña + " Cons")
    
    var Cons = crypto.SHA3(Contraseña).toString()
    console.log(Cons)

    try {

        const result =  await Usuario.findOne({
           Usuario: Nombre,
           Contraseña: Cons
        },{_id:0, Contraseña: 0});

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).send(result)
        }

        } catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
}  

async function minsertOne(req,res){

    const Nombre = req.body.Nombre;
    const Contraseña = req.body.Contraseña

   
    var Con = crypto.SHA3(Contraseña).toString()
   
   
  
    if (Nombre && Contraseña){
       try {

            const newServ = await new Usuario({
                Usuario: Nombre,
                Contraseña: Con

            }).save();

            //res.status(200).json({savedTask:newServ});
            res.status(400).send("Usuario " + Nombre + " creado");


       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar el servicio");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }

}  
async function FindAll(req,res){
    try {

        const result =  await Usuario.findOne(
            {del: { $eq: true } },
            {Contraseña: 0}
            );

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).send(result)
        }

        }catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
} 

async function mDelete(req,res){
    const _id = req.body._id;
    if (_id){

       try {

            await Usuario.updateOne({
                _id: _id,
            }, {
                $set:{
                    del: false
                }
            }); 
            res.status(200).json({
                msg: "Registro actualizado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}
async function mUpdate(req,res){
    const _id = req.body._id;
    const Usuario = req.body.Nombre;
    if (_id){

       try {

            await Usuario.updateOne({
                _id: _id,
            }, {
                $set:{
                    Usuario: Usuario
                }
            }); 
            res.status(200).json({
                msg: "Registro actualizado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}



module.exports= {
    mFind,
    minsertOne,
    FindAll,
    mDelete,
    mUpdate
}