const mongoose = require("mongoose");


const todoShema = new mongoose.Schema(
    {
        ///Nombre del usuario
        Usuario:{
            type: String,
            required: true,

        },   
        //Constraseña del usuario
        Contraseña: {
            type: String,
            required: true,
        },
        del:{
            type: Boolean,
            default: true

        },
        Admin: {
            type: Boolean,
            default: true
        }
    }
)
const Usuario = mongoose.model("Usuario",todoShema);

module.exports = {
    Usuario
}