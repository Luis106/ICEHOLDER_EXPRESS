const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ///Nombre del cleinte
        Nombre:{
            type: String,
            required: true,

        },
        ///Tipo de servicio
        Direccion: {
            type: String,
            default: "nan",
        },
        //Hora
        Correo:{
            type: String,
            default: "nan",
        },
        Telefono:{
            type: String,
            default: "nan",
        },
        del:{
            type: Boolean,
            default: true

        }
    }
)
const Provedor = mongoose.model("Provedor",todoShema);

module.exports = {
    Provedor
}