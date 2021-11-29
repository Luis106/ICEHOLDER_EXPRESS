const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ////Nombre del servicio
        Productos:{
            type: Array,
            required: true,
        },
        Cantidades:{
            type: Array,
            required: true,   
        },
        Fecha:{
            type: String,
            default: "hh:mm:ss dd/MM/yyyyy"
        },
        Persona: {
            type: String,
            default: ""
        },
        del:{
            type: Boolean,
            default: true
        }
    }
)
const Venta = mongoose.model("Venta",todoShema);

module.exports = {
    Venta
}