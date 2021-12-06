//import sha256 from 'crypto-js/sha256';
const crypto = require("crypto-js");

const { Usuario } = require("../models/usuario.model.js");

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
    const Admin = req.body.Admin
   
    try{
        var Con = crypto.SHA3(Contraseña).toString()
    }catch(error){
        console.log(error)
        var Con = "Eror"
        console.log("Error en la encriptación")
    }


    console.log(Nombre , Contraseña , Admin)
    if (Nombre && Contraseña && Admin  !== null && Admin !== undefined ){

       try {

            const newServ = await new Usuario({
                Usuario: Nombre,
                Contraseña: Con,
                Admin: Admin
            }).save();

            //res.status(200).json({savedTask:newServ});
            res.status(200).send("Usuario " + Nombre + " creado " + "como " + Admin);


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

        const result =  await Usuario.find(
            {
                del: { $eq: true } 
            },
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
async function FindAllP(req,res){
    try {

        const result =  await Usuario.find(
            {del: { $eq: false } },
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
async function mRestore(req,res){
    const _id = req.body._id;
    if (_id){

       try {

            await Usuario.updateOne({
                _id: _id,
            }, {
                $set:{
                    del: true
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
    const Nombre = req.body.Nombre;
    const Admin = req.body.Admin;
    
    if (_id){

       try {

            await Usuario.updateOne({
                _id: _id,
            }, {
                $set:{
                    Usuario: Nombre,
                    Admin: Admin
                }
            }); 
            res.status(200).json({  _id: _id, Usuario: Nombre,
                Admin: Admin
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}
async function mFindFor(req,res){
    const param = req.body.Parametro;
    const data = req.body.Datos;

    try {

        const result =  await Usuario.find(
            { del: { $eq: true }, [param]: {$eq: data}},
            { Contraseña: 0}
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
    mFind,
    minsertOne,
    FindAll,
    mDelete,
    mUpdate,
    FindAllP,
    mRestore,
    mFindFor
}