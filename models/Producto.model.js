const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ///Nombre del cleinte
        Nombre:{
            type: String,
            required: true,

        },
        ///Tipo de servicio
        Precio: {
            type: Number,
            default: 0,
        },
        //Hora
        Cantidad:{
            type: Number,
            default: 0,
        },
        del:{
            type: Boolean,
            default: true

        }
    }
)
const Producto = mongoose.model("Producto",todoShema);

module.exports = {
    Producto
}